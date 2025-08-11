# Security Policy

## Supported Versions

We provide security updates for the following versions of Forge Realm:

| Version | Supported          |
| ------- | ------------------ |
| main    | :white_check_mark: |
| 0.x     | :white_check_mark: |

As an early-stage project, we currently support all released versions. This policy will be updated as the project matures and we establish a formal versioning scheme.

## Reporting a Vulnerability

### Security-First Approach

Forge Realm takes security seriously. As an open-source TCG platform handling user-generated content and community voting, we must maintain robust security practices to protect our community and infrastructure.

### Reporting Process

If you discover a security vulnerability, please follow these steps:

1. **Do NOT create a public GitHub issue** for security vulnerabilities
2. **Email <security@forgerealm.org>** with details of the vulnerability
3. **Include the following information**:
   - Description of the vulnerability
   - Steps to reproduce the issue
   - Potential impact and severity assessment
   - Any proof-of-concept code (if applicable)
   - Your contact information for follow-up

### Response Timeline

- **Initial Response**: Within 24 hours of receiving your report
- **Assessment**: We will assess the vulnerability within 72 hours
- **Resolution Timeline**: Critical vulnerabilities will be patched within 7 days
- **Public Disclosure**: After fixes are deployed, we will publicly acknowledge the issue and credit the reporter (unless anonymity is requested)

### Security Scope

#### In Scope

The following areas are within scope for security reports:

**Infrastructure Security**

- Authentication and authorization flaws
- Cross-site scripting (XSS) vulnerabilities
- SQL injection or NoSQL injection
- Cross-site request forgery (CSRF)
- Server-side request forgery (SSRF)
- Remote code execution vulnerabilities

**Application Security**

- Card data validation bypasses
- Print generation system vulnerabilities
- Game engine exploitation
- User input sanitization failures
- File upload security issues

**Community Platform Security**

- Vote manipulation vulnerabilities
- Privilege escalation in governance systems
- Discord bot security issues
- GitHub integration vulnerabilities
- User data exposure risks

**Supply Chain Security**

- Dependency vulnerabilities with known CVEs
- Package integrity issues
- Build system security flaws
- Distribution security concerns

#### Out of Scope

The following are generally not considered security vulnerabilities:

- Issues in third-party dependencies without direct impact
- Social engineering attacks
- Physical access attacks
- Denial of service attacks requiring excessive resources
- Issues requiring user installation of malicious software
- Game balance issues or card design problems
- Theoretical vulnerabilities without practical exploitation

### Severity Classification

We classify security vulnerabilities using the following severity levels:

#### Critical (CVSS 9.0-10.0)

- Remote code execution without authentication
- Complete system compromise
- Mass user data exposure
- Complete bypass of authentication systems

**Response Time**: Immediate (within 24 hours)

#### High (CVSS 7.0-8.9)

- Remote code execution requiring authentication
- Significant user data exposure
- Administrative privilege escalation
- Complete bypass of authorization systems

**Response Time**: Within 72 hours

#### Medium (CVSS 4.0-6.9)

- Cross-site scripting vulnerabilities
- SQL injection with limited impact
- User privilege escalation
- Moderate data exposure

**Response Time**: Within 1 week

#### Low (CVSS 0.1-3.9)

- Information disclosure with minimal impact
- Minor input validation issues
- Low-impact authentication bypasses

**Response Time**: Within 2 weeks

### Coordinated Disclosure

We follow responsible disclosure practices:

1. **Private Disclosure**: Initial vulnerability report remains confidential
2. **Collaboration**: We work with the reporter to understand and validate the issue
3. **Fix Development**: We develop and test fixes in private repositories when necessary
4. **Security Advisory**: We prepare a security advisory documenting the issue
5. **Public Release**: We coordinate public disclosure with the security fix deployment
6. **Credit Attribution**: We publicly credit security researchers (unless anonymity is requested)

### Security Research Guidelines

When conducting security research on Forge Realm:

#### Permitted Activities

- Testing against your own installations
- Static analysis of publicly available source code
- Review of our dependencies for known vulnerabilities
- Analysis of our published documentation for security issues

#### Prohibited Activities

- Accessing data that doesn't belong to you
- Disrupting the service for other users
- Automated scanning that generates excessive load
- Social engineering of community members or maintainers
- Physical attacks against infrastructure

### Bug Bounty Program

Currently, Forge Realm does not offer monetary rewards for security vulnerabilities. However, we do provide recognition for security researchers:

**Recognition Benefits**:

- Public acknowledgment in security advisories
- Credit in our Hall of Fame documentation
- Special recognition badge in our Discord community
- Priority consideration for maintainer roles
- Speaking opportunities at community events

**Future Bounty Program**: As the project grows, we plan to establish a formal bug bounty program with monetary rewards.

### Security Development Practices

#### Code Security Standards

**Input Validation**

```javascript
// Always validate and sanitize user input
function validateCardData(cardData) {
  const schema = getCardSchema();
  const result = validateSchema(cardData, schema);
  if (!result.valid) {
    throw new ValidationError('Invalid card data', result.errors);
  }
  return sanitizeCardData(cardData);
}
```

**Authentication and Authorization**

```javascript
// Verify user permissions for sensitive operations
function requirePermission(user, permission) {
  if (!user.hasPermission(permission)) {
    throw new UnauthorizedError('Insufficient permissions');
  }
}

// Example usage in governance voting
function castVote(user, proposal, vote) {
  requirePermission(user, 'VOTE');
  requireAuth(user);
  // ... voting logic
}
```

**Secure Data Handling**

```javascript
// Never log sensitive information
function processVote(vote) {
  logger.info('Processing vote', { 
    proposalId: vote.proposalId,
    userId: hashUserId(vote.userId), // Hash PII
    timestamp: vote.timestamp
  });
  // Don't log: vote.userDetails, vote.ipAddress, etc.
}
```

#### Infrastructure Security

**Dependency Management**

- Regular dependency audits using `npm audit`
- Automated vulnerability scanning with Dependabot
- Pinned dependency versions in production
- Supply chain validation for critical dependencies

**Build Security**

- Signed commits required for security-sensitive changes
- Multi-party approval for production deployments
- Isolated build environments
- Artifact signing and verification

**Access Control**

- Multi-factor authentication required for maintainers
- Principle of least privilege for all access grants
- Regular access reviews and revocation
- Separate staging and production environments

### Incident Response Plan

In the event of a confirmed security incident:

#### Immediate Response (0-4 hours)

1. **Containment**: Isolate affected systems
2. **Assessment**: Determine scope and impact
3. **Communication**: Notify governance committee
4. **Documentation**: Begin incident log

#### Short-term Response (4-24 hours)

1. **Investigation**: Identify root cause
2. **Mitigation**: Implement temporary fixes
3. **Communication**: Update stakeholders
4. **Monitoring**: Enhanced monitoring of affected systems

#### Medium-term Response (1-7 days)

1. **Permanent Fix**: Develop and deploy lasting solution
2. **Testing**: Comprehensive testing of fixes
3. **Communication**: Public disclosure preparation
4. **Process Review**: Evaluate response effectiveness

#### Long-term Response (1-4 weeks)

1. **Post-mortem**: Comprehensive incident analysis
2. **Process Improvement**: Update security procedures
3. **Training**: Security awareness updates
4. **Monitoring**: Long-term impact assessment

### Security Contact Information

**Primary Security Contact**

- Email: <security@forgerealm.org>
- PGP Key: [Link to public key]
- Response Time: Within 24 hours

**Governance Committee Security Contact**

- Email: <governance-security@forgerealm.org>
- Use for: High-severity issues affecting governance
- Response Time: Within 12 hours

**Emergency Contact**

- For critical vulnerabilities actively being exploited
- Email: <emergency-security@forgerealm.org>
- Response Time: Within 4 hours

### Security Advisories

Public security advisories are published at:

- GitHub Security Advisories: github.com/sawyer/forge-realm/security/advisories
- Project Website: forgerealm.org/security
- Community Discord: #security-announcements channel

### Security Training and Awareness

All maintainers and contributors with commit access must:

- Complete security awareness training
- Follow secure coding practices
- Participate in regular security reviews
- Report suspicious activity immediately

---

**Last Updated**: Initial Version  
**Next Review**: 6 months from publication

Thank you for helping keep Forge Realm secure for our entire community.
