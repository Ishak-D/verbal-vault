// LocalStorage utility for managing course registrations
const STORAGE_KEY = 'verbal_vault_registrations';

export const storage = {
  // Save a new registration
  saveRegistration(data) {
    try {
      const registrations = this.getRegistrations();
      const newRegistration = {
        id: 'reg_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
        timestamp: new Date().toISOString(),
        ...data
      };
      registrations.unshift(newRegistration); // Add to beginning
      localStorage.setItem(STORAGE_KEY, JSON.stringify(registrations));
      
      // Dispatch custom event to notify listeners (e.g. admin dashboard)
      window.dispatchEvent(new CustomEvent('registrationAdded', { detail: newRegistration }));
      return true;
    } catch (e) {
      console.error('Error saving registration:', e);
      return false;
    }
  },

  // Get all registrations
  getRegistrations() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Error getting registrations:', e);
      return [];
    }
  },

  // Delete a specific registration
  deleteRegistration(id) {
    try {
      const registrations = this.getRegistrations();
      const filtered = registrations.filter(reg => reg.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
      return true;
    } catch (e) {
      console.error('Error deleting registration:', e);
      return false;
    }
  },

  // Clear all registrations
  clearRegistrations() {
    try {
      localStorage.removeItem(STORAGE_KEY);
      window.dispatchEvent(new CustomEvent('registrationsCleared'));
      return true;
    } catch (e) {
      console.error('Error clearing registrations:', e);
      return false;
    }
  }
};
