// Cross-device synced storage for registrations
const STORAGE_KEY = 'verbal_vault_registrations';
const APP_KEY = 'verbalvault_prod_db';
const KEY_NAME = 'registrations';
const API_URL = `https://keyvalue.immanuel.co/api/KeyVal`;

// Helper: Base64URL Encode (Browser-safe UTF-8)
function encodeBase64URL(data) {
  try {
    const jsonStr = JSON.stringify(data);
    const base64 = btoa(unescape(encodeURIComponent(jsonStr)));
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  } catch (e) {
    console.error('Encoding error:', e);
    return '';
  }
}

// Helper: Base64URL Decode (Browser-safe UTF-8)
function decodeBase64URL(base64url) {
  try {
    if (!base64url) return [];
    let base64 = base64url.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }
    const jsonStr = decodeURIComponent(escape(atob(base64)));
    return JSON.parse(jsonStr);
  } catch (e) {
    console.error('Decoding error:', e);
    return [];
  }
}

// Helper: Merge local and remote registrations without duplicates
function mergeRegistrations(local, remote) {
  const map = new Map();
  // Add remote first (older / newer)
  remote.forEach(item => map.set(item.id, item));
  // Local overrides/adds
  local.forEach(item => map.set(item.id, item));
  // Sort by timestamp descending (newest first)
  return Array.from(map.values()).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
}

export const storage = {
  // Save registration locally and sync to cloud
  saveRegistration(data) {
    try {
      const registrations = this.getLocalRegistrations();
      const newRegistration = {
        id: 'reg_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
        timestamp: new Date().toISOString(),
        ...data
      };
      
      registrations.unshift(newRegistration);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(registrations));
      
      // Notify UI immediately (offline-first responsiveness)
      window.dispatchEvent(new CustomEvent('registrationAdded', { detail: newRegistration }));
      
      // Sync in background
      this.syncWithCloud();
      return true;
    } catch (e) {
      console.error('Error saving registration:', e);
      return false;
    }
  },

  // Get registrations (returns local cache immediately, syncs from cloud in background)
  getRegistrations() {
    // Triggers sync in background
    this.syncWithCloud();
    return this.getLocalRegistrations();
  },

  // Get local registrations only
  getLocalRegistrations() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Error getting local registrations:', e);
      return [];
    }
  },

  // Delete registration and sync
  deleteRegistration(id) {
    try {
      const registrations = this.getLocalRegistrations();
      const filtered = registrations.filter(reg => reg.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
      
      // Update cloud
      this.pushToCloud(filtered);
      return true;
    } catch (e) {
      console.error('Error deleting registration:', e);
      return false;
    }
  },

  // Clear all registrations and sync
  clearRegistrations() {
    try {
      localStorage.removeItem(STORAGE_KEY);
      window.dispatchEvent(new CustomEvent('registrationsCleared'));
      
      // Clear cloud
      this.pushToCloud([]);
      return true;
    } catch (e) {
      console.error('Error clearing registrations:', e);
      return false;
    }
  },

  // Async: Sync local with cloud database
  async syncWithCloud() {
    try {
      const remoteB64 = await fetch(`${API_URL}/GetValue/${APP_KEY}/${KEY_NAME}`).then(r => r.json());
      if (remoteB64 && remoteB64 !== "null") {
        const remoteRegs = decodeBase64URL(remoteB64);
        const localRegs = this.getLocalRegistrations();
        
        // Merge lists
        const merged = mergeRegistrations(localRegs, remoteRegs);
        
        // If there's any change, save and notify dashboard
        if (JSON.stringify(merged) !== JSON.stringify(localRegs)) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
          window.dispatchEvent(new CustomEvent('registrationAdded'));
        }
        
        // If cloud was missing some local records, upload the merged list
        if (JSON.stringify(merged) !== JSON.stringify(remoteRegs)) {
          await this.pushToCloud(merged);
        }
      } else {
        // Cloud is empty, push local data
        const localRegs = this.getLocalRegistrations();
        if (localRegs.length > 0) {
          await this.pushToCloud(localRegs);
        }
      }
    } catch (e) {
      console.warn('Could not sync with cloud database (offline mode):', e);
    }
  },

  // Async: Push registrations to cloud database
  async pushToCloud(registrations) {
    try {
      const b64url = encodeBase64URL(registrations);
      await fetch(`${API_URL}/UpdateValue/${APP_KEY}/${KEY_NAME}/${b64url}`, { method: 'POST' });
    } catch (e) {
      console.error('Error pushing data to cloud:', e);
    }
  }
};
