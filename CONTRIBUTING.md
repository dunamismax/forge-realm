# Contributing to Forge Realm

Thank you for contributing to Forge Realm! This guide covers our development process and standards.

## Code of Conduct

All contributors must follow our [Code of Conduct](CODE_OF_CONDUCT.md).

## Getting Started

### Prerequisites

- Go 1.24+
- Git 2.20+
- Mage build tool
- Code editor with Go support

### Setup

```bash
# Fork and clone
git clone https://github.com/yourusername/forge-realm.git
cd forge-realm

# Add upstream remote
git remote add upstream https://github.com/dunamismax/forge-realm.git

# Install dependencies and build
go mod download
mage build
mage test
```

## Development Workflow

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature
   ```

2. **Make Changes**
   - Follow Go conventions
   - Write tests for new functionality
   - Update documentation if needed

3. **Test Changes**
   ```bash
   mage lint
   mage test
   mage build
   ```

4. **Submit Pull Request**
   - Clear description of changes
   - Reference related issues
   - Ensure CI passes

## Code Standards

- Follow standard Go formatting (`go fmt`)
- Use meaningful variable and function names
- Write comprehensive tests
- Document exported functions
- Keep functions small and focused

## Contribution Types

### Developers
- Game engine improvements
- Build system enhancements  
- Testing infrastructure
- Performance optimizations

### Game Designers
- Card design and balance
- Mechanic proposals
- Format development
- Rules clarification

### Artists
- Card artwork
- Template design
- Icon creation
- UI/UX improvements

## Review Process

All contributions require:
1. Code review from maintainer
2. Passing automated tests
3. Documentation updates (if applicable)
4. Community approval for design changes

## Build Commands

```bash
mage build      # Compile application
mage test       # Run all tests  
mage lint       # Check code style
mage clean      # Remove build artifacts
mage dev        # Build and run
mage all        # Full pipeline
```

Questions? Open an issue or join our Discord community!