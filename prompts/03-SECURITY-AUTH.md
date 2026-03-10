# Security & Content Protection Audit
## "Engineered Adherence" — Static Website Security Review

**Project Type:** Static website (NO backend, NO auth system, NO database, NO API keys, NO user accounts)
**Scope:** HTML/CSS/JS security hardening for static site hosting
**Priority:** Prevent data leakage, XSS attacks, and content tampering

---

## STEP 1: SECRETS & SENSITIVE DATA SCAN

### 1.1 Scan for Hardcoded API Keys, Tokens, and Credentials

**Risk:** Accidentally committed secrets in source code are immediately exposed on public static sites.

**Commands to run:**
```bash
# Search for common secret patterns in all files
grep -r "api[_-]?key\|password\|secret\|token\|credentials" --include="*.html" --include="*.js" --include="*.css" .

# Search for AWS, Stripe, Firebase patterns
grep -r "AKIA\|sk_live\|sk_test\|AIza" --include="*.js" --include="*.html" .

# Check for private keys (should NEVER exist in static files)
grep -r "BEGIN PRIVATE KEY\|BEGIN RSA PRIVATE KEY" --include="*.js" --include="*.html" .

# Check for .env patterns
grep -r "\.env\|process\.env" --include="*.js" .
```

**What to look for:**
- `const API_KEY = "xxxxx"` in JavaScript files
- Email credentials in contact form handlers
- Firebase/Stripe/Supabase keys in config files
- Stripe public keys (technically safe, but verify they're marked as PUBLIC)

**Remediation:**
- Remove ALL hardcoded secrets immediately
- Use `.gitignore` to exclude any config files (see 1.3)
- If public keys are needed (Stripe, Google Maps), mark them clearly and rotate if exposed

### 1.2 Hardcoded Email Addresses — Scraping Prevention

**Risk:** Bots scrape email addresses from static HTML for spam/phishing.

**Commands:**
```bash
# Find email patterns in HTML/JS
grep -r "[a-zA-Z0-9._%+-]\+@[a-zA-Z0-9.-]\+\.[a-zA-Z]\{2,\}" --include="*.html" --include="*.js" .

# Example output: contact@example.com, info@engineered-adherence.com
```

**Current state check:**
- Contact form `action` or `mailto:` links → Obfuscate these
- Team member emails in "About" section → Use contact form instead
- Support/feedback emails → Hide behind contact form

**Obfuscation solution (JavaScript):**
```html
<!-- Instead of: <a href="mailto:contact@example.com">Email us</a> -->
<a id="email-link" href="#">Email us</a>
<script>
  // ROT13 or simple reversal to avoid trivial scraping
  document.getElementById('email-link').href = 'mailto:' +
    atob('Y29udGFjdEBleGFtcGxlLmNvbQ=='); // Base64 encoded
</script>
```

### 1.3 .gitignore Configuration

**Ensure this file exists and contains:**
```gitignore
# Sensitive files (should never be committed)
.env
.env.local
.env.*.local
config/secrets.js
.DS_Store

# Dependencies
node_modules/
package-lock.json

# Build artifacts
dist/
build/

# IDE
.vscode/
.idea/
*.swp

# OS
Thumbs.db
.DS_Store
```

**Verify with:**
```bash
git status --ignored  # Check what's being ignored
git log --all --oneline -- ".env" # Confirm no secrets in history
```

### 1.4 Git History Secrets Check

**Risk:** Even if deleted from current code, secrets may exist in git history.

**Commands:**
```bash
# Scan entire git history for secrets
git log -p --all -- "*.js" "*.html" | grep -i "api\|password\|secret\|token"

# Use git-secrets tool (install if available)
git secrets --scan  # Scans staged changes
git secrets --scan-history  # Scans all history

# Manual check: look for unusual commits
git log --oneline | head -20
git show <commit-hash> | grep -i secret
```

**If secrets found:**
1. Rotate the secret immediately (invalidate old tokens/keys)
2. Rewrite git history with `git filter-branch` or `bfg-repo-cleaner`
3. Force push only if you own the repository

---

## STEP 2: SECURITY HEADERS AUDIT

Static sites rely entirely on HTTP headers set by the hosting provider. These headers CANNOT be set in HTML.

### 2.1 Content Security Policy (CSP)

**Purpose:** Prevent inline script injection and control resource loading.

**Recommended CSP for static sites:**
```
Content-Security-Policy:
  default-src 'self';
  script-src 'self' https://fonts.googleapis.com;
  style-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com;
  img-src 'self' data: https:;
  font-src 'self' https://fonts.gstatic.com;
  connect-src 'self';
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self'
```

**Key directives:**
- `script-src 'self'` — Only allow scripts from your domain (no inline scripts)
- `style-src 'self'` — Stylesheets from your domain only
- `img-src 'self' data: https:` — Images from your domain, data URIs, or HTTPS
- `frame-ancestors 'none'` — Prevent clickjacking (don't allow site in iframes)
- `form-action 'self'` — Forms can only submit to your domain

### 2.2 Additional Security Headers

```
X-Content-Type-Options: nosniff
  → Prevent MIME type sniffing attacks

X-Frame-Options: DENY
  → Prevent clickjacking by disallowing iframe embedding

X-XSS-Protection: 1; mode=block
  → Legacy XSS filter (modern browsers use CSP instead)

Referrer-Policy: strict-origin-when-cross-origin
  → Control how much referrer info is leaked to external sites
```

### 2.3 Referrer-Policy

```
Referrer-Policy: strict-origin-when-cross-origin
  → Send origin only for cross-origin requests (privacy-friendly)

Alternative:
  Referrer-Policy: no-referrer (maximum privacy, may break analytics)
```

### 2.4 Permissions-Policy (Feature Policy)

```
Permissions-Policy:
  camera=(),
  microphone=(),
  geolocation=(),
  payment=(),
  usb=()
  → Explicitly disable features your site doesn't use
```

### 2.5 HSTS (Strict-Transport-Security)

```
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
  → Force HTTPS for 1 year, all subdomains
  → includeSubDomains: apply to all subdomains
  → preload: add to HSTS preload list (optional, for high-security sites)
```

### Hosting Provider Configurations

#### **Netlify (_headers file)**
```
# netlify.toml or _headers file
[[headers]]
for = "/*"

[headers.values]
  Content-Security-Policy = "default-src 'self'; script-src 'self' https://fonts.googleapis.com; style-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'"
  X-Content-Type-Options = "nosniff"
  X-Frame-Options = "DENY"
  X-XSS-Protection = "1; mode=block"
  Referrer-Policy = "strict-origin-when-cross-origin"
  Strict-Transport-Security = "max-age=31536000; includeSubDomains; preload"
  Permissions-Policy = "camera=(), microphone=(), geolocation=(), payment=(), usb=()"
```

#### **Vercel (vercel.json)**
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' https://fonts.googleapis.com; style-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=31536000; includeSubDomains; preload"
        }
      ]
    }
  ]
}
```

#### **GitHub Pages (_config.yml + Netlify Edge)**
GitHub Pages doesn't support custom headers natively. Options:
1. Use Netlify as CDN in front of GitHub Pages
2. Use Cloudflare Pages (supports custom headers)
3. Deploy to alternative platform (Vercel, Netlify)

#### **Apache (.htaccess)**
```apache
# Enable HTTPS only
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{HTTPS} off
  RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
</IfModule>

# Security headers
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "DENY"
  Header set X-XSS-Protection "1; mode=block"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
  Header set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
  Header set Content-Security-Policy "default-src 'self'; script-src 'self' https://fonts.googleapis.com; style-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'"
</IfModule>
```

---

## STEP 3: XSS PREVENTION

### 3.1 innerHTML Usage Audit

**Command to find dangerous patterns:**
```bash
grep -r "innerHTML\s*=" --include="*.js" .
```

**Dangerous:**
```javascript
// ❌ XSS vulnerability
document.getElementById('output').innerHTML = userInput;
```

**Safe alternatives:**
```javascript
// ✅ Use textContent for plain text (strips HTML)
document.getElementById('output').textContent = userInput;

// ✅ Use innerText
document.getElementById('output').innerText = userInput;

// ✅ If HTML needed, sanitize first (use DOMPurify library)
document.getElementById('output').innerHTML = DOMPurify.sanitize(userInput);
```

### 3.2 Contact Form XSS Prevention

**Vulnerable code:**
```javascript
// ❌ Directly inserting user input
form.onsubmit = function(e) {
  const userMessage = document.getElementById('message').value;
  fetch('/send-email', {
    method: 'POST',
    body: JSON.stringify({ message: userMessage })
  });
};
```

**Safe code:**
```javascript
// ✅ Sanitize input before processing
form.onsubmit = function(e) {
  e.preventDefault();
  const userMessage = document.getElementById('message').value;

  // Validate length
  if (userMessage.length === 0 || userMessage.length > 5000) {
    alert('Message must be 1-5000 characters');
    return;
  }

  // Sanitize by removing HTML tags
  const sanitized = userMessage
    .replace(/[<>]/g, '') // Remove < and >
    .trim();

  // Send to service (e.g., Formspree, Netlify Forms)
  fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: document.getElementById('email').value,
      message: sanitized
    })
  });
};
```

### 3.3 Dangerous Functions — Never Use

**Commands to find dangerous patterns:**
```bash
grep -r "eval(\|new Function(\|setTimeout.*function\|setInterval.*function" --include="*.js" .
```

**Dangerous patterns to REMOVE:**
```javascript
// ❌ NEVER use eval()
eval(userInput);

// ❌ NEVER use Function constructor
new Function(userInput)();

// ❌ NEVER use setTimeout/setInterval with strings
setTimeout("updateUI()", 1000); // ❌ WRONG
setTimeout(updateUI, 1000);     // ✅ CORRECT

// ❌ NEVER use innerHTML to execute scripts
el.innerHTML = '<script>alert("xss")</script>'; // Won't execute, but still risky
```

### 3.4 URL Parameter Security

**Risk:** Reading URL parameters and using them unsafely.

**Vulnerable:**
```javascript
// ❌ XSS via query parameter
const params = new URLSearchParams(window.location.search);
const name = params.get('name');
document.getElementById('greeting').innerHTML = `Hello, ${name}!`; // XSS!
```

**Safe:**
```javascript
// ✅ Use textContent instead of innerHTML
const params = new URLSearchParams(window.location.search);
const name = params.get('name');
document.getElementById('greeting').textContent = `Hello, ${name}!`; // Safe
```

---

## STEP 4: HTTPS & TRANSPORT SECURITY

### 4.1 HTTPS Enforcement

**Verify HTTPS is enabled:**
```bash
curl -I https://engineered-adherence.com  # Should return 200
curl -I http://engineered-adherence.com   # Should redirect to HTTPS (301/302)
```

**Hosting verification:**
- Netlify: HTTPS automatic, check "Force HTTPS" toggle in site settings
- Vercel: HTTPS automatic
- GitHub Pages: HTTPS automatic for github.io domains
- Custom domain: Use Let's Encrypt (free) or AWS Certificate Manager

**Force HTTPS in configuration:**

Netlify: Enable "Force HTTPS" in Deployment Settings
Vercel: Automatic
Apache: Add to .htaccess (see Step 2)

### 4.2 Mixed Content Check

**Risk:** Loading HTTP resources on HTTPS page breaks security.

**Command to find mixed content:**
```bash
grep -r "http://" --include="*.html" --include="*.js" --include="*.css" . | grep -v "http://example.com\|http://localhost"

# Look specifically for resources
grep -r 'src="http://\|href="http://' --include="*.html" .
```

**Fix all URLs to use HTTPS or protocol-relative:**
```html
<!-- ❌ Never this -->
<img src="http://example.com/image.jpg">

<!-- ✅ Use protocol-relative (https:// on HTTPS pages) -->
<img src="https://example.com/image.jpg">

<!-- ✅ Or use // for auto-detection -->
<img src="//example.com/image.jpg">
```

### 4.3 Secure Storage Alternatives (localStorage)

**Note:** Static sites can use localStorage, but treat it as user-visible storage.

**Secure practices:**
```javascript
// ✅ Store non-sensitive data only
localStorage.setItem('theme', 'dark'); // Fine
localStorage.setItem('userPreferences', JSON.stringify(prefs)); // Fine

// ❌ Never store sensitive data
localStorage.setItem('apiKey', token); // ❌ WRONG
localStorage.setItem('password', pwd); // ❌ WRONG

// Use sessionStorage for temporary data (cleared on tab close)
sessionStorage.setItem('temporaryData', data); // Better than localStorage
```

---

## STEP 5: DEPENDENCY SECURITY

### 5.1 External Scripts Audit

**Commands to find external dependencies:**
```bash
grep -r '<script src=' --include="*.html" .
grep -r '<link.*href=' --include="*.html" . | grep -v "rel=\"stylesheet\""
grep -r 'import.*from.*http' --include="*.js" .
```

**Expected for "Engineered Adherence":**
- Google Fonts (CSS/font files) — Safe
- Optional: Analytics (Plausible, Fathom) — Check if needed

**Audit checklist:**
```
☑ Google Fonts: Safe, widely used, no tracking
☑ No jQuery, Bootstrap, or other large frameworks
☑ No Google Analytics (or equivalent) tracking
☑ No third-party ad networks
☑ No tracking pixels or beacons
☑ No external form services (unless using Formspree/Netlify Forms)
```

### 5.2 Subresource Integrity (SRI)

**Purpose:** Verify external resources haven't been tampered with.

**Generate SRI hash:**
```bash
# For Google Fonts CSS
curl https://fonts.googleapis.com/css2?family=Roboto | openssl dgst -sha384 -binary | openssl enc -base64 -A

# Example output: sha384-AbcD1234efGH5678ijkL9012mnoPQR...
```

**Use in HTML:**
```html
<!-- Without SRI (vulnerable to CDN compromise) -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto">

<!-- With SRI (verifies integrity) -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto"
      integrity="sha384-AbcD1234efGH5678ijkL9012mnoPQR..."
      crossorigin="anonymous">

<!-- For scripts -->
<script src="https://example.com/library.js"
        integrity="sha384-XyZ9876..."
        crossorigin="anonymous"></script>
```

### 5.3 CDN Risk Assessment

**Current state:** If using Google Fonts only, risk is LOW.

**Mitigations:**
- Self-host Google Fonts locally (download and serve from your domain)
- Or use SRI hashes (see 5.2)
- Monitor dependencies with `npm audit` (if using Node.js build process)

---

## STEP 6: CONTACT FORM SECURITY

### 6.1 Input Sanitization

**Email validation:**
```javascript
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Usage
const email = document.getElementById('email').value.trim();
if (!validateEmail(email)) {
  alert('Invalid email address');
  return;
}
```

**Message sanitization:**
```javascript
function sanitizeInput(input) {
  // Remove HTML tags, limit length
  return input
    .trim()
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .substring(0, 5000);      // Limit to 5000 chars
}
```

**Complete form handler:**
```javascript
document.getElementById('contactForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  // Validation
  if (!name || name.length > 100) {
    alert('Name must be 1-100 characters');
    return;
  }

  if (!validateEmail(email)) {
    alert('Invalid email address');
    return;
  }

  if (!message || message.length > 5000) {
    alert('Message must be 1-5000 characters');
    return;
  }

  // Sanitize
  const sanitized = {
    name: sanitizeInput(name),
    email: email,
    message: sanitizeInput(message)
  };

  // Submit to secure endpoint
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sanitized)
    });

    if (response.ok) {
      alert('Message sent successfully!');
      document.getElementById('contactForm').reset();
    } else {
      alert('Error sending message. Please try again.');
    }
  } catch (error) {
    alert('Error: ' + error.message);
  }
});
```

### 6.2 Honeypot Spam Prevention

**Add a hidden field that bots will fill but humans won't:**
```html
<form id="contactForm">
  <label for="name">Name (required)</label>
  <input type="text" id="name" name="name" required>

  <label for="email">Email (required)</label>
  <input type="email" id="email" name="email" required>

  <!-- Honeypot field (hidden from users) -->
  <input type="text" id="website" name="website" style="display:none;">

  <label for="message">Message (required)</label>
  <textarea id="message" name="message" required></textarea>

  <button type="submit">Send</button>
</form>

<script>
  document.getElementById('contactForm').addEventListener('submit', (e) => {
    // If honeypot is filled, it's a bot
    if (document.getElementById('website').value !== '') {
      e.preventDefault();
      alert('Spam detected!');
      return;
    }
    // Continue with normal form submission...
  });
</script>
```

### 6.3 Secure Form Submission Endpoints

**Options for static sites (NO backend):**

1. **Netlify Forms** (recommended for Netlify-hosted sites)
```html
<form name="contact" method="POST" netlify>
  <input type="text" name="name" required>
  <input type="email" name="email" required>
  <textarea name="message" required></textarea>
  <button type="submit">Send</button>
</form>
```

2. **Formspree** (works on any static host)
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
  <input type="email" name="email" required>
  <textarea name="message" required></textarea>
  <button type="submit">Send</button>
</form>
```

3. **Basin** (another form backend)
```html
<form action="https://basin.launch.studio/YOUR_BASIN_ID" method="POST">
  <!-- form fields -->
</form>
```

**Never use:**
- `form action="mailto:contact@example.com"` — Exposes email, unreliable
- `form action="http://yourdomain.com/send"` — Requires backend server

---

## Quick Security Checklist

- [ ] No API keys, passwords, or tokens in code
- [ ] Email addresses obfuscated or hidden behind contact form
- [ ] `.gitignore` configured properly
- [ ] No secrets in git history
- [ ] CSP, X-Frame-Options, HSTS headers configured
- [ ] HTTPS enforced (redirect from HTTP)
- [ ] No mixed content (all resources use HTTPS)
- [ ] No innerHTML with user input
- [ ] No eval(), Function(), or dangerous functions
- [ ] Contact form validates and sanitizes input
- [ ] Honeypot spam prevention enabled
- [ ] External dependencies (Google Fonts) use SRI hashes
- [ ] Form submission uses secure endpoint (Netlify Forms, Formspree, etc.)

---

**Last Updated:** 2026-02-27
**Review Cycle:** Before each production deployment
**Owner:** Security Team
