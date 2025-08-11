# Contributing to Forge Realm

Thank you for considering contributing to Forge Realm. This document outlines our development process, coding standards, and community guidelines for maintaining a high-quality, collaborative TCG project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Environment](#development-environment)
- [Contribution Types](#contribution-types)
- [Development Workflow](#development-workflow)
- [Code Standards](#code-standards)
- [Card Design Guidelines](#card-design-guidelines)
- [Documentation Standards](#documentation-standards)
- [Testing Requirements](#testing-requirements)
- [Review Process](#review-process)
- [Community Governance](#community-governance)

## Code of Conduct

All contributors must adhere to our [Code of Conduct](CODE_OF_CONDUCT.md). We maintain a professional, inclusive environment focused on collaborative game development.

## Getting Started

### Prerequisites

- Node.js 18+ (LTS recommended)
- Git 2.20+
- Code editor with JavaScript/TypeScript support
- Basic understanding of TCG mechanics and design principles

### Initial Setup

```bash
# Fork the repository on GitHub
git clone https://github.com/yourusername/forge-realm.git
cd forge-realm

# Add upstream remote for syncing
git remote add upstream https://github.com/sawyer/forge-realm.git

# Install dependencies
npm install

# Run initial build and tests
npm run build
npm test

# Verify print generation works
npm run generate-prints
```

### Repository Structure Familiarization

```
├── src/engine/          # Core game mechanics and rule enforcement
├── src/tools/           # Build tools, generators, validators
├── data/cards/          # Card definitions in JSON format
├── data/rules/          # Comprehensive rules documentation
├── assets/artwork/      # Original artwork and design assets
├── assets/templates/    # Card layout templates
├── docs/               # User and developer documentation
├── community/          # Governance documents and voting records
├── scripts/            # Automation and utility scripts
└── tests/              # Test suites and validation
```

## Development Environment

### Recommended Tools

- **Editor**: VS Code with ESLint, Prettier extensions
- **Graphics**: GIMP/Photoshop for artwork, Inkscape for templates
- **Testing**: Chrome DevTools for web components debugging
- **Print Validation**: Adobe Acrobat or similar PDF viewer

### Environment Variables

Create `.env.local` for development:

```
NODE_ENV=development
DEBUG_CARD_GENERATION=true
PRINT_QUALITY=high
TEST_MODE=true
```

## Contribution Types

### Code Contributions

**Game Engine Development**

- Core mechanic implementation
- Rule enforcement systems
- Performance optimization
- Bug fixes and stability improvements

**Tools and Automation**

- Card generation systems
- Print layout engines
- Data validation tools
- Build process improvements

**Web Platform**

- User interface components
- Gameplay visualization
- Matchmaking and lobby systems
- Tournament management tools

### Design Contributions

**Card Design**

- Individual card proposals
- Mechanic design and balance
- Set themes and cohesion
- Format-specific considerations

**Rules Development**

- Comprehensive rules updates
- Edge case clarification
- Interaction timing definitions
- Format rules and restrictions

### Content Contributions

**Artwork Creation**

- Original card artwork
- Template and frame design
- Icon and symbol creation
- Marketing and promotional materials

**Documentation**

- Rule clarifications and examples
- Tutorial and educational content
- Translation and localization
- Developer documentation

### Community Management

**Governance Participation**

- Proposal review and discussion
- Voting on major decisions
- Community event organization
- Conflict resolution assistance

## Development Workflow

### Branch Naming Conventions

- `feature/card-generator-improvements` - New features
- `fix/mana-calculation-bug` - Bug fixes
- `docs/rules-clarification` - Documentation updates
- `design/new-mechanic-proposal` - Design proposals
- `refactor/engine-optimization` - Code refactoring

### Commit Message Format

Follow [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
type(scope): description

[optional body]

[optional footer]
```

**Examples:**

```
feat(engine): implement stack-based spell resolution

- Add SpellStack class for managing spell ordering
- Implement priority passing system
- Add comprehensive test coverage for edge cases

Closes #123
```

```
fix(cards): correct mana cost calculation for hybrid costs

The hybrid mana cost calculation was incorrectly handling
colorless requirements in multicolor spells.

Fixes #456
```

### Pull Request Process

1. **Create Feature Branch**

   ```bash
   git checkout -b feature/your-feature-name
   git push -u origin feature/your-feature-name
   ```

2. **Development Cycle**
   - Make focused, logical commits
   - Write/update tests for new functionality
   - Update documentation as needed
   - Run linting and tests before pushing

3. **Pre-submission Checklist**
   - [ ] Code follows style guidelines
   - [ ] Tests pass and coverage maintained
   - [ ] Documentation updated
   - [ ] No merge conflicts with main branch
   - [ ] Commit messages follow convention

4. **Pull Request Creation**
   - Use descriptive title and detailed description
   - Reference related issues
   - Include screenshots for visual changes
   - Request review from relevant maintainers

## Code Standards

### JavaScript/TypeScript Style

```javascript
// Use consistent naming conventions
const spellStack = new SpellStack();
const MAXIMUM_HAND_SIZE = 7;

// Prefer async/await over promises
async function resolveSpell(spell) {
  const result = await spell.resolve();
  return result;
}

// Use JSDoc for public APIs
/**
 * Calculates the mana cost of a card including hybrid costs.
 * @param {Card} card - The card to calculate cost for
 * @param {ManaCostContext} context - Current mana availability
 * @returns {ManaCost} The calculated mana cost
 */
function calculateManaCost(card, context) {
  // Implementation
}
```

### File Organization

- Use kebab-case for filenames: `spell-stack.js`
- Group related functionality in modules
- Export public APIs explicitly
- Keep functions focused and testable

### Error Handling

```javascript
// Use specific error types
class InvalidCardError extends Error {
  constructor(cardId, reason) {
    super(`Invalid card ${cardId}: ${reason}`);
    this.name = 'InvalidCardError';
    this.cardId = cardId;
  }
}

// Handle errors gracefully
try {
  const result = await processCard(card);
  return result;
} catch (error) {
  if (error instanceof InvalidCardError) {
    logger.warn('Card validation failed', { cardId: error.cardId });
    return null;
  }
  throw error; // Re-throw unexpected errors
}
```

## Card Design Guidelines

### Data Format Standards

Cards must follow the established JSON schema:

```json
{
  "id": "FR001",
  "name": "Example Card",
  "manaCost": {
    "generic": 2,
    "fire": 1,
    "water": 0
  },
  "type": "Creature",
  "subtypes": ["Dragon"],
  "rarity": "uncommon",
  "power": 3,
  "toughness": 3,
  "abilities": [
    {
      "type": "triggered",
      "trigger": "enters_play",
      "effect": "deal_damage",
      "target": "any",
      "amount": 2
    }
  ],
  "flavorText": "The fires of creation burn eternal.",
  "artist": "Artist Name",
  "set": "core"
}
```

### Balance Considerations

**Power Level Guidelines**

- Creatures: Power + Toughness ≤ 2x Converted Mana Cost + 1
- Spells: Effect value should equal mana cost within 20% variance
- Synergy effects: Individual power reduced, combination power acceptable

**Design Philosophy**

- Avoid oppressive strategies that eliminate meaningful decisions
- Ensure counterplay options exist for all strategies
- Maintain format diversity and archetype viability
- Consider both casual and competitive play implications

### Mechanic Documentation

New mechanics require comprehensive documentation:

```markdown
## Mechanic Name: Forge (Cost)

**Description**: Pay the forge cost to create a permanent copy of this spell.

**Rules Text**: "Forge {cost} (You may pay {cost}. If you do, copy this spell. The copy becomes a permanent with the same abilities.)"

**Implementation Notes**:
- Forge cost is paid as the spell resolves
- The permanent copy has no mana cost
- Triggered abilities on the original don't trigger for the copy

**Balance Considerations**:
- Forge costs should be significantly higher than base cost
- Permanent copies vulnerable to artifact/enchantment removal
- Provides long-term value at immediate tempo cost
```

## Documentation Standards

### Technical Documentation

- Use clear, concise language
- Provide code examples for complex concepts
- Include troubleshooting sections
- Link to related documentation

### Rule Documentation

- Reference official card interactions
- Include timing diagrams for complex scenarios
- Provide comprehensive examples
- Maintain consistency with established terminology

### Accessibility Standards

- Use semantic HTML in web documentation
- Provide alt text for all images
- Ensure adequate color contrast
- Support screen readers and keyboard navigation

## Testing Requirements

### Unit Tests

All code contributions must include comprehensive unit tests:

```javascript
describe('SpellStack', () => {
  test('should resolve spells in LIFO order', () => {
    const stack = new SpellStack();
    const spell1 = new Spell('Lightning Bolt');
    const spell2 = new Spell('Counterspell');
    
    stack.push(spell1);
    stack.push(spell2);
    
    expect(stack.resolve()).toBe(spell2);
    expect(stack.resolve()).toBe(spell1);
  });
  
  test('should handle empty stack gracefully', () => {
    const stack = new SpellStack();
    expect(() => stack.resolve()).not.toThrow();
    expect(stack.resolve()).toBeNull();
  });
});
```

### Integration Tests

Test card interactions and complex scenarios:

```javascript
describe('Card Interactions', () => {
  test('counterspell should prevent spell resolution', async () => {
    const game = new GameState();
    const player1 = game.getPlayer(1);
    const player2 = game.getPlayer(2);
    
    // Player 1 casts Lightning Bolt
    await player1.castSpell('lightning-bolt', player2);
    
    // Player 2 responds with Counterspell
    await player2.castSpell('counterspell', game.stack.top());
    
    // Resolve stack
    await game.resolveStack();
    
    expect(player2.life).toBe(20); // Lightning Bolt was countered
  });
});
```

### Card Validation Tests

Ensure all cards meet quality standards:

```javascript
describe('Card Data Validation', () => {
  test('all cards should have required fields', () => {
    const cards = loadAllCards();
    cards.forEach(card => {
      expect(card.id).toBeDefined();
      expect(card.name).toBeDefined();
      expect(card.manaCost).toBeDefined();
      expect(card.type).toBeDefined();
    });
  });
  
  test('mana costs should be non-negative integers', () => {
    const cards = loadAllCards();
    cards.forEach(card => {
      Object.values(card.manaCost).forEach(cost => {
        expect(Number.isInteger(cost)).toBe(true);
        expect(cost).toBeGreaterThanOrEqual(0);
      });
    });
  });
});
```

## Review Process

### Maintainer Review

All pull requests require review from at least two maintainers:

1. **Technical Review**: Code quality, architecture, performance
2. **Design Review**: Game balance, mechanic appropriateness, format impact
3. **Documentation Review**: Clarity, completeness, accuracy

### Community Review

Design proposals undergo community review:

1. **Proposal Submission** (GitHub Issue)
2. **Discussion Period** (minimum 1 week)
3. **Revision Based on Feedback**
4. **Community Vote** (registered contributors)
5. **Implementation** (if approved)

### Approval Criteria

**Technical Changes**

- Code follows style guidelines
- Tests provide adequate coverage
- Documentation is complete and accurate
- No performance regressions

**Design Changes**

- Maintains game balance
- Fits established design philosophy
- Has clear use cases and counterplay
- Community approval (simple majority)

**Core Rule Changes**

- Extensive playtesting completed
- Minimal impact on existing cards
- Community approval (supermajority)
- Comprehensive documentation update

## Community Governance

### Voting Rights

Contributors earn voting rights through:

- Merged pull requests
- Accepted design proposals  
- Significant documentation contributions
- Community event organization

### Decision Categories

1. **Minor Technical**: Maintainer approval sufficient
2. **Major Features**: Community simple majority (>50%)
3. **Design Changes**: Community simple majority (>50%)
4. **Core Rules**: Community supermajority (>66%)

### Governance Committee

The governance committee consists of:

- Project maintainers (technical oversight)
- Design leads (balance and mechanics)
- Community representatives (elected positions)

Committee responsibilities:

- Resolve disputes and conflicts
- Establish project direction and priorities
- Manage trademark and legal issues
- Coordinate community events and outreach

## Getting Help

### Development Support

- **GitHub Discussions**: General development questions
- **Discord #dev-help**: Real-time assistance
- **Code Reviews**: Detailed feedback on pull requests

### Design Support

- **Discord #design-chat**: Mechanic and balance discussion
- **Monthly Design Calls**: Voice discussion of major proposals
- **Playtesting Groups**: Regular testing of new content

### Community Support

- **Discord #general**: Community discussion and support
- **Reddit r/ForgeRealm**: Broader community engagement
- **GitHub Issues**: Bug reports and feature requests

## Recognition and Attribution

### Contributor Credits

- Commit history provides permanent attribution
- Major contributors featured in release notes
- Design credits on individual cards
- Hall of fame documentation for long-term contributors

### Special Recognition

Outstanding contributors may receive:

- Commit access and maintainer status
- Named cards or mechanics
- Conference speaking opportunities
- Leadership roles in governance

---

Thank you for contributing to Forge Realm. Your participation helps build a truly community-driven TCG that challenges the traditional corporate model while maintaining professional quality and competitive balance.
