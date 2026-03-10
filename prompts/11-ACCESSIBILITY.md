# ACCESSIBILITY AUDIT GUIDE (a11y)
## Engineered Adherence — Static HTML/CSS/JS Website

**Scope:** index.html, about.html, science.html, market.html, protocols.html, contact.html

**Target:** WCAG 2.1 Level AA compliance

**Tools:** Lighthouse, axe DevTools, WAVE, VoiceOver

---

## STEP 1: AUTOMATED SCANNING

### 1.1 Lighthouse Accessibility Audit

Run on each page:
1. Open Chrome DevTools (F12)
2. Navigate to **Lighthouse** tab
3. Select **Mobile** + **Accessibility** category
4. Run audit
5. Target score: **90+**

**Record findings in a table:**

| Page | Score | Key Issues |
|------|-------|-----------|
| index.html | | |
| about.html | | |
| science.html | | |
| market.html | | |
| protocols.html | | |
| contact.html | | |

Common Lighthouse failures to watch:
- Missing alt text on images
- Low contrast ratios
- Missing form labels
- Heading structure issues
- Missing landmark regions

### 1.2 axe DevTools Browser Extension

Install: [Chrome Web Store](https://chrome.google.com/webstore)

For each page:
1. Open page in Chrome
2. Click **axe DevTools** extension
3. Run **Full Page Scan**
4. Review **Violations** (critical), **Best Practices**, **Needs Review**
5. Export report (PDF or JSON)

**Priority violations to fix first:**
- Critical: ARIA, form labels, color contrast, landmarks
- Serious: heading hierarchy, image alt text
- Moderate: focus indicators, keyboard navigation

### 1.3 WAVE Browser Extension

Install: [Chrome Web Store](https://chrome.google.com/webstore)

For each page:
1. Click **WAVE** extension
2. Review **Errors** (red), **Contrast Errors** (yellow), **Alerts** (blue)
3. Note missing labels, empty buttons, redundant text alternatives

**Document findings:** Screenshot WAVE panel for each page

---

## STEP 2: SEMANTIC HTML AUDIT

### 2.1 Landmark Elements

Every page must have:
```html
<header>
  <!-- Logo, main nav -->
</header>

<nav>
  <!-- Primary navigation -->
</nav>

<main>
  <!-- Unique page content -->
</main>

<footer>
  <!-- Site footer -->
</footer>
```

**Check:** Use DevTools Inspector → Elements → Accessibility Tree
- Verify each landmark appears exactly once (except nav)
- Verify no nested `<main>` elements

### 2.2 Heading Hierarchy

**Rule:** One `<h1>` per page, then h2 → h3 → h4 (no skipping)

**Audit process:**
```javascript
// Paste in console to check heading structure
document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach((h, i) => {
  console.log(`${i}: ${h.tagName} - ${h.textContent.substring(0, 50)}`);
});
```

**Fix example:**
```html
<!-- ❌ WRONG: h1, then h3 (skipped h2) -->
<h1>Engineered Adherence</h1>
<h3>Our Mission</h3>

<!-- ✅ CORRECT -->
<h1>Engineered Adherence</h1>
<h2>Our Mission</h2>
<h3>Drug Development</h3>
```

### 2.3 Semantic Elements

Check all pages use semantic tags:

| Element | Purpose | Usage |
|---------|---------|-------|
| `<article>` | Self-contained content | Blog posts, featured studies |
| `<section>` | Thematic grouping | Sections with headings |
| `<aside>` | Related content | Sidebars, callouts |
| `<nav>` | Navigation links | Primary nav, section nav |
| `<header>` | Introductory content | Page header |
| `<footer>` | Footer content | Page footer |

**Fix div soup:**
```html
<!-- ❌ WRONG -->
<div class="header">
  <div class="nav">
    <div class="link"><a href="#">Home</a></div>
  </div>
</div>

<!-- ✅ CORRECT -->
<header>
  <nav>
    <a href="#">Home</a>
  </nav>
</header>
```

### 2.4 Navigation Lists

Navigation menus should use semantic lists:

```html
<!-- ✅ CORRECT: Science nav -->
<nav>
  <ul role="tablist" aria-label="Science sections">
    <li role="presentation">
      <button role="tab" aria-selected="true" aria-controls="fundamentals">
        Fundamentals
      </button>
    </li>
    <li role="presentation">
      <button role="tab" aria-selected="false" aria-controls="delivery">
        Delivery
      </button>
    </li>
  </ul>
</nav>

<div id="fundamentals" role="tabpanel" aria-labelledby="tab-fundamentals">
  <!-- Content -->
</div>
```

---

## STEP 3: KEYBOARD NAVIGATION

### 3.1 Tab Through Every Page

**Test procedure:**
1. Open page in browser
2. Press **Tab** repeatedly, noting order
3. All interactive elements should be reachable:
   - Links
   - Buttons
   - Form inputs
   - Tab selectors
   - Menu toggles

**Test on:**
- index.html (SVG vials, CTA button)
- protocols.html (tab navigation)
- science.html (section tabs)
- contact.html (form inputs)

### 3.2 Focus Indicators

**Requirement:** Visible focus ring when tabbing

**Check CSS:**
```css
/* ✅ CORRECT */
button:focus-visible,
a:focus-visible,
input:focus-visible {
  outline: 2px solid #0066ff;
  outline-offset: 2px;
}

/* ❌ WRONG: outline: none (removes focus) */
button:focus {
  outline: none;
}
```

**Visual check:**
- Focus ring must be **2px minimum**
- **3:1 contrast** against background
- **2px offset** from element edge

### 3.3 Logical Tab Order

Tab order should follow visual layout (left-to-right, top-to-bottom).

**Fix with HTML order, NOT `tabindex`:**
```html
<!-- ❌ WRONG: tabindex overrides natural order -->
<input tabindex="2" />
<input tabindex="1" />

<!-- ✅ CORRECT: Natural DOM order -->
<input />  <!-- Focused first -->
<input />  <!-- Focused second -->
```

**Exception:** Only use `tabindex="0"` to make elements focusable, `tabindex="-1"` to remove from tab order.

### 3.4 Skip-to-Content Link

Add to every page, just inside `<body>`:

```html
<body>
  <a href="#main" class="skip-link">Skip to main content</a>

  <header><!-- nav --></header>

  <main id="main">
    <!-- Page content -->
  </main>
</body>
```

**CSS to hide off-screen:**
```css
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #000;
  color: #fff;
  padding: 8px;
  text-decoration: none;
  z-index: 100;
}

.skip-link:focus {
  top: 0;  /* Visible on focus */
}
```

### 3.5 No Keyboard Traps

**Test:** Tab through page, verify you can always move forward and backward.

Common traps:
- Modal dialog that traps focus (requires Escape to close)
- Infinite tab loops in dropdowns
- JavaScript preventing Tab key

### 3.6 Mobile Menu Keyboard Accessibility

**If menu uses `role="dialog"` or `aria-modal="true"`:**

```html
<button aria-label="Toggle menu" aria-expanded="false" id="menu-btn">
  ☰
</button>

<nav role="dialog" aria-modal="true" aria-labelledby="menu-btn" id="mobile-menu">
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/about">About</a></li>
  </ul>
</nav>
```

**JavaScript behavior:**
```javascript
const menuBtn = document.getElementById('menu-btn');
const menu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', () => {
  const isOpen = menuBtn.getAttribute('aria-expanded') === 'true';
  menuBtn.setAttribute('aria-expanded', !isOpen);
  menu.hidden = isOpen;

  // Focus first menu link when opening
  if (!isOpen) {
    menu.querySelector('a').focus();
  }
});

// Close menu on Escape
menu.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    menuBtn.setAttribute('aria-expanded', 'false');
    menu.hidden = true;
    menuBtn.focus();
  }
});
```

### 3.7 Theme Toggle Keyboard Accessible

```html
<!-- ✅ CORRECT: Button element is keyboard accessible -->
<button
  id="theme-toggle"
  aria-label="Toggle dark mode"
  aria-pressed="false"
>
  🌙
</button>

<script>
const btn = document.getElementById('theme-toggle');
btn.addEventListener('click', () => {
  const isDark = document.documentElement.classList.toggle('dark');
  btn.setAttribute('aria-pressed', isDark);
});
</script>
```

### 3.8 Protocol Tabs Keyboard Navigation

Tabs should support arrow keys per WAI-ARIA Authoring Practices:

```html
<div role="tablist" aria-label="Protocols">
  <button
    role="tab"
    aria-selected="true"
    aria-controls="panel-1"
    id="tab-1"
  >
    Standard
  </button>
  <button
    role="tab"
    aria-selected="false"
    aria-controls="panel-2"
    id="tab-2"
  >
    Advanced
  </button>
</div>

<div role="tabpanel" id="panel-1" aria-labelledby="tab-1">
  <!-- Content -->
</div>
<div role="tabpanel" id="panel-2" aria-labelledby="tab-2" hidden>
  <!-- Content -->
</div>
```

**JavaScript:**
```javascript
const tablist = document.querySelector('[role="tablist"]');
const tabs = tablist.querySelectorAll('[role="tab"]');

tabs.forEach((tab, index) => {
  tab.addEventListener('keydown', (e) => {
    let newIndex;

    if (e.key === 'ArrowRight') {
      newIndex = (index + 1) % tabs.length;
    } else if (e.key === 'ArrowLeft') {
      newIndex = (index - 1 + tabs.length) % tabs.length;
    } else {
      return;
    }

    e.preventDefault();

    // Deselect current tab
    tabs[index].setAttribute('aria-selected', 'false');
    document.getElementById(tabs[index].getAttribute('aria-controls')).hidden = true;

    // Select new tab
    tabs[newIndex].setAttribute('aria-selected', 'true');
    document.getElementById(tabs[newIndex].getAttribute('aria-controls')).hidden = false;
    tabs[newIndex].focus();
  });
});
```

### 3.9 Section Navigation Tabs

Same implementation as 3.8 for science.html and market.html section tabs.

---

## STEP 4: COLOR & CONTRAST

### 4.1 WCAG AA Contrast Requirements

- **Normal text (< 18pt):** 4.5:1 minimum
- **Large text (18pt+):** 3:1 minimum
- **UI components & graphical objects:** 3:1 minimum

### 4.2 Test Both Themes

Check contrast in:
1. Light theme (default)
2. Dark theme (if implemented)

**Tools:**
- Chrome DevTools: Inspect element → Computed → Color picker
- WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/
- Polypane: Built-in contrast checker

### 4.3 Specific Color Concerns

**Check these variables if using CSS custom properties:**

```css
:root {
  --text: #1a1a1a;        /* ✅ 17:1 on white */
  --muted: #666666;       /* ⚠️ Check: 4.5:1? */
  --faint: #999999;       /* ⚠️ Check: 4.5:1? */
  --accent: #0066ff;      /* ✅ Often sufficient */
}
```

**Fix low-contrast colors:**
```css
/* ❌ WRONG: #999999 on white = 3.15:1 (fails AA) */
.label {
  color: #999999;
}

/* ✅ CORRECT: #666666 = 4.54:1 (passes AA) */
.label {
  color: #666666;
}
```

### 4.4 Color Alone Not Sufficient

Never convey information with color alone:

```html
<!-- ❌ WRONG: Only red indicates error -->
<input style="border: 2px solid red;">

<!-- ✅ CORRECT: Icon + color + text -->
<div class="error">
  ✗ Email address is required
</div>
```

### 4.5 Link Text Distinguishable

Links must be visually distinct from body text:

```css
/* ✅ CORRECT: Underline + color */
a {
  color: #0066ff;
  text-decoration: underline;
}

/* ❌ WRONG: Color alone */
a {
  color: #0066ff;
  text-decoration: none;
  /* May be indistinguishable from black text if contrast is marginal */
}
```

### 4.6 Focus Indicator Contrast

Focus rings must have 3:1 contrast with surrounding area:

```css
button:focus-visible {
  outline: 3px solid #0066ff;  /* Solid color ensures contrast */
  outline-offset: 2px;
}

/* On dark background, use light color */
[data-theme="dark"] button:focus-visible {
  outline-color: #66bbff;
}
```

---

## STEP 5: IMAGES & SVG ACCESSIBILITY

### 5.1 Meaningful Images — Alt Text Required

```html
<!-- ❌ WRONG: Missing alt -->
<img src="pill-mechanism.jpg">

<!-- ✅ CORRECT: Descriptive alt -->
<img
  src="pill-mechanism.jpg"
  alt="Diagram showing how the extended-release capsule breaks down in the stomach over 12 hours"
>
```

**Alt text best practices:**
- Describe content, not "image of..." or "picture of..."
- Be concise (< 125 characters)
- Include important text visible in image
- Don't repeat caption text

### 5.2 Decorative Images — Empty Alt

```html
<!-- Decorative background pattern -->
<img
  src="background-pattern.svg"
  alt=""
  aria-hidden="true"
>

<!-- OR with CSS background, no img needed -->
<div class="bg-pattern"></div>
```

### 5.3 SVG Vials on Homepage

SVG graphics need accessible markup:

```html
<!-- ✅ CORRECT: SVG with title + description -->
<svg viewBox="0 0 200 100" role="img" aria-labelledby="vial-title vial-desc">
  <title id="vial-title">Engineered Adherence Vial</title>
  <desc id="vial-desc">
    Three test vials showing the extended-release mechanism:
    Day 1 immediate release, Day 7 delayed release, Day 14 final release
  </desc>

  <!-- SVG path elements -->
  <circle cx="50" cy="50" r="30" fill="#0066ff"/>
  <!-- ... -->
</svg>
```

**Alternative with aria-label:**
```html
<svg
  viewBox="0 0 200 100"
  role="img"
  aria-label="Three-stage extended-release mechanism diagram"
>
  <!-- SVG content -->
</svg>
```

### 5.4 Complex SVGs

For animated or complex SVGs:

```html
<svg viewBox="0 0 400 300" role="img" aria-labelledby="hero-title hero-desc">
  <title id="hero-title">Adherence Technology Overview</title>
  <desc id="hero-desc">
    An animated diagram showing the journey of a drug molecule through
    the body over three phases, with color-coded sections representing
    different absorption rates and bioavailability targets.
  </desc>

  <!-- SVG content with animated elements -->
</svg>
```

### 5.5 Icon Buttons

Icon buttons must have labels:

```html
<!-- ❌ WRONG: Icon with no label -->
<button id="menu-toggle">☰</button>

<!-- ✅ CORRECT: Aria-label or hidden text -->
<button id="menu-toggle" aria-label="Open navigation menu">
  ☰
</button>

<!-- OR with sr-only class -->
<button id="menu-toggle">
  ☰
  <span class="sr-only">Open menu</span>
</button>
```

**Screen-reader-only text CSS:**
```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

---

## STEP 6: FORM ACCESSIBILITY (contact.html)

### 6.1 Input Labels

All form inputs must have associated labels:

```html
<!-- ❌ WRONG: Placeholder not a substitute for label -->
<input type="text" placeholder="Your name">

<!-- ✅ CORRECT: Explicit label with matching id -->
<label for="name">Name</label>
<input type="text" id="name" name="name" required>

<!-- OR implicit label -->
<label>
  Name
  <input type="text" name="name" required>
</label>
```

### 6.2 Required Fields

Mark required fields with ARIA and visual indicator:

```html
<label for="email">
  Email
  <span aria-label="required">*</span>
</label>
<input
  type="email"
  id="email"
  name="email"
  required
  aria-required="true"
>

<style>
  [aria-required="true"]::after {
    content: " *";
    color: #d32f2f;
  }
</style>
```

### 6.3 Error Messages

Link error messages to inputs:

```html
<label for="phone">Phone Number</label>
<input
  type="tel"
  id="phone"
  name="phone"
  aria-describedby="phone-error"
>
<span id="phone-error" role="alert" style="display: none; color: red;">
  Please enter a valid phone number
</span>

<script>
document.getElementById('phone').addEventListener('blur', (e) => {
  const valid = /^\d{10}$/.test(e.target.value);
  const errorSpan = document.getElementById('phone-error');
  errorSpan.style.display = valid ? 'none' : 'block';
  e.target.setAttribute('aria-invalid', !valid);
});
</script>
```

### 6.4 Form Validation Errors (Aria-Live)

Announce validation errors to screen readers:

```html
<form id="contact-form">
  <div role="alert" aria-live="polite" id="form-status"></div>

  <label for="email">Email *</label>
  <input type="email" id="email" name="email" required>

  <button type="submit">Send</button>
</form>

<script>
document.getElementById('contact-form').addEventListener('submit', (e) => {
  const email = document.getElementById('email');
  const status = document.getElementById('form-status');

  if (!email.value.includes('@')) {
    e.preventDefault();
    email.focus();
    status.textContent = 'Error: Please enter a valid email address.';
    email.setAttribute('aria-invalid', 'true');
  } else {
    status.textContent = 'Form submitted successfully.';
    email.setAttribute('aria-invalid', 'false');
  }
});
</script>
```

### 6.5 Submit Button

Button must be clearly labeled:

```html
<!-- ✅ CORRECT: Clear action text -->
<button type="submit">Send Message</button>

<!-- ❌ WRONG: Vague button text -->
<button type="submit">Submit</button>

<!-- ✅ ALSO OK: Icon + text -->
<button type="submit">
  Send
  <span aria-hidden="true">→</span>
</button>
```

### 6.6 Focus on Error

Move focus to first error on validation failure:

```javascript
const form = document.getElementById('contact-form');
const inputs = form.querySelectorAll('[required]');

form.addEventListener('submit', (e) => {
  let hasError = false;
  let firstErrorField = null;

  inputs.forEach(input => {
    if (!input.value) {
      input.setAttribute('aria-invalid', 'true');
      if (!firstErrorField) firstErrorField = input;
      hasError = true;
    } else {
      input.setAttribute('aria-invalid', 'false');
    }
  });

  if (hasError) {
    e.preventDefault();
    firstErrorField.focus();  // Move focus to first error
    document.getElementById('form-status').textContent =
      'Please fix the errors below before submitting.';
  }
});
```

---

## STEP 7: ARIA USAGE AUDIT

### 7.1 ARIA Only When Necessary

**Rule:** Prefer semantic HTML over ARIA.

```html
<!-- ❌ WRONG: ARIA on non-semantic div -->
<div role="button" aria-label="Close">✕</div>

<!-- ✅ CORRECT: Use native button -->
<button aria-label="Close">✕</button>

<!-- ❌ WRONG: role="navigation" on nav -->
<nav role="navigation">

<!-- ✅ CORRECT: nav is already a landmark -->
<nav>
```

### 7.2 Mobile Menu ARIA

```html
<button
  id="menu-trigger"
  aria-label="Toggle navigation menu"
  aria-expanded="false"
  aria-controls="mobile-nav"
>
  ☰
</button>

<nav
  id="mobile-nav"
  role="dialog"
  aria-modal="true"
  aria-labelledby="menu-trigger"
  hidden
>
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/about">About</a></li>
  </ul>
</nav>
```

### 7.3 Tab Interface ARIA

```html
<div role="tablist" aria-label="Content sections">
  <button
    role="tab"
    id="tab-fundamentals"
    aria-selected="true"
    aria-controls="panel-fundamentals"
  >
    Fundamentals
  </button>
  <button
    role="tab"
    id="tab-delivery"
    aria-selected="false"
    aria-controls="panel-delivery"
  >
    Delivery Mechanisms
  </button>
</div>

<div
  id="panel-fundamentals"
  role="tabpanel"
  aria-labelledby="tab-fundamentals"
>
  <!-- Content visible by default -->
</div>

<div
  id="panel-delivery"
  role="tabpanel"
  aria-labelledby="tab-delivery"
  hidden
>
  <!-- Content hidden -->
</div>
```

### 7.4 Theme Toggle ARIA

```html
<button
  id="theme-btn"
  aria-label="Toggle dark mode"
  aria-pressed="false"
  title="Press to toggle dark theme"
>
  🌙
</button>

<script>
const btn = document.getElementById('theme-btn');
const html = document.documentElement;

btn.addEventListener('click', () => {
  const isDark = html.classList.toggle('dark');
  btn.setAttribute('aria-pressed', isDark);
});
</script>
```

### 7.5 Loading States & Dynamic Content

Announce updates to screen readers:

```html
<!-- Live region for form submission status -->
<div id="form-status" aria-live="polite" aria-atomic="true"></div>

<button id="submit">Submit</button>

<script>
document.getElementById('submit').addEventListener('click', async () => {
  const status = document.getElementById('form-status');
  status.textContent = 'Sending...';

  try {
    const response = await fetch('/api/contact', { /* ... */ });
    status.textContent = 'Message sent successfully!';
  } catch (err) {
    status.textContent = 'Error: Could not send message. Please try again.';
  }
});
</script>
```

---

## STEP 8: MOTION & ANIMATION ACCESSIBILITY

### 8.1 prefers-reduced-motion Media Query

Add to your main CSS file:

```css
/* Respect user's motion preferences */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 8.2 CSS Animations Disabled

Check all animation properties:

```css
/* ❌ WRONG: Animation continues despite preference */
@keyframes slideIn {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}

.hero {
  animation: slideIn 1s ease-out;
}

/* ✅ CORRECT: Animation respects preference */
.hero {
  animation: slideIn 1s ease-out;
}

@media (prefers-reduced-motion: reduce) {
  .hero {
    animation: none;
  }
}
```

### 8.3 Scroll-Triggered Animations

Use `prefers-reduced-motion` with Intersection Observer:

```javascript
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !prefersReducedMotion) {
      entry.target.classList.add('animate-in');
    }
  });
});

document.querySelectorAll('.scroll-trigger').forEach(el => {
  observer.observe(el);
});
```

### 8.4 No Auto-Playing Media

Never auto-play audio or video:

```html
<!-- ❌ WRONG: Auto-plays -->
<audio autoplay>
  <source src="bg-music.mp3">
</audio>

<!-- ✅ CORRECT: User controls -->
<audio controls>
  <source src="bg-music.mp3">
</audio>

<video controls>
  <source src="demo.mp4">
  Your browser does not support the video tag.
</video>
```

### 8.5 No Flashing Content

Avoid content that flashes more than 3 times per second:

```css
/* ❌ WRONG: Flashes 5 times per second */
@keyframes flash {
  0%, 20% { opacity: 1; }
  10%, 30% { opacity: 0; }
}

.bad-pulse {
  animation: flash 0.2s infinite;  /* Too fast */
}

/* ✅ CORRECT: Slower pulse (1 Hz) */
@keyframes goodPulse {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0.7; }
}

.good-pulse {
  animation: goodPulse 1s ease-in-out infinite;
}
```

---

## STEP 9: SCREEN READER TESTING

### 9.1 VoiceOver (macOS/iOS)

**Enable on Mac:**
- System Preferences → Accessibility → VoiceOver → Enable
- OR press Cmd + F5

**Basic commands:**
- `VO + Right Arrow` = Next item
- `VO + Left Arrow` = Previous item
- `VO + U` = Rotor (jump to headings, landmarks, links)
- `VO + Space` = Activate button/link

### 9.2 Test All 6 Pages

For each page:
1. Enable VoiceOver
2. Navigate with arrow keys
3. Verify all content is announced
4. Check form inputs are labeled
5. Verify interactive elements are announced

### 9.3 Page Title Announcement

VoiceOver should announce page title first:

```html
<head>
  <!-- ✅ CORRECT: Unique, descriptive title -->
  <title>Science Behind Engineered Adherence | About</title>
</head>
```

Verify: VoiceOver announces "Science Behind Engineered Adherence, About"

### 9.4 Landmark Announcement

Landmarks should be announced and navigable:

**Using VoiceOver Rotor:**
1. Press VO + U
2. Select "Landmarks"
3. All main, nav, header, footer should appear

### 9.5 Heading Structure

Verify headings in Rotor:

1. Press VO + U
2. Select "Headings"
3. Verify one H1, then sequential H2/H3
4. Verify no H3 without H2, etc.

### 9.6 Form Labels

Test contact form with screen reader:

**Expected announcement:**
- "Name, required, text field"
- "Email, required, email field"
- "Message, text field"
- "Send button"

### 9.7 SVG Content

Homepage SVGs should announce:

- VoiceOver: "Engineered Adherence Vial, image, Graphic"
- Should read title and description

---

## STEP 10: RESPONSIVE ACCESSIBILITY

### 10.1 Zoom to 200%

Test content at 200% zoom:
1. Ctrl/Cmd + Plus to zoom 200%
2. Verify all content visible
3. Verify no horizontal overflow
4. Verify text readable
5. Verify interactive elements operable

**CSS to prevent zoom issues:**
```css
body {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

/* Ensure inputs don't cut off on zoom */
input, textarea, select {
  font-size: 16px;  /* Prevents iOS auto-zoom */
  padding: 8px;
}
```

### 10.2 Text Resize

Test resizing text to 200%:
1. Chrome DevTools → Settings → Rendering → Emulate CSS media feature
2. Force `text-size-adjust: 100%`
3. Or manually select text size via browser zoom

**CSS to support resize:**
```css
/* Use relative units */
body {
  font-size: 16px;  /* Base unit */
}

h1 {
  font-size: 2em;   /* Scales with body */
}

p {
  font-size: 1em;   /* Relative to body */
  line-height: 1.5; /* Improves readability */
}

/* Avoid fixed heights that cut off text */
.card {
  min-height: 200px;  /* ✅ Allows growth */
  height: 200px;      /* ❌ Restricts content */
}
```

### 10.3 Touch Targets

Minimum 48x48px on mobile (WCAG 2.1 AAA):

```css
/* ✅ CORRECT: 48px minimum */
button {
  padding: 12px 16px;
  min-height: 48px;
  min-width: 48px;
}

/* Ensure spacing between buttons */
button + button {
  margin-left: 8px;
}

/* Test: Inspect → Toggle device toolbar → check element size */
```

### 10.4 Pinch-to-Zoom

Never disable zoom:

```html
<!-- ❌ WRONG: Disables user zoom -->
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

<!-- ✅ CORRECT: Allows zoom -->
<meta name="viewport" content="width=device-width, initial-scale=1">
```

---

## COMMON ISSUES & FIXES SUMMARY

| Issue | WCAG Ref | Fix |
|-------|----------|-----|
| Missing alt text | 1.1.1 | Add meaningful alt, or alt="" for decorative |
| Low contrast | 1.4.3 | Use Contrast Checker, aim for 4.5:1 |
| No form labels | 1.3.1 | Use `<label for="">` with matching id |
| Missing heading H1 | 1.3.1 | Add exactly one H1 per page |
| No focus indicator | 2.4.7 | Add `:focus-visible` with visible outline |
| Keyboard trap | 2.1.2 | Ensure Tab/Escape/arrows work throughout |
| Auto-playing audio | 1.4.2 | Remove autoplay, add user controls |
| Color-only indicator | 1.4.1 | Add icon, text, or underline with color |
| Missing skip link | 2.4.1 | Add skip-to-main link at top |
| No ARIA labels | 1.3.1 | Add aria-label to icon buttons |
| Animated text truncation | 2.2.2 | Respect prefers-reduced-motion |
| 200% zoom breaks layout | 1.4.4 | Use max-width, avoid fixed sizes |

---

## TESTING CHECKLIST

- [ ] Lighthouse 90+ on all 6 pages
- [ ] axe DevTools: Zero critical violations
- [ ] WAVE: Zero contrast errors
- [ ] All forms have labels with `for=""` matching id
- [ ] All buttons have visible focus indicators
- [ ] Keyboard navigation works on all pages
- [ ] Tab order is logical (follows visual layout)
- [ ] Skip-to-content link on every page
- [ ] All images have alt text (or alt="" if decorative)
- [ ] SVG vials have title and description
- [ ] Heading hierarchy correct (h1 → h2 → h3)
- [ ] 4.5:1 contrast on normal text (both themes)
- [ ] prefers-reduced-motion honored
- [ ] No auto-playing media
- [ ] Mobile menu keyboard accessible (Escape to close)
- [ ] Tab interface uses arrow keys
- [ ] Contact form errors announced to screen readers
- [ ] VoiceOver reads all content correctly
- [ ] 200% zoom doesn't break layout
- [ ] Touch targets 48x48px on mobile
- [ ] Pinch-to-zoom not disabled

---

## REFERENCES

- [WCAG 2.1 Standards](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM](https://webaim.org/)
- [Accessible Name & Description Computation](https://www.w3.org/WAI/test-evaluate/naming-testing/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)

---

**Completed:** [ ] Initial scan | [ ] Semantic audit | [ ] Keyboard test | [ ] Contrast check | [ ] SVG audit | [ ] Forms test | [ ] ARIA review | [ ] Motion test | [ ] Screen reader test | [ ] Responsive test
