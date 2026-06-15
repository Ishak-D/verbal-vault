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
        <a href="#/">Home</a>
        <a href="#/about">About Us</a>
        <a href="#/courses">Courses</a>
        <a href="#/events">Events</a>
        <a href="#/clubs">Clubs</a>
        <a href="#/contact">Contact</a>
        <a href="#/register" class="navbar-cta">Register Now</a>
      </div>
    </div>
  `;

  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');
  const overlay = document.getElementById('nav-overlay');

  function toggleMenu() {
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

  toggle.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', closeMenu);

  // Close menu when clicking on any link (except external if any)
  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Handle scroll class
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}
