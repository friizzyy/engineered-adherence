# Phase 2: Contact Form & External Integrations Audit

**Project Context:** Engineered Adherence is a **static website with NO backend, NO API routes, NO database**. This phase repurposes the traditional "Backend & API Audit" into a comprehensive audit of client-side contact form handling, external resource integrations, and data integrity.

---

## STEP 1: CONTACT FORM AUDIT

### 1.1 Form HTML Structure

**Objective:** Verify the contact form (contact.html) follows semantic HTML standards and accessibility best practices.

**Audit Checklist:**
- [ ] Form element wraps all inputs with proper `<form>` tag
- [ ] Each input has a unique `id` attribute
- [ ] Each input has an associated `<label>` with matching `for` attribute
- [ ] Input types are semantically correct:
  - `type="text"` for name
  - `type="email"` for email
  - `type="text"` for subject
  - `type="textarea"` for message (or `<textarea>` element)
- [ ] `required` attributes present on all mandatory fields
- [ ] `autocomplete` attributes set appropriately:
  - `name`: `autocomplete="name"`
  - `email`: `autocomplete="email"`
  - `subject`: `autocomplete="off"` (typically)
- [ ] Form has a descriptive `aria-label` or `aria-labelledby`

**Inspection Command:**
```bash
grep -n "contact\|form\|input\|textarea\|label" index.html contact.html 2>/dev/null | head -50
```

**Example Compliant HTML:**
```html
<form id="contactForm" method="POST" action="#">
  <div class="form-group">
    <label for="contactName">Full Name</label>
    <input
      id="contactName"
      type="text"
      name="name"
      required
      autocomplete="name"
      aria-required="true"
    />
  </div>

  <div class="form-group">
    <label for="contactEmail">Email Address</label>
    <input
      id="contactEmail"
      type="email"
      name="email"
      required
      autocomplete="email"
      aria-required="true"
    />
  </div>

  <div class="form-group">
    <label for="contactSubject">Subject</label>
    <input
      id="contactSubject"
      type="text"
      name="subject"
      required
      autocomplete="off"
      aria-required="true"
    />
  </div>

  <div class="form-group">
    <label for="contactMessage">Message</label>
    <textarea
      id="contactMessage"
      name="message"
      required
      rows="6"
      aria-required="true"
    ></textarea>
  </div>

  <button type="submit" id="submitBtn">Send Message</button>
</form>
```

### 1.2 Client-Side Validation

**Objective:** Ensure form data is validated before submission and users receive clear feedback.

**Audit Checklist:**
- [ ] HTML5 validation attributes prevent invalid submissions
- [ ] JavaScript validation intercepts form submission with `preventDefault()`
- [ ] Error messages are user-friendly and field-specific
- [ ] Error messages are announced to screen readers via `aria-live="polite"`
- [ ] Success/error states provide visual feedback (colors, icons, text)
- [ ] Form fields regain focus after validation errors

**Example Validation Script:**
```javascript
const contactForm = document.getElementById('contactForm');
const errorContainer = document.getElementById('formErrors');

function validateForm(formData) {
  const errors = [];

  if (!formData.name || formData.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters.');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    errors.push('Please enter a valid email address.');
  }

  if (!formData.subject || formData.subject.trim().length < 3) {
    errors.push('Subject must be at least 3 characters.');
  }

  if (!formData.message || formData.message.trim().length < 10) {
    errors.push('Message must be at least 10 characters.');
  }

  return errors;
}

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  errorContainer.innerHTML = '';

  const formData = {
    name: document.getElementById('contactName').value,
    email: document.getElementById('contactEmail').value,
    subject: document.getElementById('contactSubject').value,
    message: document.getElementById('contactMessage').value
  };

  const errors = validateForm(formData);

  if (errors.length > 0) {
    errorContainer.setAttribute('role', 'alert');
    errorContainer.setAttribute('aria-live', 'polite');
    errorContainer.innerHTML = '<ul>' +
      errors.map(e => `<li>${e}</li>`).join('') +
      '</ul>';
    return;
  }

  // Proceed to submission handling
  handleFormSubmission(formData);
});
```

### 1.3 Form Submission Handling

**Objective:** Determine how the form is submitted and ensure the chosen method is secure and appropriate.

**Audit Checklist:**
- [ ] Form does NOT default to `mailto:` (poor UX, reveals email)
- [ ] Form uses one of:
  - [ ] **Recommended:** Formspree (https://formspree.io) — free tier available
  - [ ] **Recommended:** Netlify Forms (if deployed to Netlify)
  - [ ] **Alternative:** GitHub Issues template (create issue on GitHub repo)
  - [ ] **Not Recommended:** Client-side service workers (unreliable)
- [ ] Form submission endpoint is HTTPS-secured
- [ ] CORS headers are properly configured if cross-origin

**Implementation Example (Formspree):**
```html
<form
  id="contactForm"
  action="https://formspree.io/f/YOUR_FORM_ID"
  method="POST"
>
  <!-- form fields as above -->
  <button type="submit">Send Message</button>
</form>
```

**Or with Fetch API:**
```javascript
async function handleFormSubmission(formData) {
  const submitBtn = document.getElementById('submitBtn');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';

  try {
    const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      showSuccessMessage('Thank you! We\'ll be in touch soon.');
      contactForm.reset();
    } else {
      showErrorMessage('Failed to send. Please try again.');
    }
  } catch (error) {
    showErrorMessage('Network error. Please try again.');
    console.error('Form submission error:', error);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Message';
  }
}
```

### 1.4 Spam Prevention

**Objective:** Reduce bot submissions without degrading user experience.

**Audit Checklist:**
- [ ] **Honeypot field:** Hidden input that legitimate users won't fill
  ```html
  <input type="text" name="website" style="display:none;" aria-hidden="true" />
  ```
- [ ] **Validation:** Check honeypot is empty before submission
  ```javascript
  if (formData.website && formData.website.trim() !== '') {
    console.warn('Honeypot triggered');
    return;
  }
  ```
- [ ] **NO CAPTCHA:** Static site doesn't require it; honeypot + validation sufficient
- [ ] **Rate limiting:** If using Formspree/Netlify, they handle server-side limits
- [ ] **Form submission throttling:** Prevent multiple rapid submissions
  ```javascript
  let isSubmitting = false;
  contactForm.addEventListener('submit', async (e) => {
    if (isSubmitting) {
      e.preventDefault();
      return;
    }
    isSubmitting = true;
    // ... submission logic
    isSubmitting = false;
  });
  ```

### 1.5 Success/Error States

**Objective:** Users must know the outcome of their submission attempt.

**Audit Checklist:**
- [ ] Success message displayed after submission
- [ ] Success message persists for 5-10 seconds or until dismissed
- [ ] Error message displayed if submission fails
- [ ] Submit button shows loading state (disabled, spinner, or text change)
- [ ] Form is cleared after successful submission
- [ ] Success/error messages are keyboard accessible

**Example Helper Functions:**
```javascript
function showSuccessMessage(message) {
  const successDiv = document.createElement('div');
  successDiv.className = 'alert alert-success';
  successDiv.setAttribute('role', 'status');
  successDiv.setAttribute('aria-live', 'polite');
  successDiv.textContent = message;

  const formContainer = document.getElementById('formContainer');
  formContainer.insertBefore(successDiv, formContainer.firstChild);

  setTimeout(() => successDiv.remove(), 8000);
}

function showErrorMessage(message) {
  const errorDiv = document.createElement('div');
  errorDiv.className = 'alert alert-danger';
  errorDiv.setAttribute('role', 'alert');
  errorDiv.setAttribute('aria-live', 'assertive');
  errorDiv.textContent = message;

  const formContainer = document.getElementById('formContainer');
  formContainer.insertBefore(errorDiv, formContainer.firstChild);
}
```

### 1.6 Accessibility

**Objective:** Form must be usable by all users, including those with disabilities.

**Audit Checklist:**
- [ ] All form labels properly associated with inputs (`for` attribute)
- [ ] Form is keyboard navigable (Tab order is logical)
- [ ] Focus indicators are visible (`:focus` styling)
- [ ] Error messages announced to screen readers (`aria-live="polite"` or `role="alert"`)
- [ ] Required fields marked with both `required` attribute and visual indicator (*)
- [ ] Form controls have sufficient color contrast (WCAG AA minimum)
- [ ] Submit button is clearly labeled (not just an icon)

**Focus Management CSS:**
```css
input:focus,
textarea:focus,
button:focus {
  outline: 3px solid #4CAF50;
  outline-offset: 2px;
}

.form-group label {
  font-weight: 600;
  margin-bottom: 0.5rem;
  display: block;
}

.required::after {
  content: ' *';
  color: #d32f2f;
}
```

---

## STEP 2: EXTERNAL RESOURCE AUDIT

### 2.1 Google Fonts Loading

**Objective:** Verify Google Fonts are loaded efficiently and don't block page rendering.

**Audit Checklist:**
- [ ] Fonts loaded with `<link rel="preconnect">` to google.com and fonts.gstatic.com
- [ ] `font-display: swap` applied to allow content to display while fonts load
- [ ] Minimal font variants selected (avoid loading every weight/style)
- [ ] Fonts are woff2 format (most efficient)

**Optimized Implementation:**
```html
<head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link
    href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&family=Source+Code+Pro:wght@400&display=swap"
    rel="stylesheet"
  >
</head>
```

**Inspection Command:**
```bash
grep -i "google\|fonts\|cdn" *.html | grep -i href
```

### 2.2 Third-Party Scripts

**Objective:** Identify all external scripts and assess necessity and security.

**Audit Checklist:**
- [ ] No Google Analytics or tracking pixels (static site, unnecessary)
- [ ] No chat widgets or live support widgets
- [ ] No third-party form handlers if using Formspree/Netlify
- [ ] Any scripts present are from trusted sources (verify domains)
- [ ] Scripts loaded with `async` or `defer` to avoid blocking rendering

**Inspection Command:**
```bash
grep -n "<script" *.html | grep -v "^<script>$"
```

**Expected Output:**
```html
<!-- Should be minimal; only project-specific scripts -->
<script src="js/main.js" defer></script>
<script src="js/form-handler.js" defer></script>
```

### 2.3 External CDN Dependencies

**Objective:** Audit any CDN-hosted resources (CSS frameworks, icon libraries).

**Audit Checklist:**
- [ ] No Bootstrap, Tailwind CDN, or other heavy frameworks (site should be custom CSS)
- [ ] Icon libraries (if any) are lightweight or inline SVGs
- [ ] All CDN URLs use HTTPS
- [ ] No redundant or unused CDN resources

**Example Audit:**
```bash
grep -E "https?://[^\"']+" *.html | grep -v "fonts.googleapis" | grep -v "formspree"
```

### 2.4 Resource Integrity (SRI)

**Objective:** Protect against CDN tampering using Subresource Integrity hashes.

**Audit Checklist:**
- [ ] External stylesheets have `integrity` attribute with SRI hash
- [ ] External scripts have `integrity` attribute with SRI hash
- [ ] `crossorigin="anonymous"` set on resources with SRI hashes

**Example:**
```html
<link
  rel="stylesheet"
  href="https://cdn.example.com/library.css"
  integrity="sha384-abc123def456..."
  crossorigin="anonymous"
>

<script
  src="https://cdn.example.com/script.js"
  integrity="sha384-xyz789uvw012..."
  crossorigin="anonymous"
  defer
></script>
```

**Generate SRI Hash (Command):**
```bash
# Generate SRI for a remote resource
openssl dgst -sha384 -binary file.js | openssl base64 -A
```

---

## STEP 3: LINK INTEGRITY AUDIT

### 3.1 Internal Links

**Objective:** Verify all internal navigation links point to valid pages.

**Audit Checklist:**
- [ ] All href attributes reference existing .html files
- [ ] No broken anchors (e.g., `#nonexistent-section`)
- [ ] Relative links use correct paths (`../`, `./`)
- [ ] No hardcoded absolute paths pointing to local filesystem

**Inspection Commands:**
```bash
# Find all internal links
grep -oh 'href="[^"]*"' *.html | grep -v "http" | sort -u

# Check for broken links
for link in $(grep -oh 'href="[^"]*"' *.html | grep -v "http" | sed 's/href="//; s/"//'); do
  [ ! -f "${link%#*}" ] && echo "BROKEN: $link"
done

# Check for anchor links
grep -oh 'href="#[^"]*"' *.html | sort -u
```

**Expected Valid Links:**
```
index.html
about.html
contact.html
projects.html
css/styles.css
js/main.js
```

### 3.2 External Links

**Objective:** Document and verify all external links.

**Audit Checklist:**
- [ ] All external links have `target="_blank"` for user control
- [ ] External links have `rel="noopener noreferrer"` for security
- [ ] No dead links to external resources (spot check a few)

**Inspection Command:**
```bash
grep -oh 'href="https?://[^"]*"' *.html | sort -u
```

**Example Compliant External Link:**
```html
<a href="https://example.com/resource" target="_blank" rel="noopener noreferrer">
  External Resource
</a>
```

### 3.3 Navigation Consistency

**Objective:** Verify navigation menus are consistent across all pages.

**Audit Checklist:**
- [ ] Header/nav bar appears on all pages with same content
- [ ] Footer appears on all pages with same content
- [ ] Active page indicator works correctly (e.g., `class="active"`)
- [ ] Mobile navigation (hamburger menu) functions consistently

**Inspection Command:**
```bash
# Check header consistency
grep -A 10 "<header\|<nav" index.html contact.html about.html 2>/dev/null | head -50
```

---

## STEP 4: DATA HANDLING

### 4.1 localStorage Usage

**Objective:** Audit client-side storage for theme preferences or other non-sensitive data.

**Audit Checklist:**
- [ ] localStorage only stores **non-sensitive** data (theme preference is acceptable)
- [ ] Theme preference does NOT store user ID, email, or any PII
- [ ] localStorage keys are namespaced (e.g., `app-theme` not just `theme`)
- [ ] localStorage values are validated before use
- [ ] Clear localStorage on logout (if applicable)

**Safe Example:**
```javascript
// SAFE: Storing theme preference
function saveTheme(themeName) {
  if (['light', 'dark'].includes(themeName)) {
    localStorage.setItem('app-theme', themeName);
  }
}

function loadTheme() {
  return localStorage.getItem('app-theme') || 'light';
}

// Apply theme
const theme = loadTheme();
document.documentElement.setAttribute('data-theme', theme);
```

**Unsafe Example (DO NOT DO):**
```javascript
// UNSAFE: Never store sensitive data
localStorage.setItem('user-email', formData.email);  // ❌ WRONG
localStorage.setItem('api-key', 'secret123');         // ❌ WRONG
```

### 4.2 No Sensitive Data in Client-Side Storage

**Objective:** Ensure no PII or secrets leak through browser storage.

**Audit Checklist:**
- [ ] sessionStorage is empty (no sensitive data stored)
- [ ] localStorage contains ONLY theme/preference data
- [ ] No API keys, tokens, or credentials in localStorage/sessionStorage
- [ ] No user emails, names, or contact information stored
- [ ] Browser DevTools Storage inspection reveals no sensitive data

**Inspection Command (DevTools):**
```javascript
// Run in browser console to audit
console.log('LocalStorage:', localStorage);
console.log('SessionStorage:', sessionStorage);
```

### 4.3 Form Data Never Stored Client-Side

**Objective:** Verify form submissions don't inadvertently cache sensitive form data.

**Audit Checklist:**
- [ ] Form fields are cleared immediately after successful submission
- [ ] Contact form data is NOT logged to console in production
- [ ] No form data saved to localStorage or sessionStorage
- [ ] Browser autocomplete is not disabled unnecessarily (except for sensitive fields)
- [ ] Contact form has no hidden inputs storing data

**Safe Form Submission Cleanup:**
```javascript
async function handleFormSubmission(formData) {
  try {
    const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      // IMPORTANT: Clear form and data
      contactForm.reset();

      // Do NOT store
      // localStorage.setItem('lastMessage', formData.message); // ❌ WRONG

      showSuccessMessage('Message sent!');
    }
  } catch (error) {
    console.error('Form error:', error);
  }
}
```

---

## AUDIT EXECUTION CHECKLIST

- [ ] Run all grep commands above; document findings
- [ ] Manually test form submission end-to-end
- [ ] Test form validation with invalid inputs
- [ ] Test form accessibility with keyboard navigation
- [ ] Test form on mobile device (responsive)
- [ ] Inspect Network tab in DevTools; verify no sensitive data in request bodies
- [ ] Inspect Console for warnings/errors
- [ ] Inspect Application tab (localStorage, sessionStorage, cookies)
- [ ] Test with screen reader (NVDA, JAWS, or VoiceOver)
- [ ] Verify all external links load correctly
- [ ] Document any third-party services and their privacy policies
- [ ] Create summary report of findings and remediation steps

---

## EXPECTED STATIC SITE COMPLIANCE

✅ **Should Have:**
- Contact form with client-side validation
- Formspree/Netlify Forms integration OR documented alternative
- Google Fonts (optimized with preconnect, font-display swap)
- No backend API, database, or server logic
- Custom CSS (no heavy frameworks)
- Minimal third-party scripts
- Accessible, keyboard-navigable forms
- HTTPS-secured external resources
- No sensitive data in client-side storage

❌ **Should NOT Have:**
- Backend API routes
- Database connections
- Authentication/authorization logic
- API keys or credentials in source code
- Heavy JavaScript frameworks
- Google Analytics or tracking
- User data storage or logging
- Server-side form processing

---

**Next Phase:** After completing this audit, proceed to Phase 3: SEO & Performance Audit.
