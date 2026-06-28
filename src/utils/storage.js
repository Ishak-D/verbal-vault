import { supabase } from './supabase.js';

const STORAGE_KEY = 'verbal_vault_registrations';

// Helper: Map camelCase frontend fields to snake_case database columns
function mapToDB(clientReg) {
  return {
    id: clientReg.id || 'reg_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
    timestamp: clientReg.timestamp || new Date().toISOString(),
    first_name: clientReg.firstName,
    family_name: clientReg.familyName,
    age: clientReg.age,
    phone: clientReg.phone,
    email: clientReg.email,
    course: clientReg.course,
    notes: clientReg.notes
  };
}

// Helper: Map snake_case database columns back to camelCase frontend fields
function mapFromDB(dbReg) {
  return {
    id: dbReg.id,
    timestamp: dbReg.timestamp,
    firstName: dbReg.first_name,
    familyName: dbReg.family_name,
    age: dbReg.age,
    phone: dbReg.phone,
    email: dbReg.email,
    course: dbReg.course,
    notes: dbReg.notes
  };
}

export const storage = {
  // Save registration locally and sync to Supabase
  async saveRegistration(data) {
    const dbData = mapToDB(data);
    const clientData = mapFromDB(dbData);

    try {
      // Atomic insert to avoid concurrency race conditions
      const { error } = await supabase
        .from('registrations')
        .insert([dbData]);

      if (error) throw error;

      // Update local storage cache
      const localRegs = this.getLocalRegistrations();
      localRegs.unshift(clientData);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(localRegs));

      // Notify UI locally
      window.dispatchEvent(new CustomEvent('registrationAdded', { detail: clientData }));
      return true;
    } catch (e) {
      console.warn('Failed to save to Supabase, falling back to local storage:', e);
      try {
        const localRegs = this.getLocalRegistrations();
        localRegs.unshift(clientData);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(localRegs));

        window.dispatchEvent(new CustomEvent('registrationAdded', { detail: clientData }));
        
        // Try background sync
        this.syncWithCloud().catch(err => console.warn('Background sync failed:', err));
        return true;
      } catch (localError) {
        console.error('LocalStorage fallback write failed:', localError);
        return false;
      }
    }
  },

  // Get registrations (fetches from Supabase, falls back to local cache if offline)
  async getRegistrations() {
    try {
      const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .order('timestamp', { ascending: false });

      if (error) throw error;

      const mapped = data.map(mapFromDB);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mapped));
      return mapped;
    } catch (e) {
      console.warn('Could not retrieve from Supabase, returning local cache:', e);
      return this.getLocalRegistrations();
    }
  },

  // Get local registrations cache
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
  async deleteRegistration(id) {
    try {
      const { error } = await supabase
        .from('registrations')
        .delete()
        .eq('id', id);

      if (error) throw error;

      const localRegs = this.getLocalRegistrations();
      const filtered = localRegs.filter(reg => reg.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));

      window.dispatchEvent(new CustomEvent('registrationAdded'));
      return true;
    } catch (e) {
      console.error('Error deleting registration from Supabase:', e);
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

  // Clear all registrations and sync
  async clearRegistrations() {
    try {
      const { error } = await supabase
        .from('registrations')
        .delete()
        .neq('id', ''); // Delete all rows

      if (error) throw error;

      localStorage.removeItem(STORAGE_KEY);
      window.dispatchEvent(new CustomEvent('registrationsCleared'));
      return true;
    } catch (e) {
      console.error('Error clearing registrations from Supabase:', e);
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

  // Sync local cache with Supabase database (bidirectional merge)
  async syncWithCloud() {
    try {
      const { data: remoteData, error } = await supabase
        .from('registrations')
        .select('*');

      if (error) throw error;

      const remoteRegs = remoteData.map(mapFromDB);
      const localRegs = this.getLocalRegistrations();

      // Merge registrations
      const map = new Map();
      remoteRegs.forEach(item => {
        if (item && item.id) map.set(item.id, item);
      });
      localRegs.forEach(item => {
        if (item && item.id) map.set(item.id, item);
      });
      
      const merged = Array.from(map.values())
        .filter(Boolean)
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

      // Update local cache
      if (JSON.stringify(merged) !== JSON.stringify(localRegs)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
        window.dispatchEvent(new CustomEvent('registrationAdded'));
      }

      // Detect and push local changes that are not in Supabase
      const remoteIds = new Set(remoteRegs.map(r => r.id));
      const newLocalRegs = localRegs.filter(r => !remoteIds.has(r.id));

      if (newLocalRegs.length > 0) {
        const { error: insertError } = await supabase
          .from('registrations')
          .insert(newLocalRegs.map(mapToDB));
        
        if (insertError) throw insertError;
      }
    } catch (e) {
      console.warn('Supabase sync error (offline mode):', e);
    }
  }
};
