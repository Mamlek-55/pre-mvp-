-- Simple visits table for MVP
CREATE TABLE visites (
  id text PRIMARY KEY,
  created_at timestamptz DEFAULT now(),
  nom_bien text NOT NULL,
  prix integer NOT NULL,
  surface integer NOT NULL,
  quartier jsonb NOT NULL DEFAULT '{}',
  immeuble jsonb NOT NULL DEFAULT '{}',
  appartement jsonb NOT NULL DEFAULT '{}',
  score_quartier numeric NOT NULL DEFAULT 0,
  score_immeuble numeric NOT NULL DEFAULT 0,
  score_appartement numeric NOT NULL DEFAULT 0,
  score_global numeric NOT NULL DEFAULT 0
);

ALTER TABLE visites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "visites_select" ON visites FOR SELECT TO authenticated USING (true);
CREATE POLICY "visites_insert" ON visites FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "visites_update" ON visites FOR UPDATE TO authenticated USING (true);
CREATE POLICY "visites_delete" ON visites FOR DELETE TO authenticated USING (true);