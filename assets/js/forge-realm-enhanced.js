// Forge Realm - Enhanced Performance & UX System
class ForgeRealmEnhancer {
  constructor() {
    this.init();
  }

  init() {
    this.setupPerformanceOptimizations();
    this.setupNavigationEnhancements();
    this.setupScrollEnhancements();
    this.setupImageOptimizations();
    this.setupInteractiveComponents();
    this.setupAnalytics();
  }

  // === PERFORMANCE OPTIMIZATIONS ===
  setupPerformanceOptimizations() {
    // Critical resource preloader
    this.preloadCriticalResources();
    
    // Viewport-based optimizations
    this.optimizeViewport();
    
    // Memory management
    this.setupMemoryManagement();
    
    // Connection type optimizations
    this.adaptToConnection();
  }

  preloadCriticalResources() {
    const criticalResources = [
      '/images/forge-realm-PNG-circular-emblem.webp',
      '/favicon.ico'
    ];

    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource;
      link.as = resource.includes('.webp') ? 'image' : 'icon';
      document.head.appendChild(link);
    });
  }

  optimizeViewport() {
    // Prevent zoom on form inputs for iOS
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      const viewport = document.querySelector('meta[name="viewport"]');
      if (viewport) {
        viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
      }
    }
  }

  setupMemoryManagement() {
    // Clean up unused DOM elements on navigation
    let navigationTimeout;
    
    window.addEventListener('beforeunload', () => {
      // Clear any running timers
      clearTimeout(navigationTimeout);
      
      // Remove event listeners to prevent memory leaks
      this.cleanupEventListeners();
    });
  }

  adaptToConnection() {
    if ('connection' in navigator) {
      const connection = navigator.connection;
      
      // Reduce animations on slow connections
      if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
        document.documentElement.classList.add('reduced-motion');
        this.disableNonEssentialAnimations();
      }
      
      // Preload more content on fast connections
      if (connection.effectiveType === '4g' && connection.downlink > 10) {
        this.preloadAdditionalContent();
      }
    }
  }

  // === NAVIGATION ENHANCEMENTS ===
  setupNavigationEnhancements() {
    this.enhancedMobileMenu();
    this.smoothNavigation();
    this.searchEnhancements();
    this.breadcrumbNavigation();
  }

  enhancedMobileMenu() {
    const hamburger = document.querySelector('.hamburger-menu, .hextra-nav-menu-toggle');
    const mobileMenu = document.querySelector('.hextra-nav-menu-items');
    
    if (!hamburger || !mobileMenu) return;

    // Enhanced mobile menu with gestures and animations
    let isMenuOpen = false;
    let touchStartX = 0;
    let touchStartY = 0;
    
    hamburger.addEventListener('click', (e) => {
      e.preventDefault();
      this.toggleMobileMenu(mobileMenu, isMenuOpen);
      isMenuOpen = !isMenuOpen;
    });

    // Swipe gestures for menu
    document.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    });

    document.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const deltaX = touchEndX - touchStartX;
      const deltaY = Math.abs(touchEndY - touchStartY);
      
      // Right swipe to open menu
      if (deltaX > 100 && deltaY < 50 && touchStartX < 50 && !isMenuOpen) {
        this.toggleMobileMenu(mobileMenu, false);
        isMenuOpen = true;
      }
      
      // Left swipe to close menu
      if (deltaX < -100 && deltaY < 50 && isMenuOpen) {
        this.toggleMobileMenu(mobileMenu, true);
        isMenuOpen = false;
      }
    });

    // Close menu on outside click with smooth animation
    document.addEventListener('click', (e) => {
      if (isMenuOpen && !mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
        this.toggleMobileMenu(mobileMenu, true);
        isMenuOpen = false;
      }
    });
  }

  toggleMobileMenu(menu, isClosing) {
    if (isClosing) {
      menu.classList.remove('show');
      setTimeout(() => {
        menu.classList.add('hx:hidden');
        menu.style.display = 'none';
      }, 300);
    } else {
      menu.classList.remove('hx:hidden');
      menu.style.display = 'block';
      
      requestAnimationFrame(() => {
        menu.classList.add('show');
      });
    }
  }

  smoothNavigation() {
    // Navigation is now handled by the SPA system
    // This method is kept for compatibility but delegates to SPA
    if (window.spa) {
      console.log('Navigation delegated to SPA system');
      return;
    }
    
    // Fallback for browsers without SPA support
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href]');
      if (!link || link.href.includes('#') || link.target === '_blank') return;
      
      e.preventDefault();
      
      // Add fade out effect
      document.body.style.transition = 'opacity 0.2s ease-out';
      document.body.style.opacity = '0.8';
      
      setTimeout(() => {
        window.location.href = link.href;
      }, 150);
    });
  }

  searchEnhancements() {
    const searchInput = document.querySelector('input[type="search"], .search-input');
    if (!searchInput) return;

    // Enhanced search with debouncing and real-time results
    let searchTimeout;
    
    searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        this.performEnhancedSearch(e.target.value);
      }, 300);
    });

    // Search keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInput.focus();
      }
      
      if (e.key === 'Escape' && document.activeElement === searchInput) {
        searchInput.blur();
        this.hideSearchResults();
      }
    });
  }

  performEnhancedSearch(query) {
    if (query.length < 2) {
      this.hideSearchResults();
      return;
    }

    // Implement fuzzy search with highlighting
    // This would integrate with your existing search system
    console.log('Enhanced search for:', query);
  }

  hideSearchResults() {
    const results = document.querySelector('.search-results');
    if (results) {
      results.style.display = 'none';
    }
  }

  breadcrumbNavigation() {
    // Auto-generate breadcrumbs based on URL
    const breadcrumbContainer = document.querySelector('.breadcrumb, .hx-breadcrumb');
    if (!breadcrumbContainer) return;

    const path = window.location.pathname.split('/').filter(Boolean);
    if (path.length <= 1) return;

    const breadcrumbs = ['Home'];
    let currentPath = '';
    
    path.forEach(segment => {
      currentPath += `/${segment}`;
      breadcrumbs.push(this.formatBreadcrumbText(segment));
    });

    this.renderBreadcrumbs(breadcrumbContainer, breadcrumbs);
  }

  // === SCROLL ENHANCEMENTS ===
  setupScrollEnhancements() {
    this.smartScrolling();
    this.progressIndicator();
    this.backToTop();
    this.sectionHighlighting();
  }

  smartScrolling() {
    let lastScrollY = window.scrollY;
    let scrollDirection = 'up';
    
    window.addEventListener('scroll', this.throttle(() => {
      const currentScrollY = window.scrollY;
      scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
      
      // Hide/show navigation based on scroll direction
      const nav = document.querySelector('nav');
      if (nav) {
        if (scrollDirection === 'down' && currentScrollY > 100) {
          nav.style.transform = 'translateY(-100%)';
        } else {
          nav.style.transform = 'translateY(0)';
        }
      }
      
      lastScrollY = currentScrollY;
    }, 16));
  }

  progressIndicator() {
    // Create reading progress indicator
    const progressBar = document.createElement('div');
    progressBar.className = 'fr-progress-bar';
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 0%;
      height: 3px;
      background: linear-gradient(90deg, var(--mana-green), var(--mana-blue), var(--mana-white));
      z-index: 9999;
      transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', this.throttle(() => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      progressBar.style.width = `${Math.min(scrollPercent, 100)}%`;
    }, 16));
  }

  backToTop() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'fr-back-to-top';
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.style.cssText = `
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      border: none;
      background: var(--accent-primary);
      color: white;
      font-size: 1.5rem;
      cursor: pointer;
      transform: translateY(100px);
      transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      z-index: 1000;
      box-shadow: var(--shadow-lg);
    `;

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    document.body.appendChild(backToTopBtn);

    window.addEventListener('scroll', this.throttle(() => {
      if (window.scrollY > 300) {
        backToTopBtn.style.transform = 'translateY(0)';
      } else {
        backToTopBtn.style.transform = 'translateY(100px)';
      }
    }, 16));
  }

  sectionHighlighting() {
    // Highlight current section in navigation
    const sections = document.querySelectorAll('section[id], .content h2[id], .content h3[id]');
    const navLinks = document.querySelectorAll('nav a[href*="#"], .toc a[href*="#"]');
    
    if (sections.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.href.includes(entry.target.id)) {
              link.classList.add('active');
            }
          });
        }
      });
    }, { rootMargin: '-20% 0px -80% 0px' });

    sections.forEach(section => observer.observe(section));
  }

  // === IMAGE OPTIMIZATIONS ===
  setupImageOptimizations() {
    this.lazyLoadImages();
    this.optimizeImageLoading();
    this.handleImageErrors();
  }

  lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src], img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
            }
            img.classList.add('loaded');
            imageObserver.unobserve(img);
          }
        });
      }, { rootMargin: '50px' });

      images.forEach(img => imageObserver.observe(img));
    }
  }

  optimizeImageLoading() {
    // Progressive image enhancement
    document.querySelectorAll('img').forEach(img => {
      img.addEventListener('load', () => {
        img.style.transition = 'opacity 0.3s ease';
        img.style.opacity = '1';
      });
      
      img.addEventListener('error', () => {
        img.style.opacity = '0.5';
        img.setAttribute('alt', 'Image failed to load');
      });
    });
  }

  handleImageErrors() {
    document.addEventListener('error', (e) => {
      if (e.target.tagName === 'IMG') {
        e.target.style.display = 'none';
        console.warn('Image failed to load:', e.target.src);
      }
    }, true);
  }

  // === INTERACTIVE COMPONENTS ===
  setupInteractiveComponents() {
    this.enhancedCards();
    this.tooltips();
    this.keyboardShortcuts();
    this.contextualHelp();
  }

  enhancedCards() {
    document.querySelectorAll('.card, .hx-card, .feature-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-4px) scale(1.02)';
        card.style.boxShadow = 'var(--shadow-xl)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = 'var(--shadow-md)';
      });
    });
  }

  tooltips() {
    // Simple tooltip system
    document.querySelectorAll('[data-tooltip]').forEach(element => {
      element.addEventListener('mouseenter', (e) => {
        this.showTooltip(e.target, e.target.dataset.tooltip);
      });
      
      element.addEventListener('mouseleave', () => {
        this.hideTooltip();
      });
    });
  }

  showTooltip(element, text) {
    const tooltip = document.createElement('div');
    tooltip.className = 'fr-tooltip';
    tooltip.textContent = text;
    tooltip.style.cssText = `
      position: absolute;
      background: var(--bg-primary);
      border: 1px solid var(--border-light);
      border-radius: var(--radius-md);
      padding: var(--space-sm);
      font-size: var(--font-size-sm);
      z-index: 10000;
      box-shadow: var(--shadow-lg);
      pointer-events: none;
    `;
    
    document.body.appendChild(tooltip);
    
    const rect = element.getBoundingClientRect();
    tooltip.style.top = `${rect.top - tooltip.offsetHeight - 8}px`;
    tooltip.style.left = `${rect.left + (rect.width - tooltip.offsetWidth) / 2}px`;
  }

  hideTooltip() {
    const tooltip = document.querySelector('.fr-tooltip');
    if (tooltip) {
      tooltip.remove();
    }
  }

  keyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Theme toggle disabled - using fixed dark theme
      
      // Navigation with arrow keys
      if (e.key === 'ArrowLeft' && e.altKey) {
        window.history.back();
      }
      if (e.key === 'ArrowRight' && e.altKey) {
        window.history.forward();
      }
    });
  }

  contextualHelp() {
    // Add help indicators to complex UI elements
    document.querySelectorAll('.search-input').forEach(element => {
      element.setAttribute('data-tooltip', this.getHelpText(element));
    });
  }

  getHelpText(element) {
    if (element.matches('.search-input')) return 'Press Cmd/Ctrl+K to focus search';
    return '';
  }

  // === ANALYTICS & MONITORING ===
  setupAnalytics() {
    this.performanceMonitoring();
    this.userInteractionTracking();
    this.errorTracking();
  }

  performanceMonitoring() {
    // Monitor Core Web Vitals
    if ('PerformanceObserver' in window) {
      new PerformanceObserver((list) => {
        list.getEntries().forEach(entry => {
          if (entry.entryType === 'navigation') {
            console.log('Page load time:', entry.loadEventEnd - entry.loadEventStart);
          }
        });
      }).observe({ entryTypes: ['navigation'] });
    }
  }

  userInteractionTracking() {
    // Track user engagement patterns (anonymized)
    let interactionCount = 0;
    let lastInteraction = Date.now();
    
    ['click', 'scroll', 'keydown'].forEach(eventType => {
      document.addEventListener(eventType, this.throttle(() => {
        interactionCount++;
        lastInteraction = Date.now();
      }, 1000));
    });

    // Session engagement score
    setInterval(() => {
      const engagement = Math.min(interactionCount / 10, 1);
      if (engagement > 0.7) {
        console.log('High user engagement detected');
      }
    }, 30000);
  }

  errorTracking() {
    window.addEventListener('error', (e) => {
      console.warn('JavaScript error:', {
        message: e.message,
        source: e.filename,
        line: e.lineno,
        column: e.colno
      });
    });

    window.addEventListener('unhandledrejection', (e) => {
      console.warn('Unhandled promise rejection:', e.reason);
    });
  }

  // === UTILITY FUNCTIONS ===
  throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    return function (...args) {
      const currentTime = Date.now();
      
      if (currentTime - lastExecTime > delay) {
        func.apply(this, args);
        lastExecTime = currentTime;
      } else {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func.apply(this, args);
          lastExecTime = Date.now();
        }, delay - (currentTime - lastExecTime));
      }
    };
  }

  formatBreadcrumbText(segment) {
    return segment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  }

  renderBreadcrumbs(container, breadcrumbs) {
    container.innerHTML = breadcrumbs.map((crumb, index) => 
      `<span>${crumb}</span>${index < breadcrumbs.length - 1 ? ' › ' : ''}`
    ).join('');
  }

  disableNonEssentialAnimations() {
    const style = document.createElement('style');
    style.textContent = `
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    `;
    document.head.appendChild(style);
  }

  preloadAdditionalContent() {
    // Preload likely next pages
    const links = document.querySelectorAll('a[href^="/docs"], a[href^="/cards"]');
    links.forEach((link, index) => {
      if (index < 3) { // Limit to first 3 links
        const prefetchLink = document.createElement('link');
        prefetchLink.rel = 'prefetch';
        prefetchLink.href = link.href;
        document.head.appendChild(prefetchLink);
      }
    });
  }

  cleanupEventListeners() {
    // Remove any dynamically added elements and their listeners
    document.querySelectorAll('.fr-tooltip, .fr-progress-bar, .fr-back-to-top').forEach(el => {
      el.remove();
    });
  }
}

// Initialize the enhancement system
document.addEventListener('DOMContentLoaded', () => {
  new ForgeRealmEnhancer();
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ForgeRealmEnhancer;
}