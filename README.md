<p align="center">
  <img src="static/images/forge-realm-main-wide.webp" alt="Forge Realm - Open Source Trading Card Game" width="600" />
</p>

# Forge Realm TCG - Classic Magic. Community Powered.

**The future of Magic's past** - Forge Realm preserves Magic's strategic depth through open-source development. Built on Legacy and Vintage foundations with community-driven evolution, we're democratizing access to the classic Magic experience where strategy matters more than your wallet.

[![Play Now](https://img.shields.io/badge/Play_Now-forge--realm.com-50fa7b?style=for-the-badge&labelColor=0b0b0b)](https://forge-realm.com)
[![Join Discord](https://img.shields.io/badge/Join_Discord-Community-8839ef?style=for-the-badge&labelColor=0b0b0b)](https://discord.gg/KQTY8DfY)
[![License](https://img.shields.io/badge/License-CC_BY--SA_4.0-a6e3a1?style=for-the-badge&labelColor=0b0b0b)](LICENSE)

---

## **Core Set Launch: Tentative Q1 2026**

The inaugural card set featuring full original artwork, complete mechanics, and balanced starter decks is in active development. Built on Legacy and Vintage foundations with carefully chosen enhancements that honor Magic's classic design principles. **Join our Discord - we need contributors for card mechanics, artwork, and game design!**

---

## **Why Forge Realm?**

### **For Players**

- **Always Free** - Print any card, build any deck, no Reserved List nonsense
- **Classic Magic Experience** - Legacy and Vintage mechanics without corporate interference
- **Legacy & Vintage Focus** - The most strategic and enduring formats
- **Global Access** - Play anywhere with just a printer and some friends

### **For the Community**

- **True Democracy** - Every major decision is voted on by the community
- **Complete Transparency** - All discussions, votes, and development are public
- **Open Source Forever** - Game rules, artwork, and code will always be free
- **No Corporate Control** - Players own and control Magic's future

---

## **Start Playing in 4 Steps**

```sh
1. Learn the Rules     → forge-realm.com/docs/gameplay/quick-start/
2. Print Your Cards    → forge-realm.com/docs/printing/
3. Join Our Community  → discord.gg/KQTY8DfY
4. Find Opponents      → Play with Discord community
```

**Ready to revolutionize TCGs?** **Click the badges above to get started!**

---

## **Our Mission**

**To preserve and democratize Magic: The Gathering's strategic depth for future
generations.**

We believe that Magic's incredible gameplay shouldn't be locked behind corporate
paywalls or artificial scarcity. Forge Realm represents a return to pure Magic
where:

- **Players control the game**, not Hasbro shareholders
- **Strategy matters more** than your collection value
- **Communities thrive** through collaboration, not chasing expensive singles
- **Classic Magic lives on** through democratic participation, not corporate
  decisions

---

## **What Makes Us Different**

| Corporate MTG             | Forge Realm MTG            |
| ------------------------- | -------------------------- |
| Reserved List gatekeeping | All cards freely available |
| $200+ Modern decks        | Print-and-play for $20     |
| Hasbro profit focus       | Pure gameplay focus        |
| Closed development        | Transparent process        |
| Standard format pushing   | Legacy/Vintage emphasis    |

---

## **Join the Revolution**

**[Visit forge-realm.com](https://forge-realm.com)** - Complete documentation,
rules, and everything you need to play

**[Join our Discord](https://discord.gg/KQTY8DfY)** - Active community of
players, designers, and contributors shaping the game's future

**Contact**: [dunamismax@forge-realm.com](mailto:dunamismax@forge-realm.com) -
Questions? Ideas? Let's talk!

## Contributing

Contributions are welcome! Visit the
[Contributing Guide](https://forge-realm.com/docs/contributing/) on our website
to learn how to get involved in:

### Game Development

- Game design and balance
- Card artwork and graphics
- Playtesting and feedback
- Community events and testing

### Technical Development

- Website development and improvements
- Documentation and guides
- Developer tools and automation
- Performance and accessibility

## Development

- Custom theme variables live in `assets/scss/_variables_project.scss`.
- All custom styles (including shortcode UI) are centralized in
  `assets/scss/_styles_project.scss`.
- Inline `<style>` blocks were removed from templates in favor of SCSS for
  maintainability and DRYness.

### Design and Theming Quick Guide

- Tokens: Use CSS variables `--forge-*` (colors, shadows, radii) and SCSS vars
  in `_variables_project.scss`.
- Buttons: Primary uses gradient border + soft glow; secondary is a subtle
  gradient. Both respond to `:focus-visible` with an accessible ring.
- Navbar/Hero: Glassy navbar with blur; hero gets an overlay vignette for
  consistent legibility over cover images.
- Links: Non-button links get animated underlines; icons in buttons nudge on
  hover for micro‑interaction.
- Motion: On‑scroll reveals and zoom‑in are disabled under
  `prefers-reduced-motion`.

## License

- **Game Content**: Creative Commons BY-SA 4.0 - Freely usable with attribution
- **Documentation & Code**: Apache License 2.0 - Open source development
- **Website Content**: Apache License 2.0 - Community contributions welcome

See [LICENSE](LICENSE) for complete terms.

---

**Ready to play? We'll be there soon!** Visit
**[forge-realm.com](https://forge-realm.com)** and join our
[Discord](https://discord.gg/KQTY8DfY) to join us on this journey!

---

<!-- Deployment handled by Cloudflare Pages build (hugo). No GitHub Actions. -->
