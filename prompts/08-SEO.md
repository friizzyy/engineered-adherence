# SEO & Discoverability Audit for Engineered Adherence

**Static HTML Bio-Longevity Platform**
*Domain: TBD | Language: English | Framework: None | Rendering: Static HTML*

---

## STEP 1: TECHNICAL SEO FOUNDATION

### 1.1 robots.txt
Create `/robots.txt` at the domain root:

```txt
# robots.txt
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /private/

# Crawl delay (optional, usually not needed for small sites)
Crawl-delay: 1

# Sitemap location
Sitemap: https://example.com/sitemap.xml
```

### 1.2 sitemap.xml
Create `/sitemap.xml` at the domain root:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">

  <url>
    <loc>https://example.com/index.html</loc>
    <lastmod>2026-02-27</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>

  <url>
    <loc>https://example.com/about.html</loc>
    <lastmod>2026-02-27</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>https://example.com/science.html</loc>
    <lastmod>2026-02-27</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>https://example.com/market.html</loc>
    <lastmod>2026-02-27</lastmod>
    <changefreq>bi-weekly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>https://example.com/protocols.html</loc>
    <lastmod>2026-02-27</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>https://example.com/contact.html</loc>
    <lastmod>2026-02-27</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.7</priority>
  </url>

</urlset>
```

### 1.3 Canonical URLs
Add to `<head>` of every page:
```html
<link rel="canonical" href="https://example.com/page.html" />
```

Replace `example.com` with actual domain and `/page.html` with the specific page filename.

### 1.4 URL Structure
**Recommendation:** Use clean URLs via server configuration:
- **Apache (.htaccess):** Rewrite `index.html` → `/`, `/page.html` → `/page/`
- **Nginx:** Configure location blocks to serve `.html` files transparently
- **Static hosting (Netlify, GitHub Pages, Vercel):** Built-in clean URL support

If clean URLs unavailable, keep `/page.html` structure (acceptable for static sites).

---

## STEP 2: META TAGS AUDIT & RECOMMENDATIONS

### 2.1 Title Tags
**Format:** "Page Name — Engineered Adherence" (under 60 characters)

```html
<!-- index.html -->
<title>Bio-Longevity Protocols — Engineered Adherence</title>

<!-- about.html -->
<title>About Us — Engineered Adherence</title>

<!-- science.html -->
<title>Longevity Science — Engineered Adherence</title>

<!-- market.html -->
<title>Market Insights — Engineered Adherence</title>

<!-- protocols.html -->
<title>Health Protocols — Engineered Adherence</title>

<!-- contact.html -->
<title>Contact Us — Engineered Adherence</title>
```

### 2.2 Meta Descriptions (120-160 characters)

```html
<!-- index.html -->
<meta name="description" content="Engineered Adherence: Science-backed bio-longevity protocols, peptide research, and health optimization strategies for extended healthspan." />

<!-- about.html -->
<meta name="description" content="Learn about Engineered Adherence's mission to democratize longevity science through evidence-based protocols and engineered adherence frameworks." />

<!-- science.html -->
<meta name="description" content="Explore the science behind longevity: peptides, cellular optimization, and biomarker management. Evidence-based research from Engineered Adherence." />

<!-- market.html -->
<meta name="description" content="Insights into the bio-longevity market, peptide therapeutics landscape, and emerging opportunities in health optimization." />

<!-- protocols.html -->
<meta name="description" content="Evidence-based longevity protocols: supplement stacks, exercise science, biomarker optimization. Engineered Adherence personalized health frameworks." />

<!-- contact.html -->
<meta name="description" content="Contact Engineered Adherence for inquiries, partnerships, research collaboration, and longevity protocol consultations." />
```

### 2.3 Open Graph Tags (all pages)

```html
<!-- index.html OG tags -->
<meta property="og:type" content="website" />
<meta property="og:url" content="https://example.com/index.html" />
<meta property="og:title" content="Bio-Longevity Protocols — Engineered Adherence" />
<meta property="og:description" content="Science-backed bio-longevity protocols, peptide research, and health optimization strategies." />
<meta property="og:image" content="https://example.com/images/og-homepage.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:locale" content="en_US" />

<!-- about.html OG tags -->
<meta property="og:type" content="website" />
<meta property="og:url" content="https://example.com/about.html" />
<meta property="og:title" content="About Us — Engineered Adherence" />
<meta property="og:description" content="Our mission to democratize longevity science through evidence-based protocols and frameworks." />
<meta property="og:image" content="https://example.com/images/og-about.png" />

<!-- science.html OG tags -->
<meta property="og:type" content="article" />
<meta property="og:url" content="https://example.com/science.html" />
<meta property="og:title" content="Longevity Science — Engineered Adherence" />
<meta property="og:description" content="Evidence-based research on peptides, cellular optimization, and biomarker management." />
<meta property="og:image" content="https://example.com/images/og-science.png" />

<!-- protocols.html OG tags -->
<meta property="og:type" content="article" />
<meta property="og:url" content="https://example.com/protocols.html" />
<meta property="og:title" content="Health Protocols — Engineered Adherence" />
<meta property="og:description" content="Evidence-based longevity protocols: supplement stacks, exercise science, biomarker optimization." />
<meta property="og:image" content="https://example.com/images/og-protocols.png" />

<!-- market.html OG tags -->
<meta property="og:type" content="article" />
<meta property="og:url" content="https://example.com/market.html" />
<meta property="og:title" content="Market Insights — Engineered Adherence" />
<meta property="og:description" content="Insights into the bio-longevity market and peptide therapeutics landscape." />
<meta property="og:image" content="https://example.com/images/og-market.png" />

<!-- contact.html OG tags -->
<meta property="og:type" content="website" />
<meta property="og:url" content="https://example.com/contact.html" />
<meta property="og:title" content="Contact Us — Engineered Adherence" />
<meta property="og:description" content="Get in touch for partnerships, research collaboration, and consultation." />
<meta property="og:image" content="https://example.com/images/og-contact.png" />
```

### 2.4 Twitter Card Tags (all pages)

```html
<!-- index.html Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Bio-Longevity Protocols — Engineered Adherence" />
<meta name="twitter:description" content="Science-backed bio-longevity protocols and health optimization strategies." />
<meta name="twitter:image" content="https://example.com/images/twitter-homepage.png" />
<meta name="twitter:creator" content="@EngineerAdheren" />

<!-- science.html Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Longevity Science — Engineered Adherence" />
<meta name="twitter:description" content="Evidence-based research on peptides and cellular optimization." />
<meta name="twitter:image" content="https://example.com/images/twitter-science.png" />

<!-- protocols.html Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Health Protocols — Engineered Adherence" />
<meta name="twitter:description" content="Evidence-based longevity protocols and health frameworks." />
<meta name="twitter:image" content="https://example.com/images/twitter-protocols.png" />

<!-- market.html Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Market Insights — Engineered Adherence" />
<meta name="twitter:description" content="Bio-longevity market and peptide therapeutics landscape." />
<meta name="twitter:image" content="https://example.com/images/twitter-market.png" />

<!-- about.html Twitter Card -->
<meta name="twitter:card" content="summary" />
<meta name="twitter:title" content="About Us — Engineered Adherence" />
<meta name="twitter:description" content="Our mission to democratize longevity science." />

<!-- contact.html Twitter Card -->
<meta name="twitter:card" content="summary" />
<meta name="twitter:title" content="Contact Us — Engineered Adherence" />
<meta name="twitter:description" content="Get in touch for partnerships and collaboration." />
```

---

## STEP 3: STRUCTURED DATA (Schema.org JSON-LD)

### 3.1 Organization Schema (add to index.html)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Engineered Adherence",
  "url": "https://example.com",
  "logo": "https://example.com/images/logo.png",
  "description": "Science-backed bio-longevity protocols and health optimization platform",
  "sameAs": [
    "https://twitter.com/EngineerAdheren",
    "https://linkedin.com/company/engineered-adherence"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "General",
    "email": "contact@example.com",
    "url": "https://example.com/contact.html"
  }
}
</script>
```

### 3.2 WebSite Schema with SearchAction (index.html)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Engineered Adherence",
  "url": "https://example.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://example.com/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}
</script>
```

### 3.3 WebPage/Article Schema (science.html, protocols.html)

```html
<!-- science.html -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Longevity Science",
  "description": "Evidence-based research on peptides, cellular optimization, and biomarker management.",
  "url": "https://example.com/science.html",
  "image": "https://example.com/images/science-hero.png",
  "datePublished": "2026-02-27",
  "dateModified": "2026-02-27",
  "author": {
    "@type": "Organization",
    "name": "Engineered Adherence"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Engineered Adherence",
    "logo": {
      "@type": "ImageObject",
      "url": "https://example.com/images/logo.png"
    }
  }
}
</script>

<!-- protocols.html -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Health Protocols",
  "description": "Evidence-based longevity protocols for supplement stacks, exercise, and biomarker optimization.",
  "url": "https://example.com/protocols.html",
  "image": "https://example.com/images/protocols-hero.png",
  "datePublished": "2026-02-27",
  "dateModified": "2026-02-27",
  "author": {
    "@type": "Organization",
    "name": "Engineered Adherence"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Engineered Adherence",
    "logo": {
      "@type": "ImageObject",
      "url": "https://example.com/images/logo.png"
    }
  }
}
</script>
```

### 3.4 ContactPage Schema (contact.html)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact Engineered Adherence",
  "description": "Get in touch for partnerships, research collaboration, and consultation.",
  "url": "https://example.com/contact.html",
  "mainEntity": {
    "@type": "Organization",
    "name": "Engineered Adherence",
    "email": "contact@example.com",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "General",
      "email": "contact@example.com"
    }
  }
}
</script>
```

### 3.5 BreadcrumbList Schema (all pages except index.html)

```html
<!-- about.html -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://example.com/index.html"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "About Us",
      "item": "https://example.com/about.html"
    }
  ]
}
</script>

<!-- science.html -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://example.com/index.html"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Longevity Science",
      "item": "https://example.com/science.html"
    }
  ]
}
</script>

<!-- protocols.html -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://example.com/index.html"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Health Protocols",
      "item": "https://example.com/protocols.html"
    }
  ]
}
</script>

<!-- market.html -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://example.com/index.html"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Market Insights",
      "item": "https://example.com/market.html"
    }
  ]
}
</script>

<!-- contact.html -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://example.com/index.html"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Contact",
      "item": "https://example.com/contact.html"
    }
  ]
}
</script>
```

---

## STEP 4: HEADING HIERARCHY & CONTENT STRUCTURE

### 4.1 One H1 Per Page
- **index.html:** `<h1>Engineered Adherence: Bio-Longevity Made Systematic</h1>`
- **about.html:** `<h1>Our Mission & Vision</h1>`
- **science.html:** `<h1>Longevity Science Fundamentals</h1>`
- **market.html:** `<h1>Bio-Longevity Market Landscape</h1>`
- **protocols.html:** `<h1>Evidence-Based Longevity Protocols</h1>`
- **contact.html:** `<h1>Get In Touch</h1>`

### 4.2 Sequential Heading Levels
Follow H1 → H2 → H3 hierarchy. Example for science.html:
```html
<h1>Longevity Science Fundamentals</h1>
  <h2>Peptide Research & Biomarkers</h2>
    <h3>How Peptides Enhance Cellular Function</h3>
  <h2>Molecular Aging Mechanisms</h2>
    <h3>Cellular Senescence & Telomeres</h3>
```

### 4.3 Keywords in Headings (Natural Placement)
- **Target keywords:** bio-longevity, longevity protocols, engineered adherence, health optimization, peptide science
- Place naturally in H2/H3 where content aligns
- Avoid keyword stuffing

### 4.4 Semantic HTML Structure
Use semantic elements for better crawlability:
```html
<header>
  <nav><!-- Navigation links --></nav>
</header>
<main>
  <article>
    <h1>Page Title</h1>
    <section>
      <h2>Section Title</h2>
      <p>Content...</p>
    </section>
  </article>
</main>
<aside><!-- Related content, if applicable --></aside>
<footer>
  <!-- Footer links, copyright, etc. -->
</footer>
```

---

## STEP 5: IMAGE SEO

### 5.1 Alt Text Guidelines
- **Descriptive, not keyword-stuffed** (natural keyword inclusion acceptable)
- Examples:
  ```html
  <!-- Good -->
  <img src="/images/peptide-chain-structure.png" alt="Molecular structure of peptide chain showing amino acid bonds" />

  <!-- Bad -->
  <img src="/images/img001.png" alt="peptide peptide longevity protocol peptide" />
  ```

### 5.2 Image File Names
- Descriptive, lowercase, hyphenated:
  ```
  ✓ cellular-senescence-diagram.png
  ✓ biomarker-aging-chart.jpg
  ✓ supplement-stack-infographic.svg
  ✗ img001.png
  ✗ photo.jpg
  ```

### 5.3 SVG Accessibility
- Add `<title>` and `aria-label`:
  ```html
  <svg aria-label="Longevity protocol flowchart">
    <title>Longevity Protocol Flowchart</title>
    <!-- SVG content -->
  </svg>
  ```

---

## STEP 6: INTERNAL LINKING

### 6.1 Navigation Links (All Pages)
```html
<nav>
  <a href="/index.html">Home</a>
  <a href="/about.html">About</a>
  <a href="/science.html">Science</a>
  <a href="/market.html">Market</a>
  <a href="/protocols.html">Protocols</a>
  <a href="/contact.html">Contact</a>
</nav>
```

### 6.2 Content Cross-Linking
- **science.html** → **protocols.html:** "Learn how to implement these findings in our evidence-based protocols."
- **protocols.html** → **science.html:** "The science behind this approach..."
- **about.html** → **science.html** & **protocols.html:** Link from mission statement to key content pages
- **index.html** → All pages: Feature hero links to major sections

### 6.3 Footer Links
```html
<footer>
  <nav>
    <a href="/index.html">Home</a>
    <a href="/about.html">About</a>
    <a href="/science.html">Science</a>
    <a href="/market.html">Market</a>
    <a href="/protocols.html">Protocols</a>
    <a href="/contact.html">Contact</a>
  </nav>
  <p>&copy; 2026 Engineered Adherence. All rights reserved.</p>
</footer>
```

### 6.4 Descriptive Anchor Text
```html
<!-- Good -->
<a href="/protocols.html">View our evidence-based longevity protocols</a>

<!-- Bad -->
<a href="/protocols.html">Click here</a>
```

---

## STEP 7: MOBILE & SPEED SEO SIGNALS

### 7.1 Mobile-Friendly Checklist
- Add viewport meta tag (critical):
  ```html
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  ```
- Use responsive CSS (Flexbox/Grid)
- Touch-friendly button sizes (≥48x48px)
- Readable font sizes (≥16px base)
- No fixed widths blocking mobile layout
- Test via [Google Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)

### 7.2 Page Speed Optimization
- **Minimize CSS/JS:** Minify and concatenate files
- **Image optimization:** Use modern formats (WebP), compress, use srcset for responsive images
- **Lazy load images:** `<img loading="lazy" src="..." />`
- **HTTP/2:** Ensure hosting supports HTTP/2
- **Caching headers:** Set Cache-Control headers on static assets
- **Test:** [Google PageSpeed Insights](https://pagespeed.web.dev/)

### 7.3 Core Web Vitals Targets
- **LCP (Largest Contentful Paint):** < 2.5 seconds
- **CLS (Cumulative Layout Shift):** < 0.1
- **INP (Interaction to Next Paint):** < 200ms
- **Monitor:** [Google Search Console](https://search.google.com/search-console)

---

## STEP 8: ANALYTICS & SEARCH CONSOLE SETUP

### 8.1 Google Search Console Verification
**Recommended method: HTML tag**
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add property: `https://example.com`
3. Choose **HTML tag** verification method
4. Copy provided meta tag and add to `<head>` of index.html:
   ```html
   <meta name="google-site-verification" content="[YOUR_VERIFICATION_CODE]" />
   ```
5. Verify and submit sitemap.xml

### 8.2 Google Analytics 4 Setup
Add to `<head>` of all pages (or single tag in shared header):
```html
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```
Replace `G-XXXXXXXXXX` with your GA4 measurement ID (obtain from [Google Analytics](https://analytics.google.com/)).

### 8.3 Bing Webmaster Tools (Optional)
1. Register at [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Add site property
3. Submit sitemap.xml
4. Verify ownership via HTML tag or DNS

---

## QUICK IMPLEMENTATION CHECKLIST

- [ ] Create `/robots.txt`
- [ ] Create `/sitemap.xml`
- [ ] Add viewport meta tag to all pages
- [ ] Add canonical URLs to all pages
- [ ] Add title tags to all pages
- [ ] Add meta descriptions to all pages
- [ ] Add Open Graph tags to all pages
- [ ] Add Twitter Card tags to all pages
- [ ] Add Organization schema to index.html
- [ ] Add WebSite schema to index.html
- [ ] Add WebPage/Article schema to content pages
- [ ] Add ContactPage schema to contact.html
- [ ] Add BreadcrumbList schema to all pages (except index)
- [ ] Verify one H1 per page, sequential heading hierarchy
- [ ] Add alt text to all images
- [ ] Rename image files to be descriptive
- [ ] Add internal navigation links
- [ ] Implement cross-linking between science ↔ protocols
- [ ] Test mobile-friendliness
- [ ] Run PageSpeed Insights and optimize
- [ ] Set up Google Search Console with HTML tag verification
- [ ] Set up Google Analytics 4
- [ ] (Optional) Set up Bing Webmaster Tools

---

## NOTES

- Replace `example.com` with actual domain across all examples
- Update last modified dates in sitemap.xml monthly
- Monitor GSC for crawl errors, sitemap issues, and indexing status
- Track Core Web Vitals in Google Search Console
- Review monthly analytics for top-performing pages and user behavior
- Update content regularly to maintain freshness (signals to search engines)

**Document version:** 1.0 | **Date:** 2026-02-27
