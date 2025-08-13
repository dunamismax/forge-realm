---
title: "Contributing Guide"
linkTitle: "Contributing"
weight: 80
description: >
  Learn how to contribute to the Ideal Magic project.
---

{{< callout type="info" >}} **Welcome Contributors!** Thank you for contributing
to Ideal Magic! This guide covers our format curation process and community
standards. {{< /callout >}}

## Code of Conduct

All contributors must follow our [Code of Conduct](/docs/code-of-conduct/).

## Getting Started

### Prerequisites

- Git 2.20+
- Hugo Extended v0.128.0+ (for website development)
- Node.js 18+ and npm (for website development)
- Markdown editor
- Discord account (for community discussion)

### Website Development Setup

This repository contains the Hugo static site for
[ideal-magic.com](https://ideal-magic.com).

```bash
# Fork and clone
git clone https://github.com/your-username/ideal-magic.git
cd ideal-magic
git remote add upstream https://github.com/dunamismax/ideal-magic.git

# Install dependencies and start (for website development)
npm install
npm run dev
```

### General Setup

```bash
# Fork and clone
git clone https://github.com/your-username/ideal-magic.git
cd ideal-magic

# Add upstream remote
git remote add upstream https://github.com/dunamismax/ideal-magic.git
```

## Contribution Workflow

### Website Development Workflow

1. **Create Branch**: `git checkout -b ideal-magic/your-improvement`
2. **Make Changes**: Edit content, styles, or templates
3. **Test Locally**: `npm run dev` and `npm run build`
4. **Submit PR**: Clear description with screenshots for visual changes

### General Contribution Workflow

1. **Create Feature Branch**

   ```bash
   git checkout -b feature/your-contribution
   ```

2. **Make Changes**
   - Follow markdown conventions
   - Test any new print templates
   - Update related documentation

3. **Test Changes**
   - Verify all links work correctly
   - Check markdown formatting
   - Test print templates if applicable

4. **Submit Pull Request**
   - Clear description of changes
   - Reference related Discord discussions
   - Include playtesting notes for game content

## Documentation Standards

- Use consistent markdown formatting
- Keep language concise and developer-friendly
- Include practical examples where helpful
- Link to Discord for real-time discussion

## How to Contribute

We welcome contributions in many forms:

{{< cards >}}

{{< card title="Format Curation" subtitle="- Card legality proposals and analysis\n- Balance evaluation of existing cards\n- Meta analysis and format health\n- Banned/restricted list discussions" >}}

{{< card title="Community Building" subtitle="- Local playgroup organization\n- Tournament organizing and judging\n- New player mentoring\n- Format advocacy and education" >}}

{{< card title="Documentation" subtitle="- Rule clarifications and examples\n- Strategy guides and tutorials\n- Printing guides and troubleshooting\n- Community event documentation" >}}

{{< card title="Technical" subtitle="- Website development and improvements\n- Hugo site optimization and features\n- Asset processing and CDN integration\n- Build and deployment automation" >}}

{{< /cards >}}

## Review Process

All contributions require:

1. Community discussion on Discord
2. Format impact analysis for legality changes
3. Playtesting for format modifications
4. Documentation review from maintainers

## Community Integration

### Discord - Primary Community Hub

All major discussions happen on Discord. Join for:

- Format curation and card legality discussions
- Balance analysis and format health monitoring
- Meta analysis and strategy discussion
- Community event coordination
- Real-time collaboration with other contributors
- Announcements about format updates and events

### GitHub - Technical Development

Use GitHub for:

- Website and documentation improvements
- Technical contributions to the Hugo site
- Bug reports for website functionality
- Code contributions and build system improvements

**Join the Community:**

- [Join Discord](https://discord.gg/KQTY8DfY)
- [View on GitHub](https://github.com/dunamismax/ideal-magic)
