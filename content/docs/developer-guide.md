---
title: "Developer Guide"
linkTitle: "Developer Guide"
weight: 50
description: >
  Comprehensive technical guide for Forge Realm TCG website development.
---

Comprehensive technical guide for Forge Realm TCG website development.

## Quick Setup

### Prerequisites

- Git 2.20+, Hugo Extended v0.128.0+, Go 1.21+, Node.js 18+

### Installation

**macOS:**

```bash
brew install git hugo go node
```

**Windows:**

```bash
choco install git hugo-extended golang nodejs
```

**Linux:**

```bash
sudo apt install git golang-go nodejs npm
# Download Hugo Extended from releases page
```

### Local Development

```bash
git clone https://github.com/dunamismax/forge-realm.git
cd forge-realm
git remote add upstream https://github.com/dunamismax/forge-realm.git

# Install dependencies
npm install
hugo mod init github.com/dunamismax/forge-realm
hugo mod get github.com/google/docsy

# Start development server
npm run dev  # localhost:1313
```

## Project Structure

```
forge-realm/
├── content/          # Markdown content
├── layouts/          # Hugo templates
├── static/           # Static assets
├── hugo.toml         # Site configuration
├── package.json      # Node dependencies
└── postcss.config.js # CSS processing
```

## Development Workflow

### Branch Strategy

- `main` - Production branch, auto-deployed
- `forge-realm/description` - Feature branches
- Delete branches after merging

### Content Development

**New pages:**

```bash
hugo new docs/section/page.md
```

**Frontmatter template:**

```yaml
---
title: "Page Title"
linkTitle: "Short Title"
weight: 10
description: >
  Brief description for SEO.
---
```

### Build Commands

- `npm run dev` - Development server with drafts
- `npm run build` - Production build
- `npm run validate` - HTML/link validation

## Testing

### Validation Tools

- `npm run validate:html` - htmltest validation
- `npm run validate:links` - muffet link checking
- `npm run validate` - Full validation suite

### Manual Testing

- Test in Chrome, Firefox, Safari
- Verify responsive design on mobile
- Check accessibility with screen readers
- Validate performance with Lighthouse

## Deployment

### Cloudflare Pages

- **Trigger**: Push to `main`
- **Build**: `npm run build`
- **Output**: `public/`
- **Domain**: forge-realm.com

### Build Settings

```yaml
Framework: Hugo
Build Command: npm run build
Output Directory: public
Environment Variables:
  HUGO_VERSION: 0.148.2
  NODE_VERSION: 18
```

## Code Standards

### File Naming

- Content: lowercase-with-hyphens.md
- Images: descriptive-names.webp
- URLs: clean, SEO-friendly paths

### Content Style

```markdown
---
title: "Proper Title Case"
linkTitle: "Short Title"
weight: 10
description: >
  Multi-line descriptions use this
  YAML syntax for readability.
---

# Main heading (H1 - one per page)

## Major sections (H2)

### Subsections (H3)

**Bold** for emphasis, *italic* for subtle emphasis, `code` for technical terms.
```

### Hugo Shortcodes

```markdown
{{% alert title="Important" color="warning" %}}
Use alert shortcodes for important information.
{{% /alert %}}
```

## Troubleshooting

### Common Issues

**Hugo build failures:**

```bash
hugo mod clean
hugo mod get github.com/google/docsy
hugo mod tidy
```

**Port conflicts:**

```bash
lsof -ti:1313 | xargs kill
# Or use different port
hugo server --port 1314
```

**npm permission errors:**

```bash
npm config set prefix ~/.npm
export PATH="$HOME/.npm/bin:$PATH"
```

## Resources

- **Hugo Docs**: <https://gohugo.io/documentation/>
- **Docsy Theme**: <https://www.docsy.dev/docs/>
- **Discord**: Join #development for help
- **Issues**: Report bugs on GitHub

## Advanced Features

### Custom Theme Development

Override Docsy components in `layouts/partials/`

### Asset Processing

- SCSS compilation with PostCSS
- Image optimization (WebP preferred)
- JavaScript minification

### Performance Optimization

- Core Web Vitals compliance
- CDN caching strategy
- Security headers configuration