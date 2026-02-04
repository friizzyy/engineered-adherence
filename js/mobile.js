/* ═══════════════════════════════════════════════════════════════
   ENGINEERED ADHERENCE — MOBILE UX SYSTEM
   Swipe Detection · Indicators · Progressive Disclosure
   ═══════════════════════════════════════════════════════════════ */

(function(){
  'use strict';

  // Only run on mobile
  const isMobile = () => window.innerWidth <= 768;
  if(!isMobile()) return;

  // ═══════════════════════════════════════════
  // SWIPE INDICATOR SYSTEM
  // ═══════════════════════════════════════════
  function initSwipeIndicators(){
    const swipeContainers = document.querySelectorAll('.pillar-grid, .pricing-grid, .protocol-detail, .compound-grid, .source-grid, .stat-grid');

    swipeContainers.forEach(container => {
      // Skip if already initialized
      if(container.dataset.swipeInit) return;
      container.dataset.swipeInit = 'true';

      // Count items
      const items = container.children;
      if(items.length <= 1) return;

      // Create indicator container
      const indicatorWrapper = document.createElement('div');
      indicatorWrapper.className = 'swipe-indicators';

      // Create dots
      for(let i = 0; i < items.length; i++){
        const dot = document.createElement('span');
        dot.className = 'swipe-dot' + (i === 0 ? ' active' : '');
        dot.dataset.index = i;
        indicatorWrapper.appendChild(dot);
      }

      // Insert after container
      container.parentNode.insertBefore(indicatorWrapper, container.nextSibling);

      // Add swipe hint on first container
      if(!document.querySelector('.swipe-hint')){
        const hint = document.createElement('div');
        hint.className = 'swipe-hint';
        hint.innerHTML = '<span>Swipe</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
        indicatorWrapper.parentNode.insertBefore(hint, indicatorWrapper.nextSibling);
      }

      // Track scroll position
      let scrollTimeout;
      container.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          updateIndicators(container, indicatorWrapper);
        }, 50);

        // Hide swipe hint after first interaction
        const hint = document.querySelector('.swipe-hint');
        if(hint && !hint.classList.contains('touched')){
          hint.classList.add('touched');
        }
      }, { passive: true });

      // Touch feedback for dots
      indicatorWrapper.querySelectorAll('.swipe-dot').forEach(dot => {
        dot.addEventListener('click', () => {
          const index = parseInt(dot.dataset.index);
          const item = items[index];
          if(item){
            const scrollLeft = item.offsetLeft - 24;
            container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
          }
        });
      });
    });
  }

  function updateIndicators(container, indicatorWrapper){
    const items = container.children;
    const dots = indicatorWrapper.querySelectorAll('.swipe-dot');
    const scrollLeft = container.scrollLeft;
    const containerWidth = container.offsetWidth;

    // Find the most visible item
    let activeIndex = 0;
    let maxVisibility = 0;

    Array.from(items).forEach((item, index) => {
      const itemLeft = item.offsetLeft - 24;
      const itemRight = itemLeft + item.offsetWidth;
      const visibleLeft = Math.max(itemLeft, scrollLeft);
      const visibleRight = Math.min(itemRight, scrollLeft + containerWidth);
      const visibleWidth = visibleRight - visibleLeft;
      const visibility = visibleWidth / item.offsetWidth;

      if(visibility > maxVisibility){
        maxVisibility = visibility;
        activeIndex = index;
      }
    });

    // Update dots
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === activeIndex);
    });
  }

  // ═══════════════════════════════════════════
  // PROGRESSIVE DISCLOSURE (ACCORDIONS)
  // ═══════════════════════════════════════════
  function initAccordions(){
    const accordions = document.querySelectorAll('.mobile-accordion');

    accordions.forEach(accordion => {
      const header = accordion.querySelector('.mobile-accordion-header');
      if(!header) return;

      header.addEventListener('click', () => {
        const isActive = accordion.classList.contains('active');

        // Close others in same group
        const group = accordion.closest('.accordion-group');
        if(group){
          group.querySelectorAll('.mobile-accordion.active').forEach(item => {
            if(item !== accordion) item.classList.remove('active');
          });
        }

        // Toggle current
        accordion.classList.toggle('active', !isActive);
      });
    });
  }

  // ═══════════════════════════════════════════
  // MOBILE SECTION NAVIGATION
  // ═══════════════════════════════════════════
  function initSectionNav(){
    const nav = document.querySelector('.mobile-section-nav');
    if(!nav) return;

    const sections = document.querySelectorAll('section[id]');
    const links = nav.querySelectorAll('a');

    // Show/hide based on scroll position
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const scroll = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // Show after first section, hide near bottom
      const showNav = scroll > windowHeight * 0.5 && scroll < docHeight - windowHeight * 1.5;
      nav.classList.toggle('visible', showNav);

      // Update active state
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const isActive = rect.top <= windowHeight * 0.5 && rect.bottom >= windowHeight * 0.3;
        if(links[index]) links[index].classList.toggle('active', isActive);
      });

      lastScroll = scroll;
    }, { passive: true });
  }

  // ═══════════════════════════════════════════
  // TOUCH RIPPLE EFFECT
  // ═══════════════════════════════════════════
  function initTouchFeedback(){
    const cards = document.querySelectorAll('.card, .pricing-card, .pillar-card, .compound-card, .stat-card');

    cards.forEach(card => {
      card.addEventListener('touchstart', (e) => {
        card.style.transition = 'transform .1s ease';
      }, { passive: true });

      card.addEventListener('touchend', () => {
        card.style.transition = '';
      }, { passive: true });
    });
  }

  // ═══════════════════════════════════════════
  // SMOOTH SCROLL FOR INTERNAL LINKS
  // ═══════════════════════════════════════════
  function initSmoothScroll(){
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const target = document.querySelector(link.getAttribute('href'));
        if(target){
          e.preventDefault();
          const offset = 80; // Account for fixed nav
          const top = target.offsetTop - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    });
  }

  // ═══════════════════════════════════════════
  // LAZY LOAD OPTIMIZATION
  // ═══════════════════════════════════════════
  function initLazyAnimations(){
    // Reduce animation distance for mobile
    document.querySelectorAll('.reveal').forEach(el => {
      el.style.setProperty('--reveal-distance', '20px');
    });
  }

  // ═══════════════════════════════════════════
  // PREVENT OVERSCROLL BOUNCE
  // ═══════════════════════════════════════════
  function preventOverscroll(){
    document.body.addEventListener('touchmove', (e) => {
      // Allow scrolling in swipe containers
      const swipeContainer = e.target.closest('.pillar-grid, .pricing-grid, .protocol-detail, .compound-grid, .source-grid, .mobile-nav');
      if(swipeContainer) return;
    }, { passive: true });
  }

  // ═══════════════════════════════════════════
  // INITIALIZE ON DOM READY
  // ═══════════════════════════════════════════
  function init(){
    initSwipeIndicators();
    initAccordions();
    initSectionNav();
    initTouchFeedback();
    initSmoothScroll();
    initLazyAnimations();
    preventOverscroll();
  }

  // Run on load
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Re-init on resize (in case user rotates device)
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      if(isMobile()){
        initSwipeIndicators();
      }
    }, 250);
  });

})();
