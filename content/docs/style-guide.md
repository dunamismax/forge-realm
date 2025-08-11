---
title: "Style Guide"
linkTitle: "Style Guide"
weight: 70
description: >
  Design system and component guidelines for Forge Realm website development.
---

Design system and component guidelines for Forge Realm website development.

## Design Principles

### Core Values

- **Clarity** - Clean, readable content organization
- **Accessibility** - WCAG AA compliance for all users
- **Consistency** - Unified visual language across all pages
- **Performance** - Fast loading, optimized assets

### Visual Identity

- **Dark Theme Default** - Professional, gaming-focused aesthetic
- **High Contrast** - Excellent readability on all backgrounds
- **Minimal** - Focus on content over decoration
- **Modern** - Contemporary web design patterns

## Color Palette

### Brand Colors

```scss
$primary:   #50fa7b  // Forge neon green
$secondary: #8839ef  // Deep mauve purple
$success:   #a6e3a1  // Soft green
$info:      #88c0d0  // Icy blue
$warning:   #fe640b  // Peachy amber
$danger:    #d20f39  // Deep crimson
```

### Surface Colors

```scss
$dark:      #0b0b0b  // Main background
$body-bg:   #0b0b0b  // Page background
$card-bg:   #2e3440  // Card/panel background
$border:    #434c5e  // UI borders
```

### Text Colors

```scss
$body-color: #cdd6f4  // Primary text
$light:      #e5e9f0  // Light text/headings
$code-color: #bd93f9  // Code syntax
```

## Typography

### Font Stack

- **Primary**: Roboto (Google Fonts)
- **Fallback**: system-ui, -apple-system, sans-serif
- **Code**: Monaco, 'Cascadia Code', monospace

### Scale

- **H1**: 2.5rem (40px) - Page titles only
- **H2**: 2rem (32px) - Major sections
- **H3**: 1.5rem (24px) - Subsections
- **H4**: 1.25rem (20px) - Minor headings
- **Body**: 1rem (16px) - Standard text
- **Small**: 0.875rem (14px) - Captions, metadata

### Usage Rules

- One H1 per page maximum
- Logical heading hierarchy (no skipping levels)
- Use **bold** for emphasis, *italic* for subtle emphasis
- `Code formatting` for technical terms and commands

## Components

### Alerts

Use Hugo/Docsy alert shortcodes for important information:

```markdown
{{% alert title="Important" color="warning" %}}
Critical information that users need to notice.
{{% /alert %}}
```

**Colors**: primary, secondary, success, info, warning, danger

### Code Blocks

Always specify language for syntax highlighting:

```markdown
```bash
npm run dev
```

```yaml
title: "Page Title"
description: "Page description"
```
```

### Links
- **Internal**: Use relative paths (`/docs/section/`)
- **External**: Use full URLs with `https://`
- **Descriptive**: Link text should explain destination

### Images
- **Format**: WebP preferred, PNG/JPEG fallback
- **Alt Text**: Descriptive alternative text for accessibility
- **Sizing**: Responsive, appropriate dimensions
- **Loading**: Lazy loading for non-critical images

## Layout Patterns

### Page Structure
```markdown
---
title: "Descriptive Page Title"
linkTitle: "Short Nav Title"
weight: 10
description: >
  Clear description for SEO and navigation.
---

# Page Title (matches frontmatter)

Brief introduction paragraph.

## Major Section

Content organized in logical sections.

### Subsection

Detailed information in smaller chunks.
```

### Content Organization

- **Scannable**: Use headings, lists, short paragraphs
- **Progressive**: Basic info first, details later
- **Actionable**: Include clear next steps
- **Linked**: Connect related content

### Navigation

- **Breadcrumbs**: Enabled by default
- **Sidebar**: Auto-generated from content structure
- **Weights**: Use frontmatter weight for ordering
- **Menu**: Keep navigation hierarchies shallow

## Accessibility Guidelines

### Requirements

- **Contrast**: 4.5:1 minimum for normal text
- **Focus**: Visible focus indicators on all interactive elements
- **Headings**: Logical structure for screen readers
- **Images**: Descriptive alt text for all content images
- **Links**: Descriptive link text (avoid "click here")

### Testing

- **Keyboard**: All functionality accessible via keyboard
- **Screen Reader**: Test with NVDA, JAWS, or VoiceOver
- **Lighthouse**: Achieve 90+ accessibility score
- **Color**: Test with color blindness simulators

## Performance Standards

### Loading Targets

- **LCP**: < 2.5 seconds (Largest Contentful Paint)
- **FID**: < 100ms (First Input Delay)
- **CLS**: < 0.1 (Cumulative Layout Shift)

### Optimization

- **Images**: Compressed, appropriate formats and sizes
- **CSS**: Minified, critical path optimization
- **JavaScript**: Minimized, deferred non-critical scripts
- **Fonts**: Preload critical fonts, use font-display: swap

## Content Guidelines

### Writing Style

- **Concise**: Clear, direct language
- **Consistent**: Unified terminology and tone
- **Helpful**: Focus on user needs and goals
- **Inclusive**: Welcoming to all skill levels

### Technical Content

- **Accurate**: Test all code examples and procedures
- **Current**: Keep versions and links up to date
- **Complete**: Include all necessary context
- **Examples**: Provide practical, working examples

## File Organization

### Naming Conventions

- **Content**: `lowercase-with-hyphens.md`
- **Images**: `descriptive-name.webp`
- **Directories**: `lowercase/logical-grouping/`

### Structure

- **Logical**: Group related content together
- **Shallow**: Avoid deep nested hierarchies
- **Predictable**: Consistent patterns across sections
- **SEO-friendly**: Clean, descriptive URLs

## Hugo/Docsy Specific

### Frontmatter Standards

```yaml
---
title: "Human Readable Title"
linkTitle: "Nav Title"
weight: 10
description: >
  Multi-line descriptions for better
  readability in source files.
date: 2025-01-01
---
```

### Shortcode Usage

Leverage Docsy shortcodes for enhanced layouts:

- `{{%/* alert */%}}` - Important notices
- `{{%/* blocks/section */%}}` - Structured sections
- `{{%/* blocks/feature */%}}` - Feature highlights

### Theme Customization

- **Partials**: Override in `layouts/partials/`
- **SCSS**: Customize in `assets/scss/_variables_project.scss`
- **Templates**: Extend default layouts when needed

---

This style guide ensures consistent, accessible, and performant user experiences across all Forge Realm documentation and website content.