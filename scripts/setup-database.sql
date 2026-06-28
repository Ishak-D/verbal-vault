-- ==============================================
-- Verbal Vault — Database Setup Script
-- Run this in Supabase SQL Editor
-- ==============================================

-- 1. Create the registrations table
CREATE TABLE IF NOT EXISTS registrations (
  id TEXT PRIMARY KEY,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT now(),
  first_name TEXT NOT NULL,
  family_name TEXT NOT NULL,
  age INTEGER NOT NULL CHECK (age >= 5 AND age <= 99),
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  course TEXT NOT NULL,
  notes TEXT
);

-- 2. Enable Row-Level Security
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- 3. Policy: Allow anonymous users to INSERT registrations ONLY
--    Anonymous users CANNOT read, update, or delete any data.
CREATE POLICY "Allow public insert" ON registrations
  FOR INSERT TO anon
  WITH CHECK (true);

-- 4. Policy: Allow authenticated admin full access (SELECT, INSERT, UPDATE, DELETE)
--    Only users who have logged in via Supabase Auth get this role.
CREATE POLICY "Allow authenticated full access" ON registrations
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

-- ==============================================
-- SECURITY SUMMARY:
--
-- Anonymous visitors (anon role):
--   INSERT: ✅ Allowed (registration form)
--   SELECT: ❌ Blocked (cannot read any data)
--   UPDATE: ❌ Blocked
--   DELETE: ❌ Blocked
--
-- Authenticated admins (authenticated role):
--   INSERT: ✅ Allowed
--   SELECT: ✅ Allowed (dashboard reads)
--   UPDATE: ✅ Allowed
--   DELETE: ✅ Allowed (clear registrations)
-- ==============================================
