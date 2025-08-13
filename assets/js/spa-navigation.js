/**
 * Simple Page Transitions for Ideal Magic
 * Provides smooth transitions without interfering with Hugo's navigation
 */

class SimplePageTransitions {
  constructor() {
    this.isNavigating = false;
    this.loadingBar = null;
    
    this.init();
  }
  
  init() {
    this.createLoadingBar();
    this.bindEvents();
    this.animatePageEntry();
  }
  
  createLoadingBar() {
    this.loadingBar = document.createElement('div');
    this.loadingBar.className = 'loading-bar';
    this.loadingBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 0%;
      height: 3px;
      background: linear-gradient(90deg, #3b82f6, #06b6d4);
      z-index: 9999;
      transition: width 0.3s ease, opacity 0.2s ease;
      opacity: 0;
    `;
    document.head.appendChild(this.loadingBar);
  }
  
  bindEvents() {
    // Only handle link hover for prefetching
    document.addEventListener('mouseover', this.handleHover.bind(this));
    
    // Handle outgoing navigation
    document.addEventListener('click', this.handleClick.bind(this));
    
    // Handle theme changes
    const observer = new MutationObserver(() => {
      this.updateThemeColors();
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
  }
  
  handleClick(e) {
    const link = e.target.closest('a');
    if (!this.shouldShowTransition(link)) return;
    
    // Don't prevent default - let Hugo handle navigation
    // Just show exit animation
    this.showExitAnimation();
  }
  
  handleHover(e) {
    const link = e.target.closest('a');
    if (!link) return;
    
    const href = link.getAttribute('href');
    if (this.shouldPrefetch(href)) {
      this.prefetchPage(href);
    }
  }
  
  shouldShowTransition(link) {
    if (!link) return false;
    
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return false;
    if (link.target === '_blank') return false;
    if (link.hostname && link.hostname !== window.location.hostname) return false;
    
    return true;
  }
  
  shouldPrefetch(href) {
    if (!href) return false;
    if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return false;
    if (href.includes('?') || href.includes('#')) return false;
    
    return true;
  }
  
  showExitAnimation() {
    if (this.isNavigating) return;
    this.isNavigating = true;
    
    // Show loading bar
    this.loadingBar.style.opacity = '1';
    this.loadingBar.style.width = '30%';
    
    // Subtle exit animation
    document.body.style.opacity = '0.95';
    
    // Reset after a delay (page will likely load before this)
    setTimeout(() => {
      this.isNavigating = false;
    }, 500);
  }
  
  animatePageEntry() {
    // Only run once on page load
    if (this.hasAnimated) return;
    this.hasAnimated = true;
    
    // Complete any loading animation
    this.loadingBar.style.width = '100%';
    setTimeout(() => {
      this.loadingBar.style.opacity = '0';
      setTimeout(() => {
        this.loadingBar.style.width = '0%';
      }, 200);
    }, 100);
    
    // Ensure body is visible
    document.body.style.opacity = '1';
    
    // Animate content in
    const animateElements = document.querySelectorAll('main > *:not(.animated), .content > *:not(.animated)');
    animateElements.forEach((el, index) => {
      if (el.classList.contains('animated')) return;
      
      el.style.opacity = '0';
      el.style.transform = 'translateY(15px)';
      
      setTimeout(() => {
        el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
        el.classList.add('animated');
      }, Math.min(index * 30, 300));
    });
  }
  
  async prefetchPage(href) {
    // Simple prefetch - just create a link element
    if (document.querySelector(`link[rel="prefetch"][href="${href}"]`)) return;
    
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = href;
    document.head.appendChild(link);
  }
  
  updateThemeColors() {
    const isDark = document.documentElement.classList.contains('dark');
    document.documentElement.style.setProperty('--bg-color', isDark ? '#111' : '#ffffff');
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new SimplePageTransitions();
  });
} else {
  new SimplePageTransitions();
}