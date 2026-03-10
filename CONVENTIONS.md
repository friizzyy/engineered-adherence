# Engineered Adherence - Development Conventions

A static, zero-framework bio-longevity website. No build system, no package manager, no runtime dependencies beyond vanilla HTML5, CSS3, and JavaScript ES6+.

---

## 1. PROJECT STRUCTURE

```
engineered-adherence/
├── index.html              # Homepage
├── about.html              # About section
├── science.html            # Scientific basis
├── market.html             # Market analysis
├── protocols.html          # Protocols & resources
├── contact.html            # Contact form
├── css/
│   ├── style.css           # Global styles, theme variables, desktop-first
│   └── mobile.css          # Mobile overrides, responsive adjustments
├── js/
│   ├── main.js             # Global IIFE, shared functionality
│   └── mobile.js           # Mobile-specific interactions
├── assets/
│   ├── images/             # Optimized PNG/WebP/SVG
│   ├── fonts/              # Fallback fonts if needed (Google Fonts primary)
│   └── icons/              # SVG icons, logo variants
├── CONVENTIONS.md          # This file
└── README.md               # Project overview
```

---

## 2. NAMING CONVENTIONS

### HTML Files
- **Format**: lowercase kebab-case
- **Examples**: `index.html`, `about.html`, `science.html`, `contact.html`
- One semantic page per file

### CSS Classes & IDs
- **Format**: lowercase kebab-case
- **Examples**:
  - `.header-nav`, `.hero-section`, `.call-to-action`
  - `.article-card`, `.protocol-list`, `.research-paper`
  - `.hidden`, `.active`, `.focused`
- **BEM inspired** (Block-Element-Modifier): `.card__header`, `.card__header--featured`

### JavaScript Functions & Variables
- **Format**: camelCase
- **Examples**:
  - `initializeTheme()`, `toggleMobileMenu()`, `fetchProtocolData()`
  - `isDesktopView`, `currentTheme`, `menuIsOpen`
- **Constants**: UPPER_SNAKE_CASE
  - `const MOBILE_BREAKPOINT = 768;`
  - `const THEME_STORAGE_KEY = 'engineered-adherence-theme';`

### CSS Custom Properties
- **Format**: `--[category]-[descriptor]` (lowercase with hyphens)
- **Color tokens**: `--bg`, `--text`, `--text-secondary`, `--border`, `--accent`, `--accent-dark`
- **Spacing tokens**: `--space-xs`, `--space-sm`, `--space-md`, `--space-lg`, `--space-xl`
- **Shadow tokens**: `--shadow-sm`, `--shadow-md`, `--shadow-lg`
- **Border tokens**: `--border-radius`, `--border-line`
- **Typography tokens**: `--font-heading`, `--font-body`, `--font-size-base`, `--font-size-lg`

---

## 3. HTML RULES

### Document Structure
All HTML files must follow this head pattern:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Concise, SEO-optimized description (150-160 chars)">
  <meta name="theme-color" content="#161616">

  <!-- Open Graph -->
  <meta property="og:title" content="Page Title">
  <meta property="og:description" content="Description">
  <meta property="og:image" content="https://domain.com/assets/images/og-image.jpg">
  <meta property="og:type" content="website">

  <!-- Theme Script (inline, execute before CSS) -->
  <script>
    const savedTheme = localStorage.getItem('engineered-adherence-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
  </script>

  <!-- CSS -->
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="css/mobile.css" media="(max-width: 768px)">

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet">

  <title>Page Title | Engineered Adherence</title>
</head>
<body>
```

### Semantic HTML
- Use `<header>`, `<main>`, `<section>`, `<article>`, `<footer>` for structure
- Use `<nav>`, `<h1>–<h6>` properly (one `<h1>` per page)
- Use `<button>` for interactive elements, not `<div>`
- Always include `lang="en"` on `<html>`
- Never use deprecated tags (`<font>`, `<center>`, `<b>`, `<i>` — use `<strong>`, `<em>`, `<span>`)

### Attributes
- Use double quotes: `class="container"` not `class='container'`
- `data-*` attributes for JavaScript hooks: `data-theme-toggle`, `data-modal-id`
- Void elements self-close: `<img />`, `<br />`, `<hr />`

---

## 4. CSS RULES

### Custom Property Pattern
Define all theme variables in `:root` and `[data-theme="light"]`:

```css
:root {
  /* Dark theme (Volcanic #161616) */
  --bg: #161616;
  --text: #f5f5f5;
  --text-secondary: #a0a0a0;
  --border: #2a2a2a;
  --accent: #e8a844;
  --accent-dark: #c48624;

  /* Spacing */
  --space-xs: 0.5rem;
  --space-sm: 1rem;
  --space-md: 1.5rem;
  --space-lg: 2rem;
  --space-xl: 3rem;

  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.12);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.15);
  --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.2);

  /* Typography */
  --font-heading: 'Playfair Display', serif;
  --font-body: 'DM Sans', sans-serif;
  --font-size-base: 1rem;
  --font-size-lg: 1.25rem;

  /* Borders */
  --border-radius: 8px;
  --border-line: 1px solid var(--border);
}

[data-theme="light"] {
  /* Light theme (Platinum) */
  --bg: #f9f9f9;
  --text: #1a1a1a;
  --text-secondary: #666666;
  --border: #e0e0e0;
  --accent: #d4a574;
  --accent-dark: #b8885a;
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.08);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.12);
}
```

### Class Naming
```css
/* Block */
.card {
  background: var(--bg);
  padding: var(--space-md);
}

/* Block-Element */
.card__header {
  font-size: var(--font-size-lg);
  margin-bottom: var(--space-sm);
}

/* Block-Modifier */
.card--featured {
  border: var(--border-line);
  box-shadow: var(--shadow-md);
}

/* State classes */
.is-active { /* JS toggles this */ }
.is-hidden { display: none; }
.is-loading { opacity: 0.6; }
```

### Property Ordering
Group properties logically within each ruleset:
1. Display & layout (display, position, flex, grid)
2. Box model (width, height, margin, padding)
3. Typography (font, line-height, text-align)
4. Visual (color, background, border, shadow)
5. Interactions (cursor, transition, transform)

```css
.button {
  /* Layout */
  display: inline-block;

  /* Box model */
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--border-radius);

  /* Typography */
  font-family: var(--font-body);
  font-size: var(--font-size-base);
  text-align: center;

  /* Visual */
  background: var(--accent);
  color: var(--bg);
  border: none;

  /* Interaction */
  cursor: pointer;
  transition: background 0.3s ease;
}

.button:hover {
  background: var(--accent-dark);
}
```

### Forbidden Patterns
- **NO inline styles**: Never write `style="color: red;"`
- **NO hardcoded colors**: Always use CSS custom properties
- **NO `!important`** except as last resort with comment explaining why
- **NO vendor prefixes** (modern CSS handles this)

---

## 5. JAVASCRIPT RULES

### IIFE Pattern for Scope Isolation
All JavaScript in Immediately Invoked Function Expressions:

```javascript
// js/main.js
(function() {
  'use strict';

  // Private variables (scoped)
  const MOBILE_BREAKPOINT = 768;
  let currentTheme = localStorage.getItem('engineered-adherence-theme') || 'dark';

  // Private functions
  function getCachedElement(selector) {
    return document.querySelector(selector);
  }

  function initializeTheme() {
    const themeToggle = getCachedElement('[data-theme-toggle]');
    if (!themeToggle) return;

    themeToggle.addEventListener('click', () => {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', currentTheme);
      localStorage.setItem('engineered-adherence-theme', currentTheme);
    });
  }

  // Public initialization
  function init() {
    initializeTheme();
  }

  // Start on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
```

### Rules
- **Always use `'use strict';`** at IIFE start
- **No global variables** — everything is scoped in IIFE
- **No `var` keyword** — use `const` (default) or `let` (if reassignment needed)
- **Event delegation** for dynamic content:
  ```javascript
  document.addEventListener('click', (e) => {
    if (e.target.matches('[data-action="submit"]')) {
      handleSubmit(e);
    }
  });
  ```
- **Cache DOM queries**:
  ```javascript
  const header = getCachedElement('header');
  const nav = getCachedElement('nav');
  // Reuse header and nav instead of re-querying
  ```
- **Clean up listeners** when element removed:
  ```javascript
  function removeModal() {
    const modal = getCachedElement('[data-modal]');
    modal.removeEventListener('click', handleClick);
    modal.remove();
  }
  ```

### Forbidden Patterns
- **No `document.write()`** — breaks async scripts
- **No `innerHTML` without sanitization** — XSS risk; use `textContent` or sanitize
- **No jQuery** or external JS libraries
- **No `eval()`**
- **No setTimeout delays over 1000ms** without clear reason

---

## 6. STYLING RULES

### Design Tokens
All visual decisions derive from CSS custom properties defined in `:root`:

| Token Category | Examples |
|---|---|
| Colors | `--bg`, `--text`, `--accent`, `--border` |
| Spacing | `--space-xs` (0.5rem) to `--space-xl` (3rem) |
| Typography | `--font-heading`, `--font-size-base`, `--font-size-lg` |
| Shadows | `--shadow-sm`, `--shadow-md`, `--shadow-lg` |
| Borders | `--border-radius`, `--border-line` |

### Responsive Breakpoints
Mobile-first approach:
- **Mobile**: default styles (0px–767px)
- **Tablet**: `@media (min-width: 768px)`
- **Desktop**: `@media (min-width: 1024px)`
- **Large**: `@media (min-width: 1440px)`

```css
.container {
  /* Mobile */
  width: 100%;
  padding: 0 var(--space-sm);
}

@media (min-width: 768px) {
  .container {
    max-width: 960px;
    margin: 0 auto;
  }
}

@media (min-width: 1024px) {
  .container {
    max-width: 1200px;
  }
}
```

### Transitions
Consistent, accessible motion:
```css
.interactive-element {
  transition: all 0.3s ease;
  /* OR more specific: transition: background 0.3s ease, color 0.3s ease; */
}

/* Reduce motion for accessibility */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 7. THEME SYSTEM

### How Dark/Light Mode Works

1. **Theme Script** (inline in `<head>`):
   ```javascript
   <script>
     const savedTheme = localStorage.getItem('engineered-adherence-theme') || 'dark';
     document.documentElement.setAttribute('data-theme', savedTheme);
   </script>
   ```

2. **CSS Variables** (in style.css):
   ```css
   :root { /* Dark theme */ }
   [data-theme="light"] { /* Light theme */ }
   ```

3. **Toggle Function** (in main.js):
   ```javascript
   function toggleTheme() {
     const current = document.documentElement.getAttribute('data-theme');
     const next = current === 'dark' ? 'light' : 'dark';
     document.documentElement.setAttribute('data-theme', next);
     localStorage.setItem('engineered-adherence-theme', next);
   }
   ```

### Required CSS Custom Properties (Both Themes)
- `--bg` (background color)
- `--text` (primary text)
- `--text-secondary` (muted text)
- `--border` (borders, dividers)
- `--accent` (primary accent)
- `--accent-dark` (hover/active accent)
- `--shadow-sm`, `--shadow-md`, `--shadow-lg`

---

## 8. FORBIDDEN PATTERNS

Strictly prohibited across the codebase:

| Pattern | Why | Alternative |
|---|---|---|
| `style="color: red;"` | Inline styles break theming, hard to maintain | CSS classes + custom properties |
| `#hexColor` in CSS | Hardcoded colors prevent theme switching | CSS custom properties `var(--text)` |
| `var` keyword | Function-scoped (confusing), hoisting issues | `const` or `let` |
| Global variables | Namespace pollution, hard to debug | IIFE scope or module |
| `document.write()` | Blocks parsing, breaks async | DOM manipulation with `addEventListener` |
| `innerHTML` without sanitization | XSS vulnerability | `textContent` or sanitize user input |
| jQuery | Extra dependency, unnecessary | Vanilla DOM API |
| `eval()` | Security risk, performance penalty | Function calls, string parsing |
| `<blink>`, `<marquee>` | Deprecated, accessibility nightmare | CSS animations with `prefers-reduced-motion` |

---

## 9. IMPORT/LOAD ORDER

### `<head>` Tag Order
1. Meta tags (charset, viewport, description)
2. Theme script (inline, execute immediately)
3. Stylesheets (`<link rel="stylesheet">`)
4. Google Fonts preconnect & font link
5. `<title>`

### `<body>` Tag Order
1. HTML content
2. Global `<script>` tags at end of body (main.js, mobile.js)
3. Page-specific `<script>` tags (inline styles or small scripts)

### Why?
- Theme script must execute before CSS renders (prevents flash)
- CSS before JS ensures styles apply before interactions
- JS at end of body prevents blocking page load

---

## 10. FILE CONVENTIONS

### HTML Files
- **One semantic page per file** (index.html, about.html, etc.)
- **Shared header/nav/footer** via semantic markup (not iframes)
- **Page-specific styles** in `<style>` tags if minimal, else in style.css classes
- **Consistent structure**: `<header>` → `<main>` → `<footer>`

### CSS Files
- **style.css**: Global styles, custom properties, desktop-first, shared across pages
- **mobile.css**: Mobile overrides, nested media queries, loaded conditionally
- **No page-specific CSS files** (use classes in style.css or inline `<style>` in HTML)

### JavaScript Files
- **main.js**: Global IIFE, shared functionality (theme, navigation, utilities)
- **mobile.js**: Mobile-specific interactions (hamburger menu, touch events)
- **No page-specific JS files** (use data attributes and event delegation)

---

## 11. SEO & META CONVENTIONS

### Required Meta Tags (Every Page)
```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="Unique, 150–160 character description">
<meta name="theme-color" content="#161616">

<meta property="og:title" content="Page Title">
<meta property="og:description" content="Same or similar to meta description">
<meta property="og:image" content="https://domain.com/assets/images/og-image-[page].jpg">
<meta property="og:type" content="website">

<title>Page Title | Engineered Adherence</title>
```

### Title Format
- Pattern: `[Page Name] | Engineered Adherence`
- Examples: `About | Engineered Adherence`, `Science | Engineered Adherence`
- Keep total under 60 characters

### Heading Hierarchy
- One `<h1>` per page (page topic)
- `<h2>` for major sections
- `<h3>` for subsections
- Never skip levels (`<h1>` → `<h3>` is bad)

---

## 12. PERFORMANCE CONVENTIONS

### Images
- Use modern formats: WebP (primary), PNG (fallback)
- Optimize size: compress with TinyPNG or ImageOptim
- Responsive images: `srcset` for multiple resolutions
  ```html
  <img
    src="assets/images/hero.png"
    srcset="assets/images/hero-large.webp 1440w, assets/images/hero.webp 1024w, assets/images/hero.png 640w"
    alt="Descriptive text"
  />
  ```
- Use SVG for icons (scalable, small file size)

### CSS & JS Minification
- **Development**: unminified for readability
- **Production**: minify style.css, mobile.css, main.js, mobile.js
- Tool: cssnano, terser, or online minifiers

### Font Loading
```css
@font-face {
  font-family: 'Playfair Display';
  src: url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700');
  font-display: swap; /* Show fallback while loading */
}
```

### Lazy Loading
Non-critical images:
```html
<img src="..." alt="..." loading="lazy" />
```

---

## 13. ACCESSIBILITY CONVENTIONS

### Semantic HTML First
- Use `<button>` for buttons, `<a>` for links (not `<div>` with click handlers)
- Use `<nav>`, `<main>`, `<footer>`, `<header>` for page structure
- Use form elements (`<label>`, `<input>`, `<textarea>`) properly

### Focus Indicators
All interactive elements must have visible focus:
```css
button:focus-visible,
a:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
```

### Color Contrast
- Text on background: minimum 4.5:1 contrast ratio
- Large text (18pt+): minimum 3:1 ratio
- Test with WebAIM Contrast Checker

### Keyboard Navigation
- Tab order follows visual flow
- Modals trap focus with `<dialog>` or manual management
- Never use `pointer-events: none` on interactive elements

### ARIA (Use Sparingly)
- Only when semantic HTML is insufficient
- Examples:
  ```html
  <button aria-expanded="false" aria-controls="menu">Toggle Menu</button>
  <nav id="menu" aria-label="Main navigation">...</nav>
  ```

### Alt Text
- All images: descriptive alt text
- Decorative images: `alt=""` (empty string)
- Icons: `<svg aria-label="...">` or `<span aria-label="...">icon</span>`

---

## 14. GIT CONVENTIONS

### Branch Naming
- Feature: `feature/theme-toggle`, `feature/contact-form`
- Bug fix: `fix/mobile-nav-overlap`, `fix/contrast-issue`
- Refactor: `refactor/css-tokens`, `refactor/js-modules`
- Hotfix: `hotfix/security-patch`

### Commit Messages
Format: `[type] Brief description (50 chars max)`

Types:
- `[feat]` – New feature
- `[fix]` – Bug fix
- `[refactor]` – Code restructure (no logic change)
- `[style]` – CSS-only, formatting
- `[perf]` – Performance improvement
- `[a11y]` – Accessibility improvement
- `[docs]` – Documentation

Examples:
```
[feat] Add dark/light theme toggle
[fix] Correct mobile menu z-index overlap
[style] Improve button padding consistency
[a11y] Add focus indicators to form inputs
[refactor] Extract theme logic to main.js
```

### Code Review
- Ensure all CSS custom properties used (no hardcoded colors)
- Check no inline styles added
- Verify IIFE pattern in all JS
- Confirm no global variables
- Test mobile responsiveness

---

## Summary

**Engineered Adherence** is a principled, maintainable static site:
- No frameworks, no build system, no bloat
- Semantic HTML, vanilla CSS with custom properties, vanilla JS with IIFEs
- Dark/light theming via `[data-theme]` attribute and localStorage
- Accessibility and performance baked in
- Strict conventions prevent common pitfalls

Follow these rules consistently, and the codebase will remain clean, performant, and team-friendly.
