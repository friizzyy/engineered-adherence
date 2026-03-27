// READY FOR REVIEW - Stripe Checkout integration pending Julius approval
const Cart = {
  items: JSON.parse(localStorage.getItem('ea_cart') || '[]'),
  _checkoutInProgress: false,

  add(compound) {
    const existing = this.items.find(i => i.slug === compound.slug);
    if (existing) {
      existing.qty++;
    } else {
      this.items.push({ ...compound, qty: 1 });
    }
    this.save();
    this.render();
    this.showDrawer();
    // Badge bounce animation
    const bounceBadge = document.getElementById('cart-count');
    if (bounceBadge) {
      bounceBadge.classList.remove('cart-badge-bounce');
      void bounceBadge.offsetWidth;
      bounceBadge.classList.add('cart-badge-bounce');
    }
  },

  remove(slug) {
    this.items = this.items.filter(i => i.slug !== slug);
    this.save();
    this.render();
  },

  save() {
    localStorage.setItem('ea_cart', JSON.stringify(this.items));
  },

  total() {
    return this.items.reduce((sum, i) => sum + (i.price * i.qty), 0);
  },

  count() {
    return this.items.reduce((sum, i) => sum + i.qty, 0);
  },

  /**
   * Stripe Checkout — sends cart to /api/create-checkout-session
   * and redirects to Stripe-hosted checkout page.
   */
  async checkout() {
    if (this._checkoutInProgress) return;
    if (this.items.length === 0) return;

    this._checkoutInProgress = true;
    const btn = document.getElementById('cart-checkout-btn');
    if (btn) {
      btn.textContent = 'Processing...';
      btn.disabled = true;
    }

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: this.items.map(i => ({
            name: i.name,
            slug: i.slug,
            price: i.price,
            qty: i.qty,
            pillar: i.pillar || ''
          }))
        })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || 'Checkout failed');
      }

      const { url } = await response.json();
      if (url) {
        // Clear cart before redirect — Stripe has the order now
        this.items = [];
        this.save();
        window.location.href = url;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (err) {
      console.error('[Cart.checkout]', err);
      const errorEl = document.getElementById('cart-checkout-error');
      if (errorEl) {
        errorEl.textContent = err.message || 'Checkout failed. Please try again.';
        errorEl.style.display = 'block';
        setTimeout(() => { errorEl.style.display = 'none'; }, 5000);
      }
      if (btn) {
        btn.textContent = 'Checkout';
        btn.disabled = false;
      }
    } finally {
      this._checkoutInProgress = false;
    }
  },

  render() {
    // Update nav badge (desktop)
    const badge = document.getElementById('cart-count');
    if (badge) {
      badge.textContent = this.count();
      badge.style.display = this.count() > 0 ? 'inline' : 'none';
    }

    // Update mobile cart badge
    const mobileBadge = document.getElementById('mobile-cart-count');
    if (mobileBadge) {
      mobileBadge.textContent = this.count() > 0 ? this.count() : '';
    }

    // Update drawer items
    const list = document.getElementById('cart-items');
    if (list) {
      if (this.items.length === 0) {
        list.innerHTML = '<p style="font-size:13px;color:var(--faint);text-align:center;padding:32px 0">Your stack is empty</p>';
      } else {
        list.innerHTML = this.items.map(item => `
          <div class="cart-item">
            <div>
              <div class="cart-item-name">${item.name}</div>
              <div class="cart-item-qty">\u00d7 ${item.qty}</div>
            </div>
            <div style="display:flex;align-items:center;gap:12px">
              <span class="cart-item-price">$${item.price * item.qty}</span>
              <button class="cart-remove-btn" data-remove="${item.slug}" aria-label="Remove ${item.name}">\u00d7</button>
            </div>
          </div>
        `).join('');

        // Attach remove listeners (no inline onclick)
        list.querySelectorAll('.cart-remove-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            Cart.remove(btn.getAttribute('data-remove'));
          });
        });
      }
    }

    // Render bundle suggestions
    const suggestionsEl = document.getElementById('cart-suggestions');
    if (suggestionsEl) {
      const suggestionPairs = {
        'bpc-157': {slug:'tb-500',name:'TB-500',price:134,pillar:'Recovery',reason:'BPC-157 + TB-500 is the most popular recovery stack'},
        'ipamorelin': {slug:'cjc-1295',name:'CJC-1295',price:108,pillar:'Performance',reason:'CJC-1295 extends Ipamorelin GH pulses to 8+ days'}
      };
      const slugsInCart = this.items.map(function(i){return i.slug});
      let suggestHtml = '';
      const self = this;
      Object.keys(suggestionPairs).forEach(function(trigger) {
        const sug = suggestionPairs[trigger];
        if (slugsInCart.indexOf(trigger) !== -1 && slugsInCart.indexOf(sug.slug) === -1) {
          suggestHtml += '<div class="cart-suggestion">' +
            '<strong>' + sug.reason + '</strong><br>' +
            '<button class="cart-suggestion-add" data-sug-slug="' + sug.slug + '" data-sug-name="' + sug.name + '" data-sug-price="' + sug.price + '" data-sug-pillar="' + sug.pillar + '">+ Add ' + sug.name + ' ($' + sug.price + ')</button>' +
          '</div>';
        }
      });
      suggestionsEl.innerHTML = suggestHtml;
      suggestionsEl.querySelectorAll('.cart-suggestion-add').forEach(function(btn) {
        btn.addEventListener('click', function() {
          self.add({
            name: btn.getAttribute('data-sug-name'),
            slug: btn.getAttribute('data-sug-slug'),
            price: parseInt(btn.getAttribute('data-sug-price')),
            pillar: btn.getAttribute('data-sug-pillar')
          });
        });
      });
    }

    // Update total
    const total = document.getElementById('cart-total');
    if (total) total.textContent = this.total();

    // Enable/disable checkout button based on cart state
    const checkoutBtn = document.getElementById('cart-checkout-btn');
    if (checkoutBtn) {
      checkoutBtn.disabled = this.items.length === 0;
    }
  },

  showDrawer() {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-overlay');
    if (drawer) drawer.classList.add('open');
    if (overlay) overlay.classList.add('open');
    if (typeof lockBody === 'function') lockBody(); else document.body.classList.add('menu-open');
  },

  hideDrawer() {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-overlay');
    if (drawer) drawer.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
    if (typeof unlockBody === 'function') unlockBody(); else document.body.classList.remove('menu-open');
  }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  Cart.render();

  // Cart toggle button (desktop)
  const toggle = document.getElementById('cart-toggle');
  if (toggle) toggle.addEventListener('click', () => Cart.showDrawer());

  // Cart toggle link (mobile nav)
  const mobileCartLink = document.getElementById('mobile-cart-link');
  if (mobileCartLink) {
    mobileCartLink.addEventListener('click', (e) => {
      e.preventDefault();
      Cart.showDrawer();
    });
  }

  // Cart close button
  const close = document.getElementById('cart-close');
  if (close) close.addEventListener('click', () => Cart.hideDrawer());

  // Cart overlay click to close
  const overlay = document.getElementById('cart-overlay');
  if (overlay) overlay.addEventListener('click', () => Cart.hideDrawer());

  // Close on escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') Cart.hideDrawer();
  });

  // Checkout button (Stripe Checkout)
  const checkoutBtn = document.getElementById('cart-checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => Cart.checkout());
  }

  // Clear Stack button
  const clearLink = document.getElementById('cart-clear-link');
  if (clearLink) {
    clearLink.addEventListener('click', function() {
      Cart.items = [];
      Cart.save();
      Cart.render();
    });
  }

  // Waitlist form
  const waitlistBtn = document.getElementById('cart-waitlist-btn');
  if (waitlistBtn) {
    waitlistBtn.addEventListener('click', function() {
      const emailInput = document.getElementById('cart-waitlist-email');
      const confirmEl = document.getElementById('cart-waitlist-confirm');
      if (!emailInput || !emailInput.value || emailInput.value.indexOf('@') === -1) return;
      const waitlist = JSON.parse(localStorage.getItem('ea_waitlist') || '[]');
      if (waitlist.indexOf(emailInput.value) === -1) {
        waitlist.push(emailInput.value);
        localStorage.setItem('ea_waitlist', JSON.stringify(waitlist));
      }
      emailInput.value = '';
      if (confirmEl) {
        confirmEl.style.display = 'block';
        setTimeout(function() { confirmEl.style.display = 'none'; }, 3000);
      }
    });
  }
});
