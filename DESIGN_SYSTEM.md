# EA Design System — Extracted

## Colors

### Dark Theme (Volcanic)
- Background: `#161616`
- Background Warm: `#1a1a1a`
- Card BG: `#1e1e1e`
- Card BG Hover: `#232323`
- Text: `#e8e4de` (warm cream)
- Text Heading: `#f0ece6`
- Muted: `#9a9590`
- Faint: `#8a857e`
- Line: `rgba(232,228,222,0.06)`
- Line Strong: `rgba(232,228,222,0.12)`
- Line Hover: `rgba(232,228,222,0.18)`
- Nav BG: `rgba(22,22,22,0.92)`
- Accent Solid: `#7a756f`
- Toggle BG: `rgba(232,228,222,0.08)`
- Toggle Knob: `#e8e4de`
- Stat Num: `#f0ece6`
- Tag BG: `rgba(232,228,222,0.06)`
- Tag Text: `#6a655f`
- Input BG: `#1a1a1a`

### Light Theme (Platinum)
- Background: `#f2f3f5`
- Background Warm: `#f5f6f8`
- Card BG: `rgba(255,255,255,0.8)`
- Card BG Hover: `rgba(255,255,255,0.95)`
- Text: `#1a1c22`
- Text Heading: `#0a0b0d`
- Muted: `#4a4e58`
- Faint: `#6e7280`
- Line: `rgba(0,0,0,0.07)`
- Line Strong: `rgba(0,0,0,0.12)`
- Accent Solid: `#50545e`
- Stat Num: `#0f1014`
- Input BG: `rgba(255,255,255,0.75)`

### Pillar Accent Colors (Science page)
- I Longevity: `#7A8A98`
- II Recovery: `#C9B99A`
- III Metabolic: `#A8B4A0`
- IV Cognitive: `#B8A8B8`
- V Performance: `#c4a962`

## Typography

### Font Families
- Headings: `'Playfair Display', serif` (weights: 400, 500, 600, 700; italic 400, 500)
- Body/UI: `'DM Sans', sans-serif` (weights: 200, 300, 400, 500, 600; italic 300)
- Import: `https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,200;0,300;0,400;0,500;0,600;1,300&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap`
- NEW for US: `'Space Mono', monospace` (compound names only)

### Heading Sizes
- Hero title: 60px (desktop), 48px (tablet), 38px (768px), 30px (480px)
- Page hero title: 56px (desktop), 44px (1024px), 36px (768px), 28px (480px)
- Section title: 42px (desktop), 32px (768px), 26px (480px)
- Card h3: 18px (17px pillar), 24px (card-lg)
- Nav logo: 17px Playfair Display, weight 500

### Body Sizes
- Section body: 15px, line-height 1.9, weight 300
- Card body: 13px, line-height 1.75, weight 300
- Nav links: 11px, letter-spacing 2px, uppercase, weight 400
- Section label: 10px, letter-spacing 4.5px, uppercase, weight 400
- Button text: 10px, letter-spacing 2.5px, uppercase, weight 400
- Tags: 9px, letter-spacing 2.2px, uppercase
- Stat label: 10px, letter-spacing 2.5px, uppercase

### Stat Numbers
- Large: 52px Playfair Display, weight 500
- Card stat: 44px
- Inline stat: 28px

## Spacing

### Section Padding
- Desktop: 120px top/bottom, 72px left/right
- Tablet (1024px): 100px top/bottom, 40px left/right
- Mobile (768px): 80px top/bottom, 24px left/right
- Page hero: 200px top, 120px bottom (desktop)

### Component Spacing
- Max width container: 1140px
- Nav height: 72px (desktop), 68px (1024px), 64px (768px)
- Nav padding: 72px (desktop), 40px (1024px), 24px (768px)
- Card padding: 40px 32px (default), 52px 44px (large)
- Button padding: 16px 52px (default), 18px 56px (large)
- Nav CTA padding: 11px 32px
- Gap between nav links: 48px
- Grid gap: 16px (cards), 100px (two-col), 56px (stats)

### Base Unit: 8px multiples
8, 12, 16, 20, 24, 28, 32, 36, 40, 48, 52, 56, 64, 72, 80, 100, 120

## Components

### Navigation
- Fixed top, full width, backdrop blur 32px
- Logo left (Playfair 17px), center links (DM Sans 11px uppercase), right actions
- Theme toggle: 48x26px pill with 18px knob
- CTA button: ghost border style
- Mobile: hamburger (3 lines, 22px wide, 1.5px height), slide-in drawer from right

### Cards
- Background: var(--bg-card), 1px solid var(--line)
- Hover: translateY(-3px), box-shadow, border-color change
- Top accent line on hover: gradient scaleX animation
- Tag: 9px uppercase, border, small padding

### Pillar Cards
- Centered text, large Roman numeral (60px, very faint color)
- Title in Playfair 17px
- Description 12px
- 5-column grid (desktop), responsive down to 1-col

### Stat Display
- Large number (Playfair 52px) + label (10px uppercase)
- Stat cards: bg-card, border, centered
- Stat bars: horizontal, label left, value right

### Buttons
- Ghost style: transparent bg, 1px border, uppercase text
- Hover: subtle bg fill, border strengthen, translateY(-2px)
- Active: translateY(0)
- Large variant: slightly more padding

### Dividers
- Max-width 1140px container
- 1px gradient line (transparent -> line-color -> transparent)

### CTA Band
- Centered text, translucent bg overlay
- Section label (centered, no line prefix), title, body, button

### Footer
- Single row: logo left, nav links center, copyright right
- Max-width 1140px
- Border-top 1px

### Protocol Tabs
- Grid of selector buttons with large number, name, meta text
- Active state: bottom accent line, stronger bg
- Detail panel: two-column (description + includes list)
- Includes list: numbered 01-06 with indent

### Numbered Sections (01/02/03)
- Panel number: 100px Playfair, very faint (pillar-num color)
- Used across about, science, market, protocols pages
- Tab navigation with number + label

## Layout

### Container
- Max-width: 1140px, centered with auto margin
- Padding: 72px sides (desktop), 40px (tablet), 24px (mobile)

### Grid Patterns
- Two-col: 1fr 1fr, gap 100px (64px tablet, 48px mobile -> 1fr)
- Three-col: repeat(3, 1fr), gap 16px (mobile -> 1fr)
- Pillar grid: repeat(5, 1fr), gap 16px
- Protocol selector: repeat(4, 1fr), gap 1px with bg line color
- Stats: 1fr 1fr grid or flex row

### Page Structure
```
<nav> fixed top
<main>
  <section class="page-hero"> or <section class="hero"> (homepage)
  <div class="divider">
  <section class="section reveal">
  <div class="divider">
  ...more sections...
  <section class="cta-band reveal">
  <div class="divider">
</main>
<footer>
```

## Design Language

### Tone
- Clinical, editorial, premium medical
- No hype, no bro-science
- Precise language with clinical proof points
- Institutional confidence

### Key Patterns
- Numbered sections (01/02/03) for sequential content
- Five Pillars framework (I/II/III/IV/V) - Roman numerals
- Stat callouts with large numbers
- Minimal CTAs - "Book Consultation" primary action (Qatar)
- Tab-based panel navigation for dense content
- Stagger animations on scroll reveal
- Glass morphism vials on homepage hero
- Concentric circle decorative elements

### Animations
- Scroll reveal: translateY(32px) -> 0, opacity 0 -> 1, 0.8s
- Stagger: 0.05s increments per child
- Hero: sequential vial fade-in (1.4s each, staggered)
- Nav: fadeDown on homepage (0.8s, 2.6s delay)
- Page transitions: fade-in panels (0.4s)
- Hover: translateY(-3px to -5px), 0.5s
- All using cubic-bezier(0.4, 0, 0.2, 1)

### Theme Toggle
- Dark/light via data-theme attribute on html
- Persisted in localStorage as 'ea-theme'
- Default: dark
- Flash prevention: inline script in <head> sets theme before render
