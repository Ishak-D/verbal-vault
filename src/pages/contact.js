export function renderContact(container) {
  container.innerHTML = `
    <header class="page-header">
      <div class="container animate-on-scroll">
        <h1>Contact Us</h1>
        <p>Get in touch with our team for questions, corporate enrollments, or general support.</p>
      </div>
    </header>

    <section class="section">
      <div class="container">
        <div class="contact-grid">
          
          <div class="contact-info-cards animate-slide-left">
            <h2>Get in Touch</h2>
            <p style="color: var(--gray-600); margin-bottom: var(--space-8)">
              Have questions about our classes or placement test? Drop by our physical campus or write to us anytime.
            </p>
            
            <div class="contact-info-card">
              <div class="contact-icon">📍</div>
              <div>
                <h3>Our Location</h3>
                <p>123 Language Lane, Suite 400, New York, NY 10001</p>
              </div>
            </div>
            
            <div class="contact-info-card">
              <div class="contact-icon">📞</div>
              <div>
                <h3>Phone Number</h3>
                <p>+1 (555) 123-4567</p>
              </div>
            </div>
            
            <div class="contact-info-card">
              <div class="contact-icon">✉️</div>
              <div>
                <h3>Email Address</h3>
                <p>hello@verbalvault.edu</p>
              </div>
            </div>
            
            <div class="contact-info-card">
              <div class="contact-icon">⏰</div>
              <div>
                <h3>Opening Hours</h3>
                <p>Monday - Friday: 09:00 - 21:00<br>Saturday: 09:00 - 15:00</p>
              </div>
            </div>
          </div>
          
          <div class="contact-form animate-slide-right">
            <h3 style="font-size: var(--font-xl); font-weight: 700; color: var(--navy); margin-bottom: var(--space-6)">Send a Message</h3>
            
            <form id="contact-form-el" novalidate>
              <div class="form-group">
                <label for="contact-name">Full Name <span class="required">*</span></label>
                <input type="text" id="contact-name" placeholder="John Doe" required />
                <div class="form-error">Please enter your name.</div>
              </div>
              
              <div class="form-group">
                <label for="contact-email">Email Address <span class="required">*</span></label>
                <input type="email" id="contact-email" placeholder="john@example.com" required />
                <div class="form-error">Please enter a valid email address.</div>
              </div>
              
              <div class="form-group">
                <label for="contact-subject">Subject <span class="required">*</span></label>
                <input type="text" id="contact-subject" placeholder="Question about Speaking Club" required />
                <div class="form-error">Please enter a subject.</div>
              </div>
              
              <div class="form-group">
                <label for="contact-message">Message <span class="required">*</span></label>
                <textarea id="contact-message" placeholder="Write your message here..." required></textarea>
                <div class="form-error">Please enter your message.</div>
              </div>
              
              <button type="submit" class="btn btn-primary" style="width: 100%">Send Message</button>
            </form>
          </div>
          
        </div>
      </div>
    </section>
  `;

  // Attach contact form validation and fake submission
  const form = container.querySelector('#contact-form-el');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;
    
    // Validate fields
    form.querySelectorAll('.form-group').forEach(group => {
      const input = group.querySelector('input, textarea');
      if (!input) return;
      
      const isFieldValid = input.checkValidity();
      if (!isFieldValid) {
        group.classList.add('error');
        group.classList.remove('success');
        isValid = false;
      } else {
        group.classList.remove('error');
        group.classList.add('success');
      }
    });

    if (isValid) {
      // Show success modal
      const modal = document.createElement('div');
      modal.className = 'success-overlay';
      modal.innerHTML = `
        <div class="success-modal">
          <div class="success-icon">✉️</div>
          <h2>Message Sent!</h2>
          <p>Thank you for contacting Verbal Vault. Our team will read your message and reply shortly.</p>
          <button class="btn btn-primary btn-close-modal" style="width: 100%">Close</button>
        </div>
      `;
      document.body.appendChild(modal);

      modal.querySelector('.btn-close-modal').addEventListener('click', () => {
        modal.remove();
        form.reset();
        form.querySelectorAll('.form-group').forEach(g => g.classList.remove('success', 'error'));
      });
    }
  });

  // Blur validation
  form.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('blur', () => {
      const group = input.closest('.form-group');
      if (input.checkValidity()) {
        group.classList.remove('error');
        group.classList.add('success');
      } else {
        group.classList.add('error');
        group.classList.remove('success');
      }
    });
  });
}
