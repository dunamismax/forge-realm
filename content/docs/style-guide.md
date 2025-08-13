---
title: "Style Guide"
linkTitle: "Style Guide"
weight: 70
description: >
  Design system and content guidelines for the Ideal Magic website—
  showcasing Magic: The Gathering at its absolute best.
---

Design system and content guidelines for showcasing **Magic at its best** through the Ideal Magic website.

## **Ideal Magic Philosophy**

### **Core Principles**

- **Magic at its best** - Every element reflects the perfect MTG experience
- **Board-first clarity** - Information is visible and accessible
- **Ward over Hexproof** - Interaction with fair barriers, not walls
- **Familiar, lighter in hand** - Refined experience without unnecessary complexity

### **Content Voice**

Use the established Ideal Magic terminology:

- "The beloved glue suite"
- "No sand in the gears"
- "Every decision feels clean in the hand and vivid on the table"
- "20 life, London Mulligan"

## **Visual Design**

### **Dark Theme Foundation**

- **Default mode**: Dark theme only (no toggle)
- **MTG-inspired**: Mana colors throughout design
- **High contrast**: Excellent readability for gameplay focus
- **Performance-first**: Optimized for mobile and PWA

### **Mana Color System**

```css
--mana-green: #006533;   /* Primary accent */
--mana-blue: #264490;    /* Information */
--mana-white: #E49506;   /* Warnings */
--mana-red: #7E011E;     /* Alerts */
--mana-black: #420161;   /* Dark accents */
```

### **Typography**

- **Primary**: Inter (clean, readable)
- **Code**: JetBrains Mono (developer-friendly)
- **Scale**: Mobile-first, responsive sizing
- **Hierarchy**: Clear heading structure for gameplay rules

## **Content Guidelines**

### **Writing Style**

- **Concise and direct** - Respect players' time
- **Gameplay-focused** - Emphasize the perfect MTG experience
- **Accessible** - Clear to both new and experienced players
- **Vision-aligned** - Use Ideal Magic terminology consistently

### **Content Types**

**Gameplay Rules** (CANONICAL):

- Preserve exact wording and structure
- Only modify for obvious errors
- Maintain the established format and terminology

**General Documentation**:

- Emphasize the "perfect MTG experience"
- Use established Ideal Magic phrases
- Focus on board-first, paper-friendly gameplay
- Highlight the beloved mechanics and banned problematic ones

### **Technical Content**

- **Accurate**: Test all procedures
- **Complete**: Include necessary context
- **Examples**: Provide working code samples
- **Current**: Keep versions up to date

## **Components & Layout**

### **Hugo Shortcodes**

```markdown
{{</* callout type="info" */>}}
Core Ideal Magic information blocks
{{</* /callout */>}}

{{</* cards */>}}
{{</* card title="Feature" subtitle="Description" */>}}
{{</* /cards */>}}
```

### **Code Blocks**

Always specify language for syntax highlighting:

````markdown
```bash
hugo server --port 1313
```
````

### **Links & Navigation**

- **Internal**: Relative paths (`/docs/gameplay/`)
- **External**: Full URLs with proper attribution
- **Descriptive**: Clear destination context

## **Mobile-First Design**

### **Responsive Breakpoints**

- **Mobile**: < 480px (3.5rem nav height)
- **Tablet**: 480px - 1024px (4rem nav height)  
- **Desktop**: > 1024px (5rem nav height)

### **Touch Optimization**

- **Minimum targets**: 44px (2.75rem)
- **Gesture support**: Smooth interactions
- **Readable text**: Appropriate sizing across devices

## **Performance Standards**

### **Core Web Vitals**

- **LCP**: < 2.5s (gameplay rule pages load quickly)
- **FID**: < 100ms (responsive interaction)
- **CLS**: < 0.1 (stable layout during loading)

### **Optimization Features**

- **Service Worker**: Offline gameplay rules access
- **SPA Navigation**: Lightning-fast page transitions
- **Image optimization**: WebP format, lazy loading
- **Critical CSS**: Mobile performance priority

## **MTG-Specific Elements**

### **Content Structure**

```
/docs/gameplay/     # CANONICAL rules (rarely modify)
/docs/printing/     # Print-and-play guides
/docs/             # General documentation
```

### **Terminology Standards**

**Always use**: Ideal Magic established terms
**Avoid**: Corporate/political messaging
**Focus**: Perfect gameplay experience

### **Visual Elements**

- **Mana symbols**: Consistent color usage
- **Card references**: Clear formatting
- **Mechanics**: Proper capitalization and explanation

## **Technical Implementation**

### **Theme Customization**

**Direct modification approach**:

- Modify `/themes/hextra-theme/` files directly
- No CSS workarounds or overrides
- Theme is designed to be customized

### **File Organization**

```
assets/js/ideal-magic-enhanced.js  # Performance & UX
assets/js/ideal-magic-spa.js       # SPA navigation
themes/hextra-theme/               # Customized theme
```

### **Hugo Configuration**

```toml
[params]
  description = "It's the Magic you remember at its best..."
[params.theme]
  default = "dark"
  displayToggle = false
```

## **Accessibility**

### **Requirements**

- **Contrast**: 4.5:1 minimum for text
- **Focus**: Visible indicators on all interactive elements
- **Navigation**: Logical heading structure
- **Alt text**: Descriptive for all content images

### **Testing Standards**

- Keyboard navigation functional
- Screen reader compatibility
- Lighthouse 90+ accessibility score
- Color blindness considerations

## **Frontmatter Standards**

```yaml
---
title: "Descriptive Page Title"
linkTitle: "Short Nav Title"
weight: 10
description: >
  Clear description emphasizing the Ideal Magic experience.
---
```

### **Weight Guidelines**

- **Gameplay**: 10-30 (highest priority)
- **Printing**: 40-60
- **General docs**: 70-90
- **Meta pages**: 100+

---

This style guide ensures the Ideal Magic website perfectly reflects the vision: **Magic at its absolute best**, with every element supporting the board-first, paper-friendly, perfect MTG experience.

**"Shuffle up. Every line you see is a line you can play."**
