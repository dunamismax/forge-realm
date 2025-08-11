<p align="center">
  <img src="https://github.com/dunamismax/images/blob/main/forge-realm/forge-realm.png" alt="Forge Realm" width="300" />
</p>

# Forge Realm - Open Source Trading Card Game

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Contributors](https://img.shields.io/github/contributors/sawyer/forge-realm)](https://github.com/sawyer/forge-realm/graphs/contributors)
[![Build Status](https://github.com/sawyer/forge-realm/workflows/CI/badge.svg)](https://github.com/sawyer/forge-realm/actions)

Forge Realm is a fully open-source trading card game designed from the ground up for community-driven development and print-and-play accessibility. Every aspect of the game—from core mechanics to individual card designs—is developed transparently through collaborative GitHub workflows.

## Project Philosophy

Traditional TCGs operate under corporate control with artificial scarcity models that prioritize profit over gameplay innovation. Forge Realm challenges this paradigm by implementing:

- **Complete transparency** in all design decisions through public GitHub repositories
- **Democratic governance** where community votes determine major game direction
- **Unrestricted accessibility** through professionally formatted print-and-play files
- **Collaborative development** using proven open-source methodologies
- **No artificial scarcity** - all cards freely available to all players

## Technical Architecture

### Repository Structure

```
forge-realm/
├── assets/           # Card artwork, templates, print-ready files
├── data/             # Card definitions, rules database, formats
├── docs/             # Comprehensive documentation
├── src/              # Game engine, validators, generators
├── community/        # Governance, proposals, voting records
├── scripts/          # Build automation and utilities
└── tests/            # Validation and integration testing
```

### Core Components

- **Game Engine**: Rule enforcement and interaction validation
- **Card Generator**: Automated print sheet and digital export generation
- **Data Validator**: Schema validation for cards, rules, and formats
- **Print System**: High-resolution output for home and commercial printing

## Getting Started

### Prerequisites

- Node.js 16+ for build tools
- Git for version control
- 300+ DPI printer for optimal card quality (see [printing guide](docs/printing/home-printing-guide.md))

### Installation

```bash
git clone https://github.com/sawyer/forge-realm.git
cd forge-realm
npm install
npm run build
npm test
```

### Generate Print Sheets

```bash
npm run generate-prints     # Standard format
npm run generate-prints-a4  # A4 international format
```

## Game Mechanics Overview

Forge Realm implements a strategic resource management system with the following core mechanics:

### Essence System

Dynamic mana system where players choose their essence types during deck construction, allowing for flexible multicolor strategies without traditional mana base constraints.

### Stack-Based Resolution

All spells and abilities use a stack-based timing system familiar to experienced TCG players, ensuring precise interaction timing and competitive play viability.

### Creature Combat

Streamlined combat system with defender choice, first strike, and damage assignment rules optimized for both casual and tournament play.

### Format Support

- **Standard**: Current sets with rotation schedule
- **Legacy**: All-time card pool for eternal format players
- **Draft**: Booster draft using community-voted set design
- **Constructed**: 60-card minimum, 4-of limit, sideboard support

## Contributing

We welcome contributions across all skill levels and disciplines:

### Developers

- Game engine improvements
- Automation and tooling
- Website and digital platform development
- Testing and validation systems

### Game Designers

- Card design and balance
- Mechanic proposals
- Format development
- Rules refinement

### Artists

- Original card artwork
- Template design
- Icon and symbol creation
- Marketing materials

### Community Management

- Documentation improvement
- Player onboarding
- Tournament organization
- Translation and localization

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed contribution guidelines and development setup.

## Governance Model

Forge Realm operates under a democratic governance structure:

### Decision Types

1. **Technical Changes**: Code, tooling, infrastructure
   - Approved through standard pull request review
   - Requires two maintainer approvals

2. **Design Changes**: Cards, mechanics, rules
   - Community proposal and discussion period
   - Formal voting with simple majority (>50%)

3. **Core System Changes**: Fundamental game rules
   - Extended discussion period (minimum 2 weeks)
   - Supermajority vote required (>66%)

### Voting Eligibility

Contributors with merged pull requests or accepted proposals gain voting rights. Active community members without code contributions may request voting access through the governance committee.

## Print-and-Play System

### Specifications

- **Card Size**: 63.5mm x 88.9mm (2.5" x 3.5") - poker standard
- **Print Resolution**: 300 DPI minimum, 600 DPI recommended
- **Cardstock**: 300 GSM recommended, 270-350 GSM acceptable
- **Finish**: Linen finish preferred for shuffle feel
- **Bleed**: 3mm safety margin for cutting variance

### Supported Formats

- **PDF**: Print-ready sheets with cut guides
- **PNG**: Individual high-resolution card images
- **SVG**: Vector format for scaling and customization
- **Digital**: Cockatrice, OCTGN, and Tabletop Simulator exports

## Legal Framework

### Licensing

- **Source Code**: Apache License 2.0
- **Game Content**: Creative Commons BY-SA 4.0
- **Artwork**: Individual artist attribution with CC BY-SA 4.0

### Trademark Policy

"Forge Realm" name and logo are protected trademarks. Community use permitted for non-commercial purposes. Commercial use requires explicit permission.

### Contributor Agreement

All contributions subject to project licensing. By submitting pull requests, contributors agree to license their work under project terms.

## Community Resources

### Communication Channels

- **GitHub Issues**: Bug reports, feature requests, proposals
- **GitHub Discussions**: General development discussion
- **Discord**: Real-time community interaction (link in repository)
- **Reddit**: r/ForgeRealm for broader community engagement

### Documentation

- [Quick Start Guide](docs/gameplay/quick-start.md)
- [Comprehensive Rules](docs/gameplay/comprehensive-rules.md)
- [Printing Guide](docs/printing/home-printing-guide.md)
- [Development Documentation](docs/development/)
- [Community Guidelines](docs/community/)

## Development Roadmap

### Phase 1: Foundation (Current)

- Core repository structure
- Basic game engine
- Initial card set (120 cards)
- Print generation system

### Phase 2: Community Building

- Discord server launch
- Contributor onboarding
- First community vote
- Beta testing program

### Phase 3: Digital Platform

- Web-based gameplay
- Matchmaking system
- Tournament infrastructure
- Mobile companion app

### Phase 4: Expansion

- Multiple set releases
- International localization
- Convention presence
- Educational partnerships

## Support and Recognition

### Monetary Support

While Forge Realm remains completely free, development costs are supported through:

- GitHub Sponsors
- Community donations
- Convention sales of premium print runs

### Contributor Recognition

- Commit history attribution
- Contributor card designs
- Hall of fame documentation
- Conference speaking opportunities

## Technical Requirements

### Minimum System Requirements

- **Development**: Node.js 16+, 4GB RAM, 2GB storage
- **Printing**: 300 DPI printer, 300 GSM cardstock support
- **Digital Play**: Modern web browser with WebGL support

### Recommended Hardware

- **Canon PIXMA PRO-200** for professional home printing
- **Epson EcoTank ET-8550** for high-volume printing
- **Cutting mat and ruler** for precise card cutting
- **Card sleeves** for protection during play

## License

This project is dual-licensed:

- Source code under [Apache License 2.0](LICENSE)
- Game content under [Creative Commons BY-SA 4.0](LICENSE-CONTENT)

See individual files for specific licensing information.

---

**Ready to contribute to the future of open-source gaming?** Start by reading our [contributing guidelines](CONTRIBUTING.md) and join the discussion in our community channels.
