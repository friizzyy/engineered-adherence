# Universal Footer Redesign

**Date:** 2026-02-27
**Status:** Approved

## Problem

Current footer is too spread out, cluttered, doesn't match the site's premium feel, and has unbalanced proportions. Needs a ground-up rethink.

## Design: Clean Single-Line Bar

Three-zone horizontal flex row: brand left, nav links center, copyright right.

### HTML (replaces all 6 page footers)

```html
<footer>
  <div class="footer-bar">
    <a href="index.html" class="logo">Engineered Adherence</a>
    <nav class="footer-nav" aria-label="Footer">
      <a href="science.html">Science</a>
      <a href="protocols.html">Protocols</a>
      <a href="about.html">About</a>
      <a href="market.html">Market</a>
      <a href="contact.html">Contact</a>
    </nav>
    <span class="footer-copy">&copy; 2026 &middot; Doha, Qatar</span>
  </div>
</footer>
```

### Desktop CSS

- Single flex row: `justify-content: space-between; align-items: center`
- Padding: `32px 72px`, max-width `1140px`, margin `0 auto`
- Top border: `1px solid var(--line)`
- Logo: `var(--muted)`, 14px, weight 400
- Nav links: `var(--muted)`, 13px, weight 300, gap `32px`, hover to `var(--text-heading)`
- Copyright: `var(--faint)`, 12px, weight 300

### Mobile (768px and below)

- Flex direction: `column`, centered, gap `20px`
- Order: logo, nav links (flex-wrap, gap `16px 24px`), copyright
- Padding: `32px 24px`

### What gets removed

- `.footer-inner`, `.footer-brand`, `.footer-links`, `.footer-col`, `.footer-bottom` classes
- Column headings ("Platform", "Company"), tagline paragraph
- All associated CSS for removed classes

### Accessibility

- `<nav aria-label="Footer">` distinguishes from main nav
- Semantic `<footer>` preserved
- Keyboard navigable, color contrast via custom properties
