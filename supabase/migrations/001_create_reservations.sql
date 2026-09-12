CREATE TABLE IF NOT EXISTS public.reservations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  date date NOT NULL,
  time time NOT NULL,
  guests integer NOT NULL CHECK (guests >= 1 AND guests <= 20),
  notes text DEFAULT '',
  status text DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'cancelled', 'completed')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Allow anon inserts
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anon_insert_reservations"
  ON public.reservations
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "anon_select_reservations"
  ON public.reservations
  FOR SELECT
  TO anon
  USING (true);

-- Index for ordering
CREATE INDEX IF NOT EXISTS idx_reservations_created_at
  ON public.reservations (created_at DESC);