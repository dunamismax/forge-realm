# Forge Realm TCG - Claude Agent Instructions

## 🎯 **Project Overview**
Forge Realm is a custom Magic: The Gathering trading card game website built with Hugo and a **heavily customized Hextra theme**. This is NOT a standard theme installation - it's a forked and personalized theme that should be modified directly as needed.

## 🔧 **Critical Instructions for AI Agents**

### **ALWAYS MODIFY THEME FILES DIRECTLY**
- ❌ **NEVER** suggest workarounds or CSS overrides when theme modifications are needed
- ✅ **ALWAYS** modify files in `/themes/hextra-theme/` directly
- ✅ This is a forked theme specifically designed to be customized
- ✅ The owner expects and wants direct theme modifications

### **Theme Customization Philosophy**
This theme is intended to evolve and adapt as the website grows. Direct modifications are not only acceptable but encouraged. The theme files are part of the project's source code and should be treated as such.

## 📁 **Project Structure**

### **Key Directories**
```
forge-realm/
├── content/                     # Hugo content (Markdown files)
├── layouts/                     # Custom layout overrides
│   └── partials/custom/         # Custom partial templates
├── assets/                      # Custom assets (CSS, JS)
│   ├── css/custom.css          # Main custom stylesheet
│   └── js/                     # Custom JavaScript files
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

## 🎨 **Current Customizations**

### **Visual Design**
- **Dark theme by default** with theme toggle disabled
- **Custom MTG mana colors** throughout the design
- **Responsive navigation** with mobile-optimized header
- **Custom spacing system** using CSS variables
- **Enhanced typography** with Inter and JetBrains Mono fonts

### **Performance Enhancements**
- **Service Worker** for offline support (`/static/sw.js`)
- **Enhanced JavaScript system** (`/assets/js/forge-realm-enhanced.js`)
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

## ⚙️ **Configuration**

### **Key Hugo Settings (`hugo.toml`)**
```toml
[params.theme]
  default = "dark"
  displayToggle = false          # Theme toggle disabled

[params.editURL]
  enable = false                 # Edit links disabled

[params.navbar]
  displayTitle = true
  displayLogo = true
  [params.navbar.logo]
    path = "images/forge-realm-PNG-circular-emblem.webp"
    width = 80
    height = 80
```

## 🛠️ **Development Guidelines**

### **CSS Architecture**
- **CSS Custom Properties** for consistent theming
- **Modular utility classes** with `fr-` prefix
- **Mobile-first responsive design**
- **DRY principles** throughout stylesheets

### **JavaScript Enhancement**
- **ES6+ modern JavaScript** with class-based architecture
- **Progressive enhancement** patterns
- **Performance monitoring** and optimization
- **Accessibility features** built-in

### **File Modification Priorities**
1. **Theme files first** - Always modify the source
2. **Custom CSS second** - For additional styling
3. **Custom JS third** - For enhanced functionality
4. **Configuration last** - For behavior changes

## 🎮 **MTG-Specific Features**

### **Mana Color System**
```css
--mana-green: #006533;
--mana-blue: #264490;
--mana-white: #E49506;
--mana-red: #7E011E;
--mana-black: #420161;
```

### **Content Structure**
- `/docs/cards/` - Card database
- `/docs/gameplay/` - Rules and formats
- `/docs/printing/` - Printing guides
- `/docs/community/` - Community content

## 🚀 **Performance Standards**

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

## 🔍 **Common Tasks**

### **Adding New Features**
1. Check if theme modification is needed
2. Modify theme files directly if required
3. Add custom CSS/JS as enhancement
4. Test across all breakpoints
5. Verify PWA functionality

### **UI/UX Improvements**
1. **Always modify theme files first**
2. Use established CSS variables
3. Follow mobile-first approach
4. Maintain accessibility standards
5. Test with enhanced JavaScript system

### **Content Management**
1. Add new content to `/content/` directory
2. Use Hugo shortcodes for enhanced layouts
3. Follow MTG terminology and style guide
4. Include appropriate metadata

## 📱 **Mobile Considerations**

### **Navigation Requirements**
- Header must fit: logo + title + 2-3 icons + hamburger
- Search box must be fully visible in mobile menu
- Touch targets minimum 44px (2.75rem)
- Smooth animations with proper z-index management

### **Responsive Breakpoints**
- Mobile: < 480px (3.5rem nav height)
- Tablet: 480px - 1024px (4rem nav height)
- Desktop: > 1024px (5rem nav height)

## 🧪 **Testing Guidelines**

### **Required Testing**
- [ ] Mobile portrait and landscape
- [ ] Tablet orientation changes
- [ ] Desktop responsive behavior
- [ ] Dark mode appearance
- [ ] PWA installation and offline functionality
- [ ] Service Worker caching
- [ ] JavaScript error handling

### **Performance Testing**
- [ ] Lighthouse audit scores
- [ ] Core Web Vitals metrics
- [ ] Mobile page speed
- [ ] Service Worker effectiveness

## 🚨 **Important Notes**

### **Never Do This**
- ❌ Suggest CSS workarounds for theme issues
- ❌ Avoid modifying theme files
- ❌ Add unnecessary !important declarations
- ❌ Break mobile responsiveness
- ❌ Remove accessibility features

### **Always Do This**
- ✅ Modify theme files directly when needed
- ✅ Test on mobile devices
- ✅ Maintain performance standards
- ✅ Follow established patterns
- ✅ Document significant changes

## 📞 **Support Information**

### **External Links**
- **GitHub Repository**: https://github.com/dunamismax/forge-realm
- **Discord Community**: https://discord.gg/KQTY8DfY
- **Live Website**: https://forge-realm.com

### **Technical Stack**
- **Static Site Generator**: Hugo (v0.146.0+)
- **Theme Base**: Hextra (heavily customized)
- **Deployment**: GitHub Pages / Netlify
- **CDN**: Cloudflare (for fonts and assets)

---

## 🎯 **Agent Action Checklist**

When working on this project, always:

1. **Identify if theme modification is needed** ✅
2. **Modify theme files directly** ✅
3. **Test mobile responsiveness** ✅
4. **Verify dark mode appearance** ✅
5. **Check PWA functionality** ✅
6. **Validate performance impact** ✅
7. **Document changes made** ✅

**Remember: This is a custom theme designed to be modified. Direct theme changes are not only acceptable but expected and encouraged.**