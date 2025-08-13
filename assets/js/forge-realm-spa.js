// Forge Realm - Lightning Fast SPA Navigation System
class ForgeRealmSPA {
  constructor() {
    this.cache = new Map();
    this.preloadQueue = new Set();
    this.isNavigating = false;
    this.mobileOptimizations = window.innerWidth <= 768;
    this.currentRequest = null;
    
    this.init();
  }

  init() {
    this.setupInstantLoading();
    this.setupPreloadingStrategies();
    this.setupSPANavigation();
    this.setupMobileOptimizations();
    this.setupPerformanceMonitoring();
    this.preventFlashOnLoad();
  }

  // === INSTANT LOADING SYSTEM ===
  setupInstantLoading() {
    // Set dark background immediately to prevent any white flash
    document.documentElement.style.backgroundColor = '#111';
    document.body.style.backgroundColor = '#111';
    
    // Add critical CSS inline for instant rendering
    const criticalCSS = `
      html, body { 
        background-color: #111 !important; 
        color: #f3f4f6 !important;
        transition: none !important;
      }
      * { 
        background-color: inherit; 
      }
      .page-transition {
        transition: opacity ${this.mobileOptimizations ? '0.1s' : '0.15s'} ease-out;
      }
    `;
    
    const style = document.createElement('style');
    style.textContent = criticalCSS;
    style.id = 'critical-spa-styles';
    document.head.insertBefore(style, document.head.firstChild);
  }

  preventFlashOnLoad() {
    // Ensure no white flash during initial load
    const pageLoader = document.getElementById('page-loader');
    if (pageLoader) {
      requestAnimationFrame(() => {
        pageLoader.style.opacity = '0';
        setTimeout(() => {
          pageLoader.style.display = 'none';
        }, 200);
      });
    }
    
    // Add page transition class to main content
    const main = document.querySelector('main') || document.body;
    main.classList.add('page-transition', 'page-entered');
  }

  // === AGGRESSIVE PRELOADING ===
  setupPreloadingStrategies() {
    this.preloadCriticalPages();
    this.setupHoverPreloading();
    this.setupViewportPreloading();
    this.setupPredictivePreloading();
  }

  preloadCriticalPages() {
    const criticalPages = [
      '/',
      '/docs/',
      '/docs/cards/',
      '/docs/gameplay/',
      '/docs/printing/'
    ];

    criticalPages.forEach(url => {
      if (url !== window.location.pathname) {
        this.preloadPage(url, 'critical');
      }
    });
  }

  setupHoverPreloading() {
    let hoverTimeout;
    
    document.addEventListener('mouseover', (e) => {
      const link = e.target.closest('a[href]');
      if (!link || this.isExternalLink(link.href)) return;
      
      clearTimeout(hoverTimeout);
      hoverTimeout = setTimeout(() => {
        this.preloadPage(link.href, 'hover');
      }, 65); // Start preloading after 65ms hover
    });

    document.addEventListener('mouseout', (e) => {
      clearTimeout(hoverTimeout);
    });
  }

  setupViewportPreloading() {
    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const link = entry.target;
          if (link.href && !this.isExternalLink(link.href)) {
            this.preloadPage(link.href, 'viewport');
          }
        }
      });
    }, { rootMargin: '100px' });

    // Observe all links
    document.querySelectorAll('a[href]').forEach(link => {
      if (!this.isExternalLink(link.href)) {
        observer.observe(link);
      }
    });
  }

  setupPredictivePreloading() {
    // Preload likely next pages based on current page
    const currentPath = window.location.pathname;
    const predictivePages = this.getPredictivePages(currentPath);
    
    predictivePages.forEach(url => {
      setTimeout(() => {
        this.preloadPage(url, 'predictive');
      }, 500);
    });
  }

  getPredictivePages(currentPath) {
    const predictions = {
      '/': ['/docs/', '/docs/cards/'],
      '/docs/': ['/docs/cards/', '/docs/gameplay/', '/docs/printing/'],
      '/docs/cards/': ['/docs/gameplay/', '/docs/printing/'],
      '/docs/gameplay/': ['/docs/cards/', '/docs/printing/'],
      '/docs/printing/': ['/docs/cards/', '/docs/gameplay/']
    };
    
    return predictions[currentPath] || [];
  }

  async preloadPage(url, priority = 'normal') {
    if (this.cache.has(url) || this.preloadQueue.has(url)) return;
    
    this.preloadQueue.add(url);
    
    try {
      const response = await fetch(url, {
        credentials: 'same-origin',
        headers: {
          'Accept': 'text/html',
        }
      });
      
      if (response.ok) {
        const html = await response.text();
        this.cache.set(url, {
          html,
          timestamp: Date.now(),
          priority
        });
      }
    } catch (error) {
      console.warn('Preload failed:', url, error);
    } finally {
      this.preloadQueue.delete(url);
    }
  }

  // === SPA NAVIGATION ===
  setupSPANavigation() {
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href]');
      if (!link || this.shouldIgnoreLink(link)) return;
      
      e.preventDefault();
      this.navigateToPage(link.href);
    });

    // Handle browser back/forward
    window.addEventListener('popstate', (e) => {
      this.navigateToPage(window.location.href, false);
    });
  }

  shouldIgnoreLink(link) {
    return (
      link.target === '_blank' ||
      link.href.includes('#') ||
      this.isExternalLink(link.href) ||
      link.hasAttribute('download') ||
      link.href.startsWith('mailto:') ||
      link.href.startsWith('tel:')
    );
  }

  isExternalLink(href) {
    try {
      const url = new URL(href);
      return url.origin !== window.location.origin;
    } catch {
      return false;
    }
  }

  async navigateToPage(url, updateHistory = true) {
    if (this.isNavigating) {
      if (this.currentRequest) {
        this.currentRequest.abort();
      }
    }
    
    this.isNavigating = true;
    
    try {
      // Start exit animation
      await this.startPageTransition();
      
      // Get page content (from cache or network)
      const html = await this.getPageContent(url);
      
      // Update page content
      this.updatePageContent(html);
      
      // Update browser history
      if (updateHistory) {
        history.pushState(null, '', url);
      }
      
      // Complete entry animation
      await this.completePageTransition();
      
      // Update meta tags and title
      this.updatePageMeta(html);
      
    } catch (error) {
      console.warn('Navigation failed:', error);
      // Fallback to normal navigation
      window.location.href = url;
    } finally {
      this.isNavigating = false;
      this.currentRequest = null;
    }
  }

  async startPageTransition() {
    const main = document.querySelector('main') || document.body;
    main.classList.remove('page-entered');
    main.classList.add('page-exiting');
    
    // Quick transition for mobile
    const duration = this.mobileOptimizations ? 100 : 150;
    await this.wait(duration);
  }

  async completePageTransition() {
    const main = document.querySelector('main') || document.body;
    main.classList.remove('page-exiting');
    main.classList.add('page-entering');
    
    // Force repaint
    main.offsetHeight;
    
    requestAnimationFrame(() => {
      main.classList.remove('page-entering');
      main.classList.add('page-entered');
    });
    
    // Scroll to top
    window.scrollTo(0, 0);
  }

  async getPageContent(url) {
    // Check cache first
    const cached = this.cache.get(url);
    if (cached && Date.now() - cached.timestamp < 300000) { // 5 min cache
      return cached.html;
    }
    
    // Fetch from network
    const controller = new AbortController();
    this.currentRequest = controller;
    
    const response = await fetch(url, {
      signal: controller.signal,
      credentials: 'same-origin',
      headers: {
        'Accept': 'text/html',
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const html = await response.text();
    
    // Cache the result
    this.cache.set(url, {
      html,
      timestamp: Date.now(),
      priority: 'navigation'
    });
    
    return html;
  }

  updatePageContent(html) {
    const parser = new DOMParser();
    const newDoc = parser.parseFromString(html, 'text/html');
    
    // Update main content
    const currentMain = document.querySelector('main');
    const newMain = newDoc.querySelector('main');
    
    if (currentMain && newMain) {
      currentMain.innerHTML = newMain.innerHTML;
    }
    
    // Update navbar if changed
    const currentNav = document.querySelector('nav');
    const newNav = newDoc.querySelector('nav');
    
    if (currentNav && newNav && currentNav.innerHTML !== newNav.innerHTML) {
      currentNav.innerHTML = newNav.innerHTML;
    }
    
    // Re-initialize components for new content
    this.reinitializeComponents();
  }

  updatePageMeta(html) {
    const parser = new DOMParser();
    const newDoc = parser.parseFromString(html, 'text/html');
    
    // Update title
    document.title = newDoc.title;
    
    // Update meta tags
    const metaTags = ['description', 'keywords', 'og:title', 'og:description', 'og:url'];
    metaTags.forEach(name => {
      const current = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`);
      const newMeta = newDoc.querySelector(`meta[name="${name}"], meta[property="${name}"]`);
      
      if (current && newMeta) {
        current.setAttribute('content', newMeta.getAttribute('content'));
      }
    });
  }

  reinitializeComponents() {
    // Reinitialize search if present
    if (window.searchIndex) {
      // Re-setup search functionality
    }
    
    // Reinitialize any other interactive components
    this.setupHoverPreloading();
    this.setupViewportPreloading();
  }

  // === MOBILE OPTIMIZATIONS ===
  setupMobileOptimizations() {
    if (!this.mobileOptimizations) return;
    
    // Disable hover effects on mobile
    document.documentElement.classList.add('mobile-device');
    
    // Optimize touch interactions
    document.addEventListener('touchstart', (e) => {
      const link = e.target.closest('a[href]');
      if (link && !this.shouldIgnoreLink(link)) {
        // Preload immediately on touch
        this.preloadPage(link.href, 'touch');
      }
    }, { passive: true });
    
    // Prevent 300ms click delay
    let touchStartTime = 0;
    document.addEventListener('touchstart', () => {
      touchStartTime = Date.now();
    }, { passive: true });
    
    document.addEventListener('touchend', (e) => {
      const touchDuration = Date.now() - touchStartTime;
      if (touchDuration < 500) { // Quick tap
        const link = e.target.closest('a[href]');
        if (link && !this.shouldIgnoreLink(link)) {
          e.preventDefault();
          this.navigateToPage(link.href);
        }
      }
    }, { passive: false });
  }

  // === PERFORMANCE MONITORING ===
  setupPerformanceMonitoring() {
    // Monitor navigation performance
    let navigationStart = 0;
    
    const originalNavigate = this.navigateToPage.bind(this);
    this.navigateToPage = async function(url, updateHistory = true) {
      navigationStart = performance.now();
      
      try {
        await originalNavigate(url, updateHistory);
        
        const navigationTime = performance.now() - navigationStart;
        console.log(`Navigation to ${url}: ${navigationTime.toFixed(2)}ms`);
        
        // Track in performance API if available
        if ('PerformanceObserver' in window) {
          performance.mark('navigation-complete');
        }
      } catch (error) {
        throw error;
      }
    };
  }

  // === UTILITIES ===
  wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Cleanup method
  destroy() {
    this.cache.clear();
    this.preloadQueue.clear();
    
    const criticalStyles = document.getElementById('critical-spa-styles');
    if (criticalStyles) {
      criticalStyles.remove();
    }
  }
}

// Initialize immediately - before DOMContentLoaded for fastest setup
const forgeRealmSPA = new ForgeRealmSPA();

// Fallback initialization
document.addEventListener('DOMContentLoaded', () => {
  if (!forgeRealmSPA.cache) {
    new ForgeRealmSPA();
  }
});

// Export for debugging
window.ForgeRealmSPA = ForgeRealmSPA;
window.spa = forgeRealmSPA;