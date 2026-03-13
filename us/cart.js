const Cart = {
  items: JSON.parse(localStorage.getItem('ea_cart') || '[]'),

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

    // Update total
    const total = document.getElementById('cart-total');
    if (total) total.textContent = this.total();
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
});
