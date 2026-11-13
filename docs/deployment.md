# Deployment

The site runs on **Vercel**. Vercel detects Next.js automatically, so no `vercel.json` is needed.

- Pushes to `main` deploy to **production**.
- Any other branch or pull request gets a **preview URL**. Check changes there before merging.
- If a release goes wrong, use **Instant Rollback** (Deployments → previous deployment → Promote).

## One-time setup

1. **Node.js version:** Vercel follows `engines.node` in `package.json` (`>=22`), which selects the newest supported major (24.x, matching `.nvmrc`). No setting is needed.
2. **Custom domain** *(optional)*: add it under Project → Domains, then set `NEXT_PUBLIC_SITE_URL` (see below).
3. **Analytics:** Project → **Analytics** → Enable, and Project → **Speed Insights** → Enable. The code is already in place. Nothing is collected until these are switched on.

## Environment variables

Set these in Project → Settings → Environment Variables, for both **Production** and **Preview**. For local development, copy [`.env.example`](../.env.example) to `.env.local`.

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | No | Canonical site URL, e.g. `https://mogesh.dev`. Used for canonical links, Open Graph and the sitemap. Defaults to Vercel's production URL. |
| `RESEND_API_KEY` | No | Turns on the contact form |
| `CONTACT_TO` | No | Inbox that receives messages. Defaults to `contact.email`. |
| `CONTACT_FROM` | No | Sender address, e.g. `Portfolio <hello@yourdomain.com>`. Defaults to Resend's test sender. |

> **Environment variables are read at build time** because the pages are static. After adding or changing one, **redeploy** (Deployments → … → Redeploy) for it to take effect.

## Contact form (Resend)

1. Create an account at [resend.com](https://resend.com) and generate an **API key**.
2. Add it to Vercel as `RESEND_API_KEY` and redeploy. The form appears in the Contact section.
3. **Until you verify a domain**, Resend's test sender (`onboarding@resend.dev`) only delivers to the email address of *your Resend account*. To deliver to `CONTACT_TO` from your own address:
   - verify your domain in Resend (it gives you DNS records to add);
   - set `CONTACT_FROM`, e.g. `Portfolio <hello@yourdomain.com>`.

**Spam guards:** a hidden honeypot field, a minimum time on the form, server-side validation and a per-instance rate limit (5 messages per IP per 10 minutes). For a hard limit across all instances, add a **Vercel Firewall** rate-limit rule for `POST` requests to `/`. Each message sets `reply_to` to the visitor's address, so hitting **Reply** in your inbox answers them directly.

## CI

[`.github/workflows/ci.yml`](../.github/workflows/ci.yml) runs `npm ci`, lint, typecheck, tests and build (reusing the `.next/cache` between runs), on Node from `.nvmrc`:
- on pushes to `main`;
- on every pull request;
- on demand from the Actions tab.

Superseded runs are cancelled automatically.

**Dependabot** ([`.github/dependabot.yml`](../.github/dependabot.yml)) opens a weekly PR grouping npm minor and patch updates, separate PRs for major versions, and a monthly PR for GitHub Actions. CI checks each one, so merge once it's green and the preview looks right.

## Troubleshooting

| Symptom | Fix |
|---|---|
| Contact form doesn't appear | `RESEND_API_KEY` isn't set for that environment, or you haven't redeployed since adding it |
| Form says "Couldn't send right now" | Check the Vercel function logs. Usually it's an invalid key, or an unverified `CONTACT_FROM` domain. |
| Canonical / OG URLs point to `*.vercel.app` | Set `NEXT_PUBLIC_SITE_URL` and redeploy |
| Social preview shows an old image | Platforms cache previews. Re-scrape with the LinkedIn Post Inspector or opengraph.xyz. |
| Build fails on `npm ci` with ERESOLVE | A dependency's peer range doesn't allow React 19 yet. Check the error, then pin a compatible version. |
| Something is blocked in the browser console ("Refused to load…") | The Content Security Policy in `next.config.mjs` doesn't allow that origin. Add it to the matching directive. The CSP only applies to production builds. |
| Analytics dashboard is empty | Enable Analytics and Speed Insights in the Vercel project. Data shows up after real visits. |
