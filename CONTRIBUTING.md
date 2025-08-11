# Contributing to Forge Realm

Thank you for contributing to Forge Realm! This guide covers technical contributions to the Hugo website repository.

## Primary Contribution Channels

- **Game Design & Cards**: Join [Discord](https://discord.gg/KQTY8DfY) for game design, card submissions, and community discussions
- **Website Development**: Use GitHub for technical website contributions
- **Complete Guide**: Visit [forge-realm.com/contributing/](https://forge-realm.com/contributing/) for comprehensive contribution information

## Code of Conduct

All contributors must follow our [Code of Conduct](CODE_OF_CONDUCT.md).

## Technical Website Contributions

This repository contains the Hugo static site generator code for [forge-realm.com](https://forge-realm.com).

### Prerequisites

- Git 2.20+
- Hugo Extended v0.128.0+
- Node.js 18+ and npm
- Discord account for community coordination

### Local Development Setup

```bash
# Fork and clone
git clone https://github.com/yourusername/forge-realm.git
cd forge-realm

# Add upstream remote
git remote add upstream https://github.com/dunamismax/forge-realm.git

# Install dependencies
npm install

# Start development server
npm run dev
```

### Website Contribution Workflow

1. **Create Feature Branch**
   ```bash
   git checkout -b website/your-improvement
   ```

2. **Make Changes**
   - Edit Hugo content in `content/` directory
   - Update site configuration in `hugo.toml`
   - Modify styles or templates as needed
   - Test changes locally with `npm run dev`

3. **Test Changes**
   - Verify site builds: `npm run build`
   - Check all links work correctly
   - Ensure responsive design
   - Test on multiple devices/browsers

4. **Submit Pull Request**
   - Clear description of website changes
   - Reference related Discord discussions
   - Include screenshots for visual changes

## What Goes Where

### GitHub (This Repository)
- Hugo website source code
- Technical documentation improvements  
- Website bug fixes and enhancements
- Build system and deployment improvements

### Discord Community
- Game design and card discussions
- Card artwork submissions
- Balance feedback and playtesting
- Community events and coordination
- All major game-related decisions

### Website Content
- All game documentation lives at [forge-realm.com](https://forge-realm.com)
- Card galleries and download files
- Complete contribution guidelines
- Community resources and guides

## Questions?

- **Website Issues**: Open a GitHub issue
- **Game Questions**: Join our [Discord community](https://discord.gg/KQTY8DfY)
- **Complete Guide**: Visit [forge-realm.com/contributing/](https://forge-realm.com/contributing/)
