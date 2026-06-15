// Hash-based SPA Router
export class Router {
  constructor() {
    this.routes = {};
    this.currentRoute = null;
    window.addEventListener('hashchange', () => this.handleRoute());
  }

  addRoute(path, handler) {
    this.routes[path] = handler;
  }

  navigate(path) {
    window.location.hash = path;
  }

  getCurrentPath() {
    const hash = window.location.hash.slice(1) || '/';
    return hash.split('?')[0];
  }

  async handleRoute() {
    let path = this.getCurrentPath();
    
    // Auth Guard for Administrative Panel
    if (path === '/admin') {
      const isLoggedIn = sessionStorage.getItem('verbal_vault_admin_logged_in') === 'true';
      if (!isLoggedIn) {
        window.location.hash = '#/admin-login';
        return;
      }
    }

    const handler = this.routes[path] || this.routes['/'];
    
    if (handler) {
      this.currentRoute = path;
      const content = document.getElementById('page-content');
      
      // Fade out
      content.style.opacity = '0';
      content.style.transform = 'translateY(10px)';
      
      await new Promise(r => setTimeout(r, 200));
      
      // Render new page
      await handler(content);
      
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'instant' });
      
      // Fade in
      requestAnimationFrame(() => {
        content.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        content.style.opacity = '1';
        content.style.transform = 'translateY(0)';
      });

      // Update active nav link
      this.updateActiveLink(path);
      
      // Re-initialize scroll animations
      setTimeout(() => {
        this.initScrollAnimations();
      }, 100);
    }
  }

  updateActiveLink(path) {
    document.querySelectorAll('.navbar-links a').forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === `#${path}`) {
        link.classList.add('active');
      }
    });
  }

  initScrollAnimations() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.animate-on-scroll, .animate-slide-left, .animate-slide-right, .animate-scale').forEach(el => {
      observer.observe(el);
    });
  }

  start() {
    if (!window.location.hash) {
      window.location.hash = '/';
    }
    this.handleRoute();
  }
}
