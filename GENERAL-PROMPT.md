# GENERAL-PROMPT.md
## Automatic Prompt Enhancement Engine for Engineered Adherence

**Project Context:** Static multi-page bio-longevity website. Plain HTML, vanilla CSS with CSS custom properties, vanilla JS. NO frameworks, NO React, NO TypeScript, NO backend.

**Tech Stack:**
- Pages: `index.html` (hero + animated SVG vials), `about.html`, `science.html`, `market.html`, `protocols.html`, `contact.html`
- Styles: `css/style.css` (dark/light themes via CSS custom properties), `css/mobile.css`
- JavaScript: `js/main.js` (theme toggle, mobile nav), `js/mobile.js`

---

## STAGE 1: INTENT EXTRACTION

When a user submits a request, immediately extract:

1. **Which page(s)?** (index, about, science, market, protocols, contact, or global)
2. **What category?** (HTML structure, CSS styling, JS behavior, theme/dark mode, responsive/mobile, performance, accessibility)
3. **Scope:** Single element? Entire section? Multiple pages?
4. **Theme-aware?** Does this affect dark/light modes?
5. **Device-aware?** Desktop, tablet, mobile, or all?

**Example extractions:**
- "Fix the button" → Unclear. Extract: Which page? Which button? Current issue? Styling (colors, hover, focus)? Mobile breakpoint?
- "Add dark mode" → Already exists. Extract: Which elements lack proper theme support? Test contrast ratios?
- "The form doesn't work" → Which form (contact.html)? Validation issue? Submission? Mobile rendering?

---

## STAGE 2: AMBIGUITY DETECTION

Flag and clarify all ambiguities before proceeding:

| Ambiguity | Clarify | Impact |
|-----------|---------|--------|
| **Page unspecified** | Which page(s)? All 6? | Can't locate elements, may miss breakpoint issues |
| **Element unclear** | Which button/form/section? Class name? Position? | Wrong element updated |
| **CSS property ambiguous** | Which custom property? `--color-primary`? `--spacing-unit`? | Theme breaks for dark/light |
| **Mobile vs desktop** | Responsive rule? Which breakpoint (768px)? | Layout breaks on specific devices |
| **Theme scope** | Dark mode only? Light mode only? Both? Contrast WCAG AA/AAA? | Accessibility fails, theme inconsistent |
| **JS function unclear** | Which function in `main.js` or `mobile.js`? New function? | Behavior undefined, conflicts with existing code |
| **Image/asset** | Format (SVG, PNG, WebP)? Size? Optimization needed? | Performance hit, wrong format deployed |

---

## STAGE 3: PROMPT EXPANSION

Expand every request into a fully-specified enhancement. Use these templates:

### Template A: Add Feature
```
FEATURE REQUEST: [Feature Name]
PAGE(S): [index.html, about.html, etc.]
STRUCTURE:
  - HTML elements needed: <tag class="class-name">
  - CSS custom properties: var(--token-name)
  - New CSS classes (use BEM): .block__element--modifier
STYLING:
  - Light theme colors: --color-primary, --color-text
  - Dark theme colors: --bg-dark, --text-light
  - Hover/focus/active states
  - Responsive breakpoints: <576px, 576-768px, 768-1024px, >1024px
BEHAVIOR (JS):
  - Which file: main.js or mobile.js?
  - Event listeners: click, scroll, resize, etc.
  - State management: localStorage, classList, dataset
  - Interactions: animations, form validation, theme toggle
ACCESSIBILITY:
  - Semantic HTML: <button>, <nav>, <main>, <article>, etc.
  - ARIA labels, roles if needed
  - Keyboard navigation
  - Color contrast WCAG AA (4.5:1 text, 3:1 non-text)
MOBILE-FIRST:
  - Base mobile styles first, then @media (min-width: 768px)
  - Touch targets: min 44x44px
  - Responsive images/SVG scaling
```

### Template B: Fix Issue
```
BUG REPORT: [Issue Title]
PAGE(S): [Affected pages]
CURRENT BEHAVIOR: [What happens now]
EXPECTED BEHAVIOR: [What should happen]
LIKELY CAUSE:
  - CSS: Class mismatch? Custom property missing? Breakpoint issue?
  - JS: Function error? Event listener not firing? localStorage corruption?
  - HTML: Missing element? Wrong structure? Missing attributes?
BROWSER/DEVICE: [Chrome/Firefox/Safari? Desktop/Mobile? Dark/Light theme?]
REPRODUCTION STEPS: [Step-by-step]
SOLUTION APPROACH:
  - Identify affected files
  - CSS/JS/HTML changes
  - Theme impact check
  - Mobile responsiveness check
  - Accessibility check
```

### Template C: Improve/Refactor
```
OPTIMIZATION REQUEST: [Component/System Name]
CURRENT STATE: [Brief description]
PERFORMANCE TARGETS:
  - Lighthouse Score: >90
  - CSS: Minified, custom properties consolidated
  - JS: <50KB total, defer non-critical scripts
  - Images: WebP, srcset for responsive, lazy loading
REFACTOR GOALS:
  - CSS: Remove duplication, use custom property tokens
  - JS: Consolidate functions, DRY principle, remove dead code
  - HTML: Semantic improvements, accessibility
MOBILE-FIRST APPROACH:
  - Base mobile styles
  - Tablet enhancements (768px)
  - Desktop enhancements (1024px)
```

### Template D: Build Page/Section
```
NEW PAGE/SECTION: [Name]
PURPOSE: [Bio-longevity content focus]
PAGES INVOLVED: [Which HTML files]
STRUCTURE (HTML):
  - Hero section
  - Content sections
  - Call-to-action
  - Responsive grid/flex layouts
DESIGN SYSTEM:
  - Color tokens: --color-primary, --color-accent, --bg-light, --bg-dark
  - Typography: --font-family-serif, --font-size-base, --line-height
  - Spacing: --spacing-unit (8px), --spacing-2, --spacing-3, etc.
  - Breakpoints: 576px, 768px, 1024px
STYLING APPROACH:
  - Mobile-first base styles
  - Tablet media queries @media (min-width: 768px)
  - Desktop media queries @media (min-width: 1024px)
  - Dark/light theme via custom properties
  - Hover/focus/active states for interactivity
BEHAVIOR:
  - Animations (if hero SVG, smooth reveals)
  - Form handling (if contact section)
  - Theme toggle support
  - Smooth scrolling, lazy loading
ACCESSIBILITY:
  - Semantic HTML (<header>, <main>, <section>, <article>)
  - Heading hierarchy (h1, h2, h3)
  - Image alt text
  - ARIA labels for interactive elements
  - 4.5:1 contrast ratio for text
```

---

## STAGE 4: ENHANCED SPECIFICATION OUTPUT

After expansion, output the specification in this format:

```
═══════════════════════════════════════════════════════════════
ENHANCED SPECIFICATION
═══════════════════════════════════════════════════════════════

REQUEST: [User's original request]

INTERPRETATION: [What you understood]

AFFECTED FILES:
  □ index.html
  □ about.html
  □ science.html
  □ market.html
  □ protocols.html
  □ contact.html
  □ css/style.css
  □ css/mobile.css
  □ js/main.js
  □ js/mobile.js

CHANGES SUMMARY:
  [Concise bullets of what will change]

ASSUMPTIONS:
  • [Any assumptions about design, behavior, scope]
  • [Mobile-first? Dark mode? Accessibility level?]

CLARIFICATIONS NEEDED? (Y/N)
  If Y: [List questions before proceeding]
```

---

## STAGE 5: EXECUTE

Once specification is confirmed:
1. **Check existing code** → Review affected files, understand current structure
2. **Make changes** → HTML/CSS/JS updates, follow BEM for classes, use design tokens
3. **Test across devices** → Mobile (320px), tablet (768px), desktop (1440px)
4. **Test themes** → Dark mode AND light mode, verify all custom properties
5. **Verify accessibility** → WCAG AA contrast, semantic HTML, keyboard navigation
6. **Optimize** → Minify CSS/JS, compress images, remove unused code
7. **Document** → Code comments for non-obvious logic, commit messages

---

## EXPANSION TEMPLATES BY CATEGORY

### "Add [Feature]" Pattern
```
PAGE: [Identify page]
FEATURE: [Button, form, section, modal, animation]
HTML MARKUP:
  <section class="feature-block">
    <h2>Title</h2>
    <button class="btn btn--primary">Label</button>
  </section>
CSS CLASSES (BEM):
  .feature-block { /* Container */ }
  .feature-block__title { /* Child */ }
  .btn { /* Base */ }
  .btn--primary { /* Variant */ }
  .btn:hover { /* Interactive state */ }
CUSTOM PROPERTIES:
  --color-primary: #0066cc (light) / #4d94ff (dark)
  --spacing-unit: 8px
  --transition-speed: 200ms
JS BEHAVIOR:
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', () => { /* Handle */ });
  });
RESPONSIVE:
  @media (max-width: 768px) {
    .feature-block { /* Mobile styles */ }
  }
DARK MODE:
  @media (prefers-color-scheme: dark) {
    .feature-block { color: var(--color-text-dark); }
  }
```

### "Fix [Thing]" Pattern
```
ISSUE: [Button not clickable, form not submitting, colors wrong on mobile]
AFFECTED PAGE: [Specific HTML file]
ROOT CAUSE: [CSS specificity? JS event not firing? Missing HTML element?]
SOLUTION:
  1. [Update HTML if needed]
  2. [Update CSS: check breakpoint, custom properties, specificity]
  3. [Update JS: verify event listener, console for errors]
  4. [Test dark/light themes]
  5. [Test mobile/desktop/tablet]
VERIFICATION:
  □ Issue resolved on all devices
  □ Dark and light themes work
  □ Accessibility unaffected
  □ No console errors
```

### "Improve/Refactor [Thing]" Pattern
```
COMPONENT: [CSS utility, JS function, HTML pattern]
CURRENT: [How it works now]
IMPROVEMENTS:
  - CSS: Consolidate into custom properties, remove duplication
  - JS: Extract to utility function, add comments
  - HTML: More semantic, better structure
  - Performance: Lighthouse score improvement target
EXAMPLE REFACTOR:
  /* BEFORE: Hardcoded values */
  .button { background: #0066cc; padding: 12px 24px; }

  /* AFTER: Design tokens */
  .button {
    background: var(--color-primary);
    padding: var(--spacing-1-5) var(--spacing-3);
  }
TESTING:
  □ Lighthouse score >90
  □ All themes and devices
  □ No visual regressions
```

---

## ENHANCEMENT RULES

### DO
- ✓ Use CSS custom properties for ALL colors, spacing, typography
- ✓ Mobile-first: base styles for mobile, @media for larger screens
- ✓ Test dark AND light themes (browser's prefers-color-scheme)
- ✓ Use semantic HTML: `<button>`, `<nav>`, `<main>`, `<article>`, `<section>`
- ✓ Verify accessibility: WCAG AA (4.5:1 contrast, keyboard nav)
- ✓ Use vanilla JS events: `addEventListener`, `querySelectorAll`
- ✓ Handle responsiveness at 576px, 768px, 1024px breakpoints
- ✓ BEM naming for CSS classes: `.block__element--modifier`
- ✓ Comment complex JS logic, non-obvious CSS patterns
- ✓ Test on real devices or browser DevTools (iPhone 14, iPad, desktop)

### DO NOT
- ✗ Hardcode colors (use custom properties instead)
- ✗ Use inline styles (use CSS classes)
- ✗ Add frameworks, libraries, or build tools
- ✗ Break existing theme toggle or mobile nav
- ✗ Assume only light OR only dark mode works
- ✗ Forget about keyboard navigation and screen readers
- ✗ Use unfamiliar JS syntax (stick to vanilla ES6+)
- ✗ Add unused CSS or dead code
- ✗ Ignore mobile viewports (<576px is valid test case)
- ✗ Forget viewport meta tag: `<meta name="viewport" content="width=device-width, initial-scale=1">`

---

## QUALITY MULTIPLIER TABLE

| Factor | Impact | How to Achieve |
|--------|--------|----------------|
| **Responsive** | 2x quality if mobile + tablet + desktop tested | Test at 320px, 768px, 1440px; use @media queries |
| **Theme-aware** | 2x quality if dark + light both work perfectly | Verify all custom properties; check contrast ratios |
| **Accessible** | 2x quality if WCAG AA compliant | Semantic HTML, 4.5:1 contrast, keyboard nav, ARIA |
| **Performance** | 1.5x quality if Lighthouse >85 | Minify CSS/JS, optimize images, defer scripts |
| **Documented** | 1.5x quality if code is commented, clear intent | Self-documenting code + inline comments for complexity |
| **Zero regressions** | 2x quality if no existing functionality breaks | Full browser test before delivery |

---

## EXAMPLES IN CONTEXT

**Example 1: User says "Fix the hero button"**
```
EXTRACTION: Hero button (index.html), CSS styling issue or JS behavior?
EXPANSION: Which button? Color wrong? Not clickable? Mobile sizing? Theme issue?
SPECIFICATION:
  - Button text, class name, current state
  - CSS: Color tokens, hover/focus states, padding, font
  - JS: Event listener, form submission, link navigation?
  - Mobile: Touch target size (44x44px min), padding on small screens
  - Accessibility: Color contrast, focus visible, aria-label if needed
EXECUTE:
  1. Open index.html, locate .hero-btn or similar
  2. Update CSS in style.css with correct custom properties
  3. Verify dark/light theme colors
  4. Test mobile (320px), tablet (768px), desktop (1440px)
  5. Test all theme combinations
```

**Example 2: User says "Add a contact form"**
```
EXTRACTION: Contact form, likely contact.html, HTML structure + CSS + JS
EXPANSION: Form fields? Validation? Submission (email backend? or localStorage demo?)? Spam protection?
SPECIFICATION:
  - HTML: Form with fields (name, email, message), labels, submit button
  - CSS: Responsive layout, input styling, dark/light theme, focus states
  - JS: Client-side validation, honeypot field, form submission handling
  - Accessibility: Semantic <form>, <label> associations, error messages, success message
  - Mobile: Full-width inputs, adequate spacing, large touch targets
EXECUTE:
  1. Create form HTML with semantic structure
  2. Style with CSS custom properties, mobile-first
  3. Add JS validation (required fields, email format)
  4. Add honeypot: <input type="url" name="website" style="display:none;">
  5. Test dark/light, mobile/desktop, keyboard nav, screen reader
```

**Example 3: User says "Make it faster"**
```
EXTRACTION: Performance optimization, all pages, CSS/JS/images
EXPANSION: Current Lighthouse score? Biggest bottleneck? Images? Render-blocking?
SPECIFICATION:
  - Audit current state (Lighthouse)
  - CSS: Minify, remove unused styles, consolidate custom properties
  - JS: Remove dead code, defer non-critical scripts, minify
  - Images: Convert to WebP, add srcset, lazy loading
  - Fonts: System fonts preferred, or optimize web font loading
EXECUTE:
  1. Run Lighthouse on each page, identify slow elements
  2. Minify css/style.css, css/mobile.css
  3. Minify js/main.js, js/mobile.js
  4. Compress and optimize images (WebP with fallbacks)
  5. Re-test Lighthouse, target >90
```

---

## FINAL CHECKLIST BEFORE DELIVERY

- [ ] User request fully understood (all ambiguities resolved)
- [ ] Affected files identified
- [ ] HTML semantic and accessible
- [ ] CSS uses custom properties, mobile-first, @media queries correct
- [ ] JS is vanilla ES6+, no console errors, event listeners working
- [ ] Tested on mobile (320px), tablet (768px), desktop (1440px)
- [ ] Dark AND light themes both working
- [ ] Accessibility: WCAG AA contrast, semantic HTML, keyboard nav
- [ ] No regressions in existing functionality
- [ ] Images optimized, minified CSS/JS
- [ ] Code is commented where non-obvious
- [ ] Ready for production deployment

---

**Last Updated:** 2026-02-27
**Project:** Engineered Adherence (Static HTML/CSS/JS)
**Scope:** 6 pages, dark/light theme, mobile-responsive, vanilla stack
