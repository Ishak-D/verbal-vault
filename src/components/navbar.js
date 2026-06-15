export function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  navbar.className = 'navbar';
  navbar.innerHTML = `
    <div class="navbar-inner">
      <a href="#/" class="navbar-brand">
        <img src="/logo.png" alt="Verbal Vault Logo" />
        <span>Verbal Vault</span>
      </a>
      
      <div class="hamburger" id="nav-toggle">
        <span></span>
        <span></span>
        <span></span>
      </div>
      
      <div class="mobile-overlay" id="nav-overlay"></div>
      
      <div class="navbar-links" id="nav-links">
        <!-- Content will be loaded dynamically by renderLinks -->
      </div>
    </div>
  `;

  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');
  const overlay = document.getElementById('nav-overlay');

  function toggleMenu(e) {
    if (e) e.preventDefault();
    toggle.classList.toggle('open');
    links.classList.toggle('open');
    overlay.classList.toggle('active');
    document.body.style.overflow = links.classList.contains('open') ? 'hidden' : '';
  }

  function closeMenu() {
    toggle.classList.remove('open');
    links.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Support both tap and click for faster response on mobile
  toggle.addEventListener('click', toggleMenu);
  toggle.addEventListener('touchstart', toggleMenu, { passive: false });

  overlay.addEventListener('click', closeMenu);
  overlay.addEventListener('touchstart', closeMenu, { passive: true });

  // Dynamic link rendering based on Auth State
  function renderLinks() {
    const isAdmin = sessionStorage.getItem('verbal_vault_admin_logged_in') === 'true';
    
    links.innerHTML = `
      <a href="#/">Home</a>
      <a href="#/about">About Us</a>
      <a href="#/courses">Courses</a>
      <a href="#/events">Events</a>
      <a href="#/clubs">Clubs</a>
      <a href="#/contact">Contact</a>
      ${isAdmin ? '<a href="#/admin" style="font-weight: 600; color: var(--purple);">Admin Dashboard</a>' : ''}
      ${isAdmin ? '<a href="#/" id="nav-logout" style="color: var(--coral); font-weight: 600;">Logout</a>' : '<a href="#/register" class="navbar-cta">Register Now</a>'}
    `;

    // Rebind link closing events
    links.querySelectorAll('a').forEach(link => {
      if (link.id !== 'nav-logout') {
        link.addEventListener('click', closeMenu);
        link.addEventListener('touchstart', closeMenu, { passive: true });
      }
    });

    const logoutBtn = document.getElementById('nav-logout');
    if (logoutBtn) {
      const handleLogout = (e) => {
        e.preventDefault();
        sessionStorage.removeItem('verbal_vault_admin_logged_in');
        closeMenu();
        // Dispatches global login state change
        window.dispatchEvent(new CustomEvent('adminLoginStateChanged'));
        window.location.hash = '#/';
      };
      logoutBtn.addEventListener('click', handleLogout);
      logoutBtn.addEventListener('touchstart', handleLogout, { passive: false });
    }
  }

  // Initial render
  renderLinks();

  // Listen to custom events to re-render links dynamically
  window.addEventListener('adminLoginStateChanged', renderLinks);

  // Scroll handler
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}
