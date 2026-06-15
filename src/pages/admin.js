import { storage } from '../utils/storage.js';

export function renderAdmin(container) {
  // Verify Admin Login State
  const isLoggedIn = sessionStorage.getItem('verbal_vault_admin_logged_in') === 'true';
  if (!isLoggedIn) {
    window.location.hash = '#/admin-login';
    return;
  }

  let registrations = storage.getRegistrations();
  let searchQuery = '';

  function getFilteredRegistrations() {
    if (!searchQuery) return registrations;
    const query = searchQuery.toLowerCase();
    return registrations.filter(reg => 
      reg.firstName.toLowerCase().includes(query) ||
      reg.familyName.toLowerCase().includes(query) ||
      reg.email.toLowerCase().includes(query) ||
      reg.phone.toLowerCase().includes(query) ||
      reg.course.toLowerCase().includes(query)
    );
  }

  function renderTableContent() {
    const list = getFilteredRegistrations();
    const tbody = container.querySelector('#admin-table-body');
    const badge = container.querySelector('#reg-count-badge');
    
    if (badge) {
      badge.textContent = `${list.length} Registration${list.length !== 1 ? 's' : ''}`;
    }

    if (!tbody) return;

    if (list.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7">
            <div class="admin-empty">
              <span>📋</span>
              <p>No registrations found.</p>
            </div>
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = list.map(reg => `
      <tr id="row_${reg.id}">
        <td><strong>${escapeHTML(reg.firstName)} ${escapeHTML(reg.familyName)}</strong></td>
        <td>${escapeHTML(reg.email)}</td>
        <td>${escapeHTML(reg.phone)}</td>
        <td>${reg.age}</td>
        <td><span class="course-tag">${escapeHTML(reg.course)}</span></td>
        <td style="font-size: var(--font-xs); color: var(--gray-500)">
          ${new Date(reg.timestamp).toLocaleString()}
        </td>
        <td style="font-size: var(--font-xs); color: var(--gray-600); max-width: 150px; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;" title="${escapeHTML(reg.notes || '')}">
          ${escapeHTML(reg.notes || '—')}
        </td>
      </tr>
    `).join('');
  }

  container.innerHTML = `
    <div class="admin-page">
      <div class="container animate-on-scroll">
        <div class="admin-header">
          <div>
            <h1>Admin Dashboard</h1>
            <span class="admin-badge" id="reg-count-badge">0 Registrations</span>
          </div>
          <div class="admin-actions">
            <button id="btn-export-csv" class="btn btn-outline" style="padding: var(--space-2) var(--space-4); font-size: var(--font-sm);">
              Export CSV
            </button>
            <button id="btn-clear-all" class="btn btn-primary" style="background: var(--coral); box-shadow: none; padding: var(--space-2) var(--space-4); font-size: var(--font-sm);">
              Clear All
            </button>
            <button id="btn-admin-logout" class="btn btn-outline" style="border-color: var(--coral); color: var(--coral); padding: var(--space-2) var(--space-4); font-size: var(--font-sm);">
              Logout
            </button>
          </div>
        </div>

        <div class="admin-search">
          <input type="text" id="admin-search-input" placeholder="Search by name, email, phone, or course..." />
        </div>

        <div class="admin-table-wrapper">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Email Address</th>
                <th>Phone Number</th>
                <th>Age</th>
                <th>Selected Course</th>
                <th>Date Registered</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody id="admin-table-body">
              <!-- Content injected here -->
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;

  // Helper to escape HTML characters
  function escapeHTML(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Export to CSV Functionality
  function exportCSV() {
    const list = getFilteredRegistrations();
    if (list.length === 0) {
      alert('No registrations available to export.');
      return;
    }

    const headers = ['First Name', 'Family Name', 'Email', 'Phone', 'Age', 'Course', 'Notes', 'Timestamp'];
    const rows = list.map(reg => [
      reg.firstName,
      reg.familyName,
      reg.email,
      reg.phone,
      reg.age,
      reg.course,
      reg.notes || '',
      reg.timestamp
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(val => `"${val.toString().replace(/"/g, '""')}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `verbal_vault_registrations_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Clear all registrations
  function clearAll() {
    if (confirm('Are you sure you want to clear all registrations? This action cannot be undone.')) {
      storage.clearRegistrations();
      registrations = [];
      renderTableContent();
    }
  }

  // Bind Events
  const searchInput = container.querySelector('#admin-search-input');
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderTableContent();
  });

  container.querySelector('#btn-export-csv').addEventListener('click', exportCSV);
  container.querySelector('#btn-clear-all').addEventListener('click', clearAll);
  container.querySelector('#btn-admin-logout').addEventListener('click', () => {
    sessionStorage.removeItem('verbal_vault_admin_logged_in');
    window.dispatchEvent(new CustomEvent('adminLoginStateChanged'));
    window.location.hash = '#/';
  });

  // Render content initially
  renderTableContent();

  // Listen to storage/custom events for real-time dashboard updates
  const updateHandler = () => {
    registrations = storage.getRegistrations();
    renderTableContent();
  };

  window.addEventListener('registrationAdded', updateHandler);
  window.addEventListener('registrationsCleared', updateHandler);

  // Clean up global listeners when navigating away
  const observer = new MutationObserver(() => {
    if (!document.contains(container)) {
      window.removeEventListener('registrationAdded', updateHandler);
      window.removeEventListener('registrationsCleared', updateHandler);
      observer.disconnect();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
}
