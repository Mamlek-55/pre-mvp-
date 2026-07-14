-- Acheteurs (Buyers)
CREATE TABLE buyers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  budget text NOT NULL,
  wilaya text NOT NULL,
  objectif text NOT NULL,
  horizon text NOT NULL,
  type_bien text NOT NULL
);

ALTER TABLE buyers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "buyers_select" ON buyers FOR SELECT TO authenticated USING (true);
CREATE POLICY "buyers_insert" ON buyers FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "buyers_update" ON buyers FOR UPDATE TO authenticated USING (true);
CREATE POLICY "buyers_delete" ON buyers FOR DELETE TO authenticated USING (true);

-- Investisseurs (Investors)
CREATE TABLE investors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  budget text NOT NULL,
  rendement text NOT NULL,
  horizon text NOT NULL,
  zone text NOT NULL
);

ALTER TABLE investors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "investors_select" ON investors FOR SELECT TO authenticated USING (true);
CREATE POLICY "investors_insert" ON investors FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "investors_update" ON investors FOR UPDATE TO authenticated USING (true);
CREATE POLICY "investors_delete" ON investors FOR DELETE TO authenticated USING (true);

-- Vendeurs (Sellers)
CREATE TABLE sellers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  quartier text NOT NULL,
  type_bien text NOT NULL,
  surface integer NOT NULL,
  prix integer NOT NULL,
  paid boolean DEFAULT false
);

ALTER TABLE sellers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "sellers_select" ON sellers FOR SELECT TO authenticated USING (true);
CREATE POLICY "sellers_insert" ON sellers FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "sellers_update" ON sellers FOR UPDATE TO authenticated USING (true);
CREATE POLICY "sellers_delete" ON sellers FOR DELETE TO authenticated USING (true);

-- Promoteurs (Promoters)
CREATE TABLE promoters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  nom_projet text NOT NULL,
  quartier text NOT NULL,
  produits jsonb NOT NULL DEFAULT '{}',
  nombre_unites integer NOT NULL,
  documents boolean DEFAULT false,
  validated boolean DEFAULT false
);

ALTER TABLE promoters ENABLE ROW LEVEL SECURITY;

CREATE POLICY "promoters_select" ON promoters FOR SELECT TO authenticated USING (true);
CREATE POLICY "promoters_insert" ON promoters FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "promoters_update" ON promoters FOR UPDATE TO authenticated USING (true);
CREATE POLICY "promoters_delete" ON promoters FOR DELETE TO authenticated USING (true);

-- Agents
CREATE TABLE agents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  zone text NOT NULL,
  nombre_biens text NOT NULL,
  outils jsonb NOT NULL DEFAULT '{}'
);

ALTER TABLE agents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "agents_select" ON agents FOR SELECT TO authenticated USING (true);
CREATE POLICY "agents_insert" ON agents FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "agents_update" ON agents FOR UPDATE TO authenticated USING (true);
CREATE POLICY "agents_delete" ON agents FOR DELETE TO authenticated USING (true);

-- Diagnostics
CREATE TABLE diagnostics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  client_name text NOT NULL,
  client_budget text NOT NULL,
  client_objective text NOT NULL,
  client_risk text NOT NULL,
  neighborhood jsonb NOT NULL DEFAULT '{}',
  building jsonb NOT NULL DEFAULT '{}',
  apartment jsonb NOT NULL DEFAULT '{}',
  neighborhood_total numeric NOT NULL,
  building_total numeric NOT NULL,
  apartment_total numeric NOT NULL,
  global_score numeric NOT NULL,
  recommendation text NOT NULL,
  strengths jsonb NOT NULL DEFAULT '[]',
  weaknesses jsonb NOT NULL DEFAULT '[]'
);

ALTER TABLE diagnostics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "diagnostics_select" ON diagnostics FOR SELECT TO authenticated USING (true);
CREATE POLICY "diagnostics_insert" ON diagnostics FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "diagnostics_update" ON diagnostics FOR UPDATE TO authenticated USING (true);
CREATE POLICY "diagnostics_delete" ON diagnostics FOR DELETE TO authenticated USING (true);