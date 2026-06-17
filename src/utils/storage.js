// Cross-device synced storage for registrations using NPoint.io
const STORAGE_KEY = 'verbal_vault_registrations';
const NPOINT_URL = 'https://api.npoint.io/3a57cee0b33207f540f0';

// Helper: Merge local and remote registrations without duplicates
function mergeRegistrations(local, remote) {
  const map = new Map();
  // Add remote first
  remote.forEach(item => {
    if (item && item.id) map.set(item.id, item);
  });
  // Local overrides/adds
  local.forEach(item => {
    if (item && item.id) map.set(item.id, item);
  });
  // Sort by timestamp descending (newest first)
  return Array.from(map.values())
    .filter(Boolean)
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
}

export const storage = {
  // Save registration locally and sync to cloud
  async saveRegistration(data) {
    const newRegistration = {
      id: 'reg_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
      ...data
    };

    try {
      // Fetch latest remote registrations
      const remoteRegs = await this.getRemoteRegistrations();
      
      // Prepend new registration
      remoteRegs.unshift(newRegistration);
      
      // Push back to cloud
      await this.pushToCloud(remoteRegs);
      
      // Update local storage cache
      localStorage.setItem(STORAGE_KEY, JSON.stringify(remoteRegs));
      
      // Notify UI locally
      window.dispatchEvent(new CustomEvent('registrationAdded', { detail: newRegistration }));
      return true;
    } catch (e) {
      console.warn('Failed to save registration directly to cloud, falling back to local storage:', e);
      try {
        const localRegs = this.getLocalRegistrations();
        localRegs.unshift(newRegistration);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(localRegs));
        
        window.dispatchEvent(new CustomEvent('registrationAdded', { detail: newRegistration }));
        
        // Fire background sync attempt
        this.syncWithCloud().catch(err => console.warn('Background sync failed:', err));
        return true;
      } catch (localError) {
        console.error('LocalStorage fallback write failed:', localError);
        return false;
      }
    }
  },

  // Get registrations (fetches from cloud database, falls back to local cache if offline)
  async getRegistrations() {
    try {
      const remoteRegs = await this.getRemoteRegistrations();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(remoteRegs));
      return remoteRegs;
    } catch (e) {
      console.warn('Could not retrieve from cloud, returning local cache:', e);
      return this.getLocalRegistrations();
    }
  },

  // Helper: Fetch remote registrations directly
  async getRemoteRegistrations() {
    const response = await fetch(NPOINT_URL);
    if (!response.ok) {
      throw new Error(`Cloud database fetch failed: ${response.statusText}`);
    }
    const data = await response.json();
    return data && Array.isArray(data.registrations) ? data.registrations : [];
  },

  // Get local registrations only (synchronous cache view)
  getLocalRegistrations() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Error getting local registrations:', e);
      return [];
    }
  },

  // Delete registration and sync (async)
  async deleteRegistration(id) {
    try {
      const remoteRegs = await this.getRemoteRegistrations();
      const filtered = remoteRegs.filter(reg => reg.id !== id);
      
      await this.pushToCloud(filtered);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
      window.dispatchEvent(new CustomEvent('registrationAdded'));
      return true;
    } catch (e) {
      console.error('Error deleting registration from cloud:', e);
      try {
        const localRegs = this.getLocalRegistrations();
        const filtered = localRegs.filter(reg => reg.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
        window.dispatchEvent(new CustomEvent('registrationAdded'));
        this.syncWithCloud().catch(err => console.warn('Background sync after delete failed:', err));
        return true;
      } catch (localError) {
        console.error('Local delete fallback failed:', localError);
        return false;
      }
    }
  },

  // Clear all registrations and sync (async)
  async clearRegistrations() {
    try {
      await this.pushToCloud([]);
      localStorage.removeItem(STORAGE_KEY);
      window.dispatchEvent(new CustomEvent('registrationsCleared'));
      return true;
    } catch (e) {
      console.error('Error clearing registrations from cloud:', e);
      try {
        localStorage.removeItem(STORAGE_KEY);
        window.dispatchEvent(new CustomEvent('registrationsCleared'));
        this.syncWithCloud().catch(err => console.warn('Background sync after clear failed:', err));
        return true;
      } catch (localError) {
        console.error('Local clear fallback failed:', localError);
        return false;
      }
    }
  },

  // Async: Sync local with cloud database (bidirectional merge)
  async syncWithCloud() {
    try {
      const remoteRegs = await this.getRemoteRegistrations();
      const localRegs = this.getLocalRegistrations();
      
      const merged = mergeRegistrations(localRegs, remoteRegs);
      
      // If there's any change, save and notify UI
      if (JSON.stringify(merged) !== JSON.stringify(localRegs)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
        window.dispatchEvent(new CustomEvent('registrationAdded'));
      }
      
      // If cloud is missing data, push merged list
      if (JSON.stringify(merged) !== JSON.stringify(remoteRegs)) {
        await this.pushToCloud(merged);
      }
    } catch (e) {
      console.warn('Cloud sync error (offline mode):', e);
    }
  },

  // Async: Push registrations to cloud database
  async pushToCloud(registrations) {
    const response = await fetch(NPOINT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ registrations })
    });
    if (!response.ok) {
      throw new Error(`Cloud database write failed: ${response.statusText}`);
    }
  }
};
