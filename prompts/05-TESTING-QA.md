# TESTING & QA AUDIT
## Engineered Adherence — Static Website Quality Assurance

**Project:** Engineered Adherence
**Tech Stack:** HTML5 / CSS3 / Vanilla JavaScript (No frameworks, no test infrastructure)
**Scope:** Manual testing, validation, cross-browser compatibility, performance audits
**Frequency:** Before production deployment and after major updates

---

## PHASE 1: HTML VALIDATION

### 1.1 W3C HTML Validator Audit
Validate all 6 HTML files individually against W3C standards.

**Files to validate:**
- `index.html` (Home)
- `about.html` (About)
- `services.html` (Services)
- `portfolio.html` (Portfolio)
- `blog.html` (Blog)
- `contact.html` (Contact)

**Process:**
1. Visit https://validator.w3.org/
2. Upload each HTML file or copy/paste source
3. Record errors and warnings in a spreadsheet
4. Document line numbers and severity

**Expected Results:**
- Zero errors
- Zero warnings (or document justified warnings)
- All pages should validate as HTML5

### 1.2 Fix Identified Issues
- Correct unclosed tags (`<br>`, `<img>`, `<input>`)
- Remove deprecated attributes (`align`, `bgcolor`, `target="_blank"` on non-security links)
- Fix invalid nesting (e.g., block elements inside inline elements)
- Ensure all form elements have proper `<label>` associations

### 1.3 Meta & Structural Verification
Run a checklist against each HTML file:

```
CHECKLIST:
☐ DOCTYPE: <!DOCTYPE html> present at top
☐ <html lang="en"> with proper lang attribute
☐ <meta charset="utf-8"> present
☐ <meta name="viewport" content="width=device-width, initial-scale=1">
☐ <title> tag unique and descriptive
☐ <meta name="description"> for SEO (160 chars max)
☐ <meta name="theme-color"> set for browser UI
☐ All required <link> tags present (stylesheet, favicon, preload)
☐ <body> and </body> properly closed
☐ No inline event handlers (onclick, onload) — use JS event listeners
```

### 1.4 Tag Validation Deep Dive
- Ensure all image `<img>` tags have `alt` attributes (accessibility + SEO)
- Verify anchor tags `<a>` have meaningful text or `aria-label`
- Check form inputs have associated `<label>` elements
- Confirm no deprecated HTML4 attributes remain

---

## PHASE 2: CSS VALIDATION

### 2.1 W3C CSS Validator Audit
Validate both stylesheets independently.

**Files to validate:**
- `style.css` (Main stylesheet)
- `mobile.css` (Mobile/responsive overrides)

**Process:**
1. Visit https://jigsaw.w3.org/css-validator/
2. Upload or paste each CSS file
3. Test against "CSS Level 3" and "CSS Level 4" (if applicable)
4. Record warnings and errors

**Expected Results:**
- Zero errors in both stylesheets
- Warnings only for vendor prefixes or experimental features (acceptable)

### 2.2 CSS Property Validation
For each identified warning or potential issue:

```
CHECKLIST:
☐ No invalid color values (hex, rgb, rgba, hsl valid)
☐ No typos in property names (e.g., "colol" instead of "color")
☐ No missing semicolons (check end of each rule)
☐ All units properly specified (px, em, rem, %, etc.)
☐ No invalid font-family chains (must end with generic family)
☐ Transition/animation durations valid (ms, s)
☐ No conflicting selectors causing override confusion
```

### 2.3 CSS Custom Properties Verification
If using CSS variables (e.g., `var(--primary-color)`):

```
CHECKLIST:
☐ All variables defined in :root before use
☐ Fallback values provided: var(--color, #000)
☐ Variable names follow naming convention (--[component]-[property])
☐ No circular dependencies between variables
☐ Dark mode variable overrides in :root[data-theme="dark"]
```

### 2.4 Inline Style Audit
Search all HTML files for `style="..."` attributes:

```
CHECKLIST:
☐ Minimal inline styles (should be in CSS, not HTML)
☐ No !important flags in inline styles
☐ Document any intentional dynamic styles
☐ Consider moving to CSS classes or JS-set custom properties
```

---

## PHASE 3: JAVASCRIPT TESTING

### 3.1 Console Error Audit
Test every page in both light and dark themes.

**Process:**
1. Open DevTools (F12 in Chrome/Firefox, Cmd+Option+I in Safari)
2. Go to **Console** tab
3. Reload page
4. Record any errors, warnings, or messages
5. Verify no "Uncaught" exceptions exist

**Test Matrix:**

| Page | Light Mode | Dark Mode |
|------|-----------|-----------|
| index.html | ☐ | ☐ |
| about.html | ☐ | ☐ |
| services.html | ☐ | ☐ |
| portfolio.html | ☐ | ☐ |
| blog.html | ☐ | ☐ |
| contact.html | ☐ | ☐ |

**Expected Results:** No errors in any page/theme combination.

### 3.2 Theme Toggle Functionality
Test theme persistence and switching behavior.

**Test Cases:**

| Test | Expected Result | Status |
|------|-----------------|--------|
| Click theme toggle button | Page switches to opposite theme | ☐ |
| Toggle 5 times rapidly | No visual glitches, correct final state | ☐ |
| Toggle then navigate to another page | New page loads in same theme | ☐ |
| Toggle then refresh page (F5) | Theme persists from localStorage | ☐ |
| Close tab, reopen site | Site loads in previously selected theme | ☐ |
| Disable localStorage in DevTools | Theme defaults to system preference or light mode | ☐ |
| Check localStorage contents | `theme: "dark"` or `theme: "light"` correctly stored | ☐ |

### 3.3 Mobile Navigation Testing
Test hamburger menu and overlay on mobile.

**Test Cases:**

| Test | Expected Result | Status |
|------|-----------------|--------|
| Click hamburger icon (mobile view) | Menu opens, overlay appears | ☐ |
| Click overlay | Menu closes smoothly | ☐ |
| Press Escape key | Menu closes, overlay disappears | ☐ |
| Click menu link | Navigate to page, menu auto-closes | ☐ |
| Resize from mobile to desktop | Menu closes, returns to navbar | ☐ |
| Resize from desktop to mobile | Navbar hides, hamburger appears | ☐ |
| Open menu then rapidly resize | No layout shift or errors | ☐ |

### 3.4 Scroll Animations Testing
Verify IntersectionObserver-based animations trigger correctly.

**Test Cases:**

| Test | Expected Result | Status |
|------|-----------------|--------|
| Load page at top | Elements not animated yet | ☐ |
| Scroll down slowly | Elements fade/slide in as they enter viewport | ☐ |
| Scroll past animated element | Element remains visible | ☐ |
| Scroll back up | Element animates again on re-entry (if configured) | ☐ |
| Disable animations in System Preferences | No animations play (respects prefers-reduced-motion) | ☐ |
| Check DevTools Network (Slow 4G) | Animations still perform on slower networks | ☐ |

### 3.5 Contact Form Validation (if applicable)
Test form submission logic.

**Test Cases:**

| Test | Expected Result | Status |
|------|-----------------|--------|
| Submit empty form | Error message displays | ☐ |
| Submit name only | Error message for missing email | ☐ |
| Submit invalid email | Error message for invalid format | ☐ |
| Submit valid form | Success message, form clears | ☐ |
| Submit, then attempt resubmit | Prevent duplicate submissions | ☐ |
| Check DevTools Network | Form data sent correctly (if using API) | ☐ |

---

## PHASE 4: CROSS-BROWSER TESTING

### 4.1 Desktop Browsers

Test on latest versions (as of 2026):

**Chrome (Latest)**
- [ ] Visit all 6 pages
- [ ] Test theme toggle
- [ ] Test mobile emulation (DevTools → Device Toolbar)
- [ ] Check responsive design at 375px, 768px, 1440px
- [ ] No console errors
- [ ] All animations smooth

**Firefox (Latest)**
- [ ] Visit all 6 pages
- [ ] Test theme toggle and persistence
- [ ] Check CSS custom properties display correctly
- [ ] No console errors
- [ ] Verify backdrop-filter (if used) gracefully degrades

**Safari (Latest)**
- [ ] Visit all 6 pages
- [ ] Test theme toggle
- [ ] Check for webkit-specific issues
- [ ] Verify `-webkit-backdrop-filter` renders correctly
- [ ] No layout shifts on scroll

**Edge (Latest)**
- [ ] Quick smoke test on key pages
- [ ] Verify CSS compatibility
- [ ] No console errors

### 4.2 Mobile Browsers

**Chrome Mobile (iOS/Android)**
- [ ] Test on physical device or emulator
- [ ] Verify tap targets are ≥44px (accessibility)
- [ ] Test hamburger menu interaction
- [ ] Verify smooth scrolling
- [ ] Check theme persistence

**Safari iOS**
- [ ] Test on physical device or Safari DevTools
- [ ] Verify viewport works correctly
- [ ] Test theme toggle (may not persist due to Safari quirks)
- [ ] Check for viewport issues on portrait/landscape

**Firefox Mobile**
- [ ] Test on Android device or emulator
- [ ] Verify responsive layout
- [ ] Check JavaScript functionality

### 4.3 Feature Compatibility Checklist

| Feature | Chrome | Firefox | Safari | Edge | Notes |
|---------|--------|---------|--------|------|-------|
| CSS Custom Properties | ✓ | ✓ | ✓ | ✓ | Supported in all modern browsers |
| CSS Grid | ✓ | ✓ | ✓ | ✓ | Verify no gaps at breakpoints |
| Backdrop-filter | ✓ | ✓ | ✓ | ✓ | Fallback needed for Firefox |
| CSS Animations | ✓ | ✓ | ✓ | ✓ | Use `-webkit-` prefix for Safari |
| CSS Transitions | ✓ | ✓ | ✓ | ✓ | Smooth on all browsers |
| IntersectionObserver | ✓ | ✓ | ✓ | ✓ | Polyfill not needed for modern browsers |
| localStorage | ✓ | ✓ | ✓ | ✓ | Verify persistence across sessions |
| fetch() API | ✓ | ✓ | ✓ | ✓ | If used for any async operations |

---

## PHASE 5: RESPONSIVE DESIGN TESTING

### 5.1 Breakpoint Testing Matrix

Test all pages at each breakpoint:

**Breakpoints:**
- **320px** (Small phone)
- **375px** (Standard phone)
- **414px** (Large phone)
- **768px** (Tablet)
- **1024px** (Large tablet)
- **1280px** (Small desktop)
- **1440px** (Standard desktop)
- **1920px** (Wide desktop)

**Testing Tool:** Chrome DevTools Device Toolbar or Firefox Responsive Design Mode

**Checklist at each breakpoint:**
- [ ] No horizontal overflow
- [ ] Text is readable (font size ≥16px on mobile)
- [ ] Tap targets are ≥44px × 44px
- [ ] Images scale appropriately
- [ ] Navigation is accessible
- [ ] Content layout is logical and flows correctly
- [ ] No text cutoff or overlaps

### 5.2 Orientation Testing

Test on tablets and phones in both orientations:

| Device | Portrait | Landscape | Notes |
|--------|----------|-----------|-------|
| iPhone 12 (375px) | ☐ | ☐ | Use Chrome Emulator |
| iPad Air (768px) | ☐ | ☐ | Test actual device if available |
| Galaxy Tab (1024px) | ☐ | ☐ | Use Chrome Emulator |

**Expected Results:**
- Layout adapts smoothly to orientation changes
- No content cut off in either orientation
- Navigation remains accessible

### 5.3 Overflow & Scrolling Audit

```
CHECKLIST:
☐ Run horizontal scroll check:
  window.innerWidth === document.documentElement.scrollWidth
  (should be equal — no overflow)
☐ Test vertical scrolling on long pages (blog, portfolio)
☐ Verify scroll bar doesn't shift layout on appearance
☐ Check fixed headers don't obscure content on scroll
☐ Sticky navigation works smoothly
```

### 5.4 Content Accessibility at All Sizes

- [ ] No truncated text without ellipsis
- [ ] All links are clickable at smallest size
- [ ] Form inputs are large enough to interact with
- [ ] Images have descriptive alt text
- [ ] Color contrast meets WCAG AA standards (4.5:1 for text)

### 5.5 Touch Interaction Testing

Test on actual mobile devices:

- [ ] Buttons respond to touch without 300ms delay
- [ ] Swipe gestures (if implemented) work correctly
- [ ] Double-tap zoom is disabled or works as intended
- [ ] No "ghost clicks" after touch interactions
- [ ] Hamburger menu closes on link tap

---

## PHASE 6: THEME CONSISTENCY TESTING

### 6.1 Dark Mode Readability Audit

Visit every page in dark mode and verify:

| Page | Headings Readable | Body Text Readable | Links Visible | Images OK | Status |
|------|---------------------|---------------------|-----------------|-----------|--------|
| index.html | ☐ | ☐ | ☐ | ☐ | |
| about.html | ☐ | ☐ | ☐ | ☐ | |
| services.html | ☐ | ☐ | ☐ | ☐ | |
| portfolio.html | ☐ | ☐ | ☐ | ☐ | |
| blog.html | ☐ | ☐ | ☐ | ☐ | |
| contact.html | ☐ | ☐ | ☐ | ☐ | |

**Specific Checks:**
- Text contrast ratio ≥ 4.5:1 for normal text
- Text contrast ratio ≥ 3:1 for large text (18pt+)
- Links underlined or clearly distinguishable from body text
- Background colors provide sufficient contrast

### 6.2 Light Mode Readability Audit

Visit every page in light mode and verify same criteria above.

**Additional Check:**
- No excessive brightness that causes eye strain
- Images don't get washed out by light background

### 6.3 Rapid Theme Toggle Test

```
PROCEDURE:
1. Open browser DevTools
2. Rapidly toggle theme 10+ times by clicking toggle button
3. Record observations:
   ☐ No visual flicker or flash
   ☐ No layout shift (CLS = 0)
   ☐ Colors transition smoothly
   ☐ No console errors during rapid toggling
   ☐ Final state is correct
```

### 6.4 Flash of Wrong Theme (FOUT) Check

Test theme loading behavior:

```
PROCEDURE:
1. Clear localStorage: localStorage.clear()
2. Hard refresh page (Ctrl+Shift+R or Cmd+Shift+R)
3. Observe page load sequence:
   ☐ Does page briefly show light mode before switching to saved theme?
   ☐ Is transition instant or does it flash?
   ☐ Can a preload script prevent the flash?

EXPECTED RESULT:
- Either:
  a) Instant correct theme (script runs before DOM paint)
  b) Brief neutral loading state, never shows "wrong" theme
```

---

## PHASE 7: LINK & NAVIGATION AUDIT

### 7.1 Internal Link Testing

Create a sitemap and test every internal link:

```
INTERNAL LINKS:
Home
├─ Logo → index.html ☐
├─ Home nav → index.html ☐
├─ About nav → about.html ☐
├─ Services nav → services.html ☐
├─ Portfolio nav → portfolio.html ☐
├─ Blog nav → blog.html ☐
├─ Contact nav → contact.html ☐
└─ Footer links → [each page] ☐

PAGES:
About
├─ Back to home (logo) ☐
├─ Services link ☐
└─ Contact link ☐

[Continue for each page...]
```

**Expected Result:** All internal links navigate to correct pages without 404 errors.

### 7.2 External Link Testing

Document all external links and verify:

```
CHECKLIST:
☐ All external links open in new tab (target="_blank")
☐ All external links have rel="noopener noreferrer" (security)
☐ External links are active and point to correct resources
☐ Links don't have tracking parameters that expose data
☐ Social media links point to correct profiles
```

**Example Format:**
| Page | Link Text | URL | Works? | Opens in New Tab? | Status |
|------|-----------|-----|--------|-------------------|--------|
| index.html | "Follow on Twitter" | twitter.com/... | ☐ | ☐ | |

### 7.3 Navigation Highlighting

Test active state indicators:

```
CHECKLIST:
☐ Current page link is highlighted in navbar
☐ Highlight persists across page refresh
☐ Highlight updates correctly when navigating
☐ Highlight works on mobile hamburger menu
☐ Active state uses distinct color/styling
```

### 7.4 Browser Navigation Testing

```
PROCEDURE:
1. Visit index.html
2. Click to about.html
3. Click browser back button → Should return to index.html ☐
4. Click browser forward button → Should return to about.html ☐
5. History state preserved correctly ☐
6. No console errors during navigation ☐

EXPECTED RESULT:
Browser back/forward buttons work as expected without
JavaScript routing issues.
```

---

## PHASE 8: PERFORMANCE TESTING

### 8.1 Lighthouse Audit Procedure

**Setup:**
1. Open Chrome DevTools (F12)
2. Navigate to **Lighthouse** tab
3. Select "Mobile" and "Desktop" modes
4. Run audit on each page in both modes

**Pages to Test:**
1. index.html (Home)
2. about.html (About)
3. services.html (Services)
4. portfolio.html (Portfolio)
5. blog.html (Blog)
6. contact.html (Contact)

**Total Audits:** 6 pages × 2 modes (mobile + desktop) = **12 audits**

### 8.2 Lighthouse Scoring Matrix

Create a spreadsheet to track scores:

| Page | Mode | Performance | Accessibility | Best Practices | SEO | Overall | Status |
|------|------|-------------|----------------|-----------------|-----|---------|--------|
| index | Mobile | | | | | | ☐ |
| index | Desktop | | | | | | ☐ |
| about | Mobile | | | | | | ☐ |
| about | Desktop | | | | | | ☐ |
| [Continue for all 6 pages...] | | | | | | | |

### 8.3 Scoring Thresholds

```
TARGET SCORES (all categories):
✓ Green: 90-100
⚠ Yellow: 50-89
✗ Red: 0-49

BASELINE REQUIREMENT:
All pages must score ≥90 in all categories before production.

PAGES BELOW 90:
1. Document which pages and categories are below threshold
2. Identify specific issues in Lighthouse report
3. Create remediation tasks (next phase)
4. Schedule re-audit after fixes
```

### 8.4 Performance Issue Categories

Common issues to investigate if scores are low:

```
PERFORMANCE (< 90):
- Large unoptimized images
- Missing image compression
- Unused CSS/JS
- Render-blocking resources
- No caching headers
→ Action: Optimize images, minify CSS/JS, lazy load

ACCESSIBILITY (< 90):
- Low color contrast
- Missing alt text on images
- Form labels not associated
- Keyboard navigation issues
→ Action: Fix contrast, add alt text, improve labels

BEST PRACTICES (< 90):
- No HTTPS
- Missing security headers
- Outdated libraries
- Console errors/warnings
→ Action: Use HTTPS, add headers, debug console

SEO (< 90):
- Missing meta descriptions
- Not mobile-friendly
- Missing structured data
- Poor heading hierarchy
→ Action: Add meta tags, improve heading hierarchy
```

---

## PHASE 9: FINAL LIGHTHOUSE VALIDATION

### 9.1 Final Audit Run

After implementing any fixes from Phase 8:

1. Clear browser cache (DevTools → Network → Disable cache, then Ctrl+Shift+Delete)
2. Run Lighthouse audit on all 6 pages (mobile + desktop)
3. Record final scores in same matrix as 8.2

### 9.2 Baseline Comparison

If this is a production site with existing Lighthouse baseline:

```
COMPARISON TEMPLATE:

Page: index.html (Desktop)
─────────────────────────────────────────────
Category         | Previous | Current | Change | Status
Performance      | 92       | 95      | +3     | ✓ Improved
Accessibility    | 88       | 91      | +3     | ✓ Meets target
Best Practices   | 90       | 93      | +3     | ✓ Improved
SEO              | 95       | 97      | +2     | ✓ Improved
─────────────────────────────────────────────

[Repeat for all 6 pages]
```

### 9.3 Go/No-Go Criteria

```
PRODUCTION RELEASE CRITERIA:
✓ All 6 pages score ≥90 on Performance (mobile + desktop)
✓ All 6 pages score ≥90 on Accessibility (mobile + desktop)
✓ All 6 pages score ≥90 on Best Practices (mobile + desktop)
✓ All 6 pages score ≥90 on SEO (mobile + desktop)
✓ Zero HTML validation errors
✓ Zero CSS validation errors
✓ Zero console errors across all pages
✓ All cross-browser tests passing
✓ All responsive design tests passing
✓ Theme toggle works correctly
✓ Mobile navigation fully functional
✓ All links tested and working

DECISION:
[ ] Release to production
[ ] Fix remaining issues (list below)
[ ] Schedule re-test
```

### 9.4 Documentation & Sign-off

**Create a QA Report containing:**

1. **Executive Summary**
   - Overall status (Pass/Fail)
   - Critical issues found
   - Timeline for fixes

2. **Detailed Findings**
   - HTML validation results
   - CSS validation results
   - JavaScript testing results
   - Lighthouse scores (all pages)
   - Cross-browser compatibility matrix
   - Responsive design test results

3. **Issue Log**
   | Issue ID | Severity | Category | Description | Status |
   |----------|----------|----------|-------------|--------|
   | #001 | High | Lighthouse | SEO score 87 on mobile | Pending fix |

4. **Test Evidence**
   - Screenshots of Lighthouse reports
   - Browser test logs
   - Device test checklist completed

5. **Approval Sign-off**
   - QA Lead: _____________ Date: _____
   - Project Manager: _____________ Date: _____
   - Client: _____________ Date: _____

---

## QUICK REFERENCE CHECKLISTS

### Pre-Deployment QA Checklist

```
☐ All HTML files pass W3C validation
☐ Both CSS files pass W3C validation
☐ No console errors on any page (light + dark mode)
☐ Theme toggle works and persists
☐ Mobile navigation fully functional
☐ All pages responsive at 320px, 768px, 1440px
☐ Dark mode text readable on all pages
☐ Light mode text readable on all pages
☐ All internal links working
☐ All external links verified
☐ Lighthouse scores ≥90 on all pages (Performance, Accessibility, Best Practices, SEO)
☐ Cross-browser testing complete (Chrome, Firefox, Safari, Edge)
☐ Mobile device testing complete (iOS + Android)
☐ No horizontal overflow at any breakpoint
☐ Rapid theme toggle produces no visual glitches
☐ IntersectionObserver animations trigger correctly
☐ Contact form validation works (if applicable)
☐ QA report completed and signed off
```

### Accessibility Verification Checklist

```
☐ Color contrast ratio ≥4.5:1 (normal text)
☐ Color contrast ratio ≥3:1 (large text)
☐ All images have alt text
☐ All form inputs have associated labels
☐ Keyboard navigation works (Tab, Enter, Escape)
☐ Focus states clearly visible
☐ No keyboard traps
☐ Headings follow logical hierarchy (H1 > H2 > H3)
☐ Links have descriptive text (not "click here")
☐ prefers-reduced-motion respected
☐ ARIA attributes used only where necessary
```

---

## Testing Documentation Template

For each major test phase, save results:

**Filename format:** `test-results-[phase]-[date].md`

Example:
```markdown
# Test Results: HTML Validation — 2026-02-27

## Summary
- Files tested: 6
- Errors found: 2
- Warnings found: 3
- Status: Failed (errors must be fixed)

## Details
### index.html
- Error line 42: Missing closing </div>
- Error line 78: Invalid attribute "onload"
- Warning line 156: Empty heading

### about.html
[...]

## Remediation
1. Close missing div tags
2. Remove inline event handlers
3. [...]

## Re-test Date: 2026-02-28
```

---

## Tools & Resources

**W3C Validators:**
- HTML: https://validator.w3.org/
- CSS: https://jigsaw.w3.org/css-validator/

**Browser DevTools:**
- Chrome DevTools: F12
- Firefox DevTools: F12
- Safari Web Inspector: Cmd+Option+I
- Edge DevTools: F12

**Testing Tools:**
- Chrome Lighthouse: DevTools → Lighthouse
- Responsive Design Mode: Chrome/Firefox built-in
- WCAG Color Contrast Checker: https://webaim.org/resources/contrastchecker/

**Documentation:**
- MDN Web Docs: https://developer.mozilla.org/
- Can I Use: https://caniuse.com/ (browser compatibility)

---

**QA Phase Owner:** [Name]
**Last Updated:** 2026-02-27
**Status:** Ready for deployment testing
