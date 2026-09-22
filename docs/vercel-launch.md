# Vercel launch preparation

Release branch: `release/vercel-preview`. Do not deploy the old main branch as the current release or merge without approval.

## First preview

- Import `firasmoussa/surgical-clerkship-companion` into Vercel with the Next.js preset.
- Select the release branch for this preview. Confirm the deployed commit includes the latest source citations and OR Questions labels.
- Use the default npm install and `npm run build`; TypeScript errors must fail the build.
- Leave `SUBMISSIONS_ENABLED` unset. The guides work without Supabase credentials; both the form and API explicitly disable submissions.
- Keep the hosted preview access-controlled until its contents and configuration have been reviewed. Check deployment protection on the actual domains before sharing.
- Keep custom domains and a main-branch merge for the approved public release.

## Enabling contributions later

Enter configuration directly in Vercel's server-side environment settings, never in Git, chat, or browser-exposed variables:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUBMISSIONS_ENABLED=true`, only after the checks below

Before enabling: add durable abuse/rate limiting, verify payload validation and permissions for the pending-submissions table, review collection of IP/user-agent data and the submission privacy copy, and test one explicitly authorized synthetic contribution. Do not include patient information.

## Release verification

Run lint and a production build. Verify both modules, source links, quizzes, anatomy selection and manual intraoperative slide navigation. Verify the disabled form and API without credentials. Review clinical-source-review.md with a surgical reviewer before broad educational distribution.
