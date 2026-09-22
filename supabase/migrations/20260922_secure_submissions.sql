-- Applied through Supabase Policies on September 22, 2026.
-- No browser policies: only the server service role can submit or review.
alter table public.pimp_submissions enable row level security;
