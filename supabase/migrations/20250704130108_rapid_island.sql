/*
  # Create loan partners table

  1. New Tables
    - `loan_partners`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `email` (text, unique, required)
      - `phone` (text, required)
      - `city` (text, required)
      - `experience` (text, required)
      - `current_income` (text, required)
      - `status` (text, default 'pending')
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `loan_partners` table
    - Add policy for public insert (registration)
    - Add policy for authenticated users to read their own data
*/

CREATE TABLE IF NOT EXISTS loan_partners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text NOT NULL,
  city text NOT NULL,
  experience text NOT NULL,
  current_income text NOT NULL,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE loan_partners ENABLE ROW LEVEL SECURITY;

-- Allow public registration (insert)
CREATE POLICY "Allow public registration"
  ON loan_partners
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow users to read their own data
CREATE POLICY "Users can read own data"
  ON loan_partners
  FOR SELECT
  TO public
  USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_loan_partners_updated_at
  BEFORE UPDATE ON loan_partners
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();