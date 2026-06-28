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
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function createAdmin() {
  console.log('Creating admin account in Supabase...');
  try {
    const email = 'admin@verbalvault.com';
    const password = 'adminPassword123!';

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true
    });

    if (error) {
      if (error.message && error.message.includes('already exists')) {
        console.log(`Admin account '${email}' already exists in Supabase. Skipping creation.`);
      } else {
        throw error;
      }
    } else {
      console.log(`Successfully created admin user: ${data.user.email}`);
    }
  } catch (err) {
    console.error('Failed to create admin user:', err.message || err);
    process.exit(1);
  }
}

createAdmin();
