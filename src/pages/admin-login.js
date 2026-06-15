export function renderAdminLogin(container) {
  const isLoggedIn = sessionStorage.getItem('verbal_vault_admin_logged_in') === 'true';
  if (isLoggedIn) {
    window.location.hash = '#/admin';
    return;
  }

  container.innerHTML = `
    <div class="register-page">
      <div class="container">
        <div class="register-header animate-on-scroll">
          <h1>Admin Portal</h1>
          <p>Access the Verbal Vault administrative dashboard. Authorized personnel only.</p>
        </div>
        
        <div class="register-form-wrapper animate-scale" style="max-width: 480px; margin: 0 auto;">
          <div id="login-error-banner" class="form-error-banner" style="display: none; margin-bottom: var(--space-4); padding: var(--space-3) var(--space-4); background: rgba(232, 93, 58, 0.1); border-left: 4px solid var(--coral); color: var(--coral); border-radius: var(--radius-sm); font-size: var(--font-sm); font-weight: 500;">
            Invalid username or password. Please try again.
          </div>

          <form id="admin-login-form" novalidate>
            <div class="form-group">
              <label for="admin-username">Username <span class="required">*</span></label>
              <input type="text" id="admin-username" placeholder="Enter admin username" required />
              <div class="form-error">Please enter your username.</div>
            </div>
            
            <div class="form-group" style="margin-top: var(--space-4)">
              <label for="admin-password">Password <span class="required">*</span></label>
              <input type="password" id="admin-password" placeholder="Enter admin password" required />
              <div class="form-error">Please enter your password.</div>
            </div>
            
            <div class="form-submit" style="margin-top: var(--space-6)">
              <button type="submit" class="btn btn-primary" style="width: 100%">Log In</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `;

  const form = container.querySelector('#admin-login-form');
  const errorBanner = container.querySelector('#login-error-banner');

  function validateField(input) {
    const group = input.closest('.form-group');
    if (!group) return false;
    
    if (input.value.trim() !== '') {
      group.classList.remove('error');
      group.classList.add('success');
      return true;
    } else {
      group.classList.add('error');
      group.classList.remove('success');
      return false;
    }
  }

  form.querySelectorAll('input').forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      const group = input.closest('.form-group');
      if (group && group.classList.contains('error')) {
        validateField(input);
      }
      errorBanner.style.display = 'none';
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    form.querySelectorAll('input').forEach(input => {
      if (!validateField(input)) {
        isValid = false;
      }
    });

    if (isValid) {
      const username = form.querySelector('#admin-username').value.trim();
      const password = form.querySelector('#admin-password').value.trim();

      // Simple mock credential check for prototype
      if (username === 'admin' && password === 'adminPassword123!') {
        sessionStorage.setItem('verbal_vault_admin_logged_in', 'true');
        
        // Notify navbar to update
        window.dispatchEvent(new CustomEvent('adminLoginStateChanged'));
        
        // Redirect to dashboard
        window.location.hash = '#/admin';
      } else {
        errorBanner.style.display = 'block';
        form.querySelector('#admin-password').value = '';
        form.querySelectorAll('.form-group').forEach(g => g.classList.remove('success'));
        form.querySelector('#admin-username').focus();
      }
    }
  });
}
