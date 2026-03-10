# Deployment & Hosting Audit for Engineered Adherence

**Project Type:** Static Website (HTML/CSS/JS only)
**Build System:** None
**Package Manager:** None
**Framework:** None

---

## STEP 1: HOSTING PLATFORM SELECTION

### 1.1 Recommended Options for Static Sites

| Platform | Free Tier | Subdomain | Custom Domain | HTTPS | Headers Config | Form Handling | CDN |
|----------|-----------|-----------|---------------|-------|-----------------|---------------|----|
| **GitHub Pages** | Yes (unlimited) | `username.github.io` | Yes | Yes (auto) | No | No | Limited |
| **Netlify** | Yes (100GB/mo) | `name.netlify.app` | Yes | Yes (auto) | Yes (_headers) | Yes (built-in) | Yes (global) |
| **Vercel** | Yes (100GB/mo) | `name.vercel.app` | Yes | Yes (auto) | Yes (vercel.json) | No (use Formspree) | Yes (global) |
| **Cloudflare Pages** | Yes (unlimited) | `name.pages.dev` | Yes | Yes (auto) | Yes (_headers.txt) | No (use Formspree) | Yes (Cloudflare) |

### 1.2 Comparison & Analysis

**GitHub Pages**
- Simplest setup: push to repo, auto-deploy
- No headers support (limitation for security headers)
- Best for: developers who live in GitHub
- Workaround for headers: use Cloudflare as DNS proxy

**Netlify** ⭐ RECOMMENDED
- Most features for static sites
- Native form handling (perfect for contact form)
- Easy _headers file configuration
- Branch previews for pull requests
- Deploy notifications
- Best for: static sites with contact forms

**Vercel**
- Fast CDN and excellent performance
- No native form handling (requires external service like Formspree)
- Headers config via vercel.json
- Best for: Next.js, but also good for static sites

**Cloudflare Pages**
- Extremely fast global CDN
- Unlimited free tier
- Headers via _headers.txt
- Best for: maximum performance and security

### 1.3 Recommendation

**Primary: Netlify** (balance of ease + features + form handling)
**Alternative: GitHub Pages + Cloudflare** (lowest cost + excellent performance)

---

## STEP 2: PRE-DEPLOYMENT CHECKLIST

### 2.1 Code Quality & Errors
- [ ] Run all pages locally in browser (Chrome, Firefox, Safari if possible)
- [ ] Open browser DevTools → Console tab: **NO red errors**
- [ ] Open DevTools → Network tab: **NO 404s or failed requests**
- [ ] Test on mobile viewport (iPhone SE, Android phone sizes)

### 2.2 Remove Debug Code
- [ ] Remove all `console.log()` statements from production JS
- [ ] Remove `debugger;` statements
- [ ] Remove TODO comments or mark with appropriate issue links
- [ ] Check for commented-out code: delete or document

### 2.3 Fix Path References
- [ ] All links use relative paths: `./pages/about.html` NOT `/pages/about.html`
- [ ] Images use relative paths: `./images/logo.png` NOT `http://localhost:8000/images/logo.png`
- [ ] CSS imports use relative paths: `./styles/main.css`
- [ ] JS imports use relative paths if using modules
- [ ] No hardcoded localhost URLs

### 2.4 Optimize Assets
- [ ] Images compressed (use TinyPNG, ImageOptim, or Squoosh)
- [ ] JPEGs: quality 75-80
- [ ] PNGs: run through OptiPNG or similar
- [ ] WebP formats for modern browsers (with PNG fallback)
- [ ] SVGs: minified using SVGO or similar
- [ ] Remove unused images

### 2.5 Minify CSS & JavaScript (Optional but Recommended)
- [ ] CSS minified: use CSSNano, csso, or online minifiers
- [ ] JS minified: use Terser or online minifiers
- [ ] OR rely on host auto-minification (Netlify does this)
- [ ] Map files NOT deployed to production

### 2.6 SEO & Discovery Files
- [ ] Create `robots.txt` in root directory (example below)
- [ ] Create `sitemap.xml` in root directory (example below)
- [ ] Test: navigate to `https://yourdomain.com/robots.txt` → should return text

### 2.7 Favicons & Icons
- [ ] `favicon.ico` in root directory (32x32)
- [ ] `apple-touch-icon.png` in root directory (180x180)
- [ ] Add to `<head>`:
  ```html
  <link rel="icon" href="./favicon.ico" type="image/x-icon">
  <link rel="apple-touch-icon" href="./apple-touch-icon.png">
  ```

### 2.8 Meta Tags on All Pages
- [ ] `<title>` tags unique and descriptive (50-60 chars)
- [ ] `<meta name="description">` on all pages (150-160 chars)
- [ ] `<meta name="viewport" content="width=device-width, initial-scale=1">`
- [ ] `<meta charset="UTF-8">`
- [ ] OpenGraph tags for social sharing:
  ```html
  <meta property="og:title" content="Page Title">
  <meta property="og:description" content="Page description">
  <meta property="og:image" content="./images/og-image.png">
  <meta property="og:type" content="website">
  ```
- [ ] Twitter Card tags (if sharing on Twitter):
  ```html
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Page Title">
  <meta name="twitter:description" content="Description">
  <meta name="twitter:image" content="./images/twitter-image.png">
  ```

### 2.9 Analytics (Optional)
- [ ] Google Analytics 4 tag added to all pages (or in layout template)
- [ ] Tag ID: `G-XXXXXXXXXX`
- [ ] Place before closing `</head>` tag:
  ```html
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  </script>
  ```

---

## STEP 3: DOMAIN & DNS CONFIGURATION

### 3.1 Custom Domain Setup

**Via Netlify:**
1. Go to Site Settings → Domain Management
2. Click "Add custom domain"
3. Enter domain (e.g., `example.com`)
4. Netlify provides DNS records or CNAME to point domain

**DNS Records Needed:**

For Netlify:
```
example.com          A     75.75.75.200  (or provided IP)
www.example.com      CNAME example.netlify.app
```

For Vercel:
```
example.com          A     76.76.19.0
www.example.com      CNAME cname.vercel-dns.com
```

For Cloudflare Pages:
```
example.com          CNAME account.pages.dev
www.example.com      CNAME account.pages.dev
```

For GitHub Pages:
```
example.com          A     185.199.108.153
                     A     185.199.109.153
                     A     185.199.110.153
                     A     185.199.111.153
www.example.com      CNAME username.github.io
```

### 3.2 SSL/HTTPS Automatic Provisioning
- All platforms auto-provision Let's Encrypt certificates
- HTTPS enabled by default (no configuration needed)
- Certificate renewal: automatic

### 3.3 www vs Non-www Redirect

**Netlify:** In Netlify UI: Site Settings → Domain Management → set "primary domain" to `example.com`

**Vercel:** Set in `vercel.json`:
```json
{
  "redirects": [
    {
      "source": "/",
      "destination": "https://example.com/"
    }
  ]
}
```

**GitHub Pages:** Add to `_config.yml`:
```yaml
url: "https://example.com"
```

### 3.4 Email DNS Records (If Email Needed)
- MX records (Mail Exchange)
- SPF record: `v=spf1 include:provider.com ~all`
- DKIM record (provided by email service)
- DMARC record: `v=DMARC1; p=none;`
- Work with email provider for exact values

---

## STEP 4: SECURITY HEADERS CONFIGURATION

### 4.1 Netlify _headers File

Create `public/_headers` (or `_headers` in root):

```
# Security Headers
/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: SAMEORIGIN
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), microphone=(), camera=()
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload

# Content Security Policy
/*
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://www.google-analytics.com; font-src 'self'; object-src 'none'; frame-ancestors 'none'

# Caching Headers
/assets/*
  Cache-Control: public, max-age=31536000, immutable

/*.css
  Cache-Control: public, max-age=31536000, immutable

/*.js
  Cache-Control: public, max-age=31536000, immutable

/images/*
  Cache-Control: public, max-age=31536000, immutable

/*.html
  Cache-Control: public, max-age=3600, must-revalidate

/
  Cache-Control: public, max-age=3600, must-revalidate

# Compression (automatic on Netlify)
/*
  Content-Encoding: gzip
```

**Deployment:** Place file at root of project. Netlify auto-detects and applies.

### 4.2 Vercel vercel.json Headers

Create `vercel.json` in root:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "SAMEORIGIN"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "geolocation=(), microphone=(), camera=()"
        },
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=31536000; includeSubDomains; preload"
        },
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://www.google-analytics.com"
        }
      ]
    },
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/(.*)\\.css",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/(.*)\\.js",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/(.*)\\.html",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=3600, must-revalidate"
        }
      ]
    }
  ]
}
```

### 4.3 GitHub Pages Limitations & Workaround

**GitHub Pages does NOT support custom headers.**

**Workaround:** Use Cloudflare as DNS proxy:
1. Change DNS nameservers to Cloudflare
2. In Cloudflare: add HTTP request rules for headers
3. Or use Cloudflare Pages instead (no nameserver change needed)

### 4.4 Required Headers Explained

| Header | Purpose |
|--------|---------|
| `X-Content-Type-Options: nosniff` | Prevent MIME type sniffing |
| `X-Frame-Options: SAMEORIGIN` | Prevent clickjacking |
| `X-XSS-Protection: 1; mode=block` | Enable browser XSS filters |
| `Referrer-Policy: strict-origin-when-cross-origin` | Control referrer info |
| `Permissions-Policy` | Disable unnecessary APIs (geolocation, camera, mic) |
| `Strict-Transport-Security` | Force HTTPS for 1 year |
| `Content-Security-Policy` | Control resource loading (prevents inline code injection) |

---

## STEP 5: PERFORMANCE CONFIGURATION

### 5.1 CDN Caching

All recommended platforms provide global CDN automatically:
- **Netlify:** Global edge locations (auto)
- **Vercel:** Vercel Edge Network (auto)
- **Cloudflare Pages:** Cloudflare's global network (auto)
- **GitHub Pages:** GitHub's CDN (limited)

**No configuration needed** — enabled by default.

### 5.2 Cache-Control Headers

Already configured in `_headers` (Netlify) or `vercel.json` (Vercel):

- **Static assets** (CSS, JS, images): `max-age=31536000, immutable`
  - Immutable means never revalidate (browser trusts forever)
  - Only use for versioned files (e.g., `bundle.a3c2f1.js`)

- **HTML files**: `max-age=3600, must-revalidate`
  - 1 hour cache, but revalidate after
  - Ensures users get latest content quickly

- **Root index.html**: `max-age=3600, must-revalidate`

### 5.3 Gzip & Brotli Compression

**Automatic on all platforms:**
- Netlify: auto-enables Gzip + Brotli
- Vercel: auto-enables compression
- Cloudflare Pages: auto-enables compression
- GitHub Pages: auto-enables Gzip

**No configuration needed.**

### 5.4 HTTP/2 Support

**Automatic on all platforms over HTTPS.**

All modern platforms default to HTTP/2 (faster multiplexing).

---

## STEP 6: CONTINUOUS DEPLOYMENT

### 6.1 Git-Based Deployment

**Netlify:**
1. Connect GitHub repo in Netlify dashboard
2. Select branch to deploy (default: main)
3. Set build command: `# (none for static sites)`
4. Set publish directory: `./` or `./public`
5. Push to main → auto-deploy in 1-2 minutes

**Vercel:**
1. Import project from GitHub
2. Configure root directory if needed
3. No build command required
4. Push to main → auto-deploy

**Cloudflare Pages:**
1. Connect GitHub repo in Cloudflare dashboard
2. Set build command: (leave blank for static)
3. Set output directory: `./` or `./public`
4. Push to main → auto-deploy

**GitHub Pages:**
1. Enable Pages in repo Settings
2. Select main branch as source
3. No build command needed
4. Push to main → auto-deploy

### 6.2 Branch Preview Deployments

**Netlify & Vercel:** Auto-create preview URLs for pull requests
- Example: PR #42 → `https://pr-42-project.netlify.app`
- Test changes before merging
- Automatic cleanup after PR closes

**GitHub Pages & Cloudflare:** Optional (requires additional setup)

### 6.3 Deploy Notifications

**Netlify:** Built-in email notifications for deploys
- Configure in Site Settings → Build & Deploy

**Vercel:** Built-in email notifications
- Configure in Project Settings → Notifications

**GitHub Pages:** Use GitHub Actions for notifications

### 6.4 Rollback Procedure

**Netlify:**
1. Go to Deploys page
2. Click on previous deploy
3. Click "Publish deploy" to restore

**Vercel:**
1. Go to Deployments
2. Click three dots on previous deployment
3. Select "Promote to Production"

**Cloudflare Pages:**
1. Go to Deployments
2. Click previous deployment
3. Click "Rollback"

**GitHub Pages:**
1. Revert commit: `git revert <commit-hash>`
2. Push to main
3. Auto-deploy reverted version

---

## STEP 7: MONITORING & UPTIME

### 7.1 Uptime Monitoring

**UptimeRobot (Free):**
1. Go to uptimerobot.com
2. Sign up free account
3. Create HTTP monitor for `https://yourdomain.com`
4. Check interval: 5 minutes
5. Get alerts via email/SMS if down

**Pingdom (Free):**
1. Go to pingdom.com
2. Create monitor for main domain
3. 5-minute check interval (free tier)
4. Alerts to email

### 7.2 Google Search Console Setup

1. Go to search.google.com/search-console
2. Add property (URL: https://yourdomain.com)
3. Verify ownership (choose one method):
   - HTML file upload
   - HTML meta tag
   - Google Analytics (if linked)
4. Submit sitemap: `/sitemap.xml`
5. Monitor: search performance, indexing, crawl errors

### 7.3 Error Monitoring

For static sites:
- **404 Errors:** Check Google Search Console → Coverage
- **Page speed issues:** Use Lighthouse via Google Search Console
- **Broken links:** Use web crawler (Screaming Frog free version)

---

## STEP 8: POST-DEPLOYMENT VERIFICATION

### 8.1 Verify All Pages Load

- [ ] Navigate to `https://yourdomain.com` → loads without errors
- [ ] Click through all navigation links
- [ ] Verify all pages display correctly
- [ ] Check mobile responsiveness on production URL
- [ ] Test on multiple browsers (Chrome, Firefox, Safari)

### 8.2 Verify HTTPS & Redirects

- [ ] Navigate to `http://yourdomain.com` → redirects to HTTPS ✓
- [ ] Navigate to `https://www.yourdomain.com` → redirects to primary domain ✓
- [ ] Certificate shows valid (green padlock in browser) ✓
- [ ] Check certificate details: issuer = Let's Encrypt

### 8.3 Verify Security Headers

Go to **securityheaders.com** and enter `https://yourdomain.com`:
- [ ] Content-Security-Policy present ✓
- [ ] X-Frame-Options present ✓
- [ ] X-Content-Type-Options: nosniff ✓
- [ ] Strict-Transport-Security present ✓
- [ ] Target grade: A or A+ (minimum B)

### 8.4 Verify Lighthouse Scores

Use **Google PageSpeed Insights** (https://pagespeed.web.dev):
1. Enter production URL
2. Check Mobile & Desktop scores
3. Target: Performance >90, Accessibility >90, Best Practices >90, SEO >90

### 8.5 Verify SEO Files

- [ ] `https://yourdomain.com/robots.txt` → returns text ✓
- [ ] `https://yourdomain.com/sitemap.xml` → returns XML ✓
- [ ] Validate sitemap: sitemapvalidator.com ✓

### 8.6 Submit to Google Search Console

1. Go to Google Search Console
2. Select property (yourdomain.com)
3. Go to Sitemaps
4. Click "Add/test sitemap"
5. Enter: `sitemap.xml`
6. Submit
7. Wait 24-48 hours for indexing

---

## CONFIGURATION FILE TEMPLATES

### robots.txt Template

```
User-agent: *
Allow: /
Disallow: /private/
Disallow: /admin/

Sitemap: https://yourdomain.com/sitemap.xml
```

### sitemap.xml Template

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yourdomain.com/</loc>
    <lastmod>2026-02-27</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://yourdomain.com/about.html</loc>
    <lastmod>2026-02-27</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://yourdomain.com/contact.html</loc>
    <lastmod>2026-02-27</lastmod>
    <priority>0.8</priority>
  </url>
</urlset>
```

### .gitignore Template

```
# OS
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
*.swp
*.swo

# Build artifacts (if using build tools)
dist/
build/
node_modules/

# Environment
.env
.env.local
```

---

## FINAL DEPLOYMENT CHECKLIST

- [ ] Pre-deployment checklist complete (Section 2)
- [ ] Domain registered and DNS configured (Section 3)
- [ ] Security headers configured (Section 4)
- [ ] Hosting platform selected and repo connected (Section 1)
- [ ] Deploy triggered and completed successfully
- [ ] All production verification checks pass (Section 8)
- [ ] Sitemap submitted to Google Search Console
- [ ] Uptime monitoring configured
- [ ] Team has deploy access and rollback knowledge
- [ ] Documentation shared with team

---

## SUPPORT & TROUBLESHOOTING

**Netlify Issues:** https://docs.netlify.com/
**Vercel Issues:** https://vercel.com/docs
**Cloudflare Pages:** https://developers.cloudflare.com/pages/
**GitHub Pages:** https://docs.github.com/en/pages

Contact platform support via dashboard if deploy fails.
