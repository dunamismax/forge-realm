# Forge Realm Website Development

This repository contains the Hugo static site generator code for [forge-realm.com](https://forge-realm.com).

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
├── content/           # Hugo content (markdown files)
│   ├── _index.md     # Homepage content
│   ├── cards/        # Card gallery section
│   ├── docs/         # Documentation
│   └── contributing/ # Contribution guide
├── static/           # Static assets (images, etc.)
├── hugo.toml         # Hugo configuration
└── package.json      # Node.js dependencies
```

## Development Commands

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build production site to `/public/`
- `npm run serve` - Serve production build locally
- `npm run clean` - Clean build files

## Deployment

The site automatically deploys to [Cloudflare Pages](https://forge-realm.com) when changes are pushed to the `main` branch.

**Build Settings:**
- Build command: `npm run build`
- Output directory: `public`
- Node.js version: 18+

## Adding Content

1. Create markdown files in the appropriate `content/` subdirectory
2. Add front matter with title, weight, and description
3. Use Hugo shortcodes for enhanced layouts
4. Test locally before pushing

## Theme

Uses the [Docsy theme](https://www.docsy.dev/) with Hugo modules for documentation sites.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines or visit [forge-realm.com/contributing/](https://forge-realm.com/contributing/) for complete information.