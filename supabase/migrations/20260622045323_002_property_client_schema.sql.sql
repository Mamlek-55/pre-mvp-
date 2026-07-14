-- Properties table
CREATE TABLE properties (
  id text PRIMARY KEY,
  created_at timestamptz DEFAULT now(),
  basic jsonb NOT NULL,
  neighborhood jsonb NOT NULL,
  project jsonb NOT NULL,
  building jsonb NOT NULL,
  finitions_level text NOT NULL,
  parking_places integer NOT NULL,
  differentiating jsonb NOT NULL DEFAULT '[]',
  room_details jsonb,
  neighborhood_total numeric NOT NULL,
  project_total numeric NOT NULL,
  building_total numeric NOT NULL,
  global_score numeric NOT NULL,
  has_juridic_risk boolean NOT NULL DEFAULT false
);

ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

CREATE POLICY "properties_select" ON properties FOR SELECT TO authenticated USING (true);
CREATE POLICY "properties_insert" ON properties FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "properties_update" ON properties FOR UPDATE TO authenticated USING (true);
CREATE POLICY "properties_delete" ON properties FOR DELETE TO authenticated USING (true);

-- Client profiles table
CREATE TABLE client_profiles (
  id text PRIMARY KEY,
  created_at timestamptz DEFAULT now(),
  name text NOT NULL,
  budget text NOT NULL,
  objectif text NOT NULL,
  risk_tolerance text NOT NULL,
  horizon text NOT NULL,
  profile_score numeric NOT NULL
);

ALTER TABLE client_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "client_profiles_select" ON client_profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "client_profiles_insert" ON client_profiles FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "client_profiles_update" ON client_profiles FOR UPDATE TO authenticated USING (true);
CREATE POLICY "client_profiles_delete" ON client_profiles FOR DELETE TO authenticated USING (true);

-- Comparisons table
CREATE TABLE comparisons (
  id text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  created_at timestamptz DEFAULT now(),
  property_id text NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  client_id text NOT NULL REFERENCES client_profiles(id) ON DELETE CASCADE,
  compatibility_score numeric NOT NULL,
  recommendation text NOT NULL,
  recommendation_text text NOT NULL
);

ALTER TABLE comparisons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "comparisons_select" ON comparisons FOR SELECT TO authenticated USING (true);
CREATE POLICY "comparisons_insert" ON comparisons FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "comparisons_update" ON comparisons FOR UPDATE TO authenticated USING (true);
CREATE POLICY "comparisons_delete" ON comparisons FOR DELETE TO authenticated USING (true);