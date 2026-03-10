# Performance & Core Web Vitals Audit
## "Engineered Adherence" — Static Site Optimization Guide

**Target Environment:** Pure HTML/CSS/JS static site. No build system, no bundler, no npm.

**Lighthouse Targets:** Performance > 90, LCP < 2.5s, CLS < 0.1, INP < 200ms

---

## STEP 1: BASELINE PROFILING

### 1.1 Lighthouse Audit All 6 Pages
Run Lighthouse in Chrome DevTools (mobile + desktop) on each page:
- index.html (homepage)
- about.html
- contact.html
- faq.html
- blog/index.html
- services.html

**Process:**
1. Open page in Chrome → DevTools (F12) → Lighthouse tab
2. Select Mobile → Run Audit
3. Repeat for Desktop
4. Record Performance score and all CWV metrics
5. Screenshot reports and save to `/audit-results/` directory

### 1.2 Core Web Vitals Baseline
Use Chrome DevTools → Performance tab:
- **LCP (Largest Contentful Paint):** When largest visible element renders. Target: < 2.5s
- **FCP (First Contentful Paint):** When first pixel paints. Target: < 1.8s
- **CLS (Cumulative Layout Shift):** Unexpected layout shifts. Target: < 0.1
- **INP (Interaction to Next Paint):** Responsiveness to user input. Target: < 200ms
- **TTFB (Time to First Byte):** Server response time. Target: < 600ms

**Test Procedure:**
1. Open DevTools Performance tab → Start recording (Ctrl+Shift+E)
2. Reload page
3. Interact with page (scroll, click buttons, hover)
4. Stop recording
5. Review metrics in Performance panel and Metrics summary

### 1.3 Chrome DevTools Performance Analysis
1. Open DevTools → Performance tab
2. Record 5-10 seconds of page interaction
3. Review Main thread activity — identify:
   - Long tasks (> 50ms)
   - JavaScript execution time
   - Style recalculation (Recalculate Style)
   - Layout (Layout thrashing)
   - Paint operations
4. Check flamechart for bottlenecks
5. Look for opportunities to reduce main thread work

### 1.4 Network Waterfall Analysis
1. DevTools → Network tab
2. Reload page with caching disabled (Settings → Disable cache)
3. Review waterfall:
   - CSS file sizes and load time
   - JS file sizes and load time
   - Font loading — are requests sequential or parallel?
   - Unused resources (not in page)
4. Check Critical Rendering Path — identify render-blocking resources
5. Note total page size and request count

---

## STEP 2: RENDER-BLOCKING RESOURCES

### 2.1 CSS Optimization
Analyze `style.css` and `mobile.css` loading:

**Current loading strategy audit:**
```html
<!-- Check current HTML head -->
<link rel="stylesheet" href="/css/style.css">
<link rel="stylesheet" href="/css/mobile.css" media="(max-width: 768px)">
```

**Optimization techniques:**

**Critical CSS Inlining** — Move above-fold styles inline:
```html
<head>
  <style>
    /* Critical above-fold styles only */
    body { margin: 0; padding: 0; }
    header { background: #fff; padding: 1rem; }
    .hero { min-height: 80vh; display: flex; }
  </style>
  <!-- Non-critical CSS deferred -->
  <link rel="preload" href="/css/style.css" as="style">
  <link rel="stylesheet" href="/css/style.css">
</head>
```

**Media query optimization:**
```html
<!-- Only load mobile CSS on mobile (non-render-blocking on desktop) -->
<link rel="stylesheet" href="/css/mobile.css" media="(max-width: 768px)">
```

**Expected impact:** FCP improvement of 200-500ms on first visit

### 2.2 Google Fonts Loading Strategy
If using Google Fonts, optimize with preconnect and font-display:

```html
<head>
  <!-- Preconnect to Google Fonts CDN (parallel DNS lookup) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

  <!-- Load fonts with swap strategy (show fallback first) -->
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
</head>
```

**In CSS:**
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

**Expected impact:** Reduces FOUT (Flash of Unstyled Text) by 200-800ms

### 2.3 JavaScript Loading Strategy
Ensure main.js and mobile.js use `defer` attribute:

**Current (blocking):**
```html
<!-- DO NOT DO THIS -->
<script src="/js/main.js"></script>
```

**Optimized (non-blocking with defer):**
```html
<!-- Place at end of body with defer -->
<body>
  <!-- page content -->
  <script src="/js/main.js" defer></script>
  <script src="/js/mobile.js" defer></script>
</body>
```

**When to use `defer` vs `async`:**
- **defer:** Use for scripts that depend on DOM (most cases)
- **async:** Use for independent scripts (analytics, ads)

**Expected impact:** FCP improvement of 300-800ms

### 2.4 Theme Detection Script
If theme toggle is in page, keep inline script in `<head>` but minimal:

```html
<head>
  <script>
    (function() {
      const theme = localStorage.getItem('theme') || 'light';
      document.documentElement.dataset.theme = theme;
    })();
  </script>
</head>
```

**Rationale:** Prevents flash of wrong theme color. Keep size < 200 bytes.

---

## STEP 3: CSS OPTIMIZATION

### 3.1 Remove Unused CSS
Use Chrome DevTools → Coverage tab:

1. Open DevTools → More tools → Coverage
2. Reload page
3. DevTools shows % of CSS used
4. Click red entries to see unused rules
5. Manually review and remove or reorganize unused selectors

**Common unused CSS sources:**
- Old component classes no longer in HTML
- Media queries for viewports not tested
- Utility classes not used in current pages

### 3.2 Minify CSS for Production
Create minified versions without build tools:

**Manual minification example:**
```css
/* Before: style.css (readable) */
body {
  margin: 0;
  padding: 0;
  font-family: 'Inter', sans-serif;
}

.button {
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
}
```

**After: style.min.css (minified)**
```css
body{margin:0;padding:0;font-family:'Inter',sans-serif}.button{padding:.75rem 1.5rem;border-radius:4px}
```

**Use online tool:** https://www.minifycode.com/css-minifier

**HTML reference update:**
```html
<link rel="stylesheet" href="/css/style.min.css">
<link rel="stylesheet" href="/css/mobile.min.css" media="(max-width: 768px)">
```

**Expected impact:** 20-40% reduction in CSS file size

### 3.3 CSS File Organization
**Decision:** Keep separate files or combine?
- **Separate:** Better caching if style.css rarely changes, but more requests
- **Combined:** Fewer requests, but larger file. Use for sites with < 3 CSS files

**Recommendation for static site:** Keep separate with long cache headers (see Step 9)

### 3.4 Selector Optimization
Review for overly specific selectors:

**Before (overly specific):**
```css
body > header > nav > ul > li > a.active { color: blue; }
```

**After (simplified):**
```css
nav a.active { color: blue; }
```

**Benefits:** Faster CSS matching, easier maintenance, smaller file

### 3.5 CSS File Size Audit
Check current sizes:
```bash
# In terminal at project root
ls -lh css/*.css
# Output example:
# -rw-r--r-- 1 user 45K style.css
# -rw-r--r-- 1 user 12K mobile.css
```

**Targets for static site:**
- style.css + mobile.css combined < 60KB (unminified)
- Minified < 35KB
- With gzip compression < 10KB

---

## STEP 4: JAVASCRIPT OPTIMIZATION

### 4.1 Minify JavaScript
Create minified versions:

**Before: main.js**
```javascript
function initThemeToggle() {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  toggle.addEventListener('click', function() {
    const current = document.documentElement.dataset.theme;
    const next = current === 'light' ? 'dark' : 'light';
    document.documentElement.dataset.theme = next;
    localStorage.setItem('theme', next);
  });
}

initThemeToggle();
```

**After: main.min.js**
```javascript
(function(){const e=document.getElementById('theme-toggle');if(!e)return;e.addEventListener('click',function(){const t='light'===document.documentElement.dataset.theme?'dark':'light';document.documentElement.dataset.theme=t;localStorage.setItem('theme',t)})})();
```

**Tools:** https://www.minifycode.com/javascript-minifier

### 4.2 Identify Unused JavaScript
**Code review checklist:**
- Search for dead functions (defined but never called)
- Remove old event listeners for removed elements
- Check for console.log() statements (remove for production)
- Remove commented-out code blocks

**Testing:** Search files for patterns:
```javascript
// Remove before production
console.log('debug info');
debugger;
// Old feature — deprecated
/* function oldFeature() { ... } */
```

### 4.3 Verify defer Attribute
All script tags should use `defer`:

```html
<body>
  <!-- All content -->
  <script src="/js/main.min.js" defer></script>
  <script src="/js/mobile.min.js" defer></script>
</body>
```

### 4.4 Memory Leak Detection
In DevTools → Performance:

1. Record interaction for 30+ seconds
2. Look for continuously rising memory graph
3. Check for:
   - Event listeners added but never removed
   - setInterval/setTimeout without clearInterval/clearTimeout
   - DOM nodes removed but references still held

**Example memory leak:**
```javascript
// BAD: listener never removed
window.addEventListener('resize', function() {
  console.log('resizing');
});

// GOOD: listener can be removed
const handleResize = () => console.log('resizing');
window.addEventListener('resize', handleResize);
// Later: window.removeEventListener('resize', handleResize);
```

### 4.5 JavaScript File Size
```bash
ls -lh js/*.js
# Output example:
# -rw-r--r-- 1 user 15K main.js
# -rw-r--r-- 1 user 8K mobile.js
```

**Targets:**
- Combined JS < 25KB (unminified)
- Minified < 12KB
- With gzip < 4KB

---

## STEP 5: IMAGE OPTIMIZATION

### 5.1 Image Inventory
Create list of all images in project:

```bash
find . -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" -o -name "*.svg" -o -name "*.webp" \) -exec ls -lh {} \;
```

Document each image: filename, size, location, purpose, dimensions

### 5.2 SVG Optimization
For SVG images, optimize with SVGO tool:

**Example unoptimized SVG:**
```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <defs>
    <style>
      .cls-1 { fill: #000; }
    </style>
  </defs>
  <g id="layer1">
    <circle class="cls-1" cx="50" cy="50" r="40"/>
  </g>
</svg>
```

**Optimized (using SVGO):**
```xml
<svg viewBox="0 0 100 100" width="100" height="100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="40"/>
</svg>
```

**Strategy:** Inline small SVGs in HTML, link large SVGs as separate files with caching

### 5.3 Raster Image Compression
For PNG/JPG images, use compression without loss:

**Online tools:**
- TinyPNG (PNG/JPG): https://tinypng.com
- ImageOptim (macOS): https://imageoptim.com
- JPEGMini (JPG): https://www.jpegmini.com

**Expected reduction:** 20-50% file size reduction

### 5.4 Explicit Image Dimensions
Always include width/height to prevent CLS:

```html
<!-- GOOD: dimensions prevent layout shift -->
<img src="/images/hero.jpg" width="1200" height="600" alt="Hero banner">
<svg viewBox="0 0 100 100" width="100" height="100" src="/icons/logo.svg"></svg>

<!-- BAD: missing dimensions cause CLS -->
<img src="/images/hero.jpg" alt="Hero banner">
```

### 5.5 Lazy Loading
For below-fold images, use native lazy loading:

```html
<!-- Hero image: eager loading (viewport) -->
<img src="/images/hero.jpg" width="1200" height="600" alt="Hero" loading="eager">

<!-- Below-fold images: lazy loading -->
<img src="/images/feature1.jpg" width="400" height="300" alt="Feature 1" loading="lazy">
<img src="/images/feature2.jpg" width="400" height="300" alt="Feature 2" loading="lazy">
```

### 5.6 Modern Image Formats
Serve WebP with fallback:

```html
<picture>
  <source srcset="/images/hero.webp" type="image/webp">
  <img src="/images/hero.jpg" width="1200" height="600" alt="Hero">
</picture>
```

**Compression workflow:**
1. Original: hero.jpg (150KB)
2. Convert to WebP: hero.webp (60KB)
3. Serve WebP to modern browsers, JPG to fallback

---

## STEP 6: FONT OPTIMIZATION

### 6.1 Google Fonts Strategy
Use preconnect and font-display: swap:

```html
<head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
</head>
```

**Why?**
- `preconnect`: Starts DNS + TLS earlier
- `display=swap`: Show fallback font immediately, swap when loaded

### 6.2 Font Subsetting
Only request needed weights and styles:

```html
<!-- Load only what's needed -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">

<!-- NOT this (loads 12 weights) -->
<link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet">
```

### 6.3 Self-Hosted Fonts (Alternative)
For better performance, consider self-hosting:

```css
@font-face {
  font-family: 'Inter';
  src: url('/fonts/Inter-Regular.woff2') format('woff2'),
       url('/fonts/Inter-Regular.woff') format('woff');
  font-weight: 400;
  font-display: swap;
}

@font-face {
  font-family: 'Inter';
  src: url('/fonts/Inter-Bold.woff2') format('woff2'),
       url('/fonts/Inter-Bold.woff') format('woff');
  font-weight: 700;
  font-display: swap;
}
```

**Benefits:** Remove Google Fonts dependency, faster load from same origin

### 6.4 FOUT/FOIT Prevention
Always set `font-display: swap` in Google Fonts URL or @font-face

---

## STEP 7: LAYOUT SHIFT PREVENTION (CLS)

### 7.1 Identify Layout Shift Sources
Run DevTools → Performance tab, look for purple "Layout" bars

**Common sources:**
- Images without width/height
- Fonts loading (FOIT/FOUT)
- Ads or dynamic content injecting
- Modals/overlays appearing

### 7.2 Explicit Dimensions for All Media
Every image, video, iframe must have width/height:

```html
<!-- Images -->
<img src="/images/photo.jpg" width="600" height="400" alt="Photo">

<!-- Videos -->
<video width="640" height="360" controls>
  <source src="/video.mp4" type="video/mp4">
</video>

<!-- Iframes -->
<iframe width="560" height="315" src="https://www.youtube.com/embed/..."></iframe>
```

### 7.3 Font Loading CLS
Use `font-display: swap` to prevent FOIT:

```css
/* GOOD: Show fallback first, swap when loaded */
@font-face {
  font-family: 'Custom';
  src: url('/fonts/custom.woff2') format('woff2');
  font-display: swap;
}

/* BAD: Invisible text while font loads */
@font-face {
  font-family: 'Custom';
  src: url('/fonts/custom.woff2') format('woff2');
  font-display: block;
}
```

### 7.4 Dynamic Content & CLS
Reserve space for dynamic content:

```html
<!-- Reserve space for ad/widget -->
<div style="min-height: 250px;">
  <iframe src="/widget"></iframe>
</div>

<!-- Reserve space for lazy-loaded images -->
<div style="aspect-ratio: 16/9; background: #f0f0f0;">
  <img src="/image.jpg" loading="lazy" alt="Image">
</div>
```

---

## STEP 8: ANIMATION PERFORMANCE

### 8.1 Use transform and opacity Only
GPU-accelerated properties only:

```css
/* GOOD: GPU accelerated */
.slide-in {
  animation: slideIn 0.5s ease;
}

@keyframes slideIn {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}

/* BAD: Causes layout recalculation */
@keyframes badSlide {
  from { left: -100%; }
  to { left: 0; }
}
```

### 8.2 Avoid Layout Properties in Animations
Never animate: width, height, top, left, margin, padding

```css
/* GOOD: transform */
.grow {
  animation: grow 1s ease;
}

@keyframes grow {
  from { transform: scale(1); }
  to { transform: scale(1.2); }
}

/* BAD: width animates layout */
@keyframes badGrow {
  from { width: 100px; }
  to { width: 120px; }
}
```

### 8.3 will-change Usage
Use sparingly for animations:

```css
/* Only on animated elements */
.button:hover {
  will-change: transform;
}

.button:hover {
  transform: scale(1.05);
  transition: transform 0.2s ease;
}
```

### 8.4 Respect prefers-reduced-motion
Disable animations for users who prefer reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 8.5 60fps Scrolling Verification
In DevTools → Performance, record scrolling:

1. Start recording
2. Scroll page smoothly
3. Stop recording
4. Check fps graph (should stay at 60 fps)
5. Look for dropped frames (red bars)

If drops occur, review animations and use Chrome DevTools → Rendering tab to debug

---

## STEP 9: CACHING STRATEGY

### 9.1 Cache-Control Headers (Hosting Config)
For static hosting (GitHub Pages, Netlify, Vercel, etc.), set headers:

**Example: Netlify (_headers file)**
```
/css/*
  Cache-Control: public, max-age=31536000, immutable

/js/*
  Cache-Control: public, max-age=31536000, immutable

/images/*
  Cache-Control: public, max-age=604800

/fonts/*
  Cache-Control: public, max-age=31536000, immutable

/*.html
  Cache-Control: public, max-age=3600, must-revalidate
```

**Explanation:**
- `public`: Can be cached by CDN and browsers
- `max-age=31536000`: 1 year cache (for immutable assets)
- `immutable`: Asset never changes at this URL
- `must-revalidate`: Check with server if stale

### 9.2 Cache Busting Strategy
Without build tools, use query string versioning:

```html
<!-- In HTML, manually update version number when files change -->
<link rel="stylesheet" href="/css/style.css?v=1.2.3">
<script src="/js/main.js?v=1.2.3" defer></script>

<!-- Update version in comment at top of files -->
<!-- Version: 1.2.3 - Last updated: 2026-02-27 -->
```

**Process:**
1. Make CSS/JS changes
2. Increment version number (e.g., 1.2.3 → 1.2.4)
3. Update query strings in HTML
4. Deploy — new version bypasses browser cache

### 9.3 Long-Lived Cache for Immutable Assets
Images and fonts rarely change:

```html
<!-- Version once, cache forever -->
<img src="/images/logo.svg?v=1" alt="Logo" width="100" height="100">
<img src="/images/hero.jpg?v=1" alt="Hero" width="1200" height="600">
```

With `immutable` header, these assets stay cached even after new version deployed

### 9.4 ETag Support
Most static hosting provides ETag headers automatically. Verify:

1. Open DevTools → Network tab
2. Reload page with hard refresh (Ctrl+Shift+R)
3. Check Response headers for `ETag: "..."` field
4. Reload again normally (Ctrl+R)
5. CSS/JS should return 304 Not Modified (using ETag)

---

## STEP 10: NETWORK OPTIMIZATION

### 10.1 HTTP/2 or HTTP/3
Verify hosting supports HTTP/2:

```bash
# In terminal
curl -I https://yoursite.com
# Look for:
# HTTP/2 200 OK
```

Most modern hosting (Netlify, Vercel, GitHub Pages) default to HTTP/2+

### 10.2 Compression Enabled
Verify gzip/Brotli:

```bash
curl -I -H "Accept-Encoding: gzip, deflate, br" https://yoursite.com
# Check headers:
# Content-Encoding: gzip
# OR
# Content-Encoding: br
```

Most hosting auto-compresses static assets

### 10.3 Minimize Total Requests
Audit network tab during page load:

**Goals:**
- CSS files: 1-2 (ideally 1)
- JS files: 1-2
- Font requests: 2-4 (ideally self-hosted)
- Images: As few as practical
- Total requests: < 20 for static site

**Optimization techniques:**
- Inline small CSS/JS (< 1KB)
- Combine multiple CSS files if separated
- Use SVG instead of PNG for icons
- Lazy load below-fold images

### 10.4 DNS Prefetch for External Domains
If using external services, prefetch DNS:

```html
<head>
  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

  <!-- Analytics service -->
  <link rel="dns-prefetch" href="https://www.google-analytics.com">

  <!-- CDN or external image service -->
  <link rel="dns-prefetch" href="https://cdn.example.com">
</head>
```

**Priority:**
- `preconnect`: For critical resources (fonts, APIs)
- `dns-prefetch`: For non-critical external domains

---

## TESTING CHECKLIST

- [ ] Run Lighthouse on all 6 pages (mobile + desktop)
- [ ] Record baseline CWV: LCP, FCP, CLS, INP, TTFB
- [ ] Analyze Network waterfall for blocking resources
- [ ] Minify CSS and JS files
- [ ] Optimize images (compress, format, dimensions)
- [ ] Set up Google Fonts with preconnect + font-display: swap
- [ ] Add width/height to all media elements
- [ ] Review JavaScript for memory leaks
- [ ] Test animations at 60fps
- [ ] Verify caching headers with curl
- [ ] Confirm HTTP/2 and gzip enabled
- [ ] Re-run Lighthouse — verify Performance > 90

---

## EXPECTED RESULTS

**Before optimizations:**
- Lighthouse Performance: 65-75
- LCP: 3.5-4.5s
- CLS: 0.15-0.25

**After optimizations:**
- Lighthouse Performance: > 90
- LCP: 1.8-2.3s
- CLS: < 0.05
- INP: < 150ms
