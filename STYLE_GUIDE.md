# Forge Realm Style Guide & Component Library

This document defines the visual design system, component library, and content styling guidelines for the Forge Realm website.

## Table of Contents

- [Design Principles](#design-principles)
- [Color System](#color-system)
- [Typography](#typography)
- [Component Library](#component-library)
- [Hugo Shortcodes](#hugo-shortcodes)
- [Layout Guidelines](#layout-guidelines)
- [Content Standards](#content-standards)
- [Accessibility](#accessibility)

## Design Principles

### Core Values

- **Clarity**: Information should be easy to find and understand
- **Consistency**: Similar elements should look and behave the same way
- **Accessibility**: Usable by everyone, including assistive technology users
- **Performance**: Fast loading and responsive across all devices
- **Community**: Welcoming and inclusive design language

### Visual Hierarchy

1. **Primary**: Most important content (headings, CTAs, key information)
2. **Secondary**: Supporting content (subheadings, feature descriptions)
3. **Tertiary**: Background information (metadata, captions, footnotes)

## Color System

### Primary Palette

```css
/* Primary Brand Colors */
--primary: #007bff;      /* Main brand blue */
--primary-dark: #0056b3;  /* Darker blue for hovers */
--primary-light: #66b3ff; /* Lighter blue for backgrounds */

/* Secondary Colors */
--secondary: #6c757d;     /* Neutral gray */
--success: #28a745;       /* Green for positive actions */
--warning: #ffc107;       /* Yellow for cautions */
--danger: #dc3545;        /* Red for errors/dangerous actions */
--info: #17a2b8;          /* Cyan for information */
```

### Neutral Palette

```css
/* Grayscale */
--white: #ffffff;
--gray-100: #f8f9fa;     /* Lightest gray backgrounds */
--gray-200: #e9ecef;     /* Light borders and dividers */
--gray-300: #dee2e6;     /* Default borders */
--gray-400: #ced4da;     /* Subtle elements */
--gray-500: #adb5bd;     /* Placeholder text */
--gray-600: #6c757d;     /* Secondary text */
--gray-700: #495057;     /* Primary text */
--gray-800: #343a40;     /* Dark headings */
--gray-900: #212529;     /* Darkest text */
--black: #000000;
```

### Essence Colors (Game-Specific)

```css
/* Elemental essence types */
--essence-fire: #dc3545;     /* Red - Fire essence */
--essence-water: #007bff;    /* Blue - Water essence */
--essence-earth: #28a745;    /* Green - Earth essence */
--essence-air: #17a2b8;      /* Cyan - Air essence */
--essence-spirit: #ffc107;   /* Yellow - Spirit essence */
--essence-colorless: #6c757d; /* Gray - Colorless essence */
```

### Usage Guidelines

- **Primary blue** for main navigation, CTAs, and brand elements
- **Success green** for completed states, positive feedback
- **Warning yellow** for important notices, pending states
- **Danger red** for errors, destructive actions
- **Info cyan** for neutral information, tips
- **Essence colors** specifically for game-related content

## Typography

### Font Stack

```css
/* Primary font family */
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;

/* Monospace for code */
font-family: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
```

### Type Scale

```css
/* Headings */
h1 { font-size: 2.5rem; font-weight: 300; line-height: 1.2; }
h2 { font-size: 2rem; font-weight: 400; line-height: 1.25; }
h3 { font-size: 1.75rem; font-weight: 400; line-height: 1.3; }
h4 { font-size: 1.5rem; font-weight: 500; line-height: 1.35; }
h5 { font-size: 1.25rem; font-weight: 500; line-height: 1.4; }
h6 { font-size: 1rem; font-weight: 600; line-height: 1.4; }

/* Body text */
body { font-size: 1rem; line-height: 1.6; }
.lead { font-size: 1.25rem; font-weight: 300; line-height: 1.5; }
small { font-size: 0.875rem; }
```

### Typography Guidelines

- **Headings**: Use sentence case except for proper nouns
- **Body text**: Optimal line length 45-75 characters
- **Links**: Underlined in content areas, not in navigation
- **Emphasis**: Use bold for strong emphasis, italic for subtle emphasis

## Component Library

### Standard Components

#### Buttons

```html
<!-- Primary actions -->
<a class="btn btn-primary" href="#">Primary Button</a>
<button class="btn btn-primary">Primary Button</button>

<!-- Secondary actions -->
<a class="btn btn-outline-primary" href="#">Secondary Button</a>

<!-- Sizes -->
<button class="btn btn-primary btn-lg">Large Button</button>
<button class="btn btn-primary">Default Button</button>
<button class="btn btn-primary btn-sm">Small Button</button>

<!-- States -->
<button class="btn btn-success">Success State</button>
<button class="btn btn-warning">Warning State</button>
<button class="btn btn-danger">Danger State</button>
```

#### Alerts

```html
<!-- Docsy alerts -->
{{% alert title="Note" color="primary" %}}
This is a primary alert for general information.
{{% /alert %}}

{{% alert title="Success" color="success" %}}
This is a success alert for positive feedback.
{{% /alert %}}

{{% alert title="Warning" color="warning" %}}
This is a warning alert for important notices.
{{% /alert %}}

{{% alert title="Danger" color="danger" %}}
This is a danger alert for errors or critical information.
{{% /alert %}}
```

#### Cards

```html
<!-- Basic card -->
<div class="card">
  <div class="card-body">
    <h5 class="card-title">Card Title</h5>
    <p class="card-text">Card content goes here.</p>
    <a href="#" class="btn btn-primary">Action</a>
  </div>
</div>

<!-- Card with image -->
<div class="card">
  <img src="image.jpg" class="card-img-top" alt="Description">
  <div class="card-body">
    <h5 class="card-title">Card Title</h5>
    <p class="card-text">Card content.</p>
  </div>
</div>
```

## Hugo Shortcodes

### Custom Shortcodes

#### Card Preview

Display a game card with artwork, stats, and description.

```markdown
{{< card-preview
    name="Lightning Bolt"
    cost="2"
    type="Instant - Fire"
    image="/images/cards/lightning-bolt.jpg" >}}
Deal 3 damage to any target.
*"Swift as thought, deadly as fire."*
{{< /card-preview >}}
```

**Parameters:**

- `name` (required): Card name
- `cost` (optional): Essence cost
- `type` (optional): Card type line
- `power` (optional): Creature power (for creatures)
- `toughness` (optional): Creature toughness (for creatures)
- `image` (optional): Path to card artwork
- Content: Card rules text and flavor text

#### Deck List

Format and display deck lists with metadata and export functionality.

```markdown
{{< deck-list
    title="Aggressive Fire Deck"
    format="Standard"
    author="CommunityPlayer"
    colors="Fire,Spirit"
    strategy="Fast aggro deck focused on early pressure and direct damage." >}}

#### Creatures (20)
- 4 Fire Elemental
- 4 Lightning Sprite
- 4 Flame Dancer
- 4 Phoenix Hatchling
- 4 Ember Wolf

#### Spells (20)
- 4 Lightning Bolt
- 4 Flame Burst
- 4 Scorching Wind
- 4 Fire Ball
- 4 Burning Rage

#### Lands (20)
- 16 Fire Source
- 4 Dual Source (Fire/Spirit)

{{< /deck-list >}}
```

**Parameters:**

- `title` (required): Deck name
- `format` (optional): Tournament format
- `author` (optional): Deck creator
- `colors` (optional): Comma-separated essence colors
- `strategy` (optional): Brief strategy description
- Content: Formatted deck list using Markdown

#### Progress Timeline

Show development progress or step-by-step processes.

```markdown
{{< progress-timeline
    items="Design mechanics;Create artwork;Community testing;Balance adjustments;Final release"
    current="3" >}}
```

**Parameters:**

- `items` (required): Semicolon-separated list of timeline items
- `current` (required): Current step number (1-indexed)

#### Community Highlight

Showcase community members, achievements, and testimonials.

```markdown
{{< community-highlight
    name="Alex Thompson"
    role="Tournament Champion"
    discord="AlexT#1234"
    avatar="/images/avatars/alex.jpg"
    achievement="Regional Winner" >}}
"Forge Realm's community-driven development creates the most balanced and fun card game I've ever played. The transparency in design decisions makes every player feel heard."
{{< /community-highlight >}}
```

**Parameters:**

- `name` (required): Person's name or handle
- `role` (optional): Community role or title
- `discord` (optional): Discord username
- `avatar` (optional): Profile image path
- `achievement` (optional): Recent achievement or recognition
- Content: Quote or testimonial

### Docsy Shortcodes

#### Page Info Blocks

```markdown
{{% pageinfo color="primary" %}}
**Important Information** - This appears at the top of pages for key announcements.
{{% /pageinfo %}}
```

#### Feature Blocks

```markdown
{{% blocks/section color="dark" type="row" %}}

{{% blocks/feature icon="fa-rocket" title="Fast Setup" %}}
Get started playing in minutes with our quick start guide.
{{% /blocks/feature %}}

{{% blocks/feature icon="fa-heart" title="Community Driven" %}}
Every decision is made democratically by the community.
{{% /blocks/feature %}}

{{% blocks/feature icon="fa-download" title="Free to Play" %}}
Print and play at home with no restrictions.
{{% /blocks/feature %}}

{{% /blocks/section %}}
```

## Layout Guidelines

### Grid System

Use Bootstrap's 12-column grid system for responsive layouts.

```html
<div class="container">
  <div class="row">
    <div class="col-md-8">
      <!-- Main content -->
    </div>
    <div class="col-md-4">
      <!-- Sidebar -->
    </div>
  </div>
</div>
```

### Spacing System

```css
/* Margin and padding utilities */
.m-0 { margin: 0; }
.m-1 { margin: 0.25rem; }
.m-2 { margin: 0.5rem; }
.m-3 { margin: 1rem; }
.m-4 { margin: 1.5rem; }
.m-5 { margin: 3rem; }

/* Responsive spacing */
.mt-md-4 { margin-top: 1.5rem; } /* on medium screens and up */
```

### Responsive Breakpoints

```css
/* Bootstrap breakpoints */
--breakpoint-xs: 0;
--breakpoint-sm: 576px;
--breakpoint-md: 768px;
--breakpoint-lg: 992px;
--breakpoint-xl: 1200px;
--breakpoint-xxl: 1400px;
```

## Content Standards

### Writing Style

- **Voice**: Friendly, knowledgeable, inclusive
- **Tone**: Professional but approachable
- **Person**: Second person ("you") for instructions, first person plural ("we") for community
- **Tense**: Present tense for current features, future tense for planned features

### Content Structure

```markdown
---
title: "Page Title"
linkTitle: "Nav Title"
weight: 10
description: >
  SEO-friendly description that also appears in navigation.
---

{{% pageinfo color="primary" %}}
**Key Information** - Important context for this page.
{{% /pageinfo %}}

Brief introduction paragraph explaining the page's purpose.

## Main Section

### Subsection

Content with proper hierarchy and formatting.

{{% alert title="Tip" color="info" %}}
Helpful tips and additional information.
{{% /alert %}}

## Next Steps

- Link to related content
- Suggest logical next actions
- Provide community resources
```

### Image Guidelines

- **Format**: WebP preferred, PNG/JPEG fallbacks
- **Sizing**: Responsive images using Hugo processing
- **Alt text**: Descriptive, not redundant with surrounding text
- **Loading**: Use `loading="lazy"` for non-critical images
- **Optimization**: Compress images appropriately for web

### Link Standards

```markdown
<!-- Internal links (preferred) -->
[Quick Start Guide](../gameplay/quick-start/)
[Card Gallery](/cards/)

<!-- External links -->
[Discord Community](https://discord.gg/KQTY8DfY)
[GitHub Repository](https://github.com/dunamismax/forge-realm)
```

## Accessibility

### WCAG 2.1 AA Compliance

#### Color Contrast

- **Normal text**: Minimum 4.5:1 contrast ratio
- **Large text**: Minimum 3:1 contrast ratio
- **UI elements**: Minimum 3:1 contrast ratio for focus indicators

#### Keyboard Navigation

- All interactive elements accessible via keyboard
- Visible focus indicators on all focusable elements
- Logical tab order through content
- Skip links for main content areas

#### Screen Readers

- Semantic HTML structure with proper headings
- Alt text for all meaningful images
- Form labels associated with inputs
- ARIA labels for complex interactions

#### Responsive Design

- Content reflows to 320px width
- No horizontal scrolling at 400% zoom
- Touch targets minimum 44px square
- Readable typography at all sizes

### Testing Checklist

- [ ] Color contrast meets WCAG AA standards
- [ ] All functionality available via keyboard
- [ ] Screen reader announces content correctly
- [ ] Focus indicators visible and appropriate
- [ ] Content readable at 200% zoom
- [ ] Touch targets adequately sized
- [ ] No accessibility errors in automated testing

## Implementation Notes

### Custom CSS

Add custom styles to `/assets/scss/_styles.scss` to maintain theme compatibility.

### Component Testing

Test all components across:

- Different screen sizes (mobile, tablet, desktop)
- Various browsers (Chrome, Firefox, Safari, Edge)
- Dark/light mode preferences
- High contrast mode
- Screen readers (NVDA, JAWS, VoiceOver)

### Performance Considerations

- Lazy load non-critical images
- Minimize custom CSS/JS
- Use system fonts when possible
- Optimize images for web delivery
- Leverage browser caching

### Maintenance

- Regular accessibility audits
- Browser compatibility testing
- Performance monitoring
- User feedback collection
- Component usage analytics

---

## Quick Reference

### Common Classes

```css
/* Spacing */
.mt-4 { margin-top: 1.5rem; }
.mb-3 { margin-bottom: 1rem; }
.py-5 { padding: 3rem 0; }

/* Text */
.text-primary { color: var(--primary); }
.text-muted { color: var(--gray-600); }
.fw-bold { font-weight: bold; }

/* Layout */
.d-flex { display: flex; }
.justify-content-between { justify-content: space-between; }
.align-items-center { align-items: center; }

/* Responsive */
.d-none .d-md-block { display: none on mobile, block on md+ }
```

### Color Variables

Use CSS custom properties for consistent theming:

```css
color: var(--primary);
background-color: var(--gray-100);
border-color: var(--gray-300);
```

For questions about the style guide or component usage, join our [Discord community](https://discord.gg/KQTY8DfY) in the #development channel.
