/* ═══════════════════════════════════════════════════════════════
   ENGINEERED ADHERENCE — SHARED JS
   ═══════════════════════════════════════════════════════════════ */

// ═══════ THEME TOGGLE ═══════
(function(){
  const toggle = document.getElementById('themeToggle');
  const html = document.documentElement;

  // Persist theme
  const saved = localStorage.getItem('ea-theme');
  if(saved){
    html.setAttribute('data-theme', saved);
    if(typeof updateVials === 'function') updateVials(saved);
  }

  if(toggle){
    toggle.addEventListener('click', () => {
      const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('ea-theme', next);
      if(typeof updateVials === 'function') updateVials(next);
    });
  }
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
