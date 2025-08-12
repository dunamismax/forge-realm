/**
 * SPA-like Navigation for Forge Realm
 * Provides smooth page transitions and performance optimizations
 */

class SPANavigation {
  constructor() {
    this.isNavigating = false;
    this.loadingBar = null;
    this.cache = new Map();
    this.prefetchedUrls = new Set();
    
    this.init();
  }
  
  init() {
    this.createLoadingBar();
    this.bindEvents();
    this.setupIntersectionObserver();
    this.preloadCriticalResources();
  }
  
  createLoadingBar() {
    if (this.loadingBar) return;
    
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
    document.body.appendChild(this.loadingBar);
  }
  
  bindEvents() {
    // Handle link clicks
    document.addEventListener('click', this.handleClick.bind(this));
    
    // Handle browser navigation
    window.addEventListener('popstate', this.handlePopState.bind(this));
    
    // Handle page load
    document.addEventListener('DOMContentLoaded', this.handlePageLoad.bind(this));
    window.addEventListener('load', this.handlePageLoad.bind(this));
    
    // Prefetch on hover
    document.addEventListener('mouseover', this.handleHover.bind(this));
    
    // Handle theme changes
    const observer = new MutationObserver(() => {
      this.updateThemeColors();
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
  }
  
  setupIntersectionObserver() {
    // Prefetch links in viewport
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const link = entry.target;
          const href = link.getAttribute('href');
          if (this.shouldPrefetch(href)) {
            this.prefetchPage(href);
          }
        }
      });
    }, { rootMargin: '100px' });
    
    // Observe all internal links
    setTimeout(() => {
      document.querySelectorAll('a[href^="/"], a[href^="./"], a[href^="../"]').forEach(link => {
        observer.observe(link);
      });
    }, 1000);
  }
  
  handleClick(e) {
    const link = e.target.closest('a');
    if (!this.shouldNavigate(link)) return;
    
    e.preventDefault();
    
    if (this.isNavigating) return;
    
    const href = link.getAttribute('href');
    this.navigateToPage(href);
  }
  
  handleHover(e) {
    const link = e.target.closest('a');
    if (!link) return;
    
    const href = link.getAttribute('href');
    if (this.shouldPrefetch(href)) {
      this.prefetchPage(href);
    }
  }
  
  handlePopState(e) {
    if (e.state && e.state.url) {
      this.navigateToPage(e.state.url, false);
    }
  }
  
  handlePageLoad() {
    this.completeLoading();
    this.animatePageEntry();
    this.updateThemeColors();
  }
  
  shouldNavigate(link) {
    if (!link) return false;
    
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return false;
    if (link.target === '_blank') return false;
    if (link.hostname && link.hostname !== window.location.hostname) return false;
    
    return true;
  }
  
  shouldPrefetch(href) {
    if (!href || this.prefetchedUrls.has(href)) return false;
    if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return false;
    if (href.includes('?') || href.includes('#')) return false; // Skip URLs with queries/fragments for now
    
    return true;
  }
  
  async navigateToPage(url, pushState = true) {
    if (this.isNavigating) return;
    
    this.isNavigating = true;
    this.showLoading();
    
    try {
      // Add exit animation
      document.body.style.opacity = '0.95';
      document.body.style.transform = 'translateY(-5px)';
      
      // Check cache first
      let content = this.cache.get(url);
      
      if (!content) {
        content = await this.fetchPage(url);
        this.cache.set(url, content);
      }
      
      // Update URL
      if (pushState) {
        history.pushState({ url }, '', url);
      }
      
      // Update page content
      await this.updatePageContent(content);
      
      // Update document title
      const titleMatch = content.match(/<title>(.*?)<\/title>/i);
      if (titleMatch) {
        document.title = titleMatch[1];
      }
      
    } catch (error) {
      console.error('Navigation error:', error);
      // Fallback to standard navigation
      window.location.href = url;
      return;
    }
    
    this.completeLoading();
    this.animatePageEntry();
    this.isNavigating = false;
  }
  
  async fetchPage(url) {
    const response = await fetch(url, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    return await response.text();
  }
  
  async updatePageContent(html) {
    const parser = new DOMParser();
    const newDoc = parser.parseFromString(html, 'text/html');
    
    // Update main content
    const newMain = newDoc.querySelector('main');
    const currentMain = document.querySelector('main');
    
    if (newMain && currentMain) {
      currentMain.innerHTML = newMain.innerHTML;
    }
    
    // Update navbar if needed
    const newNavbar = newDoc.querySelector('nav');
    const currentNavbar = document.querySelector('nav');
    
    if (newNavbar && currentNavbar) {
      const newActiveLinks = newNavbar.querySelectorAll('.active, [aria-current="page"]');
      const currentActiveLinks = currentNavbar.querySelectorAll('.active, [aria-current="page"]');
      
      // Remove current active states
      currentActiveLinks.forEach(link => {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      });
      
      // Add new active states
      newActiveLinks.forEach(link => {
        const href = link.getAttribute('href');
        const currentLink = currentNavbar.querySelector(`[href="${href}"]`);
        if (currentLink) {
          currentLink.classList.add('active');
          currentLink.setAttribute('aria-current', 'page');
        }
      });
    }
    
    // Re-initialize scripts for new content
    this.reinitializeScripts();
  }
  
  async prefetchPage(url) {
    if (this.prefetchedUrls.has(url) || this.cache.has(url)) return;
    
    this.prefetchedUrls.add(url);
    
    try {
      const content = await this.fetchPage(url);
      this.cache.set(url, content);
    } catch (error) {
      console.warn('Prefetch failed for:', url, error);
      this.prefetchedUrls.delete(url);
    }
  }
  
  showLoading() {
    if (!this.loadingBar) return;
    
    this.loadingBar.style.opacity = '1';
    this.loadingBar.style.width = '0%';
    
    // Animate progress
    let progress = 0;
    this.progressInterval = setInterval(() => {
      progress += Math.random() * 25 + 10;
      if (progress < 90) {
        this.loadingBar.style.width = progress + '%';
      }
    }, 100);
  }
  
  completeLoading() {
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
    }
    
    if (!this.loadingBar) return;
    
    this.loadingBar.style.width = '100%';
    
    setTimeout(() => {
      this.loadingBar.style.opacity = '0';
      setTimeout(() => {
        this.loadingBar.style.width = '0%';
      }, 200);
    }, 150);
  }
  
  animatePageEntry() {
    document.body.style.opacity = '1';
    document.body.style.transform = 'translateY(0)';
    
    // Animate content elements
    const animateElements = document.querySelectorAll('main > *, .content > *');
    animateElements.forEach((el, index) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, index * 50);
    });
  }
  
  updateThemeColors() {
    const isDark = document.documentElement.classList.contains('dark');
    document.documentElement.style.setProperty('--bg-color', isDark ? '#111' : '#ffffff');
  }
  
  reinitializeScripts() {
    // Reinitialize code copy buttons
    if (window.initializeCodeCopy) {
      window.initializeCodeCopy();
    }
    
    // Reinitialize search
    if (window.initializeSearch) {
      window.initializeSearch();
    }
    
    // Reinitialize other interactive elements
    this.setupIntersectionObserver();
  }
  
  preloadCriticalResources() {
    // Preload commonly used pages
    const criticalPages = ['/docs/', '/docs/cards/', '/docs/gameplay/'];
    
    setTimeout(() => {
      criticalPages.forEach(page => {
        this.prefetchPage(page);
      });
    }, 2000);
  }
}

// Initialize SPA navigation when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new SPANavigation();
});

// Export for potential external use
window.SPANavigation = SPANavigation;