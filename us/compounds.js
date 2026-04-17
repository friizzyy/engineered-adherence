/* ═══════════════════════════════════════════
   ENGINEERED ADHERENCE — SHARED BEHAVIOURS
   The legacy CompoundModal + CompoundDB were retired when vial/pill
   clicks started navigating to the dossier on /us/shop instead of
   opening a bottom-sheet modal. Only live helpers remain here:
     • lockBody / unlockBody — shared scroll-lock reference counter
       used by cart.js and any future overlay.
     • Cart.add toast wrapper — gives the shop's "Add to Stack" button
       a visible confirmation.
   ═══════════════════════════════════════════ */

/* ─── Scroll-lock reference counter ───
   Multiple overlays (cart drawer, etc.) can request a body scroll lock;
   the menu-open class is only removed when every requester has unlocked. */
let _bodyLockCount = 0;
function lockBody() {
  _bodyLockCount++;
  document.body.classList.add('menu-open');
}
function unlockBody() {
  _bodyLockCount = Math.max(0, _bodyLockCount - 1);
  if (_bodyLockCount === 0) document.body.classList.remove('menu-open');
}

/* ─── Toast ───
   Single shared toast surface. Fires on cart add. */
const Toast = {
  el: null,
  timer: null,
  ensure() {
    if (this.el) return this.el;
    let el = document.querySelector('.ea-toast');
    if (!el) {
      el = document.createElement('div');
      el.className = 'ea-toast';
      document.body.appendChild(el);
    }
    this.el = el;
    return el;
  },
  show(message, duration = 2000) {
    const el = this.ensure();
    el.textContent = '';
    const check = document.createElement('span');
    check.className = 'ea-toast-check';
    check.textContent = '\u2713';
    el.appendChild(check);
    el.appendChild(document.createTextNode(' ' + message));
    el.classList.add('visible');
    clearTimeout(this.timer);
    this.timer = setTimeout(() => el.classList.remove('visible'), duration);
  },
};

/* ─── Wrap Cart.add with a toast ─── */
document.addEventListener('DOMContentLoaded', function() {
  if (typeof Cart !== 'undefined' && typeof Cart.add === 'function') {
    const originalAdd = Cart.add.bind(Cart);
    Cart.add = function(compound) {
      originalAdd(compound);
      if (compound && compound.name) Toast.show(compound.name + ' added to stack');
    };
  }
});
