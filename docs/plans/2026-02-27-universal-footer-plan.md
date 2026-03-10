# Universal Footer Redesign — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the multi-column footer across all 6 pages with a clean single-row bar (brand left, nav center, copyright right).

**Architecture:** Replace all `<footer>` HTML on every page with identical simplified markup using `.footer-bar`, `.footer-nav`, `.footer-copy`. Replace all footer CSS in `style.css` and `mobile.css` with new compact rules. No JS changes needed.

**Tech Stack:** Vanilla HTML5, CSS3 custom properties, no build system.

**Design doc:** `docs/plans/2026-02-27-universal-footer-design.md`

---

### Task 1: Replace footer CSS in style.css

**Files:**
- Modify: `css/style.css:483-519` (main footer block)
- Modify: `css/style.css:649` (tablet media query footer rule)
- Modify: `css/style.css:803-806` (mobile media query footer rules)

**Step 1: Replace the main footer CSS block (lines 483-519)**

Replace the entire FOOTER section with:

```css
/* ═══════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════ */
footer{
  max-width:1140px;margin:0 auto;
  padding:32px 72px;
  border-top:1px solid var(--line);
  position:relative;z-index:1;
  transition:border-color .5s;
}
.footer-bar{
  display:flex;justify-content:space-between;align-items:center;
}
.footer-nav{
  display:flex;gap:32px;
}
.footer-nav a{
  font-size:13px;color:var(--muted);
  font-weight:300;transition:color .3s;
}
.footer-nav a:hover{color:var(--text-heading)}
.footer-copy{
  font-size:12px;color:var(--faint);
  font-weight:300;letter-spacing:.5px;
  transition:color .5s;
}
```

**Step 2: Update the tablet media query (around line 649)**

Replace `footer{padding:48px 40px}` with:

```css
footer{padding:32px 40px}
```

**Step 3: Update the mobile media query (lines 803-806)**

Replace the 4 footer rules (`.footer-inner`, `.footer-links`, `.footer-bottom`, `footer`) with:

```css
.footer-bar{flex-direction:column;gap:20px;text-align:center}
.footer-nav{flex-wrap:wrap;justify-content:center;gap:16px 24px}
footer{padding:32px 24px}
```

**Step 4: Verify** no orphaned old class references remain in style.css.

---

### Task 2: Replace footer CSS in mobile.css

**Files:**
- Modify: `css/mobile.css:750-841` (MOBILE FOOTER — PREMIUM REDESIGN section)

**Step 1: Replace the entire "MOBILE FOOTER — PREMIUM REDESIGN" section (lines 750-841)**

Replace with:

```css
/* ═══════════════════════════════════════════
   MOBILE FOOTER
   ═══════════════════════════════════════════ */
body footer{
  padding:32px 24px;
  text-align:center;
}

body .footer-bar{
  flex-direction:column;
  align-items:center;
  gap:20px;
}

body .footer-nav{
  flex-wrap:wrap;
  justify-content:center;
  gap:16px 24px;
}

body .footer-nav a{
  font-size:13px;
}

body .footer-copy{
  font-size:11px;
}
```

---

### Task 3: Replace footer HTML on all 6 pages

**Files:**
- Modify: `index.html:456-468`
- Modify: `about.html:733-742`
- Modify: `science.html:1018-1027`
- Modify: `market.html:826-835`
- Modify: `protocols.html:513-522`
- Modify: `contact.html:228-237`

**Step 1: Replace each page's `<footer>...</footer>` block with:**

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

Do all 6 pages: index.html, about.html, science.html, market.html, protocols.html, contact.html.

---

### Task 4: Verify and commit

**Step 1:** Grep for any remaining references to removed classes: `.footer-inner`, `.footer-brand`, `.footer-links`, `.footer-col`, `.footer-bottom` across all files. There should be zero matches.

**Step 2:** Visually verify no console errors by checking HTML structure is valid.

**Step 3:** Commit all changes.

```bash
git add css/style.css css/mobile.css index.html about.html science.html market.html protocols.html contact.html
git commit -m "[STYLE] Replace footer with clean single-row bar

Replaces the multi-column footer layout across all 6 pages with a
simplified three-zone horizontal bar: brand left, nav center, copyright
right. Removes .footer-inner, .footer-brand, .footer-links, .footer-col,
.footer-bottom classes and all associated CSS. Mobile stacks vertically.

Affected files:
- css/style.css (new footer CSS, removed old multi-column rules)
- css/mobile.css (simplified mobile footer override)
- index.html, about.html, science.html, market.html, protocols.html, contact.html (new footer HTML)"
```
