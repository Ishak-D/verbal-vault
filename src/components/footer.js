export function initFooter() {
  const footer = document.getElementById('site-footer');
  if (!footer) return;

  footer.className = 'footer';
  footer.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-column">
          <div class="footer-brand">
            <img src="/logo.png" alt="Verbal Vault Logo" />
            <span>Verbal Vault</span>
          </div>
          <p class="footer-about">
            A vibrant English learning community where communication, confidence, and growth come together.
          </p>
        </div>
        
        <div class="footer-column">
          <h4>Quick Links</h4>
          <a href="#/">Home</a>
          <a href="#/about">About Us</a>
          <a href="#/courses">Courses</a>
          <a href="#/events">Events</a>
          <a href="#/clubs">Clubs</a>
        </div>
        
        <div class="footer-column">
          <h4>Resources</h4>
          <a href="#/contact">Contact Us</a>
          <a href="#/register">Register Now</a>
        </div>
        
        <div class="footer-column">
          <h4>Contact Info</h4>
          <p class="footer-about" style="margin-bottom: var(--space-2)">
            📍 123 Language Lane, Suite 400<br>
            📞 +1 (555) 123-4567<br>
            ✉️ hello@verbalvault.edu
          </p>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; ${new Date().getFullYear()} Verbal Vault. All rights reserved.</p>
        <div class="footer-social">
          <a href="#" aria-label="Facebook">🌐</a>
          <a href="#" aria-label="Instagram">📸</a>
          <a href="#" aria-label="Twitter">🐦</a>
          <a href="#" aria-label="LinkedIn">💼</a>
        </div>
      </div>
    </div>
  `;
}
