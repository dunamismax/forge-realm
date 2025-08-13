# Ideal Magic - Claude Agent Instructions

## **Project Overview**

Ideal Magic is the ultimate curation of Magic: The Gathering—featuring only the most beloved and balanced mechanics while completely removing problematic ones. The website is built with Hugo and a **heavily customized Hextra theme** designed to showcase "Magic at its best."

**This is NOT a standard theme installation** - it's a forked and personalized theme that should be modified directly as needed to support the perfect MTG experience.

## **The Ideal Magic Philosophy**

### **Core Vision**

It's the Magic you remember at its best—sharp, interactive, and endlessly replayable—refined until every decision feels clean in the hand and vivid on the table. The rules step out of the way. The drama stays.

### **Key Principles**

- **20 life, London Mulligan** - Classic starting point with modern smoothing
- **Ward over Hexproof** - Interaction with a fair tax, not a wall
- **Board-first gameplay** - Every moving part lives where you can see it
- **The beloved "glue suite"** - Mechanics that make choices sing
- **No sand in the gears** - Cut mechanics that track ghosts or break pace

### **The Glue Suite (Featured Mechanics)**

**Primary mechanics that appear frequently:**

- **Kicker** - Scale spells to the moment
- **Cycling** - Trade dead draws for live ones
- **Flashback** - Turn graveyard into second hand—once, cleanly
- **Foretell** - Bank spells for later, adding tension
- **Adventure** - Tuck cantrips into creatures
- **Landfall** - Reward natural play rhythm
- **Sagas** - Pace chaptered arcs with visible counters
- **Investigate** - Create Clues: half a card now, whole card when ready

**Secondary mechanics (controlled doses):**

- **Rebound**, **Surge**, **Raid** - Celebrate perfect turns without breaking them
- **Buyback** (rare, conservatively costed), **Emerge** (small curated clusters)

### **Banned/Excluded Mechanics**

- **Storm, Dredge, Companion** - Format-warping engines
- **Day/Night, Dungeons, Cipher** - Off-board bookkeeping
- **Cumulative Upkeep** - Escalating maintenance costs
- **"Free engine" loops** that turn games into solitaire

## **Critical Instructions for AI Agents**

### **ALWAYS MODIFY THEME FILES DIRECTLY**

- **NEVER** suggest workarounds or CSS overrides when theme modifications are needed
- **ALWAYS** modify files in `/themes/hextra-theme/` directly
- This is a forked theme specifically designed to be customized
- The owner expects and wants direct theme modifications

### **Theme Customization Philosophy**

This theme is intended to evolve and adapt as the Ideal Magic experience grows. Direct modifications are not only acceptable but encouraged. The theme files are part of the project's source code and should be treated as such.

## **Project Structure**

### **Key Directories**

```
ideal-magic/
├── content/                     # Hugo content (Markdown files)
│   ├── docs/gameplay/          # Core rules and formats (CANONICAL - rarely modify)
│   ├── docs/printing/          # Print-and-play guides
│   └── docs/                   # General documentation
├── layouts/                     # Custom layout overrides
│   └── partials/custom/         # Custom partial templates
├── assets/                      # Custom assets (CSS, JS)
│   ├── css/custom.css          # Main custom stylesheet
│   └── js/                     # Custom JavaScript files
│       ├── ideal-magic-enhanced.js  # Performance & UX system
│       └── ideal-magic-spa.js       # SPA navigation system
├── static/                     # Static files (images, favicon, etc.)
├── themes/hextra-theme/        # **CUSTOMIZED THEME - MODIFY DIRECTLY**
│   ├── layouts/                # Theme template files
│   ├── assets/                 # Theme assets
│   └── static/                 # Theme static files
└── hugo.toml                   # Hugo configuration
```

### **Important Theme Files (Modify Directly)**

- `themes/hextra-theme/layouts/_partials/navbar.html` - Navigation bar
- `themes/hextra-theme/layouts/_partials/sidebar.html` - Sidebar with TOC
- `themes/hextra-theme/layouts/_partials/toc.html` - Table of contents
- `themes/hextra-theme/layouts/_partials/footer.html` - Footer
- `themes/hextra-theme/layouts/_partials/theme-toggle.html` - Theme switcher

### **Content Guidelines**

- **Gameplay rules** (`/content/docs/gameplay/`) are CANONICAL - only modify for obvious errors
- **Homepage and general content** should reflect the Ideal Magic philosophy and vision
- **Documentation** should be concise, player-focused, and emphasize the "perfect MTG" experience
- Use the exact terminology and phrasing from the Ideal Magic vision when possible

## **Current Customizations**

### **Visual Design**

- **Dark theme by default** with theme toggle disabled
- **Custom MTG mana colors** throughout the design
- **Responsive navigation** with mobile-optimized header
- **Custom spacing system** using CSS variables
- **Enhanced typography** with Inter and JetBrains Mono fonts

### **Performance Enhancements**

- **Service Worker** for offline support (`/static/sw.js`)
- **Enhanced JavaScript system** (`/assets/js/ideal-magic-enhanced.js`)
- **SPA Navigation** (`/assets/js/ideal-magic-spa.js`) for lightning-fast page transitions
- **Progressive Web App** features with custom manifest
- **Optimized image loading** and lazy loading
- **Critical CSS inlining** for mobile performance

### **Disabled Features**

- Theme toggle (dark mode only)
- "Edit this page" links
- "Scroll to top" buttons in TOC
- Footer theme toggle

### **Mobile Optimizations**

- Compact navigation header (3.5rem height)
- Responsive logo and title sizing
- Fixed mobile menu with proper search box visibility
- Touch-optimized button sizes
- Gesture support for menu interactions

## **Configuration**

### **Key Hugo Settings (`hugo.toml`)**

```toml
[params]
  description = "It's the Magic you remember at its best—sharp, interactive, and endlessly replayable—refined until every decision feels clean in the hand and vivid on the table."

[params.theme]
  default = "dark"
  displayToggle = false          # Theme toggle disabled

[params.editURL]
  enable = false                 # Edit links disabled

[params.navbar]
  displayTitle = true
  displayLogo = true
  [params.navbar.logo]
    path = "images/ideal-magic-circular-emblem.webp"
    width = 80
    height = 80
```

## **Development Guidelines**

### **CSS Architecture**

- **CSS Custom Properties** for consistent theming
- **Modular utility classes** with `fr-` prefix (legacy) and standard naming
- **Mobile-first responsive design**
- **DRY principles** throughout stylesheets

### **JavaScript Enhancement**

- **ES6+ modern JavaScript** with class-based architecture
- **Progressive enhancement** patterns
- **Performance monitoring** and optimization
- **Accessibility features** built-in
- **SPA navigation** for seamless user experience

### **File Modification Priorities**

1. **Theme files first** - Always modify the source
2. **Custom CSS second** - For additional styling
3. **Custom JS third** - For enhanced functionality
4. **Configuration last** - For behavior changes

## **MTG-Specific Features**

### **Mana Color System**

```css
--mana-green: #006533;
--mana-blue: #264490;
--mana-white: #E49506;
--mana-red: #7E011E;
--mana-black: #420161;
```

### **Content Structure**

- `/docs/gameplay/` - Rules, formats, and quick start (CANONICAL)
- `/docs/printing/` - Print-and-play guides for proxies
- Main site content should emphasize the "perfect MTG experience"

### **Ideal Magic Terminology**

When writing content, use these key phrases that embody the vision:

- "Magic at its best"
- "The beloved glue suite"
- "Ward over Hexproof"
- "Board-first gameplay"
- "No sand in the gears"
- "Familiar, but lighter in the hand"
- "Every decision feels clean in the hand and vivid on the table"

## **Performance Standards**

### **Core Web Vitals Targets**

- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### **Optimization Features**

- Service Worker caching strategies
- Critical resource preloading
- Image optimization and lazy loading
- Mobile performance optimizations
- Progressive Web App capabilities
- SPA navigation for instant page transitions

## **Common Tasks**

### **Adding New Features**

1. Check if theme modification is needed
2. Modify theme files directly if required
3. Add custom CSS/JS as enhancement
4. Test across all breakpoints
5. Verify PWA functionality
6. Ensure alignment with Ideal Magic philosophy

### **UI/UX Improvements**

1. **Always modify theme files first**
2. Use established CSS variables
3. Follow mobile-first approach
4. Maintain accessibility standards
5. Test with enhanced JavaScript system
6. Preserve the "Magic at its best" aesthetic

### **Content Management**

1. Add new content to `/content/` directory
2. Use Hugo shortcodes for enhanced layouts
3. Follow Ideal Magic terminology and philosophy
4. Include appropriate metadata
5. **DO NOT modify gameplay rules without explicit instruction**

## **Mobile Considerations**

### **Navigation Requirements**

- Header must fit: logo + title + 2-3 icons + hamburger
- Search box must be fully visible in mobile menu
- Touch targets minimum 44px (2.75rem)
- Smooth animations with proper z-index management

### **Responsive Breakpoints**

- Mobile: < 480px (3.5rem nav height)
- Tablet: 480px - 1024px (4rem nav height)
- Desktop: > 1024px (5rem nav height)

## **Testing Guidelines**

### **Required Testing**

- [ ] Mobile portrait and landscape
- [ ] Tablet orientation changes
- [ ] Desktop responsive behavior
- [ ] Dark mode appearance
- [ ] PWA installation and offline functionality
- [ ] Service Worker caching
- [ ] JavaScript error handling
- [ ] SPA navigation performance

### **Performance Testing**

- [ ] Lighthouse audit scores
- [ ] Core Web Vitals metrics
- [ ] Mobile page speed
- [ ] Service Worker effectiveness
- [ ] SPA transition smoothness

## **Important Notes**

### **Never Do This**

- Suggest CSS workarounds for theme issues
- Avoid modifying theme files
- Add unnecessary !important declarations
- Break mobile responsiveness
- Remove accessibility features
- Modify gameplay rules without explicit instruction
- Use corporate/political messaging (this is about perfect gameplay, not opposition)

### **Always Do This**

- Modify theme files directly when needed
- Test on mobile devices
- Maintain performance standards
- Follow established patterns
- Document significant changes
- Use Ideal Magic terminology and vision in content
- Preserve the "Magic at its best" philosophy

## **Support Information**

### **External Links**

- **GitHub Repository**: <https://github.com/dunamismax/ideal-magic>
- **Discord Community**: <https://discord.gg/KQTY8DfY>
- **Live Website**: <https://ideal-magic.com>

### **Technical Stack**

- **Static Site Generator**: Hugo (v0.146.0+)
- **Theme Base**: Hextra (heavily customized)
- **Deployment**: Cloudflare Pages
- **CDN**: Cloudflare (for fonts and assets)
- **JavaScript**: ES6+ with SPA navigation and performance enhancements

---

## **Agent Action Checklist**

When working on this project, always:

1. **Understand the Ideal Magic philosophy**
2. **Identify if theme modification is needed**
3. **Modify theme files directly**
4. **Test mobile responsiveness**
5. **Verify dark mode appearance**
6. **Check PWA functionality**
7. **Validate performance impact**
8. **Ensure content aligns with vision**
9. **Document changes made**

**Remember: This is a custom theme designed to be modified. Direct theme changes are not only acceptable but expected and encouraged. The goal is showcasing Magic: The Gathering at its absolute best.**

---

**"Shuffle up. Every line you see is a line you can play."**
