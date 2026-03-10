# Navigation & UX Audit for "Engineered Adherence"
**Static Multi-Page Bio-Longevity Website | Plain HTML with Shared CSS/JS**

---

## OVERVIEW

This audit evaluates the navigation architecture, mobile UX, page flow, and conversion patterns for a 6-page static site (index, about, science, market, protocols, contact) with no framework, router, or SPA.

**Pages:** index.html | about.html | science.html | market.html | protocols.html | contact.html | pillars.html (→ science redirect)

**Navigation:** Desktop sticky nav bar | Mobile hamburger menu with overlay | js/main.js controls toggle/overlay/escape

---

## STEP 1: NAVIGATION ARCHITECTURE AUDIT

### 1.1 Desktop Navigation Verification
- [ ] All 6 main pages appear in the nav bar (Home, About, Science, Market, Protocols, Contact)
- [ ] Nav links are in logical order (typically: Home → About → Science → Protocols → Market → Contact)
- [ ] Logo/brand name is clickable and links back to index.html
- [ ] Nav styling is consistent across all pages
- [ ] Font size is readable (minimum 14px on desktop)
- [ ] Link hover/focus states are visible (underline, color change, or background highlight)

**Audit Procedure:**
```bash
# Check all pages for identical nav HTML
grep -n "nav class" *.html
grep -n "href=" *.html | grep -E "(index|about|science|market|protocols|contact)"
```

### 1.2 Mobile Navigation Verification
- [ ] Hamburger button (≡) is visible at <768px breakpoint
- [ ] Desktop nav hides at mobile breakpoint (display: none for nav bar)
- [ ] Mobile menu slides in from left or right (smooth transition, 300ms or faster)
- [ ] Overlay appears behind menu with semi-transparent background (rgba(0,0,0,0.5) or similar)
- [ ] Menu has proper z-index (≥1000)

**CSS Example (Required):**
```css
/* Desktop nav (visible above 768px) */
nav {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

/* Mobile hamburger (visible below 768px) */
.hamburger-btn {
  display: none;
}

@media (max-width: 767px) {
  nav {
    display: none;
  }
  .hamburger-btn {
    display: block;
  }
  .nav-panel {
    position: fixed;
    left: -100%;
    top: 0;
    width: 80%;
    height: 100vh;
    background: #fff;
    transition: left 0.3s ease;
    z-index: 1001;
  }
  .nav-panel.open {
    left: 0;
  }
  .nav-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
  }
  .nav-overlay.open {
    opacity: 1;
    pointer-events: auto;
  }
}
```

### 1.3 Navigation HTML Structure Consistency
- [ ] Every page has identical nav HTML (except for active page indicator)
- [ ] Nav structure includes: logo, nav links, hamburger button
- [ ] Mobile menu panel contains same links as desktop nav
- [ ] No duplicate or orphaned nav elements

**Expected HTML Structure:**
```html
<nav class="navbar">
  <a href="index.html" class="logo">Engineered Adherence</a>

  <ul class="nav-links">
    <li><a href="index.html" class="nav-link">Home</a></li>
    <li><a href="about.html" class="nav-link">About</a></li>
    <li><a href="science.html" class="nav-link">Science</a></li>
    <li><a href="market.html" class="nav-link">Market</a></li>
    <li><a href="protocols.html" class="nav-link">Protocols</a></li>
    <li><a href="contact.html" class="nav-link">Contact</a></li>
  </ul>

  <button class="hamburger-btn" aria-label="Toggle navigation menu" aria-expanded="false">
    <span></span>
    <span></span>
    <span></span>
  </button>
</nav>

<!-- Mobile menu panel -->
<div class="nav-panel">
  <button class="close-btn" aria-label="Close navigation menu">✕</button>
  <ul class="nav-links">
    <!-- Same links as desktop -->
  </ul>
</div>

<!-- Overlay behind menu -->
<div class="nav-overlay"></div>
```

### 1.4 Active Page Indicator
- [ ] Current page link has `.active` class with distinct styling (bold, color, background)
- [ ] Active indicator updates correctly on each page
- [ ] Active state is visible on both desktop and mobile
- [ ] No page should have multiple active indicators

**Implementation:**
```html
<!-- On about.html: -->
<li><a href="about.html" class="nav-link active">About</a></li>

<!-- CSS: -->
.nav-link.active {
  color: #0066cc;
  font-weight: 600;
  border-bottom: 3px solid #0066cc;
}
```

### 1.5 Logo/Brand Link
- [ ] Logo is clickable and navigates to index.html
- [ ] Logo appears on every page
- [ ] Logo maintains consistent size across all pages
- [ ] Hover state indicates it's clickable

### 1.6 CTA in Navigation (if applicable)
- [ ] Any CTA button in nav (e.g., "Get Started", "Contact Us") is consistently placed
- [ ] CTA styling differs from regular nav links (button vs. text link)
- [ ] CTA is visible and accessible on all screen sizes

---

## STEP 2: MOBILE NAVIGATION UX

### 2.1 Hamburger Button Accessibility
- [ ] Button has `aria-label="Toggle navigation menu"`
- [ ] Button has `aria-expanded="false"` that updates to `true` when menu opens
- [ ] Button has clear visual focus state (outline or highlight)
- [ ] Button is at least 44x44px (touch-friendly)

**Required Attributes:**
```html
<button class="hamburger-btn"
        aria-label="Toggle navigation menu"
        aria-expanded="false"
        aria-controls="nav-panel">
  <span class="hamburger-line"></span>
  <span class="hamburger-line"></span>
  <span class="hamburger-line"></span>
</button>
```

### 2.2 Menu Panel Behavior
- [ ] Panel slides in smoothly from side (300-500ms transition)
- [ ] Overlay appears simultaneously, preventing interaction with page beneath
- [ ] Panel width is appropriate for content (typically 75-85% on mobile)
- [ ] Closing animation is equally smooth as opening

### 2.3 Close Mechanisms
- [ ] X button in top-right of menu closes the menu
- [ ] Clicking overlay closes the menu
- [ ] Pressing Escape key closes the menu
- [ ] Clicking a nav link closes the menu (auto-close on navigation)

**JavaScript Requirements (js/main.js):**
```javascript
const hamburger = document.querySelector('.hamburger-btn');
const navPanel = document.querySelector('.nav-panel');
const navOverlay = document.querySelector('.nav-overlay');
const closeBtn = document.querySelector('.close-btn');
const navLinks = document.querySelectorAll('.nav-links a');

// Open menu
hamburger.addEventListener('click', () => {
  navPanel.classList.add('open');
  navOverlay.classList.add('open');
  hamburger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden'; // Prevent body scroll
});

// Close menu
function closeMenu() {
  navPanel.classList.remove('open');
  navOverlay.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = 'auto'; // Restore body scroll
}

closeBtn.addEventListener('click', closeMenu);
navOverlay.addEventListener('click', closeMenu);

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navPanel.classList.contains('open')) {
    closeMenu();
  }
});

// Close on link click
navLinks.forEach(link => {
  link.addEventListener('click', closeMenu);
});

// Close menu on window resize (if going back to desktop)
window.addEventListener('resize', () => {
  if (window.innerWidth >= 768) {
    closeMenu();
  }
});
```

### 2.4 Body Scroll Lock
- [ ] When menu is open, background page cannot scroll
- [ ] Scroll lock is implemented via `body { overflow: hidden }` (JavaScript)
- [ ] Scroll lock is removed when menu closes
- [ ] No visual jumping when scroll bar appears/disappears

**Better Approach (prevent layout shift):**
```javascript
function lockScroll() {
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  document.body.style.overflow = 'hidden';
  document.body.style.paddingRight = scrollbarWidth + 'px';
}

function unlockScroll() {
  document.body.style.overflow = 'auto';
  document.body.style.paddingRight = '0';
}
```

### 2.5 Focus Management
- [ ] Focus moves to menu panel when opened (focus trap)
- [ ] Focus cycles through menu links only while menu is open
- [ ] Focus returns to hamburger button when menu closes
- [ ] User cannot tab to hidden elements behind overlay

**Implementation:**
```javascript
// Move focus to first link when menu opens
hamburger.addEventListener('click', () => {
  // ... open menu code ...
  const firstLink = navPanel.querySelector('a');
  firstLink.focus();
});

// Return focus to hamburger when closing
function closeMenu() {
  // ... close menu code ...
  hamburger.focus();
}
```

### 2.6 Touch Targets
- [ ] All nav links are at least 48px tall on mobile
- [ ] Links have adequate padding (minimum 12px horizontal, 16px vertical)
- [ ] No links are too close together (minimum 8px gap)
- [ ] Hamburger button is 44x44px or larger

---

## STEP 3: PAGE FLOW & INFORMATION ARCHITECTURE

### 3.1 Homepage Primary Paths
The index.html should present 5-7 main paths to guide users:
1. **Learn About** → about.html
2. **Explore Science** → science.html
3. **View Protocols** → protocols.html
4. **Understand Market Potential** → market.html
5. **Get in Touch** → contact.html

**Audit:**
- [ ] Homepage has clear section headers that correspond to each page
- [ ] Each section has a CTA button linking to relevant page
- [ ] CTAs use action-oriented language ("Learn More", "Explore", "Get Started")
- [ ] Visual hierarchy guides user toward primary actions

### 3.2 Logical Page Order
Recommended user journey:
1. **Home (index.html)** — Overview, value proposition
2. **About (about.html)** — Who we are, mission, team
3. **Science (science.html)** — Research, mechanisms, validation
4. **Protocols (protocols.html)** — Implementation, actionable steps
5. **Market (market.html)** — Business opportunity, growth potential
6. **Contact (contact.html)** — Inquiry, partnership, support

**Audit:**
- [ ] Navigation order in the menu follows this logical flow
- [ ] Homepage CTAs guide users through this journey
- [ ] Each page includes contextual "Next Step" links

### 3.3 Cross-Linking Strategy
- [ ] Science page links back to About (context of team)
- [ ] Science page links to Protocols (implementation)
- [ ] Protocols page links to Science (deeper learning)
- [ ] Market page links to Contact (inquiry for partnerships)
- [ ] Contact page may reference relevant pages (Science, Protocols)
- [ ] No page is a "dead end" — always a path forward

**Example:**
```html
<!-- At end of science.html -->
<div class="cta-section">
  <h3>Ready to Implement?</h3>
  <a href="protocols.html" class="btn btn-primary">View Protocols</a>
  <a href="contact.html" class="btn btn-secondary">Get Support</a>
</div>
```

### 3.4 Footer Navigation
- [ ] Footer is identical across all pages
- [ ] Footer includes: copyright, links to key pages, contact info
- [ ] Footer includes: social links (if applicable), privacy/terms links
- [ ] Footer has adequate contrast for readability (WCAG AA minimum)

**Expected Footer Structure:**
```html
<footer>
  <div class="footer-content">
    <div class="footer-section">
      <h4>Quick Links</h4>
      <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="science.html">Science</a></li>
      </ul>
    </div>
    <div class="footer-section">
      <h4>Contact</h4>
      <p><a href="mailto:info@engineeredadherence.com">info@engineeredadherence.com</a></p>
    </div>
    <div class="footer-section">
      <p>&copy; 2026 Engineered Adherence. All rights reserved.</p>
    </div>
  </div>
</footer>
```

### 3.5 Breadcrumbs
- [ ] **Not required** for a 6-page site (simple hierarchy)
- [ ] If added, should show: Home > Current Page (e.g., Home > About)
- [ ] Breadcrumbs should not clutter mobile layouts

---

## STEP 4: IN-PAGE NAVIGATION (Section Navigation)

### 4.1 Sticky Section Navigation
Some pages may have internal section tabs:
- **about.html** — `.about-nav` with tabs (Mission, Team, Vision, etc.)
- **science.html** — `.pillars-nav` with tabs (Pillar 1, 2, 3, etc.)
- **market.html** — `.market-nav` with tabs (Opportunity, Growth, Competitive Advantage, etc.)

**Audit:**
- [ ] Section nav is sticky/fixed when scrolling (position: sticky or position: fixed)
- [ ] Section nav appears below main page nav
- [ ] Active tab indicator updates as user scrolls
- [ ] Clicking a tab smoothly scrolls to that section

### 4.2 Smooth Scrolling
- [ ] Section links use `scroll-behavior: smooth` or JavaScript scroll
- [ ] No jarring jumps or page jitter
- [ ] Scroll accounts for fixed header height (offset)

**CSS:**
```css
html {
  scroll-behavior: smooth;
}

/* Adjust for fixed nav header (assume 60px height) */
section[id] {
  scroll-margin-top: 80px; /* header height + padding */
}
```

### 4.3 Active Section Indication
- [ ] Active tab has `.active` class
- [ ] Active styling is distinct (underline, background color, bold)
- [ ] Active indicator updates as user scrolls (use Intersection Observer API)

**JavaScript:**
```javascript
const sections = document.querySelectorAll('section[id]');
const navTabs = document.querySelectorAll('.section-nav a');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navTabs.forEach(tab => {
        tab.classList.remove('active');
        if (tab.getAttribute('href') === `#${id}`) {
          tab.classList.add('active');
        }
      });
    }
  });
}, { rootMargin: '0px 0px -50% 0px' });

sections.forEach(section => observer.observe(section));
```

### 4.4 Section Nav on Mobile
- [ ] Tab labels are readable (14px+)
- [ ] If tabs overflow, they scroll horizontally (not wrap to next line)
- [ ] Active indicator remains visible during horizontal scroll
- [ ] No horizontal scroll on main page content

**CSS for Horizontal Scroll:**
```css
.section-nav {
  overflow-x: auto;
  overflow-y: hidden;
  display: flex;
  gap: 20px;
  padding: 12px;
  border-bottom: 2px solid #e0e0e0;
}

.section-nav a {
  white-space: nowrap;
  padding: 8px 12px;
  text-decoration: none;
  color: #666;
  border-bottom: 3px solid transparent;
}

.section-nav a.active {
  color: #0066cc;
  border-bottom-color: #0066cc;
}
```

---

## STEP 5: SCROLL & INTERACTION UX

### 5.1 Scroll Animations
- [ ] Fade-in animations on page load are subtle (not distracting)
- [ ] Animations use GPU acceleration (transform, opacity only)
- [ ] Animations respect `prefers-reduced-motion` setting

**Accessible Animation:**
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 5.2 Scroll-to-Top Button (if exists)
- [ ] Button appears only after user scrolls down (e.g., 300px)
- [ ] Button is fixed bottom-right corner, accessible but not intrusive
- [ ] Button has hover/focus state
- [ ] Clicking smoothly scrolls to top (not instant jump)
- [ ] Button is hidden on mobile (optional, depends on page length)

**HTML:**
```html
<button id="scroll-to-top" aria-label="Scroll to top" style="display: none;">
  ↑ Top
</button>
```

**JavaScript:**
```javascript
const scrollBtn = document.getElementById('scroll-to-top');

window.addEventListener('scroll', () => {
  scrollBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
});

scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
```

### 5.3 Page Transitions
- [ ] No blank white screen between page loads
- [ ] Page content appears immediately (no loading spinner, unless applicable)
- [ ] Scroll position resets to top on new page (or preserved if returning)
- [ ] Fixed nav appears before page content loads

### 5.4 Loading State
- [ ] No visible layout shift when images/content load
- [ ] Images have defined dimensions (width and height attributes)
- [ ] Skeleton loaders (if any) match final content height
- [ ] Font loading does not cause text reflow (use `font-display: swap`)

**CSS for Images:**
```html
<!-- Always include alt text and dimensions -->
<img src="image.jpg" alt="Description" width="800" height="600">
```

### 5.5 Theme Toggle UX (if applicable)
- [ ] Dark/light mode toggle is visible in nav or header
- [ ] Toggle has proper aria-label and aria-pressed attributes
- [ ] Theme preference persists across page reloads (localStorage)
- [ ] Transition between themes is smooth (100-200ms)
- [ ] Respects system `prefers-color-scheme` on first visit

**Implementation:**
```javascript
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Load saved preference
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  themeToggle.setAttribute('aria-pressed', newTheme === 'dark');
});
```

---

## STEP 6: RESPONSIVE UX

### 6.1 Desktop (1280px and above)
- [ ] Full horizontal navigation bar visible
- [ ] Content uses multi-column layouts (2-3 columns)
- [ ] Sidebar navigation (if any) is visible
- [ ] Font sizes: body 16px, headings 32-48px
- [ ] Line length: 60-80 characters for readability

### 6.2 Tablet (768px-1024px)
- [ ] Navigation may switch to hamburger menu or remain visible (designer decision)
- [ ] Layouts shift to 2 columns or flexible grid
- [ ] Touch targets increase to 44-48px minimum
- [ ] Font sizes remain readable (14px minimum body text)

### 6.3 Mobile (320px-768px)
- [ ] Hamburger menu is primary navigation
- [ ] Single-column layouts (vertical stacking)
- [ ] Full-width content with padding (16-20px sides)
- [ ] Touch targets are 48px minimum
- [ ] Font sizes: body 14-16px, headings 18-24px
- [ ] Images scale to 100% width (max-width: 100%)

### 6.4 Content Reflow Testing
**Audit Checklist:**
- [ ] Text is readable without horizontal scrolling at 320px
- [ ] No content is cut off at edges
- [ ] Images scale proportionally (aspect ratio preserved)
- [ ] Tables scroll horizontally if needed (overflow-x: auto on wrapper)
- [ ] Forms are single-column on mobile
- [ ] Buttons and links don't stack awkwardly

**Testing Tools:**
- Chrome DevTools (F12) → Device Toolbar
- Responsive Design Test (responsivedesignchecker.com)
- Real device testing (iOS Safari, Chrome on Android)

---

## STEP 7: ERROR & EDGE CASE UX

### 7.1 404 Page
- [ ] 404.html or 404 error handling exists
- [ ] Error page explains the issue ("Page not found")
- [ ] 404 page includes navigation back to homepage
- [ ] 404 page includes sitemap or link to main sections
- [ ] Error page uses same header/footer as other pages (consistency)

**Recommended 404 Structure:**
```html
<section class="error-section">
  <h1>404 - Page Not Found</h1>
  <p>Sorry, the page you're looking for doesn't exist.</p>
  <nav class="error-nav">
    <a href="index.html" class="btn btn-primary">Back to Home</a>
    <a href="about.html" class="btn">About</a>
    <a href="science.html" class="btn">Science</a>
    <a href="contact.html" class="btn">Contact Us</a>
  </nav>
</section>
```

### 7.2 Pillars.html Redirect
- [ ] pillars.html redirects to science.html instantly (meta refresh or JS)
- [ ] Browser shows science.html URL (301 redirect, not just internal jump)
- [ ] No loading screen or flicker during redirect
- [ ] Direct links to science.html work identically

**Recommended Implementation (server-side):**
```html
<!-- In pillars.html (if server doesn't handle 301 redirect): -->
<meta http-equiv="refresh" content="0; url=science.html">
<script>
  window.location.href = 'science.html';
</script>
```

**Better (server configuration for 301 redirect):**
Add to `.htaccess` (Apache):
```apache
Redirect 301 /pillars.html /science.html
```

Or `nginx.conf`:
```nginx
location /pillars.html {
  return 301 /science.html;
}
```

### 7.3 JavaScript Disabled
- [ ] Mobile hamburger menu gracefully degrades (show nav with CSS display)
- [ ] Theme toggle is not essential (page is readable in light mode)
- [ ] Scroll animations don't prevent page use
- [ ] All links work without JavaScript
- [ ] No critical functionality relies solely on JS

**Fallback HTML:**
```html
<!-- Add class if JS is disabled -->
<html class="no-js">
<script>
  document.documentElement.classList.remove('no-js');
</script>

<!-- CSS fallback for nav -->
.no-js .nav-panel {
  display: block;
  position: static;
  width: 100%;
}

.no-js .hamburger-btn {
  display: none;
}
```

### 7.4 Slow Connection UX
- [ ] Images are optimized (compressed, appropriate format)
- [ ] Critical CSS is inlined in <head>
- [ ] Non-critical CSS is deferred
- [ ] JavaScript files are not render-blocking
- [ ] Page shows skeleton or placeholder content while loading

**Optimization:**
```html
<!-- Critical CSS inline -->
<style>
  /* Essential styles for nav, layout, text */
</style>

<!-- Deferred CSS -->
<link rel="stylesheet" href="animations.css" media="print" onload="this.media='all'">

<!-- Defer non-critical JS -->
<script src="analytics.js" defer></script>
<script src="scroll-animations.js" defer></script>
```

---

## STEP 8: CTA & CONVERSION FLOW

### 8.1 Primary CTA on Each Page
**Recommended Strategy:**

| Page | Primary CTA | Secondary CTA |
|------|------------|--------------|
| **index.html** | "View Protocols" or "Learn More" | "Contact Us" |
| **about.html** | "Explore Our Science" | "Get in Touch" |
| **science.html** | "Implement Protocols" | "Ask Questions" |
| **market.html** | "Schedule Demo" or "Contact Sales" | "Download Report" |
| **protocols.html** | "Start Implementation" or "Request Guide" | "Get Support" |
| **contact.html** | "Send Message" or "Schedule Call" | (N/A) |

**Audit:**
- [ ] Each page has 1-2 clear CTAs
- [ ] CTAs use action words: "Learn", "Explore", "Implement", "Contact", "Download"
- [ ] Primary CTA is visually distinct (different color, button style)
- [ ] CTA placement is consistent (above fold, bottom of page sections)

### 8.2 Contact Form Findability
- [ ] Contact form is accessible from every page (nav link to contact.html)
- [ ] Contact form is also embedded in footer or as modal (optional)
- [ ] Form fields are clearly labeled (name, email, message, inquiry type)
- [ ] Form validation provides clear error messages
- [ ] Submit button is large and visible (44px+ height)
- [ ] Confirmation message appears after submission

**Contact Form HTML:**
```html
<form id="contact-form" method="POST" action="submit.php">
  <div class="form-group">
    <label for="name">Full Name *</label>
    <input type="text" id="name" name="name" required>
  </div>

  <div class="form-group">
    <label for="email">Email *</label>
    <input type="email" id="email" name="email" required>
  </div>

  <div class="form-group">
    <label for="inquiry">Type of Inquiry *</label>
    <select id="inquiry" name="inquiry" required>
      <option value="">Select...</option>
      <option value="partnership">Partnership</option>
      <option value="support">Technical Support</option>
      <option value="other">Other</option>
    </select>
  </div>

  <div class="form-group">
    <label for="message">Message *</label>
    <textarea id="message" name="message" rows="5" required></textarea>
  </div>

  <button type="submit" class="btn btn-primary">Send Message</button>
</form>
```

### 8.3 CTA Consistency
- [ ] All buttons use same base styling (same color palette, padding, font)
- [ ] Primary CTA buttons are one color (e.g., blue)
- [ ] Secondary CTA buttons are another color (e.g., gray or outlined)
- [ ] Hover states are consistent across all buttons
- [ ] Button text is clear and action-oriented (not "Click Here")

**CSS for Consistent CTAs:**
```css
.btn {
  display: inline-block;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: #0066cc;
  color: white;
}

.btn-primary:hover {
  background-color: #0052a3;
}

.btn-secondary {
  background-color: transparent;
  color: #0066cc;
  border: 2px solid #0066cc;
}

.btn-secondary:hover {
  background-color: #f0f7ff;
}
```

---

## TESTING PROCEDURES

### Automated Testing
```bash
# Check all links
npm install broken-link-checker -g
blc http://localhost:8000 -r

# Check accessibility
npm install axe-cli -g
axe http://localhost:8000/index.html --headless
```

### Manual Testing Checklist
- [ ] Test nav on mobile, tablet, desktop (Chrome, Firefox, Safari)
- [ ] Test mobile menu open/close on various devices
- [ ] Test keyboard navigation (Tab, Enter, Escape)
- [ ] Test all external links (ensure they open in correct tab)
- [ ] Test 404 handling (enter invalid URL)
- [ ] Test with JavaScript disabled (DevTools → Disable JavaScript)
- [ ] Test with slow connection (DevTools → Throttle to 3G)
- [ ] Test theme toggle (if applicable) persistence
- [ ] Screen reader testing (NVDA on Windows, VoiceOver on Mac)

### Performance Testing
```bash
# Use Google Lighthouse
# DevTools → Lighthouse → Generate Report
# Target scores: Performance >85, Accessibility >90, Best Practices >90
```

---

## ACCESSIBILITY REQUIREMENTS

- [ ] All interactive elements are keyboard accessible (Tab focus)
- [ ] All buttons and links have clear focus indicators (outline or highlight)
- [ ] Images have descriptive alt text
- [ ] Form labels are properly associated with inputs (for/id attributes)
- [ ] Color is not the only indicator (use text labels, icons, patterns)
- [ ] Contrast ratio is WCAG AA compliant (4.5:1 for text, 3:1 for large text)
- [ ] Page structure uses semantic HTML (nav, section, aside, footer)
- [ ] Heading hierarchy is logical (h1 → h2 → h3, no skipping levels)
- [ ] Mobile menu has proper ARIA attributes (aria-label, aria-expanded, aria-controls)
- [ ] Page language is declared (`<html lang="en">`)

---

## SUMMARY

A well-designed navigation UX ensures users can:
1. **Understand their location** (current page indicator)
2. **Find what they need** (logical IA, cross-linking)
3. **Navigate easily** (desktop nav + mobile menu)
4. **Complete goals** (CTAs, contact form accessibility)
5. **Adjust preferences** (theme, accessibility settings)

This audit provides a blueprint for evaluating and improving "Engineered Adherence" navigation, ensuring a seamless experience across all devices.
