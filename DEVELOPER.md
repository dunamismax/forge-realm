# Developer Documentation - Forge Realm

This document provides comprehensive technical information for developers contributing to the Forge Realm website and project infrastructure.

## Table of Contents

- [Development Environment Setup](#development-environment-setup)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Build System](#build-system)
- [Testing and Validation](#testing-and-validation)
- [Deployment](#deployment)
- [Code Standards](#code-standards)
- [Contributing Guidelines](#contributing-guidelines)
- [Troubleshooting](#troubleshooting)

## Development Environment Setup

### Prerequisites

#### Required Software

- **Git** 2.20+ for version control
- **Hugo Extended** v0.128.0+ for static site generation
- **Go** 1.21+ for Hugo modules
- **Node.js** 18+ with npm for frontend dependencies
- **Text Editor** with Markdown and HTML support (VS Code recommended)

#### Optional but Recommended

- **Hugo Language Server** for VS Code
- **Markdown extensions** for better authoring experience
- **GitHub CLI** for streamlined pull request workflow
- **Docker** for containerized development (optional)

### Installation Guide

#### macOS (using Homebrew)

```bash
# Install prerequisites
brew install git hugo go node

# Verify installations
hugo version
go version
node --version
npm --version
```

#### Windows (using Chocolatey)

```bash
# Install prerequisites
choco install git hugo-extended golang nodejs

# Verify installations
hugo version
go version
node --version
npm --version
```

#### Linux (Ubuntu/Debian)

```bash
# Install prerequisites
sudo apt update
sudo apt install git golang-go nodejs npm

# Install Hugo Extended (download from releases page)
wget https://github.com/gohugoio/hugo/releases/latest/download/hugo_extended_*_linux-amd64.deb
sudo dpkg -i hugo_extended_*_linux-amd64.deb

# Verify installations
hugo version
go version
node --version
npm --version
```

### Local Development Setup

#### 1. Clone Repository

```bash
git clone https://github.com/dunamismax/forge-realm.git
cd forge-realm

# Add upstream remote for keeping fork updated
git remote add upstream https://github.com/dunamismax/forge-realm.git
```

#### 2. Install Dependencies

```bash
# Install Node.js dependencies
npm install

# Initialize Hugo modules
hugo mod init github.com/dunamismax/forge-realm
hugo mod get github.com/google/docsy
hugo mod tidy
```

#### 3. Start Development Server

```bash
# Start Hugo development server
npm run dev

# Or directly with Hugo
hugo server --buildDrafts --bind 0.0.0.0
```

#### 4. Verify Setup

- Open browser to <http://localhost:1313>
- Verify hot reloading by editing any content file
- Check that all pages load without errors
- Confirm images and assets display properly

## Project Structure

### Directory Layout

```
forge-realm/
├── content/                 # Hugo content (Markdown files)
│   ├── _index.md           # Homepage content
│   ├── cards/              # Card gallery section
│   ├── docs/               # Documentation
│   │   ├── gameplay/       # Game rules and mechanics
│   │   └── printing/       # Printing guides
│   └── contributing/       # Contribution guidelines
├── layouts/                # Hugo layout templates
│   └── partials/
│       └── head-end.html   # Custom head elements
├── static/                 # Static assets
│   ├── images/            # Images and graphics
│   ├── favicon.ico        # Site favicon
│   └── _headers           # Cloudflare headers config
├── hugo.toml              # Hugo configuration
├── package.json           # Node.js dependencies and scripts
├── postcss.config.js      # PostCSS configuration
├── .htmltest.yml          # HTML validation configuration
├── README.md              # Project overview
├── CONTRIBUTING.md        # Basic contribution guide
├── DEVELOPMENT.md         # This file - detailed dev docs
├── SECURITY.md            # Security policy
└── LICENSE                # Apache 2.0 license
```

### Hugo Structure Explained

#### Content Organization

- **`content/_index.md`**: Homepage content and hero section
- **`content/docs/`**: All documentation organized hierarchically
- **`content/cards/`**: Card gallery and set information
- **`content/contributing/`**: Community contribution information

#### Layout System

- **Docsy Theme**: Professional documentation theme via Hugo modules
- **Custom Partials**: Override theme defaults with custom components
- **Page Templates**: Automatic templating based on content structure

#### Static Assets

- **Images**: Optimized WebP format with PNG fallbacks
- **Headers**: Cloudflare-specific performance and security headers
- **Favicon**: Multi-format icon support

## Development Workflow

### Branch Strategy

#### Main Branch

- **`main`**: Production-ready code, automatically deployed
- **Protection**: Direct pushes disabled, requires PR review
- **Stability**: All commits must pass validation tests

#### Feature Branches

- **Naming**: `feature/description` or `fix/issue-name`
- **Scope**: Single feature or fix per branch
- **Lifetime**: Delete after merging to keep repository clean

#### Development Process

1. **Create branch** from latest `main`
2. **Make changes** following code standards
3. **Test locally** using development server
4. **Run validation** with `npm run validate`
5. **Submit PR** with clear description
6. **Address feedback** from code review
7. **Merge** after approval and passing checks

### Content Development

#### Creating New Pages

```bash
# Create new content file
hugo new docs/section/page.md

# Or manually create with frontmatter
---
title: "Page Title"
linkTitle: "Short Title"
weight: 10
description: >
  Brief description for SEO and navigation.
---

# Page content starts here
```

#### Content Guidelines

- **Frontmatter**: Always include title, linkTitle, weight, and description
- **Structure**: Use logical heading hierarchy (H2, H3, H4)
- **Links**: Use relative links for internal content
- **Images**: Optimize images and use appropriate alt text
- **Hugo Shortcodes**: Leverage Docsy shortcodes for enhanced layouts

#### Writing Best Practices

- **Clarity**: Write for diverse audience with varying experience levels
- **Consistency**: Follow established tone and terminology
- **Accessibility**: Consider screen readers and other assistive technologies
- **SEO**: Include relevant keywords naturally in content

## Build System

### Hugo Configuration

#### Key Settings (`hugo.toml`)

```toml
baseURL = 'https://forge-realm.com'
languageCode = 'en-us'
title = 'Forge Realm - Open Source Trading Card Game'

[module]
  [[module.imports]]
    path = "github.com/google/docsy"
    disable = false
```

#### Module Management

- **Theme**: Google Docsy via Hugo modules
- **Dependencies**: Automatically managed by Hugo
- **Updates**: Use `hugo mod get -u` to update modules
- **Cleanup**: Regular `hugo mod tidy` to clean unused dependencies

### Build Scripts

#### Development (`npm run dev`)

- Starts Hugo development server on localhost:1313
- Enables draft content and hot reloading
- Binds to 0.0.0.0 for network access
- Rebuilds automatically on file changes

#### Production (`npm run build`)

- Runs `hugo mod tidy` to clean modules
- Builds optimized site with minification
- Sets production environment variables
- Outputs to `public/` directory

#### Preview (`npm run build:preview`)

- Builds site including draft content
- Uses staging environment settings
- Useful for reviewing unpublished content

### Asset Processing

#### PostCSS Pipeline

```javascript
module.exports = {
  plugins: {
    autoprefixer: {}
  }
};
```

#### Image Optimization

- **Format**: WebP preferred with PNG/JPEG fallbacks
- **Sizing**: Responsive images using Hugo's image processing
- **Compression**: Optimized file sizes for web delivery
- **Caching**: Long-term browser caching for static assets

## Testing and Validation

### Automated Testing

#### HTML Validation (`npm run validate:html`)

- **Tool**: htmltest for comprehensive HTML validation
- **Checks**: Document structure, links, images, accessibility
- **Configuration**: `.htmltest.yml` defines validation rules
- **CI Integration**: Runs automatically on pull requests

#### Link Checking (`npm run validate:links`)

- **Tool**: muffet for dead link detection
- **Scope**: Internal and external link validation
- **Exclusions**: Rate-limited sites and authentication-required URLs
- **Frequency**: Weekly automated checks via GitHub Actions

#### Full Validation (`npm run validate`)

- **Combines**: HTML validation and link checking
- **Usage**: Run before submitting pull requests
- **Dependencies**: Requires built site in `public/` directory
- **Output**: Detailed reports on any issues found

### Manual Testing

#### Browser Testing

- **Chrome/Edge**: Primary development browsers
- **Firefox**: Cross-browser compatibility
- **Safari**: macOS/iOS compatibility
- **Mobile**: Responsive design testing

#### Accessibility Testing

- **Screen readers**: Test with NVDA, JAWS, or VoiceOver
- **Keyboard navigation**: Verify all functionality accessible via keyboard
- **Color contrast**: Ensure sufficient contrast ratios
- **Alt text**: Verify all images have descriptive alt attributes

### Performance Testing

#### Core Web Vitals

- **LCP**: Largest Contentful Paint < 2.5s
- **FID**: First Input Delay < 100ms
- **CLS**: Cumulative Layout Shift < 0.1

#### Tools

- **Lighthouse**: Built into Chrome DevTools
- **WebPageTest**: External performance analysis
- **GTmetrix**: Comprehensive performance reports

## Deployment

### Cloudflare Pages

#### Automatic Deployment

- **Trigger**: Push to `main` branch
- **Build Command**: `npm run build`
- **Output Directory**: `public`
- **Environment**: Production settings applied

#### Build Settings

```yaml
Framework: Hugo
Build Command: npm run build
Output Directory: public
Root Directory: (blank)
Node.js Version: 18
Environment Variables:
  HUGO_VERSION: 0.148.2
  NODE_VERSION: 18
  NPX_FLAGS: --yes
```

#### Custom Domain

- **Primary**: forge-realm.com
- **Redirect**: <www.forge-realm.com> → forge-realm.com
- **SSL**: Automatic certificate management
- **CDN**: Global edge caching enabled

### Performance Optimization

#### Caching Strategy

- **Static assets**: 1 year cache with immutable headers
- **HTML pages**: 1-2 hour cache with revalidation
- **Images**: Long-term caching with content-based versioning
- **API responses**: Short or no caching as appropriate

#### Security Headers

- **CSP**: Content Security Policy restricts resource loading
- **HSTS**: HTTP Strict Transport Security enforces HTTPS
- **X-Frame-Options**: Prevents embedding in frames
- **X-Content-Type-Options**: Prevents MIME type sniffing

## Code Standards

### File Organization

#### Naming Conventions

- **Content files**: lowercase with hyphens (`quick-start.md`)
- **Images**: descriptive names with appropriate extensions
- **Directories**: lowercase, logical grouping
- **URLs**: Clean, SEO-friendly paths

#### File Structure

- **Frontmatter**: YAML format preferred
- **Content**: Markdown with Hugo shortcodes
- **Images**: Reference via relative paths
- **Links**: Relative for internal, absolute for external

### Content Standards

#### Markdown Style

```markdown
---
title: "Proper Title Case"
linkTitle: "Short Title"
weight: 10
description: >
  Multi-line descriptions use this YAML syntax
  for better readability in source.
---

# Main heading (H1 - only one per page)

## Major sections (H2)

### Subsections (H3)

#### Minor points (H4 - use sparingly)

**Bold text** for emphasis
*Italic text* for subtle emphasis
`Code snippets` for technical terms
```

#### Hugo Shortcodes

```markdown
{{% alert title="Important" color="warning" %}}
Use alert shortcodes for important information.
{{% /alert %}}

{{% blocks/section color="primary" %}}
Use section blocks for structured layouts.
{{% /blocks/section %}}
```

### HTML/CSS Standards

#### Accessibility

- **Semantic HTML**: Use appropriate tags for content structure
- **Alt attributes**: Descriptive text for all images
- **Heading hierarchy**: Logical progression of heading levels
- **Color contrast**: WCAG AA compliance for text readability

#### Performance

- **Image optimization**: Compressed and appropriately sized
- **CSS efficiency**: Avoid redundant or unused styles
- **JavaScript**: Minimize and defer non-critical scripts
- **Caching**: Appropriate cache headers for all resources

## Contributing Guidelines

### Getting Started

#### First-Time Contributors

1. **Read documentation**: Understand project structure and goals
2. **Set up environment**: Follow development setup instructions
3. **Find an issue**: Look for "good first issue" labels
4. **Ask questions**: Join Discord for community support

#### Experienced Contributors

1. **Review roadmap**: Understand project priorities
2. **Propose features**: Discuss major changes before implementation
3. **Mentor newcomers**: Help onboard new contributors
4. **Code review**: Participate in reviewing pull requests

### Pull Request Process

#### Before Submitting

- [ ] Code follows project standards
- [ ] All tests pass locally (`npm run validate`)
- [ ] Changes are tested in multiple browsers
- [ ] Documentation updated if needed
- [ ] Commit messages are clear and descriptive

#### PR Description Template

```markdown
## Summary
Brief description of changes made.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement

## Testing
- [ ] Local testing completed
- [ ] Browser compatibility verified
- [ ] Validation tests pass

## Screenshots (if applicable)
Include before/after screenshots for UI changes.

## Additional Notes
Any other relevant information for reviewers.
```

### Code Review Guidelines

#### For Authors

- **Self-review**: Review your own changes before submitting
- **Small PRs**: Keep changes focused and manageable
- **Respond promptly**: Address reviewer feedback quickly
- **Be receptive**: Consider feedback as improvement opportunities

#### For Reviewers

- **Be constructive**: Provide helpful, actionable feedback
- **Explain reasoning**: Help authors understand suggestions
- **Acknowledge good work**: Highlight positive aspects
- **Test changes**: Verify functionality when possible

## Troubleshooting

### Common Issues

#### Hugo Build Failures

**Module not found errors**

```bash
# Solution: Clean and reinstall modules
hugo mod clean
hugo mod get github.com/google/docsy
hugo mod tidy
```

**Template errors**

```bash
# Solution: Check Hugo version and syntax
hugo version
# Verify template syntax in layouts/
```

#### Development Server Issues

**Port already in use**

```bash
# Solution: Kill existing process or use different port
lsof -ti:1313 | xargs kill
# Or specify different port
hugo server --port 1314
```

**Hot reload not working**

```bash
# Solution: Check file permissions and restart server
chmod -R 755 content/
hugo server --buildDrafts
```

#### npm/Node.js Issues

**Permission errors**

```bash
# Solution: Fix npm permissions (don't use sudo)
npm config set prefix ~/.npm
export PATH="$HOME/.npm/bin:$PATH"
```

**Package version conflicts**

```bash
# Solution: Clean install
rm -rf node_modules package-lock.json
npm install
```

### Performance Issues

#### Slow build times

- Check for large images that need optimization
- Verify Hugo modules are properly cached
- Consider using `--gc` flag for garbage collection

#### High memory usage

- Monitor Hugo's memory usage during builds
- Break up large content files if necessary
- Ensure adequate system resources for development

### Getting Help

#### Documentation

- **Hugo Docs**: <https://gohugo.io/documentation/>
- **Docsy Theme**: <https://www.docsy.dev/docs/>
- **Cloudflare Pages**: <https://developers.cloudflare.com/pages/>

#### Community Support

- **Discord**: Join #development channel for real-time help
- **GitHub Issues**: Report bugs and request features
- **Stack Overflow**: Search for Hugo and Docsy questions

#### Direct Contact

- **Project maintainer**: <dunamismax@forge-realm.com>
- **Community manager**: Available on Discord
- **Security issues**: Follow SECURITY.md reporting process

## Advanced Topics

### Custom Theme Development

#### Override Docsy Components

```
layouts/
├── partials/
│   ├── hooks/
│   │   └── head-end.html    # Custom head elements
│   └── navbar-version.html  # Version selector override
└── _default/
    └── baseof.html          # Base template override
```

#### Custom Shortcodes

```
layouts/shortcodes/
├── card-preview.html        # Custom card display
├── deck-list.html          # Deck listing format
└── community-highlight.html # Community content
```

### Advanced Hugo Features

#### Content Management

- **Taxonomies**: Organize content by categories/tags
- **Menus**: Dynamic navigation generation
- **Related Content**: Suggest related pages
- **Multilingual**: Support for multiple languages

#### Asset Processing

- **SCSS**: Advanced stylesheet processing
- **JavaScript**: ES6+ transpilation and minification
- **Images**: Responsive image generation
- **Resources**: Asset fingerprinting and optimization

### Monitoring and Analytics

#### Performance Monitoring

- **Real User Monitoring**: Cloudflare Analytics
- **Core Web Vitals**: Google Search Console
- **Uptime Monitoring**: Third-party service integration

#### Error Tracking

- **404 Errors**: Monitor via server logs
- **JavaScript Errors**: Client-side error reporting
- **Build Failures**: GitHub Actions notifications
- **Security Issues**: Automated vulnerability scanning

---

## Additional Resources

- **Project Repository**: <https://github.com/dunamismax/forge-realm>
- **Live Site**: <https://forge-realm.com>
- **Discord Community**: <https://discord.gg/KQTY8DfY>
- **Hugo Documentation**: <https://gohugo.io/documentation/>
- **Docsy Theme Docs**: <https://www.docsy.dev/docs/>

For questions not covered in this documentation, please join our Discord community or open a GitHub issue with the "documentation" label.
