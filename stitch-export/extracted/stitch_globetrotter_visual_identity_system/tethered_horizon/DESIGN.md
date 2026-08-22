---
name: Tethered Horizon
colors:
  surface: '#faf9f7'
  surface-dim: '#dadad8'
  surface-bright: '#faf9f7'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f4f2'
  surface-container: '#eeeeec'
  surface-container-high: '#e8e8e6'
  surface-container-highest: '#e3e2e1'
  on-surface: '#1a1c1b'
  on-surface-variant: '#414846'
  inverse-surface: '#2f3130'
  inverse-on-surface: '#f1f1ef'
  outline: '#717975'
  outline-variant: '#c1c8c4'
  surface-tint: '#45655b'
  primary: '#02241d'
  on-primary: '#ffffff'
  primary-container: '#1a3a32'
  on-primary-container: '#82a499'
  inverse-primary: '#abcec2'
  secondary: '#974723'
  on-secondary: '#ffffff'
  secondary-container: '#ff996e'
  on-secondary-container: '#772f0c'
  tertiary: '#231f0e'
  on-tertiary: '#ffffff'
  tertiary-container: '#393422'
  on-tertiary-container: '#a49c85'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#c7eade'
  primary-fixed-dim: '#abcec2'
  on-primary-fixed: '#002019'
  on-primary-fixed-variant: '#2d4d44'
  secondary-fixed: '#ffdbce'
  secondary-fixed-dim: '#ffb598'
  on-secondary-fixed: '#370e00'
  on-secondary-fixed-variant: '#79300e'
  tertiary-fixed: '#ebe2c8'
  tertiary-fixed-dim: '#cec6ad'
  on-tertiary-fixed: '#1f1c0b'
  on-tertiary-fixed-variant: '#4c4733'
  background: '#faf9f7'
  on-background: '#1a1c1b'
  surface-variant: '#e3e2e1'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 64px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '500'
    lineHeight: '1.3'
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.2'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
---

## Brand & Style

This design system targets the discerning traveler who views journey-planning as an art form rather than a logistical chore. The brand personality is rooted in **exploration, personalization, and discovery**, moving away from the cold efficiency of traditional travel SaaS.

The aesthetic follows a **Modern Editorial** movement. It prioritizes high-quality composition, white space, and rich typography to mimic the feeling of a premium physical travel journal. The UI is intentionally structured yet breathable, using photography as the primary atmospheric driver. Every interaction should feel intentional and sophisticated, evoking the quiet confidence of a well-curated itinerary.

## Colors

The palette is inspired by natural landscapes—deep evergreen forests, baked earth, and coastal sands.

- **Primary (Deep Forest Green):** Used for navigation, primary actions, and branding to establish authority and depth.
- **Secondary (Terracotta):** Reserved for interactive highlights, call-to-actions, and accentuating travel milestones.
- **Warm Sand & Cream:** These tones form the foundation of the UI, providing a softer, more "analog" reading experience than pure digital whites.
- **Text:** Primary charcoal ensures high legibility for editorial content, while muted slate handles metadata and supporting UI labels.

## Typography

The typography strategy relies on the high-contrast pairing of a classic Serif and a modern, airy Sans.

**Playfair Display** is used for all major headings and display moments. It brings an editorial authority and "literary" feel to destination names and travel stories.
**Plus Jakarta Sans** provides a clean, approachable contrast for functional UI elements, body copy, and metadata. 

Use the uppercase `label-md` style for category tags and section overline text to create a clear visual hierarchy. Ensure large display headings are reduced in size for mobile devices while maintaining their tight letter spacing.

## Layout & Spacing

This design system utilizes a **12-column fixed grid** for desktop, maxing out at 1280px to maintain comfortable line lengths for reading. On mobile, the system transitions to a **4-column fluid grid**.

Spacing is strictly governed by an **8px base scale**. Large-scale editorial sections should favor generous margins (48px+) to allow the photography and typography "room to breathe." 

- **Internal Padding:** Use 16px or 24px for component containers.
- **Section Spacing:** Use 80px or 120px between major content blocks to emphasize the editorial narrative.
- **Grid Alignment:** Align text-heavy blocks to a central 8-column span for better focus, while allowing hero images to break out to the full 12 columns.

## Elevation & Depth

Depth is achieved through **tonal layering and low-contrast outlines** rather than heavy shadows.

- **Surface Levels:** Use `Surface` (White) for primary content cards and `Elevated Surface` (Soft Grey-Cream) for background sections or secondary panels.
- **Outlines:** A subtle 1px border (`#121212` at 8% opacity) is used to define elements without creating visual clutter.
- **Shadows:** When necessary for interactivity (e.g., a hovered card), use a single, highly-diffused ambient shadow: `0 12px 32px rgba(26, 58, 50, 0.08)`. The shadow should be tinted with the Primary color to maintain a cohesive natural feel.
- **Photography:** Images act as the "deepest" layer, often set in inset frames or full-width bleeds.

## Shapes

The shape language is structured and professional. A **Soft (0.25rem/4px)** base roundedness is used for buttons and inputs, while **Large (0.5rem/8px)** roundedness is used for destination cards and imagery.

This restrained approach ensures the UI feels architectural and precise. Avoid fully pill-shaped elements except for small, utility-based badges or tags (e.g., "Open" or "Confirmed").

## Components

### Buttons
Primary buttons use the `Primary Green` background with white text and `label-md` typography. Secondary buttons use a `1px Primary Green` border with no fill. Interaction states should be subtle, such as a slight shift in background opacity.

### Destination Cards
Cards are the centerpiece of the system. They feature a 0.5rem corner radius, a 1px soft border, and high-quality imagery. The title uses `headline-sm` positioned at the bottom of the card with a soft gradient overlay for legibility.

### Badges & Metadata
Travel metadata (price, duration, rating) should be styled using `label-sm` with the `Secondary Terracotta` color for key icons to draw the eye without overwhelming the layout.

### Input Fields
Inputs are minimal: a 1px border on all sides, white background, and clear label text in `label-sm`. The focus state uses a 2px `Primary Green` bottom border.

### Editorial Lists
Itinerary lists should avoid "boxes." Instead, use horizontal rules (1px, low opacity) and generous vertical padding (24px) to separate events, keeping the layout feeling like a printed page.