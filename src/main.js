import './style.css';
import { Router } from './utils/router.js';
import { initNavbar } from './components/navbar.js';
import { initFooter } from './components/footer.js';

// Import Page Render Functions
import { renderHome } from './pages/home.js';
import { renderAbout } from './pages/about.js';
import { renderCourses } from './pages/courses.js';
import { renderEvents } from './pages/events.js';
import { renderClubs } from './pages/clubs.js';
import { renderContact } from './pages/contact.js';
import { renderRegister } from './pages/register.js';
import { renderAdmin } from './pages/admin.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Global Components
  initNavbar();
  initFooter();

  // Initialize SPA Router
  const router = new Router();

  // Register Routes
  router.addRoute('/', renderHome);
  router.addRoute('/about', renderAbout);
  router.addRoute('/courses', renderCourses);
  router.addRoute('/events', renderEvents);
  router.addRoute('/clubs', renderClubs);
  router.addRoute('/contact', renderContact);
  router.addRoute('/register', renderRegister);
  router.addRoute('/admin', renderAdmin);

  // Start Router
  router.start();
});
