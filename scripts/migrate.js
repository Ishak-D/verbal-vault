import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

// Load environment variables manually from .env.local
const envPath = path.resolve('.env.local');
let env = {};
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf-8');
  content.split(/\r?\n/).forEach(line => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      const key = match[1];
      let value = match[2] || '';
      if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
      if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
      env[key] = value;
    }
  });
}

const supabaseUrl = env.VITE_SUPABASE_URL;
const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceKey || supabaseUrl.includes('your-project-id') || serviceKey.includes('your-service-role')) {
  console.error('Error: Please configure VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local first.');
  console.error('Migration aborted.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceKey);

const NPOINT_URL = 'https://api.npoint.io/3a57cee0b33207f540f0';

async function runMigration() {
  console.log('Step 1: Fetching registrations from NPoint.io...');
  try {
    const res = await fetch(NPOINT_URL);
    if (!res.ok) {
      throw new Error(`Failed to fetch from NPoint: ${res.statusText}`);
    }
    const data = await res.json();
    const list = data && Array.isArray(data.registrations) ? data.registrations : [];
    console.log(`Found ${list.length} registration records in NPoint.`);

    if (list.length === 0) {
      console.log('No records found to migrate. Exiting.');
      return;
    }

    console.log('Step 2: Mapping registrations to database columns...');
    const mapped = list.map(reg => ({
      id: reg.id,
      timestamp: reg.timestamp,
      first_name: reg.firstName,
      family_name: reg.familyName,
      age: reg.age,
      phone: reg.phone,
      email: reg.email,
      course: reg.course,
      notes: reg.notes || null
    }));

    console.log('Step 3: Uploading records to Supabase (with upsert on Conflict)...');
    const { error } = await supabase
      .from('registrations')
      .upsert(mapped, { onConflict: 'id' });

    if (error) {
      throw error;
    }

    console.log('Success: All registrations successfully migrated to Supabase!');
  } catch (err) {
    console.error('Failure: Migration failed due to:', err.message || err);
    process.exit(1);
  }
}

runMigration();
