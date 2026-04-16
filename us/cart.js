// Pillar name → index (matches --pillar-1..5 tokens)
const PILLAR_INDEX = {
  Longevity: 1,
  Recovery: 2,
  Metabolic: 3,
  Cognitive: 4,
  Performance: 5
};

const Cart = {
  items: JSON.parse(localStorage.getItem('ea_cart') || '[]'),
  _checkoutInProgress: false,

  add(compound) {
    const existing = this.items.find(i => i.slug === compound.slug);
    if (existing) {
      existing.qty = Math.min(10, existing.qty + 1);
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

  changeQty(slug, delta) {
    const item = this.items.find(i => i.slug === slug);
    if (!item) return;
    const next = item.qty + delta;
    if (next < 1) {
      this.remove(slug);
      return;
    }
    item.qty = Math.min(10, next);
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
   * Stripe Checkout. Sends cart to /api/create-checkout-session and
   * redirects to Stripe-hosted checkout on success.
   *
   * Error handling is tiered so local dev (where /api/* is unreachable
   * under `npx serve`) gets an actionable message instead of a generic
   * "Checkout failed."
   */
  async checkout() {
    if (this._checkoutInProgress) return;
    if (this.items.length === 0) return;

    this._checkoutInProgress = true;
    const btn = document.getElementById('cart-checkout-btn');
    const btnTextEl = btn ? btn.querySelector('.cart-checkout-btn-text') : null;
    const originalText = btnTextEl ? btnTextEl.textContent : 'Checkout';

    if (btn) btn.disabled = true;
    if (btnTextEl) btnTextEl.textContent = 'Processing…';

    try {
      let response;
      try {
        response = await fetch('/api/create-checkout-session', {
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
      } catch (netErr) {
        throw new Error('Network error. Check your connection and try again.');
      }

      const contentType = response.headers.get('content-type') || '';
      const isJson = contentType.includes('application/json');
      const isLocal =
        location.hostname === 'localhost' ||
        location.hostname === '127.0.0.1' ||
        location.hostname === '';

      if (!response.ok || !isJson) {
        if (response.status === 404 && isLocal) {
          throw new Error(
            'Local static server can\u2019t run the checkout API. Run `vercel dev` (or deploy) to test Stripe end-to-end.'
          );
        }
        if (response.status === 404) {
          throw new Error('Checkout endpoint not found on this deployment.');
        }
        if (response.status === 500) {
          // Try to read a JSON error body if present
          const errData = isJson ? await response.json().catch(() => ({})) : {};
          throw new Error(errData.error || 'Checkout service error. Retry in a moment.');
        }
        if (!isJson) {
          throw new Error(`Unexpected response (HTTP ${response.status}).`);
        }
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `Checkout failed (HTTP ${response.status}).`);
      }

      const { url } = await response.json();
      if (!url) throw new Error('Checkout returned no redirect URL.');

      // Do NOT clear the cart here. If the user cancels at Stripe and comes
      // back via the cancel_url, we want their cart intact so they can retry.
      // The cart is cleared by /us/success.html on successful completion.
      window.location.href = url;
    } catch (err) {
      console.error('[Cart.checkout]', err);
      const errorEl = document.getElementById('cart-checkout-error');
      if (errorEl) {
        errorEl.textContent = err.message || 'Checkout failed. Please try again.';
        errorEl.classList.add('visible');
        setTimeout(() => errorEl.classList.remove('visible'), 8000);
      }
    } finally {
      if (btn) btn.disabled = false;
      if (btnTextEl) btnTextEl.textContent = originalText;
      this._checkoutInProgress = false;
    }
  },

  render() {
    // Nav badge (desktop)
    const badge = document.getElementById('cart-count');
    if (badge) {
      badge.textContent = this.count();
      badge.style.display = this.count() > 0 ? 'inline' : 'none';
    }

    // Mobile cart badge
    const mobileBadge = document.getElementById('mobile-cart-count');
    if (mobileBadge) {
      mobileBadge.textContent = this.count() > 0 ? this.count() : '';
    }

    // Drawer count label
    const countLabel = document.getElementById('cart-count-label');
    if (countLabel) {
      const n = this.count();
      countLabel.textContent = n === 0 ? 'Empty' : `${n} compound${n === 1 ? '' : 's'}`;
    }

    // Items region
    const list = document.getElementById('cart-items');
    if (list) {
      if (this.items.length === 0) {
        list.innerHTML =
          '<div class="cart-empty">' +
            '<div class="cart-empty-mark" aria-hidden="true"></div>' +
            '<div class="cart-empty-text">Your stack is empty.</div>' +
            '<div class="cart-empty-sub">Seventeen research compounds across five pillars of biology. Start building.</div>' +
          '</div>';
      } else {
        const itemsHtml = this.items.map(item => {
          const pIdx = PILLAR_INDEX[item.pillar] || 1;
          const safeName = String(item.name).replace(/[<>&"]/g, c =>
            ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c])
          );
          const pillarLabel = item.pillar ? `${item.pillar} · Pillar ${['I','II','III','IV','V'][pIdx-1]}` : 'Compound';
          return `
            <li class="cart-item" data-pillar="${pIdx}">
              <div class="cart-item-accent" aria-hidden="true"></div>
              <div class="cart-item-main">
                <div class="cart-item-name">${safeName}</div>
                <div class="cart-item-meta">${pillarLabel}</div>
                <div class="cart-item-controls">
                  <div class="cart-qty-stepper" role="group" aria-label="Quantity">
                    <button type="button" data-dec="${item.slug}" aria-label="Decrease quantity">\u2212</button>
                    <span class="cart-qty-stepper-value" aria-live="polite">${item.qty}</span>
                    <button type="button" data-inc="${item.slug}" aria-label="Increase quantity"${item.qty >= 10 ? ' disabled' : ''}>+</button>
                  </div>
                  <button type="button" class="cart-item-remove" data-remove="${item.slug}">Remove</button>
                </div>
              </div>
              <div class="cart-item-right">
                <span class="cart-item-price">$${(item.price * item.qty).toLocaleString()}</span>
                ${item.qty > 1 ? `<span class="cart-item-unit">$${item.price} each</span>` : ''}
              </div>
            </li>
          `;
        }).join('');
        list.innerHTML = `<ul class="cart-items">${itemsHtml}</ul>`;

        // Listeners (no inline onclick)
        list.querySelectorAll('[data-remove]').forEach(b => {
          b.addEventListener('click', () => Cart.remove(b.getAttribute('data-remove')));
        });
        list.querySelectorAll('[data-dec]').forEach(b => {
          b.addEventListener('click', () => Cart.changeQty(b.getAttribute('data-dec'), -1));
        });
        list.querySelectorAll('[data-inc]').forEach(b => {
          b.addEventListener('click', () => Cart.changeQty(b.getAttribute('data-inc'), +1));
        });
      }
    }

    // Bundle suggestions
    const suggestionsEl = document.getElementById('cart-suggestions');
    if (suggestionsEl) {
      const suggestionPairs = {
        'bpc-157': { slug: 'tb-500', name: 'TB-500', price: 134, pillar: 'Recovery', reason: 'BPC-157 + TB-500 is the most popular recovery stack' },
        'ipamorelin': { slug: 'cjc-1295', name: 'CJC-1295', price: 108, pillar: 'Performance', reason: 'CJC-1295 extends Ipamorelin GH pulses to 8+ days' }
      };
      const slugsInCart = this.items.map(i => i.slug);
      let suggestHtml = '';
      Object.keys(suggestionPairs).forEach(trigger => {
        const sug = suggestionPairs[trigger];
        if (slugsInCart.indexOf(trigger) !== -1 && slugsInCart.indexOf(sug.slug) === -1) {
          suggestHtml +=
            '<div class="cart-suggestion">' +
              '<strong>' + sug.reason + '</strong>' +
              '<button class="cart-suggestion-add" data-sug-slug="' + sug.slug + '" data-sug-name="' + sug.name + '" data-sug-price="' + sug.price + '" data-sug-pillar="' + sug.pillar + '">+ Add ' + sug.name + ' · $' + sug.price + '</button>' +
            '</div>';
        }
      });
      suggestionsEl.innerHTML = suggestHtml;
      suggestionsEl.querySelectorAll('.cart-suggestion-add').forEach(b => {
        b.addEventListener('click', () => {
          Cart.add({
            name: b.getAttribute('data-sug-name'),
            slug: b.getAttribute('data-sug-slug'),
            price: parseInt(b.getAttribute('data-sug-price'), 10),
            pillar: b.getAttribute('data-sug-pillar')
          });
        });
      });
    }

    // Total
    const total = document.getElementById('cart-total');
    if (total) total.textContent = this.total().toLocaleString();

    // Enable/disable checkout
    const checkoutBtn = document.getElementById('cart-checkout-btn');
    if (checkoutBtn) checkoutBtn.disabled = this.items.length === 0;
  },

  showDrawer() {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-overlay');
    if (drawer) drawer.classList.add('open');
    if (overlay) overlay.classList.add('open');
    if (typeof lockBody === 'function') lockBody();
    else document.body.classList.add('menu-open');
  },

  hideDrawer() {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-overlay');
    if (drawer) drawer.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
    if (typeof unlockBody === 'function') unlockBody();
    else document.body.classList.remove('menu-open');
  }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  Cart.render();

  const toggle = document.getElementById('cart-toggle');
  if (toggle) toggle.addEventListener('click', () => Cart.showDrawer());

  const mobileCartLink = document.getElementById('mobile-cart-link');
  if (mobileCartLink) {
    mobileCartLink.addEventListener('click', (e) => {
      e.preventDefault();
      Cart.showDrawer();
    });
  }

  const close = document.getElementById('cart-close');
  if (close) close.addEventListener('click', () => Cart.hideDrawer());

  const overlay = document.getElementById('cart-overlay');
  if (overlay) overlay.addEventListener('click', () => Cart.hideDrawer());

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') Cart.hideDrawer();
  });

  const checkoutBtn = document.getElementById('cart-checkout-btn');
  if (checkoutBtn) checkoutBtn.addEventListener('click', () => Cart.checkout());

  const clearLink = document.getElementById('cart-clear-link');
  if (clearLink) {
    clearLink.addEventListener('click', () => {
      Cart.items = [];
      Cart.save();
      Cart.render();
    });
  }

  // Waitlist DOM was removed from the cart drawer in the premium rebuild.
  // Reintroduce a dedicated waitlist flow if/when the feature comes back.
});
