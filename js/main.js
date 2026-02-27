/* ═══════════════════════════════════════════════════════════════
   ENGINEERED ADHERENCE — SHARED JS
   ═══════════════════════════════════════════════════════════════ */

// ═══════ THEME TOGGLE ═══════
(function(){
  const toggle = document.getElementById('themeToggle');
  const mobileToggle = document.getElementById('mobileThemeToggle');
  const html = document.documentElement;

  function setTheme(theme){
    html.setAttribute('data-theme', theme);
    localStorage.setItem('ea-theme', theme);
    if(typeof updateVials === 'function') updateVials(theme);
  }

  // Theme already set by inline script, just wire up toggles
  const current = html.getAttribute('data-theme') || 'dark';
  if(typeof updateVials === 'function') updateVials(current);

  function handleToggle(){
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    setTheme(next);
  }

  if(toggle) toggle.addEventListener('click', handleToggle);
  if(mobileToggle) mobileToggle.addEventListener('click', handleToggle);
})();

// ═══════ MOBILE NAVIGATION ═══════
(function(){
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');
  const overlay = document.querySelector('.mobile-nav-overlay');
  const body = document.body;

  if(!menuBtn || !mobileNav) return;

  function openMenu(){
    menuBtn.classList.add('active');
    menuBtn.setAttribute('aria-expanded', 'true');
    mobileNav.classList.add('active');
    overlay.classList.add('active');
    body.classList.add('menu-open');
  }

  function closeMenu(){
    menuBtn.classList.remove('active');
    menuBtn.setAttribute('aria-expanded', 'false');
    mobileNav.classList.remove('active');
    overlay.classList.remove('active');
    body.classList.remove('menu-open');
  }

  menuBtn.addEventListener('click', () => {
    if(mobileNav.classList.contains('active')){
      closeMenu();
    } else {
      openMenu();
    }
  });

  overlay.addEventListener('click', closeMenu);

  // Close on link click
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on escape key
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' && mobileNav.classList.contains('active')){
      closeMenu();
    }
  });

  // Close on resize to desktop
  window.addEventListener('resize', () => {
    if(window.innerWidth > 768 && mobileNav.classList.contains('active')){
      closeMenu();
    }
  });
})();

// ═══════ SCROLL REVEAL + STAGGER ═══════
(function(){
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible') });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal, .stagger-children').forEach(el => observer.observe(el));
})();

// ═══════ ACTIVE NAV LINK ═══════
(function(){
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-center a[data-section]');
  if(!navLinks.length) return;

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('data-section') === id);
        });
      }
    });
  }, { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' });

  sections.forEach(s => navObserver.observe(s));
})();

// ═══════ SMOOTH NAV FADE ON LOAD (for pages without hero animation) ═══════
(function(){
  const nav = document.querySelector('nav');
  if(nav && !nav.style.animation && !document.querySelector('.hero')){
    nav.style.opacity = '0';
    nav.style.transform = 'translateY(-14px)';
    nav.style.transition = 'opacity .6s ease, transform .6s ease';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        nav.style.opacity = '1';
        nav.style.transform = 'translateY(0)';
      });
    });
  }
})();
