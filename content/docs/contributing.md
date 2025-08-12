---
title: "Contributing Guide"
linkTitle: "Contributing"
weight: 80
description: >
  Learn how to contribute to the Forge Realm project.
---

<div class="mt-4"></div>

{{< alert title="Welcome Contributors!" >}} Thank you for contributing to Forge
Realm! This guide covers our development process and community standards.
{{< /alert >}}

## Code of Conduct

<div class="float-end ms-3 mb-3">
  <img src="/images/forge-realm-PNG-circular-emblem.webp" alt="Forge Realm Emblem" style="max-width: 80px; height: auto;" class="img-fluid">
</div>

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
[forge-realm.com](https://forge-realm.com).

```bash
# Fork and clone
git clone https://github.com/your-username/forge-realm.git
cd forge-realm
git remote add upstream https://github.com/dunamismax/forge-realm.git

# Install dependencies and start (for website development)
npm install
npm run dev
```

### General Setup

```bash
# Fork and clone
git clone https://github.com/your-username/forge-realm.git
cd forge-realm

# Add upstream remote
git remote add upstream https://github.com/dunamismax/forge-realm.git
```

## Contribution Workflow

### Website Development Workflow

1. **Create Branch**: `git checkout -b forge-realm/your-improvement`
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

{{% blocks/section color="primary" type="row" %}}

{{% blocks/feature icon="fa-gamepad" title="Game Design" %}}

- Card designs and balance proposals
- New mechanic development
- Format creation and testing
- Rules clarification and updates {{% /blocks/feature %}}

{{% blocks/feature icon="fa-palette" title="Art & Design" %}}

- Card artwork and illustrations
- Template design and layout
- Icon creation and graphics
- Print template optimization {{% /blocks/feature %}}

{{% blocks/feature icon="fa-pen" title="Documentation" %}}

- Rule clarifications and examples
- Strategy guides and tutorials
- Printing guides and troubleshooting
- Community event documentation {{% /blocks/feature %}}

{{% blocks/feature icon="fa-code" title="Technical" %}}

- Website development and improvements
- Hugo site optimization and features
- Asset processing and CDN integration
- Build and deployment automation {{% /blocks/feature %}}

{{% /blocks/section %}}

## Review Process

All contributions require:

1. Community discussion on Discord
2. Documentation review from maintainers
3. Playtesting for game content changes
4. Asset quality verification for artwork

{{% blocks/section color="dark" %}}

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

<div class="text-center mt-4">
  <a class="btn btn-lg btn-primary me-3 mb-4" href="https://discord.gg/KQTY8DfY">
    Join Discord <i class="fab fa-discord ms-2"></i>
  </a>
  <a class="btn btn-lg btn-secondary me-3 mb-4" href="https://github.com/dunamismax/forge-realm">
    View on GitHub <i class="fab fa-github ms-2"></i>
  </a>
</div>

{{% /blocks/section %}}
