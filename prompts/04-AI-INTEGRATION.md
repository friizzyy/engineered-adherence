# Phase 4: Content & Copy Audit

## Overview

**Project Status:** Static website (HTML/CSS/JS only) — No backend, no AI integrations, no APIs

**Audit Focus:** Content quality, accuracy, consistency, and accessibility across all 6 pages of the Engineered Adherence bio-longevity platform.

Since this is a health science and bio-longevity platform, **content quality and accuracy are critically important.** This audit ensures the copy maintains a premium, scientifically authoritative tone while remaining accessible and consistent throughout the site.

---

## STEP 1: CONTENT INVENTORY

### 1.1 Catalog All Text Content by Page

**Pages in Scope:**
- `index.html` (Homepage)
- `about.html` (About/Company)
- `science.html` (Science/Pillars)
- `protocols.html` (Protocols/Programs)
- `market.html` (Market Analysis)
- `contact.html` (Contact/Consultation)

**Key Content Sections to Audit:**

#### Homepage (index.html)
- Navigation labels
- Hero eyebrow text
- Hero title
- Hero subtitle
- Call-to-action button text
- Section labels (e.g., "The Philosophy")
- Section headings
- Section body copy
- Statistics and labels
- Pillar card titles and descriptions
- Footer content

#### About Page (about.html)
- Page hero section
- Navigation tabs (01–04 labels)
- Panel headers (numbered)
- Body content for each panel
- Card titles and descriptions
- Section labels
- Statistics labels and values

#### Science Page (science.html)
- Page hero section
- Pillar navigation tabs (I–V)
- Panel headers for each pillar
- Pillar descriptions
- Compound names and dosages
- Clinical data/evidence text
- Card content

#### Protocols Page (protocols.html)
- Page hero section
- Protocol tabs (selector labels)
- Protocol names
- Protocol descriptions
- Duration and dosage information
- Instructions/guidance text

#### Market Page (market.html)
- Page hero section
- Navigation tabs
- Panel headers
- Analysis content
- Statistics and labels

#### Contact Page (contact.html)
- Page hero section
- Form labels
- Form placeholder text
- Contact information labels and values
- Success message text

### 1.2 Identify Heading Hierarchy

**Check for each page:**
- H1 presence and placement
- H2, H3, H4 usage
- Presence of section-label spans (not headings but serve as section overlines)
- Data attributes or CSS classes that indicate semantic structure

### 1.3 Check for Placeholder/Lorem Ipsum Text

**Search for:**
- "lorem ipsum"
- "placeholder"
- "TODO"
- "TEMP"
- "FIX ME"
- "DRAFT"
- Generic demo text that doesn't belong in a health/science platform

### 1.4 Check for Draft Markers

**Search for:**
- Comments with `//TODO`, `/*TODO*/`, `<!-- TODO -->`
- Incomplete sentences ending with "..."
- Text in brackets like `[add content]` or `[INSERT]`

---

## STEP 2: CONTENT QUALITY

### 2.1 Spelling and Grammar Check

**Scope:** All visible text across all pages

**Common Issues to Check:**
- Correct spelling of medical/scientific terms:
  - "Peptide" vs. "peptides"
  - "BPC-157" (hyphen, correct format)
  - "GHK-Cu" (correct case and punctuation)
  - "Semax," "Retatrutide," "Tirzepatide," "Semaglutide," "MK-677" (correct capitalization)
- Consistent use of hyphens vs. dashes (en-dash for ranges: "8–12 weeks")
- Subject-verb agreement
- Consistent tense (present tense for general statements, past for clinical data)
- Proper spacing around punctuation

**High-Priority Terms (must be correct):**
- All compound names (BPC-157, GHK-Cu, etc.)
- All dosages (10mg, 50mg format)
- All percentages (24%, 40%, 87%, etc.)
- Medical terminology (peptide, therapeutic, clinical, adherence)
- Geographic references (Qatar, Doha)

### 2.2 Consistent Tone of Voice

**Target Tone:**
- Premium, authoritative, scientifically grounded
- Professional but not cold or jargon-heavy
- Confident without being aggressive
- Evidence-based language ("clinically validated," "peer-reviewed," "clinical trials")
- No hype or unsubstantiated claims

**Check for:**
- Consistent language formality across pages (avoid mixing casual and formal)
- Consistent voice perspective (first-person "we," not "I")
- Balanced claims (use "shown to," "demonstrated," "validated" — not "proven" alone)
- Confidence in evidence base (reference clinical data consistently)

**Red Flags:**
- Sales language that oversells ("best," "ultimate," "revolutionary" without context)
- Unprofessional tone shifts
- Vague claims ("helps with," "may improve")
- Overly technical jargon without explanation

### 2.3 Consistent Terminology

**Key Terms — Must Be Used Consistently:**
- "Protocol(s)" — use consistently (not "program," "regimen," or "package")
- "Peptide(s)" — correct singular/plural usage
- "Therapeutic(s)" or "therapeutics" — consistent with platform branding
- "Adherence" vs. "compliance" — prefer "adherence" (brand-aligned)
- "Clinical data," "clinical research," "clinical trials" — consistent phrasing
- "Outcomes" or "results" — use both, but maintain consistency per context
- "Assessment" vs. "consultation" — define and use consistently

**Compound Name Consistency:**
- Always use full compound names on first mention (e.g., "BPC-157 (Body Protection Compound-157)" on first reference, then "BPC-157")
- Verify spelling in every instance (BPC-157 not BPC157)

**Pillar Names (must be consistent):**
- Pillar I: Longevity
- Pillar II: Recovery
- Pillar III: Metabolic
- Pillar IV: Cognitive
- Pillar V: Performance

### 2.4 CTA Clarity and Consistency

**Current CTAs Found in Codebase:**
- "Explore Protocols"
- "Learn More"
- "Explore All Pillars"
- "Book Consultation"
- "Get Started"

**Check for:**
- Consistent CTA button text (same action = same text)
- Clear action language (verb-first: "Book," "Explore," "Learn," "Get")
- Appropriate context for each CTA (don't use "Learn More" when "Book Consultation" is appropriate)
- No generic CTAs ("Click here," "Read more")

**Recommended CTA Standard:**
- Primary CTA: "Book Consultation"
- Secondary CTA: "Explore [Section Name]" or "Learn More"
- High-engagement CTA: "Get Started"

### 2.5 Content Hierarchy and Flow

**For Each Page, Verify:**
- Information flows logically (intro → detail → action)
- Headings accurately preview following content
- No orphaned paragraphs or content without context
- Paragraphs are scannable (short, focused ideas)
- Transitions between sections are clear

**Homepage Specific:**
- Hero section frames the value proposition
- Pillars section explains the core offer
- Call-to-action appears at logical engagement points

**About Page Specific:**
- Four panels (01–04) build a narrative:
  1. Problem (compliance/adherence gap)
  2. Solution (clinical evidence)
  3. Identity (what we are/aren't)
  4. Team (credibility)
- Each panel should complete one thought

---

## STEP 3: HEADING HIERARCHY

### 3.1 One H1 Per Page

**Required Structure:**
- Each page MUST have exactly ONE `<h1>` tag
- H1 should be the main page heading (not in navigation)
- Typically located in page hero section

**Current Status (to verify):**
- Homepage: `<h1 class="hero-title">The science of sustained change</h1>`
- About: `<h1 class="section-title">70% of Qatar's adults are overweight. We address that.</h1>`
- Science: `<h1>` (verify presence)
- Protocols: `<h1>` (verify presence)
- Market: `<h1>` (verify presence)
- Contact: `<h1 class="section-title">Begin with a private consultation</h1>`

### 3.2 Sequential Heading Levels

**Rules:**
- No skipping levels (don't go H1 → H3, must use H2 first)
- H2 sections contain H3 subsections, H3 contain H4, etc.
- Consistent indentation of heading importance

**Check for:**
- H1 at top level (page title)
- H2 for major sections
- H3 for subsections
- H4 for detail/component-level headings
- No H5 or H6 usage (indicates too-deep nesting)

### 3.3 Headings Are Descriptive and SEO-Friendly

**Criteria:**
- Each heading should be a standalone statement that makes sense
- Avoid generic headings ("Overview," "Introduction") — be specific
- Include relevant keywords naturally (peptides, clinical, outcomes)
- Headings should anticipate user questions

**Examples of Good Headings:**
- "Clinically Validated Peptide Protocols"
- "70% of Qatar's Adults Are Overweight. We Address That."
- "Five Pillars. Real Outcomes."
- "The Compliance Problem is Universal"

**Examples of Weak Headings (avoid):**
- "Overview"
- "Details"
- "Learn More"
- "Section 2"

### 3.4 Consistent Heading Styling

**Check CSS:**
- All H2 tags use same font size, weight, color
- All H3 tags consistent
- H4 tags consistent
- "Section label" elements (overlines) styled consistently
- No inline style overrides that break consistency

---

## STEP 4: LINK TEXT & CTAs

### 4.1 No "Click Here" or "Read More" Without Context

**Rule:** Every link must have descriptive anchor text that makes sense out of context.

**Examples of Good Link Text:**
- "Explore Protocols"
- "Learn More About Recovery"
- "Book Consultation"
- "View All Pillars"

**Examples of Bad Link Text (avoid):**
- "Click here"
- "Read more"
- "More"
- "Link"

### 4.2 All Links Have Descriptive Text (for Accessibility & SEO)

**Audit:**
- Check all `<a href="">` tags
- Verify link text is descriptive (not just an icon or arrow)
- Check that `aria-label` attributes are present on icon-only links
- Verify link text describes the destination

**Current Navigation Links (verify):**
- Homepage: "Engineered Adherence" logo links to index
- Navigation: "About," "Science," "Protocols," "Market" (all clear)
- "Book Consultation" (clear CTA)

### 4.3 CTA Buttons Have Clear Action Text

**Examples:**
- "Book Consultation" (clear action: booking)
- "Explore Protocols" (clear action: exploration)
- "Learn More" (clear action: to learn additional info)

**Check for:**
- No question-mark CTAs ("Want to learn more?")
- Action verbs at the start (Explore, Learn, Book, Get, Discover)
- Consistent verb across same action types

### 4.4 Consistent CTA Styling and Language

**Visual Consistency:**
- Primary buttons styled identically
- Secondary buttons use consistent alternate style
- Ghost buttons (outlined) used consistently
- Hover states work on all CTAs

**Language Consistency:**
- Same CTA = same text everywhere ("Book Consultation," not "Schedule," "Consult," "Call")
- Plural/singular consistent ("Explore Protocols" not "Explore Protocol")

---

## STEP 5: IMAGE & MEDIA CONTENT

### 5.1 All Images Have Meaningful Alt Text

**Requirement:**
- Every `<img>` tag must have an `alt=""` attribute
- Alt text should describe image content (not "image of" or "picture")
- Alt text is concise but descriptive (6–10 words ideal)

**Examples:**
- `<img alt="GHK-Cu peptide vial with steel blue liquid">` ✓
- `<img alt="image">` ✗ (too vague)
- `<img alt="Diagram showing five pillars of health">` ✓

### 5.2 SVG Vials Have Appropriate ARIA Labels or Titles

**Homepage Vials (5 SVG graphics):**
- Cognitive (Semax, 10mg)
- Recovery (BPC-157, 10mg)
- Longevity (GHK-Cu, 50mg)
- Metabolic (Retatrutide, 10mg)
- Performance (MK-677, 10mg)

**Check for:**
- Each vial `<svg>` has either:
  - `<title>` element inside SVG with description, OR
  - `aria-label` on the parent container, OR
  - `role="img"` with `aria-label`

**Example:**
```html
<svg class="vial-svg" aria-label="Longevity peptide vial: GHK-Cu, 50mg">
```

### 5.3 Decorative Images Missing Alt="" (Empty Alt for Decorative)

**Rule:**
- Purely decorative images use `alt=""`
- Icons that convey meaning use `aria-label` or `title`
- Divider lines, ornamental elements use `aria-hidden="true"` if SVG

**Current Elements to Check:**
- Circle dividers in hero (decorative? if so, `aria-hidden="true"`)
- Vial reflections (purely decorative? `alt=""`)
- Section divider lines (`aria-hidden="true"`)

### 5.4 Image Filenames Are Descriptive

**Rule:** File names should reflect content (not IMG_001, IMG_124).

**Examples:**
- `vial-longevity-ghk-cu.png` ✓
- `pillar-recovery-diagram.svg` ✓
- `img_001.jpg` ✗
- `temp-img.png` ✗

---

## STEP 6: LEGAL & COMPLIANCE CONTENT

### 6.1 Health/Science Claims — Disclaimers Needed?

**Current Claims in Copy:**
- "Patients lose up to 24% body weight"
- "Recover 40% faster"
- "87% protocol completion"
- "Clinically validated peptide protocols"
- "FDA-approved compounds" (mentioned on About page)

**Compliance Assessment:**
- Are all claims backed by clinical references?
- Do claims specify source (Phase 2 trials, clinical research)?
- Are percentages qualified (e.g., "in clinical trials," "in controlled settings")?
- Any unsubstantiated claims present?

**Recommended Action:**
- Review each health claim to ensure it includes:
  - Source of evidence (trial name, publication, or clinical context)
  - Qualification of applicability ("in clinical trials," "shown to," "demonstrated")
  - Absence of absolutes ("may," "can," "shown to" not "will," "guarantees")

**Check for Missing Disclaimers:**
- If claims are made about disease treatment → May need disclaimer
- If targeting specific populations → May need medical advice disclaimer
- If not FDA-approved products mentioned → May need regulatory clarity

### 6.2 Contact Information Visible and Accurate

**Contact Page Audit:**
- Address provided (location in Doha, Qatar)
- Phone number provided
- Email address provided
- Business hours (if applicable)
- All contact info is current and accurate

**Navigation Accessibility:**
- Contact form easily accessible
- "Book Consultation" CTA present on every page
- Footer contains contact link

### 6.3 Privacy Policy / Terms of Service Links (If Needed)

**Current Status:**
- Check if footer contains privacy policy link
- Check if footer contains terms of service link
- If not present, assess if needed (depends on form data collection, commercial nature)

**Recommendation:**
- Contact form exists → Privacy policy recommended (how is data used?)
- Collecting personal info → Privacy policy required
- Terms of service → Recommended for commercial platform

### 6.4 Copyright Notice in Footer

**Current Footer (verify):**
```
2026 Engineered Adherence
Doha, Qatar
```

**Assessment:**
- Copyright symbol (©) present? ✓ or ✗
- Year current? (2026 for Feb 2025) ✓
- Company name clear? ✓

**Recommended:**
```
© 2026 Engineered Adherence. All rights reserved.
Doha, Qatar.
```

---

## REVIEW CHECKLISTS BY PAGE

### HOMEPAGE (index.html)

- [ ] **Heading Hierarchy**
  - [ ] One H1 present ("The science of sustained change")
  - [ ] H2 for section titles ("Five Pillars. Real Outcomes." etc.)
  - [ ] No heading level skipping
  - [ ] All headings descriptive and SEO-friendly

- [ ] **Content Accuracy**
  - [ ] Hero tagline is clear and compelling
  - [ ] All statistics correct (87%, 24%, 40%)
  - [ ] Pillar names and descriptions accurate
  - [ ] No placeholder or draft text

- [ ] **Copy Consistency**
  - [ ] CTA buttons consistent ("Book Consultation," "Explore Protocols," "Learn More")
  - [ ] Terminology consistent ("protocols" not "programs," "peptides" spelled correctly)
  - [ ] Tone matches brand (premium, scientific, authoritative)
  - [ ] No tone shifts between sections

- [ ] **Links & Accessibility**
  - [ ] All navigation links descriptive
  - [ ] CTAs have clear action text
  - [ ] No "click here" or vague CTAs
  - [ ] Links have proper href attributes

- [ ] **Images & Media**
  - [ ] 5 vials have ARIA labels (Cognitive, Recovery, Longevity, Metabolic, Performance)
  - [ ] Vial names and dosages visible/correct
  - [ ] Decorative circles have `aria-hidden="true"`
  - [ ] No missing alt text

- [ ] **Technical**
  - [ ] Page title is descriptive: "Engineered Adherence - Bio-Longevity Platform"
  - [ ] No console errors
  - [ ] Theme toggle works (dark/light mode)

---

### ABOUT PAGE (about.html)

- [ ] **Heading Hierarchy**
  - [ ] One H1 in page-hero ("70% of Qatar's adults are overweight...")
  - [ ] H2 for panel headers (numbered 01–04)
  - [ ] H3+ for subsections within panels
  - [ ] Sequential levels throughout

- [ ] **Content Accuracy**
  - [ ] Problem panel (01) accurately states compliance challenges
  - [ ] Solution panel (02) cites correct clinical data
  - [ ] Identity panel (03) clearly defines what the platform is/isn't
  - [ ] Team panel (04) credibility claims verified
  - [ ] All statistics accurate and sourced

- [ ] **Copy Consistency**
  - [ ] Terminology consistent across panels
  - [ ] Tone remains authoritative and premium
  - [ ] No redundant explanations between panels
  - [ ] "Adherence" used consistently (not "compliance")

- [ ] **Navigation & UX**
  - [ ] Panel tabs (01–04) labeled clearly
  - [ ] Active tab state is obvious
  - [ ] Panel transitions smooth
  - [ ] CTA to contact form clear

- [ ] **Technical**
  - [ ] Page title: "About - Engineered Adherence"
  - [ ] No missing form functionality
  - [ ] Responsive design works on mobile

---

### SCIENCE PAGE (science.html)

- [ ] **Heading Hierarchy**
  - [ ] One H1 for page heading
  - [ ] Pillar (I–V) section headings are H2
  - [ ] Clinical evidence sections are H3
  - [ ] No skipping levels

- [ ] **Pillar Content**
  - [ ] All 5 pillars present and labeled correctly:
    - [ ] Pillar I: Longevity (GHK-Cu)
    - [ ] Pillar II: Recovery (BPC-157)
    - [ ] Pillar III: Metabolic (Retatrutide)
    - [ ] Pillar IV: Cognitive (Semax)
    - [ ] Pillar V: Performance (MK-677)
  - [ ] Compound names spelled correctly
  - [ ] Dosages correct (GHK-Cu 50mg, others 10mg)

- [ ] **Clinical Data**
  - [ ] Evidence presented is accurate
  - [ ] Trial names/sources included where cited
  - [ ] No overstated claims
  - [ ] Percentages and outcomes clearly attributed

- [ ] **Copy Quality**
  - [ ] Tone is scientific and authoritative
  - [ ] Explanations are accessible (not overly technical)
  - [ ] No placeholder text
  - [ ] Navigation between pillars works smoothly

- [ ] **Accessibility**
  - [ ] Pillar tabs clearly labeled (I–V with names)
  - [ ] Content sections scannable
  - [ ] Links to protocols/contact are clear

---

### PROTOCOLS PAGE (protocols.html)

- [ ] **Heading Hierarchy**
  - [ ] One H1 for page heading
  - [ ] H2 for protocol section headers
  - [ ] H3+ for subsections (dosage, duration, steps)

- [ ] **Protocol Information**
  - [ ] All protocol names are clear and distinct
  - [ ] Duration of each protocol specified (weeks/months)
  - [ ] Dosages and compounds are accurate
  - [ ] Instructions/guidance clear and complete

- [ ] **Copy Consistency**
  - [ ] Use "protocol" consistently (not "program," "package")
  - [ ] Tone remains educational and authoritative
  - [ ] No placeholder or incomplete text

- [ ] **CTA & Navigation**
  - [ ] Clear CTA to book consultation after protocol details
  - [ ] Protocol selector is intuitive
  - [ ] Links to science page for more info work

- [ ] **Technical**
  - [ ] Page title: "Protocols - Engineered Adherence"
  - [ ] Protocol tabs switch content smoothly
  - [ ] Mobile responsive

---

### MARKET PAGE (market.html)

- [ ] **Heading Hierarchy**
  - [ ] One H1 for page heading
  - [ ] H2 for market sections
  - [ ] Sequential heading structure

- [ ] **Market Analysis Content**
  - [ ] Data presented is accurate and current (2026 context)
  - [ ] Market size and opportunity clearly stated
  - [ ] Competitive analysis fair and factual
  - [ ] No exaggerated claims

- [ ] **Copy Quality**
  - [ ] Tone is professional and analytical
  - [ ] Sections are scannable
  - [ ] No placeholder text

- [ ] **Statistics & Data**
  - [ ] All percentages and figures sourced or qualified
  - [ ] Market demographics clearly defined
  - [ ] Regional focus (Qatar) consistently maintained

---

### CONTACT PAGE (contact.html)

- [ ] **Heading Hierarchy**
  - [ ] One H1 in page-hero
  - [ ] H2 for form section ("Request a Consultation" or similar)
  - [ ] Sequential structure

- [ ] **Form Content**
  - [ ] Form labels are clear and descriptive
  - [ ] Placeholder text is helpful but not repetitive
  - [ ] Required fields marked (*)
  - [ ] Privacy/terms statement present (if collecting data)
  - [ ] Success message is clear and encouraging

- [ ] **Contact Information**
  - [ ] All contact details accurate and current
  - [ ] Multiple contact methods provided (email, phone, form)
  - [ ] Hours of operation (if applicable)
  - [ ] Location clearly stated (Doha, Qatar)

- [ ] **Copy Consistency**
  - [ ] CTA language consistent ("Book Consultation")
  - [ ] Form labels use consistent terminology
  - [ ] Tone is welcoming and professional

- [ ] **Accessibility**
  - [ ] Form is keyboard navigable
  - [ ] Labels properly associated with inputs
  - [ ] Error messages are clear
  - [ ] Success confirmation is obvious

---

## SUMMARY: AUDIT PRIORITIES

### High Priority (Fix Immediately)
1. Verify all scientific claims are accurate and sourced
2. Ensure all compound names spelled correctly (BPC-157, GHK-Cu, etc.)
3. Confirm all statistics are accurate (87%, 24%, 40%, etc.)
4. Check for placeholder/draft/TODO text
5. Verify one H1 per page
6. Check all links have descriptive text
7. Ensure CTAs are consistent across pages

### Medium Priority (Fix Before Launch)
1. Heading hierarchy sequential throughout all pages
2. Tone consistent across all pages (premium, scientific, authoritative)
3. Terminology consistent (protocols, peptides, adherence, etc.)
4. All images have proper alt text
5. SVG vials have ARIA labels
6. Contact information accurate and complete

### Low Priority (Nice to Have)
1. Review legal disclaimers and compliance needs
2. Add privacy policy/terms of service (if applicable)
3. Optimize heading keywords for SEO
4. Review overall content flow and transitions

---

## FINAL NOTES

**This audit assumes:**
- No AI integrations or backend (static site only)
- All content is human-written and science-based
- Health/clinical claims must be substantiated
- Platform targets health-conscious individuals in Qatar and expatriate communities
- Premium positioning requires high content quality

**After completing this audit:**
1. Document all findings in a separate report
2. Prioritize fixes by impact and effort
3. Assign responsibility for corrections
4. Implement fixes in phases (critical → medium → low)
5. Re-audit after corrections to verify compliance
