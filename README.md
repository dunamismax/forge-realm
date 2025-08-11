<p align="center">
  <img src="https://github.com/dunamismax/images/blob/main/forge-realm/forge-realm.png" alt="Forge Realm" width="300" />
</p>

# Forge Realm - Open Source Trading Card Game

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Contributors](https://img.shields.io/github/contributors/dunamismax/forge-realm)](https://github.com/dunamismax/forge-realm/graphs/contributors)
[![Go Version](https://img.shields.io/badge/Go-1.24-blue.svg)](https://golang.org)

Open-source trading card game built by the community. Transparent development, democratic governance, and unrestricted print-and-play access.

## Core Principles

- **Complete transparency** - all decisions made publicly
- **Democratic governance** - community votes drive direction  
- **Free accessibility** - print-and-play for everyone
- **No artificial scarcity** - all cards available to all players

## Quick Start

### Prerequisites

- Go 1.24+
- Mage build tool
- Git

### Installation

```bash
git clone https://github.com/dunamismax/forge-realm.git
cd forge-realm
go mod download
mage build
mage test
```

### Run Server

```bash
mage dev
# Visit http://localhost:8080
```

## Game Mechanics

### Essence System

Dynamic mana system where players choose essence types during deck construction.

### Stack-Based Resolution  

All spells and abilities use stack-based timing for precise interactions.

### Format Support

- **Standard**: Current sets with rotation
- **Legacy**: All-time card pool
- **Draft**: Community-voted set design

## Contributing

We welcome contributors across all disciplines:

- **Developers**: Game engine, tooling, testing
- **Designers**: Card design, mechanics, formats  
- **Artists**: Card artwork, templates, icons
- **Community**: Documentation, tournaments, localization

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## Governance

Democratic decision-making structure:

1. **Technical Changes**: Standard PR review (2 approvals)
2. **Design Changes**: Community vote (>50%)  
3. **Core Rules**: Extended discussion + supermajority (>66%)

Contributors with merged PRs gain voting rights.

## Print System

Professional print-and-play cards:

- **Size**: 63.5mm x 88.9mm (poker standard)
- **Resolution**: 300+ DPI
- **Cardstock**: 300 GSM recommended
- **Formats**: PDF, PNG, SVG, digital exports

## Build Commands

```bash
mage build      # Compile application  
mage test       # Run tests
mage lint       # Run linter
mage clean      # Remove build artifacts
mage dev        # Build and run server
mage all        # Full build pipeline
```

## License

- **Source Code**: Apache License 2.0
- **Game Content**: Creative Commons BY-SA 4.0

## Community

- **GitHub Issues**: Bug reports and features
- **GitHub Discussions**: General development
- **Discord**: Real-time community chat
- **Reddit**: r/ForgeRealm

## Documentation

- [Quick Start Guide](docs/gameplay/quick-start.md)
- [Comprehensive Rules](docs/gameplay/comprehensive-rules.md)  
- [Printing Guide](docs/printing/home-printing-guide.md)
- [Development Docs](docs/development/)

---

**Ready to contribute?** Read [CONTRIBUTING.md](CONTRIBUTING.md) and join our community!
