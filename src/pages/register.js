import { storage } from '../utils/storage.js';

export function renderRegister(container) {
  // Extract pre-selected course from hash query parameters if present
  // e.g. #/register?course=IELTS%20Preparation
  const hash = window.location.hash;
  let preselectedCourse = '';
  if (hash.includes('?')) {
    const queryStr = hash.split('?')[1];
    const params = new URLSearchParams(queryStr);
    preselectedCourse = params.get('course') || '';
  }

  container.innerHTML = `
    <div class="register-page">
      <div class="container">
        <div class="register-header animate-on-scroll">
          <h1>Registration Portal</h1>
          <p>Begin your English language learning journey. Complete the form below to claim your seat.</p>
        </div>
        
        <div class="register-form-wrapper animate-scale">
          <form id="registration-form" novalidate>
            
            <div class="form-row">
              <div class="form-group">
                <label for="first-name">First Name <span class="required">*</span></label>
                <input type="text" id="first-name" placeholder="John" required minlength="2" />
                <div class="form-error">Please enter your first name (minimum 2 characters).</div>
              </div>
              
              <div class="form-group">
                <label for="family-name">Family Name <span class="required">*</span></label>
                <input type="text" id="family-name" placeholder="Doe" required minlength="2" />
                <div class="form-error">Please enter your family name (minimum 2 characters).</div>
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="age">Age <span class="required">*</span></label>
                <input type="number" id="age" placeholder="25" required min="5" max="99" />
                <div class="form-error">Age must be a number between 5 and 99.</div>
              </div>
              
              <div class="form-group">
                <label for="phone">Phone Number <span class="required">*</span></label>
                <input type="tel" id="phone" placeholder="+123 4567890" required pattern="^\\+?[0-9\\s\\-\\(\\)]{7,20}$" />
                <div class="form-error">Please enter a valid phone number (7-20 digits).</div>
              </div>
            </div>
            
            <div class="form-group">
              <label for="email">Email Address <span class="required">*</span></label>
              <input type="email" id="email" placeholder="john.doe@example.com" required />
              <div class="form-error">Please enter a valid email address.</div>
            </div>
            
            <div class="form-group">
              <label for="course">Desired Course <span class="required">*</span></label>
              <select id="course" required>
                <option value="" disabled selected>Select a course...</option>
                <option value="General English">General English</option>
                <option value="Speaking Club">Speaking Club</option>
                <option value="IELTS Preparation">IELTS Preparation</option>
                <option value="Business English">Business English</option>
                <option value="Kids English">Kids English</option>
                <option value="Conversation Workshops">Conversation Workshops</option>
              </select>
              <div class="form-error">Please select a desired course from the list.</div>
            </div>
            
            <div class="form-group">
              <label for="notes">Additional Notes (Optional)</label>
              <textarea id="notes" placeholder="Tell us about your language background or target goals..."></textarea>
            </div>
            
            <div class="form-submit">
              <button type="submit" class="btn btn-primary btn-lg">Submit Registration</button>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  `;

  const form = container.querySelector('#registration-form');
  const courseSelect = container.querySelector('#course');

  // Pre-select course from URL if matching option exists
  if (preselectedCourse) {
    const option = Array.from(courseSelect.options).find(opt => opt.value === preselectedCourse);
    if (option) {
      courseSelect.value = preselectedCourse;
    }
  }

  // Set visual success / error class helper
  function validateField(input) {
    const group = input.closest('.form-group');
    if (!group) return false;

    let isValid = input.checkValidity();
    
    // Custom phone validation fallback just in case
    if (input.id === 'phone' && isValid) {
      const cleaned = input.value.replace(/\s/g, '');
      if (cleaned.length < 7) {
        isValid = false;
      }
    }

    if (isValid) {
      group.classList.remove('error');
      group.classList.add('success');
      return true;
    } else {
      group.classList.add('error');
      group.classList.remove('success');
      return false;
    }
  }

  // Bind real-time input / blur events for professional feedback
  form.querySelectorAll('input, select, textarea').forEach(input => {
    if (input.required) {
      input.addEventListener('blur', () => validateField(input));
      input.addEventListener('input', () => {
        // Remove error state as user starts typing to be less punitive
        const group = input.closest('.form-group');
        if (group && group.classList.contains('error')) {
          validateField(input);
        }
      });
    }
  });

  // Handle Form Submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isFormValid = true;

    // Check all required inputs
    form.querySelectorAll('input, select').forEach(input => {
      if (input.required) {
        const isFieldValid = validateField(input);
        if (!isFieldValid) {
          isFormValid = false;
        }
      }
    });

    if (isFormValid) {
      const regData = {
        firstName: form.querySelector('#first-name').value.trim(),
        familyName: form.querySelector('#family-name').value.trim(),
        age: parseInt(form.querySelector('#age').value),
        phone: form.querySelector('#phone').value.trim(),
        email: form.querySelector('#email').value.trim(),
        course: form.querySelector('#course').value,
        notes: form.querySelector('#notes').value.trim()
      };

      // Disable submit button and show loading state
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting...';

      // Save to cloud database (returns a Promise)
      storage.saveRegistration(regData).then((success) => {
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;

        if (success) {
          // Render success modal overlay
          const modalOverlay = document.createElement('div');
          modalOverlay.className = 'success-overlay';
          modalOverlay.innerHTML = `
            <div class="success-modal">
              <div class="success-icon">✨</div>
              <h2>Registration Successful!</h2>
              <p>Thank you for registering with Verbal Vault. Our team will contact you shortly.</p>
              <button class="btn btn-primary btn-close" style="width: 100%">Close</button>
            </div>
          `;
          document.body.appendChild(modalOverlay);

          // Close button behavior
          modalOverlay.querySelector('.btn-close').addEventListener('click', () => {
            modalOverlay.remove();
            form.reset();
            // Clear styles
            form.querySelectorAll('.form-group').forEach(group => {
              group.classList.remove('success', 'error');
            });
            // Redirect to Home
            window.location.hash = '#/';
          });
        } else {
          alert('Something went wrong. Please try registering again.');
        }
      }).catch((err) => {
        console.error('Registration failed:', err);
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
        alert('Something went wrong. Please check your network connection and try again.');
      });
    } else {
      // Focus on first invalid element
      const firstInvalid = form.querySelector('.form-group.error input, .form-group.error select');
      if (firstInvalid) {
        firstInvalid.focus();
      }
    }
  });
}
