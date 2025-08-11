# Hugo Documentation Site

This repository now includes a Hugo-powered documentation website that automatically generates a static site from all the markdown files.

## Quick Start

### Prerequisites
- Hugo Extended v0.128.0 or later
- Node.js and npm (for CSS processing)

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# View site at http://localhost:1313
```

### Building for Production

```bash
# Build static site
npm run build

# Clean build files
npm run clean
```

## Site Structure

```
content/
├── _index.md                 # Homepage
├── docs/                     # Documentation sections
│   ├── _index.md            # Documentation overview
│   ├── gameplay/            # Game rules and guides
│   │   ├── _index.md
│   │   ├── quick-start.md
│   │   ├── comprehensive-rules.md
│   │   └── formats.md
│   └── printing/            # Printing guides
│       ├── _index.md
│       ├── home-printing-guide.md
│       ├── recommended-printers.md
│       └── cardstock-guide.md
└── contributing/             # Contribution guidelines
    └── _index.md
```

## Theme

The site uses the [Docsy theme](https://www.docsy.dev/), which is optimized for documentation sites and includes:

- Responsive design
- Search functionality
- Navigation menus
- Code syntax highlighting
- Community links integration

## Deployment

The site automatically deploys to GitHub Pages via GitHub Actions when changes are pushed to the main branch.

## Configuration

Site configuration is in `hugo.toml`. Key settings:

- **baseURL**: Set to your GitHub Pages URL
- **title**: Site title
- **params.github_repo**: Link to repository
- **menu**: Navigation structure

## Adding Content

1. Create markdown files in the appropriate `content/` subdirectory
2. Add front matter with title, weight, and description
3. Hugo will automatically generate navigation and pages

Example front matter:
```yaml
---
title: "Page Title"
linkTitle: "Nav Title"
weight: 10
description: "Page description for SEO"
---
```

## Local Development

The Hugo server supports:
- Hot reload on content changes
- Draft content preview with `--buildDrafts`
- Fast rendering for quick iteration

## Troubleshooting

If you encounter issues:

1. Ensure Hugo Extended is installed (required for SCSS processing)
2. Run `npm install` to install PostCSS dependencies
3. Check that `postcss.config.js` exists
4. Verify all content files have proper front matter

For more help, see the [Hugo documentation](https://gohugo.io/documentation/) or join the community on [Discord](https://discord.gg/KQTY8DfY).