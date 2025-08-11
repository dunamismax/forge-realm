# Forge Realm Governance Model

## Overview

Forge Realm operates under a democratic governance model designed to ensure community input drives all major decisions while maintaining project stability and technical excellence. This document outlines our decision-making processes, voting procedures, and organizational structure.

## Core Principles

- **Democratic Decision Making**: Contributors have proportional voice in project direction
- **Transparent Process**: Open decision-making with public documentation  
- **Technical Excellence**: High standards for game design and documentation
- **Community Ownership**: Project belongs to contributors, not individuals
- **Long-term Focus**: Sustainable development over quick fixes

## Organizational Structure

### Governance Committee

The Governance Committee consists of 7 members serving staggered 18-month terms:

**Technical Leads (2 positions)**
- Responsible for code architecture and technical direction
- Must have significant commits to core engine or tooling
- Elected by contributors with merged pull requests

**Design Leads (2 positions)**  
- Oversee game balance and mechanic design
- Must have accepted card or rule proposals
- Elected by contributors with design contributions

**Community Representatives (3 positions)**
- Advocate for player and contributor interests
- Elected by all registered community members
- No specific technical requirements

### Maintainer Roles

**Core Maintainers** (3-5 individuals)
- Commit access to main repository
- Authority over day-to-day technical decisions
- Appointed by Governance Committee

**Area Maintainers** (as needed)
- Specialized maintainer roles for specific components
- Examples: Card Generator, Print System, Documentation
- Appointed by Core Maintainers with committee approval

**Community Moderators** (3-7 individuals)
- Manage Discord, Reddit, and community platforms
- Enforce Code of Conduct
- Appointed by Community Representatives

## Decision Categories and Processes

### Category 1: Minor Technical Changes

**Examples**: Bug fixes, code refactoring, dependency updates, documentation corrections

**Authority**: Core Maintainers
**Process**: Standard pull request review
**Requirements**: Two maintainer approvals
**Timeline**: Immediate upon approval

### Category 2: Major Technical Changes

**Examples**: Documentation restructuring, major format changes, new asset standards

**Authority**: Core Maintainers with Committee oversight
**Process**: 
1. RFC (Request for Comments) submission
2. Technical review period (1 week minimum)
3. Committee approval if controversial
**Requirements**: Three maintainer approvals OR committee majority
**Timeline**: 1-2 weeks

### Category 3: Design Changes

**Examples**: New cards, mechanics, balance changes, format modifications

**Authority**: Community vote
**Process**:
1. Proposal submission through GitHub issues
2. Community discussion period (2 weeks)
3. Design Lead review and recommendation
4. Community vote (1 week)
**Requirements**: Simple majority (>50%) of eligible voters
**Timeline**: 4 weeks total

### Category 4: Core System Changes

**Examples**: Fundamental rule changes, major mechanic overhauls, format restructuring

**Authority**: Community supermajority
**Process**:
1. Detailed proposal with impact analysis
2. Extended discussion period (4 weeks)
3. Playtesting requirement when applicable
4. Committee recommendation
5. Community vote (2 weeks)
**Requirements**: Supermajority (>66%) of eligible voters
**Timeline**: 6-8 weeks total

### Category 5: Governance Changes

**Examples**: Voting procedures, governance structure, committee composition

**Authority**: Community supermajority with committee approval
**Process**:
1. Proposal by any committee member
2. Full committee discussion and approval
3. Community discussion period (4 weeks)
4. Community vote (2 weeks)
**Requirements**: >66% community approval AND committee unanimity
**Timeline**: 6-8 weeks total

## Voting System

### Voter Eligibility

**Contributor Tier** (Full Voting Rights)
- Merged pull request to any project repository
- Accepted card or design proposal
- Significant documentation contribution
- Community moderation role

**Community Tier** (Limited Voting Rights)
- Active Discord/Reddit participation (90 days)
- Votes on community representative elections only
- Can participate in non-binding polls

### Voting Mechanics

**Proposal Submission**: Any eligible voter can submit proposals using designated GitHub issue templates.

**Discussion Phase**: Community discusses proposals with structured comment periods and FAQ maintenance.

**Voting Phase**: 
- Conducted through secure, auditable system (GitHub reactions or dedicated platform)
- Anonymous ballots with public results
- Detailed vote tallies published

**Vote Counting**:
- Simple Majority: >50% of votes cast
- Supermajority: >66% of votes cast  
- Minimum Participation: 30% of eligible voters for binding results

### Conflict Resolution

**Technical Disputes**
1. Maintainer discussion and attempted consensus
2. Committee technical review if unresolved
3. Community input for complex cases
4. Committee binding decision as last resort

**Design Disputes**
1. Community discussion with Design Lead facilitation
2. Structured debate period with defined positions
3. Community vote if consensus impossible
4. Post-vote implementation planning

**Governance Disputes**
1. Committee internal discussion
2. Community input gathering
3. External mediation if needed (respected community figures)
4. Committee supermajority decision

## Proposal Process

### RFC (Request for Comments) Template

```markdown
# RFC: [Title]

## Summary
Brief overview of the proposed change

## Motivation  
Why is this change necessary?

## Detailed Design
Technical specification or design details

## Impact Assessment
- Compatibility: Effects on existing cards/code
- Community: How this affects players and contributors
- Resources: Implementation effort required

## Alternatives Considered
What other approaches were evaluated?

## Open Questions
Unresolved issues requiring community input

## Timeline
Proposed implementation schedule
```

### Proposal Lifecycle

1. **Draft**: Initial proposal creation and refinement
2. **Discussion**: Community review and feedback period
3. **Revision**: Proposal updates based on feedback
4. **Vote**: Formal voting process
5. **Implementation**: Approved proposals move to development
6. **Review**: Post-implementation evaluation

## Committee Operations

### Meeting Schedule
- Monthly public meetings via Discord voice chat
- Emergency meetings as needed for urgent issues
- All meetings recorded and transcribed

### Meeting Agenda
1. Previous meeting action items
2. New proposals and RFCs  
3. Community feedback and concerns
4. Project status and milestones
5. Open discussion

### Decision Documentation
- All decisions recorded in public GitHub repository
- Rationale and dissenting opinions documented
- Vote tallies published within 24 hours

### Term Limits and Elections

**Election Schedule**
- Staggered 18-month terms to ensure continuity
- Elections held in March and September
- 30-day nomination and campaign period
- 14-day voting period

**Nomination Process**
- Self-nomination or community nomination accepted
- Candidate statement required (500 words maximum)
- Eligibility verification by current committee

**Campaign Guidelines**
- Focus on vision and qualifications
- No negative campaigning against other candidates
- Equal access to community communication channels
- Spending limits: $0 (no monetary campaigning allowed)

## Emergency Procedures

### Emergency Authority
In cases of security vulnerabilities, legal issues, or critical system failures:
- Any Core Maintainer may take immediate action
- Committee must be notified within 24 hours
- Community notification within 48 hours
- Retroactive approval process within 1 week

### Urgent Voting
For time-sensitive proposals:
- Shortened discussion period (minimum 72 hours)
- Accelerated voting (48-hour maximum)
- Requires 2/3 committee approval to invoke
- Limited to genuine emergencies

## Annual Review Process

Each year, the governance model undergoes comprehensive review:

1. **Community Survey** (January): Gather feedback on governance effectiveness
2. **Performance Analysis** (February): Evaluate decision quality and timeline
3. **Proposal Development** (March): Develop improvement recommendations
4. **Implementation** (April-May): Update governance procedures as approved

## Enforcement and Sanctions

### Code of Conduct Violations
- Warning system for minor violations
- Temporary voting suspension for moderate violations
- Permanent exclusion for severe violations
- Appeal process through committee review

### Vote Manipulation
- Automatic disqualification from current vote
- Voting privilege suspension (3-12 months)
- Potential permanent ban for repeat offenses

### Committee Member Accountability
- No-confidence votes possible with 40% community petition
- Automatic removal for Code of Conduct violations
- Term limits prevent indefinite power concentration

## Transparency Requirements

### Public Information
- All governance documents and procedures
- Committee meeting minutes and recordings
- Vote results and participation statistics
- Decision rationales and dissenting opinions

### Private Information
- Individual vote choices (anonymous voting)
- Internal deliberations on personnel matters
- Legal discussions (attorney-client privilege)
- Security-sensitive implementation details

## Amendments to Governance

This governance model may be amended through the Category 5 process outlined above. All amendments require:
- Committee unanimity on the proposed changes
- 4-week community discussion period
- >66% community approval in voting
- 6-month minimum interval between major amendments

---

**Document Status**: Version 1.0  
**Last Updated**: Initial Version  
**Next Review**: Annual review scheduled for January

This governance model balances democratic participation with technical expertise while ensuring long-term project sustainability and community ownership.