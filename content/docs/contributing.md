---
title: "Contributing Guide"
linkTitle: "Contributing"
weight: 80
description: >
  Learn how to contribute to the Ideal Magic project.
---

{{< callout type="info" >}} **Welcome Contributors!** Thank you for contributing
to Ideal Magic! This guide covers our development process and community
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

{{< card title="Game Design" subtitle="- Card designs and balance proposals\n- New mechanic development\n- Format creation and testing\n- Rules clarification and updates" >}}

{{< card title="Art & Design" subtitle="- Card artwork and illustrations\n- Template design and layout\n- Icon creation and graphics\n- Print template optimization" >}}

{{< card title="Documentation" subtitle="- Rule clarifications and examples\n- Strategy guides and tutorials\n- Printing guides and troubleshooting\n- Community event documentation" >}}

{{< card title="Technical" subtitle="- Website development and improvements\n- Hugo site optimization and features\n- Asset processing and CDN integration\n- Build and deployment automation" >}}

{{< /cards >}}

## Review Process

All contributions require:

1. Community discussion on Discord
2. Documentation review from maintainers
3. Playtesting for game content changes
4. Asset quality verification for artwork

## Community Integration

### Discord - Primary Community Hub

All major discussions happen on Discord. Join for:

- Game design discussions and brainstorming
- Balance feedback and playtesting
- Card artwork and asset submissions
- Community event coordination
- Real-time collaboration with other contributors
- Announcements about new card releases

### GitHub - Technical Development

Use GitHub for:

- Website and documentation improvements
- Technical contributions to the Hugo site
- Bug reports for website functionality
- Code contributions and build system improvements

**Join the Community:**

- [Join Discord](https://discord.gg/KQTY8DfY)
- [View on GitHub](https://github.com/dunamismax/ideal-magic)
