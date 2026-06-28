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
  console.error('Backup aborted.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceKey);

async function runBackup() {
  console.log('Retrieving registrations from Supabase database...');
  try {
    const { data, error } = await supabase
      .from('registrations')
      .select('*')
      .order('timestamp', { ascending: false });

    if (error) {
      throw error;
    }

    console.log(`Successfully fetched ${data.length} registration records.`);

    // Create backups directory if it doesn't exist
    const backupDir = path.resolve('backups');
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `verbal_vault_backup_${timestamp}.json`;
    const filepath = path.join(backupDir, filename);

    fs.writeFileSync(filepath, JSON.stringify(data, null, 2), 'utf-8');
    console.log(`Success: Database backup successfully saved to: ${filepath}`);
  } catch (err) {
    console.error('Failure: Backup failed due to:', err.message || err);
    process.exit(1);
  }
}

runBackup();
