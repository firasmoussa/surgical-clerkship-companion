# Contributions launch

RLS is enabled on public.pimp_submissions, with no browser policies. Existing rows are preserved. Server inserts always set status pending. Review submissions privately in Supabase; publishing reviewed material is a separate code change.

Required server-only Vercel configuration (enter values in the dashboard, never in Git or chat):
- SUPABASE_URL
- SUPABASE_SERVICE_ROLE_KEY
- UPSTASH_REDIS_REST_URL
- UPSTASH_REDIS_REST_TOKEN
- SUBMISSION_RATE_LIMIT_SECRET (a random secret of at least 32 bytes)
- SUBMISSIONS_ENABLED=true only for the verified deployment

Create an Upstash Redis database and connect it to the appropriate Vercel Preview environment. The endpoint permits five attempts per IP in ten minutes, uses an HMAC identifier, disables analytics, and fails closed on missing configuration or limiter failure. IP headers are trusted only on Vercel. Do not put another proxy in front without reviewing client-IP handling.

Before enabling the domain: deploy this branch, configure a protected preview, submit one synthetic nonmedical test question, verify it is pending, confirm the sixth attempt is rejected with 429, and confirm anonymous database access is denied. Do not enable the old branding deployment, which does not contain these safeguards. Never expose the service key in NEXT_PUBLIC variables.

New questions no longer store raw IP or user-agent data. Existing records are unchanged. Hosting providers may retain their own request logs. Do not promise complete anonymity.

References: https://supabase.com/docs/guides/database/postgres/row-level-security and https://upstash.com/docs/redis/sdks/ratelimit-ts/features
