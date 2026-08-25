# SolarSim Runbook

> Reproduce the SolarSim stack from `git clone` to a live production deploy.
> Estimated time: 60-90 min on a fresh machine, ~30 min if CLIs are pre-installed.

## How to use this document

Follow this as an ordered checklist, not a reference manual. Each major step ends with a validation checkpoint; do not move on until the checkpoint passes. If a command fails, stop and check the troubleshooting section before continuing. The document is written for a maintainer or agent with shell access, cloud credentials, and no prior SolarSim context.

## Table of Contents

1. [Prerequisites](#1-prerequisites)
2. [Clone and install](#2-clone-and-install)
3. [Provision cloud resources](#3-provision-cloud-resources)
4. [Configure environment variables](#4-configure-environment-variables)
5. [Initialise the database and run locally](#5-initialise-the-database-and-run-locally)
6. [Deploy to Heroku](#6-deploy-to-heroku)
7. [Deploy the PDF service to Vercel](#7-deploy-the-pdf-service-to-vercel)
8. [CI/CD (GitHub Actions)](#8-cicd-github-actions)
9. [Post-deploy smoke tests](#9-post-deploy-smoke-tests)
10. [Operational runbook](#10-operational-runbook)
11. [Troubleshooting](#11-troubleshooting)
12. [Tearing down](#12-tearing-down)
13. [Render free-tier fallback](#13-render-free-tier-fallback)
14. [Appendix A: env var reference card](#appendix-a-env-var-reference-card)
15. [Appendix B: Glossary of CLIs](#appendix-b-glossary-of-clis)

## 1. Prerequisites

### 1.1 Local toolchain (Node, pnpm, git, openssl, dig)

[!IMPORTANT]
SolarSim expects Node 24.x and pnpm 10.33.3. Use `corepack` for pnpm so the repo version and your local version stay aligned.

```bash
node -v
pnpm -v
git --version
openssl version
dig -v
corepack enable
```

Install the base toolchain if any command is missing. The repo is developed against the current Node LTS line, so do not use an older runtime.

✅ Validation: `node -v` reports `v24.x`, `pnpm -v` reports `10.33.3`, and `corepack enable` finishes without error.

### 1.2 Cloud platform CLIs (gcloud, gh, heroku, vercel) - install + login

[!NOTE]
Use your platform package manager of choice. The examples below are the quickest path on a fresh Unix-like machine.

```bash
brew install --cask google-cloud-sdk
brew install gh
brew install heroku/brew/heroku
pnpm add --global vercel
```

Authenticate each CLI before touching the project:

```bash
gcloud auth login
gcloud auth application-default login
gh auth login
heroku login
vercel login
```

`gcloud auth application-default login` matters if you want the backend to talk to Gemini through Vertex AI locally. If you rely on the API-key fallback only, it is still safe to run.

The Neon CLI (`neon`) is optional; this runbook uses the Neon Console to copy connection strings.

✅ Validation: `gcloud config list`, `gh auth status`, `heroku auth:whoami`, and `vercel whoami` all return authenticated output.

### 1.3 Cloud accounts to create (with signup URLs)

Create these accounts before provisioning anything:

| Provider     | Purpose                                        | Signup URL                       |
| ------------ | ---------------------------------------------- | -------------------------------- |
| Neon         | Serverless Postgres                            | https://neon.tech                |
| Cloudflare   | Private R2 object storage                      | https://dash.cloudflare.com      |
| Google Cloud | Solar API, Maps API, OAuth, optional Vertex AI | https://console.cloud.google.com |
| Resend       | Transactional email                            | https://resend.com               |
| Heroku       | Backend deploy                                 | https://heroku.com               |
| Vercel       | PDF render function                            | https://vercel.com               |
| Porkbun      | Domain registration / DNS                      | https://porkbun.com              |

## 2. Clone and install

```bash
git clone https://github.com/AlaskanTuna/SolarSim.git
cd SolarSim
corepack enable
pnpm install
cp .env.example .env
```

[!IMPORTANT]
Do not skip `cp .env.example .env`. The backend reads the root `.env` at runtime, and the frontend reads its `VITE_*` values at build time.

Immediately run the typecheck before provisioning cloud services:

```bash
pnpm typecheck
```

✅ Validation: `pnpm typecheck` exits cleanly.

### 2.1 Run locally with Docker (optional)

The repo ships a multi-stage `Dockerfile` and a `docker-compose.yml` that pairs the backend with a local Postgres 17, so you can run the stack without provisioning Neon. Everything else — R2, Google, Resend — still comes from your `.env`.

```bash
cp .env.example .env      # fill in R2, Google, Resend, Better Auth values
docker compose up -d --build
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:3001/api/health
```

Compose runs `prisma migrate deploy` before starting the server, mirroring the `Procfile` release phase. The image builds `shared` → `prisma generate` → `backend` → `frontend`, then serves the API and the built SPA from one process, exactly as the Heroku dyno does.

[!NOTE]
Three details that are easy to trip over:

- Postgres is published on host port **55432**, not 5432 — 5432 and 5433 commonly collide with a locally installed Postgres. Inside the compose network it is still 5432.
- `NODE_ENV: production` is pinned under `environment:` on purpose. `environment` wins over `env_file`, and the repo `.env` ships `NODE_ENV` empty — without the pin the API answers but the SPA 404s, because the `express.static` branch in `backend/src/app.ts` never runs.
- If `docker compose up` fails because a port is already bound, run `docker compose down -v` before retrying. A partially-started stack can leave the backend unable to reach Postgres, failing with `P1001: Can't reach database server`.

To stop and remove the local database volume:

```bash
docker compose down -v
```

✅ Validation: `GET http://localhost:3001/api/health` returns 200, and `http://localhost:3001/` serves the SPA.

## 3. Provision cloud resources

[!NOTE]
SolarSim is CLI-first. Use dashboards for inspection only; anything that creates or changes config should be reproducible from the terminal.

### 3.1 Google Cloud project (gcloud project create, enable APIs, OAuth client, API key)

Create a dedicated GCP project and enable the APIs used by SolarSim:

```bash
gcloud projects create solar-layout-generator --name="SolarSim"
gcloud config set project solar-layout-generator
gcloud services enable solar.googleapis.com maps-backend.googleapis.com geocoding-backend.googleapis.com
gcloud services enable aiplatform.googleapis.com
```

Then create credentials in the Cloud Console:

1. Create an API key for the Solar + Maps + Geocoding calls. Restrict it to the enabled APIs.
2. Create an OAuth client ID for a Web application.
3. Set the Better Auth callback URIs to `http://localhost:3001/api/auth/callback/google` locally and `https://solarsim.tech/api/auth/callback/google` in production.
4. Copy the OAuth client ID and secret for `GOOGLE_OAUTH_CLIENT_ID` and `GOOGLE_OAUTH_SECRET`.

[!IMPORTANT]
The chat assistant can use either Vertex AI or the Gemini API key fallback. In production, keep `GEMINI_API_KEY` available so Sol never depends on one auth path only.

### 3.2 Neon Postgres and Cloudflare R2 (create project and bucket, copy connection strings and scoped token)

Create a Neon project, then copy its pooled connection string into `DATABASE_URL` and its direct connection string into `DIRECT_URL`. Use the connection details shown for the branch you will deploy; the pooled hostname ends in `-pooler`.

> **Append `&connect_timeout=15&pool_timeout=20` to both Neon URLs.** The free tier scales compute to zero when idle, and a cold start can exceed Prisma's 5-second default — without this, the first request after a quiet period fails with `Can't reach database server`. Reproduced and fixed on 30/07/26: a suspended compute returned 500 on sign-in without the setting and 200 in 2.8 s with it. `pool_timeout` must stay greater than `connect_timeout`, or Prisma's 10-second pool default gives up while the connection is still being established and the larger `connect_timeout` never takes effect.

Create a private R2 bucket for the cached GeoTIFFs and imagery. Create an R2 API token with **Object Read & Write** permission scoped to that bucket only, then copy its access key ID and secret to `R2_ACCESS_KEY_ID` and `R2_SECRET_ACCESS_KEY`. Set `R2_ACCOUNT_ID` from the Cloudflare dashboard and `R2_BUCKET` to the bucket name. The backend derives the endpoint as `https://<account-id>.r2.cloudflarestorage.com`.

✅ Validation: the R2 bucket is private, and its API token has Object Read & Write permission for that bucket only.

### 3.3 Resend (signup, API key, verify domain - exact DNS records for SPF/DKIM/MX, Porkbun pitfalls)

Create a Resend API key, then verify your sender domain before testing with real users. For SolarSim, use `solarsim.tech` and send from `noreply@solarsim.tech`.

| Type | Host                | Value                                                | TTL |
| ---- | ------------------- | ---------------------------------------------------- | --- |
| TXT  | `send`              | `v=spf1 include:amazonses.com ~all`                  | 600 |
| TXT  | `resend._domainkey` | DKIM public key from Resend                          | 600 |
| MX   | `send`              | `feedback-smtp.<region>.amazonses.com` (priority 10) | 600 |

[!WARNING]
Porkbun auto-appends the domain suffix. Enter `send`, not `send.solarsim.tech`, or you will create the wrong record. For the apex, use ALIAS/ANAME if the registrar supports it; do not try to force a CNAME at the root.

After adding the DNS records, wait for propagation and verify them in Resend until all records are green.

✅ Validation: `dig TXT resend._domainkey.solarsim.tech`, `dig MX send.solarsim.tech`, and the Resend dashboard all confirm the domain as verified.

### 3.4 Domain registrar (Porkbun example for solarsim.tech - apex ALIAS, www CNAME, Resend's 3 DNS records)

Attach the production domain to Heroku first so you can capture the exact DNS targets:

```bash
heroku domains:add solarsim.tech -a solar-layout-generator
heroku domains:add www.solarsim.tech -a solar-layout-generator
heroku domains -a solar-layout-generator
heroku certs:auto:enable -a solar-layout-generator
```

Porkbun DNS records should end up like this:

| Record           | Host                | Value                         |
| ---------------- | ------------------- | ----------------------------- |
| ALIAS (or ANAME) | apex / blank        | `<apex-target>.herokudns.com` |
| CNAME            | `www`               | `<www-target>.herokudns.com`  |
| TXT              | `send`              | Resend SPF record             |
| TXT              | `resend._domainkey` | Resend DKIM record            |
| MX               | `send`              | Resend bounce MX record       |

[!NOTE]
Keep the Heroku DNS targets separate from the Resend sender records. They live on different subdomains and do not conflict.

✅ Validation: `dig +short solarsim.tech` and `dig +short www.solarsim.tech` resolve to Heroku, and `heroku certs:auto -a solar-layout-generator` shows the certificate as managed automatically.

## 4. Configure environment variables

Set the root `.env` from the table below. These are the variables read by `backend/src/config/env.ts`; `GEMINI_API_KEY` and `GOOGLE_CLOUD_PROJECT` are optional individually, but at least one is required for Sol to start. Set the `VITE_*` values in `.env.example` before a frontend build, because Vite bakes them into the bundle.

| Variable                 | Where the value comes from                                  | What breaks if missing                           |
| ------------------------ | ----------------------------------------------------------- | ------------------------------------------------ |
| `DATABASE_URL`           | Neon pooled connection string (host ends in `-pooler`)      | Runtime database access fails                    |
| `DIRECT_URL`             | Neon direct connection string                               | Prisma Migrate cannot run                        |
| `GOOGLE_API_KEY`         | GCP API key restricted to Solar, Maps, and Geocoding APIs   | Roof lookup, map tiles, and Solar API calls fail |
| `R2_ACCOUNT_ID`          | Cloudflare account ID; forms the S3 endpoint hostname       | Storage client cannot resolve the R2 endpoint    |
| `R2_ACCESS_KEY_ID`       | R2 API token scoped to Object Read & Write on the bucket    | GeoTIFF upload and download fail                 |
| `R2_SECRET_ACCESS_KEY`   | Secret half of the same R2 API token                        | GeoTIFF upload and download fail                 |
| `R2_BUCKET`              | Private bucket holding cached GeoTIFFs and imagery          | Storage paths resolve to a nonexistent bucket    |
| `BETTER_AUTH_SECRET`     | `openssl rand -base64 32`                                   | Better Auth refuses to start                     |
| `BETTER_AUTH_URL`        | Backend origin: `http://localhost:3001` locally             | OAuth callbacks resolve to the wrong origin      |
| `RESEND_API_KEY`         | Resend API key                                              | Transactional email delivery fails               |
| `EMAIL_FROM`             | DKIM/SPF-verified Resend sender                             | Auth emails cannot use the approved sender       |
| `EMAIL_ASSET_BASE_URL`   | Public origin for email images                              | Email clients cannot load embedded images        |
| `GOOGLE_OAUTH_CLIENT_ID` | Google Cloud OAuth client                                   | Google sign-in fails                             |
| `GOOGLE_OAUTH_SECRET`    | Same OAuth client                                           | Google sign-in fails                             |
| `FRONTEND_URL`           | Local `http://localhost:5173`, prod `https://solarsim.tech` | Backend CORS rejects browser requests            |
| `PDF_TOKEN_SECRET`       | `openssl rand -hex 32`                                      | PDF token signing and verification fail          |
| `GEMINI_API_KEY`         | Google AI Studio API key (optional if Vertex is configured) | Sol has no API-key chat auth                     |
| `GOOGLE_CLOUD_PROJECT`   | GCP project ID (optional if Gemini API key is set)          | Vertex AI chat path cannot start                 |
| `GOOGLE_CLOUD_LOCATION`  | Usually `global`                                            | Vertex AI requests target the wrong region       |
| `CHAT_MODEL`             | Gemini model name                                           | Chat uses the wrong or default model             |
| `APEX_DOMAIN`            | `solarsim.tech` in production, blank elsewhere              | Apex redirect middleware does not activate       |
| `PORT`                   | Heroku runtime injection                                    | Do not set manually; Heroku supplies it          |
| `BACKEND_PORT`           | Local backend port, usually `3001`                          | Local backend starts on the wrong port           |
| `NODE_ENV`               | `production` on Heroku, `development` locally               | Production behavior diverges                     |

## 5. Initialise the database and run locally

Run the Prisma and app bootstrap in this order:

```bash
pnpm prisma:generate
pnpm db:migrate
pnpm db:seed
pnpm dev
```

`pnpm dev` starts the shared types build, the Better Auth-enabled backend on `:3001`, and the frontend on `:5173`.

✅ Validation: `http://localhost:5173` loads, sign-up works with a real email, the verification email arrives through Resend's HTTP API, and Sol can stream a reply in the chat panel.

## 6. Deploy to Heroku

### 6.1 First-time app creation (heroku create, buildpacks:set, certs:auto:enable)

Create the app, pin the Node buildpack, and enable automated TLS:

```bash
heroku create solar-layout-generator
heroku buildpacks:set heroku/nodejs
heroku certs:auto:enable -a solar-layout-generator
```

### 6.2 Set backend config vars (one `heroku config:set` with every required value)

[!WARNING]
Set the `VITE_*` values from `.env.example` before the first deploy. Heroku runs `heroku-postbuild`, which bakes them into the frontend bundle. The command below lists only variables required by `backend/src/config/env.ts`.

```bash
heroku config:set \
  DATABASE_URL="postgresql://...-pooler...neon.tech/neondb?sslmode=require&connect_timeout=15&pool_timeout=20" \
  DIRECT_URL="postgresql://...neon.tech/neondb?sslmode=require&connect_timeout=15&pool_timeout=20" \
  GOOGLE_API_KEY="..." \
  R2_ACCOUNT_ID="..." \
  R2_ACCESS_KEY_ID="..." \
  R2_SECRET_ACCESS_KEY="..." \
  R2_BUCKET="solarsim" \
  BETTER_AUTH_SECRET="$(openssl rand -base64 32)" \
  BETTER_AUTH_URL="https://solarsim.tech" \
  RESEND_API_KEY="..." \
  EMAIL_FROM="SolarSim <noreply@solarsim.tech>" \
  EMAIL_ASSET_BASE_URL="https://solarsim.tech" \
  GOOGLE_OAUTH_CLIENT_ID="..." \
  GOOGLE_OAUTH_SECRET="..." \
  FRONTEND_URL="https://solarsim.tech" \
  PDF_TOKEN_SECRET="$(openssl rand -hex 32)" \
  -a solar-layout-generator
```

For the default chat setup, add a Gemini API key before the first deploy:

```bash
heroku config:set GEMINI_API_KEY="..." -a solar-layout-generator
```

You can use `GOOGLE_CLOUD_PROJECT` instead when Vertex AI credentials are configured. The remaining optional backend variables have defaults; set `APEX_DOMAIN=solarsim.tech` when you want canonical-domain redirects.

For the frontend's public Google Maps key, set the separate build-time variable before the first deploy:

```bash
heroku config:set VITE_GOOGLE_API_KEY="..." -a solar-layout-generator
```

### 6.3 Custom domain attachment (heroku domains:add for both apex and www, capture DNS targets, update Porkbun)

After the app exists, attach both hostnames and copy the DNS targets into Porkbun:

```bash
heroku domains:add solarsim.tech -a solar-layout-generator
heroku domains:add www.solarsim.tech -a solar-layout-generator
heroku domains -a solar-layout-generator
```

Update Porkbun with the returned Heroku DNS targets, then wait for propagation. The backend redirects `*.herokuapp.com` and `www.solarsim.tech` to `https://solarsim.tech`, so the apex must be the canonical hostname.

✅ Validation: `curl -I https://<heroku-app>.herokuapp.com` returns a `301` to `https://solarsim.tech`, and `curl -I https://www.solarsim.tech` does the same.

### 6.4 First deploy (git push heroku main, wait, heroku open)

```bash
git push heroku main
heroku open -a solar-layout-generator
```

Heroku runs the `release` phase first (`pnpm db:migrate:deploy`) and then starts the web dyno with `web: pnpm start`. If the release fails, the new revision does not go live.

✅ Validation: the live app opens, redirects to `https://solarsim.tech`, and sign-up works in production.

## 7. Deploy the PDF service to Vercel

The PDF service is a separate Vercel function under `services/pdf-service`. It takes a `previewUrl`, opens it in headless Chromium, waits for `window.__PDF_READY__ === true`, and returns a PDF binary. The function must only accept requests from your frontend origin.

```bash
cd services/pdf-service
vercel
vercel env add ALLOWED_FRONTEND_ORIGIN production
vercel --prod
```

Set the frontend origin exactly, with no trailing slash. For SolarSim production, that is `https://solarsim.tech`.

Then wire the deployed Vercel URL back into Heroku and rebuild the frontend bundle:

```bash
heroku config:set \
  PDF_EXPORT_URL="https://<pdf-service>.vercel.app" \
  VITE_PDF_EXPORT_URL="https://<pdf-service>.vercel.app" \
  -a solar-layout-generator
git commit --allow-empty -m "chore: rebuild for pdf service url"
git push heroku main
```

✅ Validation: the Analysis page download button calls the Vercel function, a PDF downloads, and the browser-origin check in the function logs stays green.

## 8. CI/CD (GitHub Actions)

Set the Heroku deploy secrets in GitHub:

```bash
gh secret set HEROKU_API_KEY --body "$(heroku auth:token)"
gh secret set HEROKU_APP_NAME --body "solar-layout-generator"
```

The workflow does two things:

1. On pull requests and pushes, it installs dependencies, runs `pnpm build`, and runs `pnpm test`.
2. On pushes to `main`, after CI passes, it force-pushes the current commit to the Heroku Git endpoint for the configured app.

[!NOTE]
The workflow is the source of truth for automated deploy behavior. It does not create infrastructure; it only ships the commit that already passed CI.

## 9. Post-deploy smoke tests

Run these against the live production URL:

1. Open `https://solarsim.tech` in a private window and confirm the apex domain loads with a valid TLS certificate.
2. Sign up with a real email address and confirm the verification email arrives from `noreply@solarsim.tech`.
3. Complete sign-in and create a new project from the dashboard.
4. Search for a Malaysian address, wait for the location to resolve, and confirm the workbench loads rooftop panels.
5. Drag or rotate a panel on the workbench and confirm the layout saves without a full page reload.
6. Open the analysis page, enter a bill, and confirm the savings and payback calculations render.
7. Open Sol chat, send a question, and confirm the assistant streams token-by-token.
8. Trigger PDF export and confirm the downloaded file opens as a valid A4 landscape report.

✅ Validation: all eight checks complete without a red console error, auth error, or 5xx response.

## 10. Operational runbook

### 10.1 Email template changes - deployed with the backend

Edit the typed render function in `backend/src/emails/`, then deploy the backend:

```bash
git push heroku main
```

The templates compile into the Express backend. A source change does not reach production until the backend deploy completes.

### 10.2 Database migrations - auto-run via Procfile release phase

The `Procfile` release phase runs:

```bash
pnpm db:migrate:deploy
```

That means every Heroku deploy applies migrations before the new web dyno serves traffic. If a migration is needed locally first, use `pnpm db:migrate`; if you need to inspect what Heroku will do, run the deploy command manually against the target database.

### 10.3 Rotating Resend API key

If the Resend key changes:

```bash
heroku config:set RESEND_API_KEY="..." -a solar-layout-generator
```

Then verify a fresh signup. The Express backend calls the Resend HTTP API directly, so no second config sync is needed.

### 10.4 Cert renewal verification (heroku certs:auto)

Check certificate health periodically:

```bash
heroku certs:auto -a solar-layout-generator
```

If renewal ever fails, inspect the DNS targets first and make sure the ACME challenge path is not being redirected away from Heroku.

### 10.5 Rebuilding after VITE\_\* env var changes (empty commit trick)

Any change to `VITE_GOOGLE_API_KEY` or `VITE_PDF_EXPORT_URL` requires a fresh frontend build. The fastest safe path is an empty commit:

```bash
git commit --allow-empty -m "chore: rebuild for env change"
git push heroku main
```

[!IMPORTANT]
If you skip the rebuild, Heroku will keep serving the old bundle and the browser will still use stale client-side env values.

## 11. Troubleshooting

| Symptom                                                                      | Cause                                                               | Fix                                                                                               |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Signup succeeds, but no email arrives                                        | Resend domain unverified or `RESEND_API_KEY` invalid                | Check Resend logs and confirm the SPF/DKIM/MX records                                             |
| Resend returns `403 Testing domain restriction`                              | Still using `onboarding@resend.dev` for arbitrary recipients        | Verify `solarsim.tech` in Resend and switch `admin_email` to `noreply@solarsim.tech`              |
| Local backend refuses to boot with a chat auth error                         | Neither `GEMINI_API_KEY` nor `GOOGLE_CLOUD_PROJECT` is set          | Add at least one of them to `.env`                                                                |
| Heroku app loads at `herokuapp.com` but not the custom domain                | DNS targets are wrong or TLS is still provisioning                  | Re-check `heroku domains -a ...`, then update Porkbun and wait for ACM                            |
| Requests bounce between `www.solarsim.tech` and the apex forever             | `APEX_DOMAIN` or `FRONTEND_URL` does not match the canonical host   | Set `APEX_DOMAIN=solarsim.tech` and `FRONTEND_URL=https://solarsim.tech`, then redeploy           |
| PDF export returns `500 Server misconfigured: ALLOWED_FRONTEND_ORIGIN unset` | Vercel env var missing                                              | Set `ALLOWED_FRONTEND_ORIGIN` with `vercel env add` and redeploy                                  |
| PDF export returns `403 CORS rejected`                                       | Frontend origin in Vercel does not exactly match the browser origin | Re-set `ALLOWED_FRONTEND_ORIGIN` to the exact production origin, no trailing slash                |
| PDF export button still points at the placeholder URL                        | `PDF_EXPORT_URL` changed after the frontend build                   | Update Heroku config and trigger the empty-commit rebuild                                         |
| Chat returns `409` immediately                                               | The project location is still processing                            | Wait for the location to finish resolving before opening chat                                     |
| Chat ends with `service_unavailable`                                         | Gemini or Vertex AI stayed on `503` after retries                   | Retry later; the backend already exhausted its retries                                            |
| Heroku release fails on migration                                            | A Prisma migration is broken or the DB URL is wrong                 | Inspect `heroku logs --tail`, fix the migration locally, then redeploy                            |
| OAuth sign-in redirects to localhost in production                           | `BETTER_AUTH_URL` or the Google callback URI is stale               | Set `BETTER_AUTH_URL=https://solarsim.tech`, update the Google callback URI, then redeploy Heroku |
| Sign-in works locally but not on Heroku                                      | `FRONTEND_URL` is not the production origin                         | Set `FRONTEND_URL=https://solarsim.tech` and redeploy                                             |
| `dig` shows no DNS change after updating Porkbun                             | DNS propagation lag or record typed incorrectly                     | Re-check the host fields, then wait and query again                                               |

## 12. Tearing down

Use this only when you want to delete the live environment or start over from scratch.

```bash
heroku apps:destroy solar-layout-generator --confirm solar-layout-generator
gcloud projects delete solar-layout-generator
```

For Vercel, remove the deployment or delete the linked project from the Vercel dashboard if you want the account-side record gone:

```bash
vercel rm <deployment-id>
```

Delete the Neon project and R2 bucket from their provider dashboards after preserving any data you need. Then remove the `solarsim.tech` DNS records from Porkbun so the domain no longer points at dead infrastructure.

✅ Validation: the Heroku app no longer serves traffic, the GCP project is gone, the Vercel deployment is removed, and the domain no longer resolves to the old stack.

## 13. Render Free-Tier Fallback

[!IMPORTANT]
This section is preparation for the cutover planned when the Heroku student credit actually runs out (~May 2027). Heroku remains the live deploy target until then — do **not** touch `solarsim.tech` DNS or the Heroku app while following this section. Render's free tier is materially weaker than Heroku Basic, in the ways called out below; treat it as a fallback, not an upgrade.

Render's pricing and free limits change periodically (the free spin-down moved from 30 to 15 minutes in September 2025), so re-verify against https://render.com/pricing and https://render.com/docs/free at cutover time.

### 13.1 Repo Additions: render.yaml and .node-version

Two committed files define the fallback deployment:

- `render.yaml` — a Render Blueprint describing one free web service that runs the Express backend and serves the pre-built SPA, exactly like the Heroku web dyno. It pins the build command, start command, and health check path; every secret is declared as `sync: false` so Render prompts for its value at first sync instead of reading it from a committed file.
- `.node-version` — pins the runtime to the same Node version as `engines.node` in `package.json`. Render reads it; so does any other tooling that honors Node pin files.

The blueprint sets `runtime: node` explicitly, and that line is load-bearing: the repo also ships a root `Dockerfile` (section 2.1), which Render would otherwise auto-detect and build instead of the Node buildpack.

The pin matters because Render otherwise builds with whatever Node runtime it currently defaults to, and this repo is developed against Node 24.x with pnpm provisioned by corepack from the `packageManager` field.

### 13.2 Migrations Without a Pre-Deploy Command

Render's free tier has no equivalent of the `Procfile` release phase — there is no pre-deploy command, so there is no direct replacement for `release: pnpm db:migrate:deploy`. The two honest options:

1. **Append the migration to the build command (chosen; committed in `render.yaml`).** The build command is `pnpm install --frozen-lockfile && pnpm build && pnpm db:migrate:deploy`. Render builds before the new instance goes live, so the old instance keeps serving traffic until the build (including the migration) succeeds. Trade-off: migrations run on **every** deploy, including one that later fails its health check and rolls back — after such a rollback the database schema is one migration ahead of the serving code. Keep migrations backwards-compatible (expand-and-contract) until the cutover is proven.
2. **Migrate manually from a local shell before each deploy.** Point `DIRECT_URL` at Neon locally and run `pnpm db:migrate:deploy`. This preserves Heroku's migrate-then-deploy ordering exactly but adds a manual step that is easy to forget.

Option 1 is committed because the fallback must survive unattended deploys. If a particular migration is risky, run option 2 first — the build-command step then becomes a no-op for that deploy.

### 13.3 Deploying the Parallel Environment (No DNS Changes Yet)

Heroku stays live throughout this phase. Stand the Render service up as a second, isolated environment:

```bash
# One-time: create a Render account (https://render.com), connect the GitHub repo,
# then provision the blueprint from the repo root.
render up   # Render CLI; or use "New > Blueprint" in the dashboard
```

Render creates the `solarsim` web service on a `*.onrender.com` subdomain and prompts for every `sync: false` env var. Set them to the same values as Heroku (Section 4 and Appendix A), with these Render-specific differences:

| Variable                      | Value on Render (Before Cutover)                                       | Why                                                                                                           |
| ----------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `DATABASE_URL` / `DIRECT_URL` | Same Neon endpoints, both ending `&connect_timeout=15&pool_timeout=20` | Render and Heroku share one database while the fallback is parallel — see §13.5 before turning on auto-deploy |
| `BETTER_AUTH_URL`             | `https://<service>.onrender.com`                                       | Better Auth resolves OAuth callbacks against this origin                                                      |
| `FRONTEND_URL`                | `https://<service>.onrender.com`                                       | CORS must match the origin the SPA is actually served from                                                    |
| `EMAIL_ASSET_BASE_URL`        | Keep `https://solarsim.tech`                                           | Email images live on the canonical origin; the fallback serves them too                                       |
| `APEX_DOMAIN`                 | Leave unset                                                            | Unset keeps the apex/www redirect middleware inactive so the `*.onrender.com` URL works                       |
| `NODE_ENV`                    | `production` (already in `render.yaml`)                                | Render's Node runtime does not set it automatically                                                           |

Add a second callback URI to the Google OAuth client: `https://<service>.onrender.com/api/auth/callback/google`.

Then deploy:

```bash
render deploy   # or push to the branch the service tracks, once auto-deploy is on
```

✅ Validation: `curl https://<service>.onrender.com/api/health` returns `{"status":"ok"}` (allow up to a minute for cold start), the SPA loads, Google sign-in completes, and a cached project loads end-to-end.

### 13.4 Known Limits on the Free Tier

Re-verified against Render's docs on 25/08/26: 512 MB RAM / 0.1 CPU, 750 free instance-hours per workspace per month, spin-down after 15 minutes of inactivity with ~1 minute cold start, no persistent disk, and no free pre-deploy command.

- **Cold start:** the first request after a spin-down takes ~30–60 s. The frontend's `PROCESSING_TIMEOUT_MS` is 120 s (MapPage), so the cold start alone does not time out a location resolve — but the resolve itself still has to finish within the remaining budget.
- **0.1 CPU:** the new-location pipeline downloads multi-MB GeoTIFFs and runs `sharp` on them. Phase 11 already documents OOM risk at 512 MB with a _full_ Heroku CPU share, so on a tenth of a CPU expect dramatically slower resolution. Measure cold-start time, RSS at idle, RSS during a resolve, and one full pipeline run, then compare the pipeline wall-clock against `PROCESSING_TIMEOUT_MS`; if it exceeds the ceiling, raising that timeout becomes a prerequisite for cutover rather than a nice-to-have (Phase 11 §13).
- **750 instance-hours:** a single always-on free service consumes 744 h/month, so the allowance barely fits one service; a second free service in the workspace tips it over and suspends both.
- **No persistent disk:** fine for SolarSim — GeoTIFFs and imagery live in R2, not on instance storage.
- **Build minutes:** free workspaces get a monthly build-minute allowance; the pnpm install + workspace build spends it on every deploy.

Do **not** add a keep-alive pinger that hits a database-touching route: keeping Neon's compute awake 24/7 costs ~180 CU-hours against a 100 CU-hour free budget and will suspend the database. If a pinger is ever used to dodge cold starts, point it at `/api/health` only — it touches neither Postgres nor the Solar API.

### 13.5 Shared-Database Caveat While Both Hosts Are Live

While the fallback is parallel, Render and Heroku talk to the same Neon database. Keep exactly one host auto-deploying (Heroku, via GitHub Actions) until there is a cutover decision: if both ran the build-command migration concurrently, the two `prisma migrate deploy` invocations would race each other.

### 13.6 Cutover (Only When Heroku Credit Runs Out)

The DNS records that change at Porkbun during a cutover:

| Record       | Current Value                 | Cutover Value                               |
| ------------ | ----------------------------- | ------------------------------------------- |
| ALIAS (apex) | `<apex-target>.herokudns.com` | the target Render shows for `solarsim.tech` |
| CNAME        | `<www-target>.herokudns.com`  | Render's target for `solarsim.tech`         |

(The exact Render targets appear in the service's custom-domain settings after you add `solarsim.tech` there — do not add the domain during the parallel phase.) Custom domains work on Render's free instance type and get automatically provisioned and renewed TLS certificates, so no paid plan is required for the apex.

At cutover time, in order:

1. Add `solarsim.tech` as a custom domain on the Render service, then set `APEX_DOMAIN=solarsim.tech`, `BETTER_AUTH_URL=https://solarsim.tech`, and `FRONTEND_URL=https://solarsim.tech` on Render and redeploy.
2. Update the Google OAuth client: authorised origins and the callback URI for `https://solarsim.tech`.
3. **Update `ALLOWED_FRONTEND_ORIGIN` on the Vercel pdf-service to the new origin.** PDF export silently 403s if this is skipped — this exact regression already shipped once, on 26/04/26.
4. Point Porkbun DNS at the Render targets; leave the Heroku app deployed.
5. Run the Section 9 smoke tests against `https://solarsim.tech`.

Rollback while the Heroku app still exists: point Porkbun DNS back at the Heroku targets, then set `APEX_DOMAIN`, `BETTER_AUTH_URL`, and `FRONTEND_URL` back to their Heroku values. TLS is automatic on both platforms (`heroku certs:auto` on Heroku, managed certificates on Render), so no certificate work is needed in either direction.

## Appendix A: env var reference card

| Variable                 | Source                          | Notes                        |
| ------------------------ | ------------------------------- | ---------------------------- |
| `GOOGLE_API_KEY`         | GCP API key                     | Solar API + Maps + Geocoding |
| `GOOGLE_CLOUD_PROJECT`   | GCP project ID                  | Vertex AI chat path          |
| `GOOGLE_CLOUD_LOCATION`  | Usually `global`                | Vertex AI region             |
| `GEMINI_API_KEY`         | Google AI Studio                | Chat fallback                |
| `CHAT_MODEL`             | Gemini model name               | Chat model selector          |
| `GOOGLE_OAUTH_CLIENT_ID` | GCP OAuth client                | Google sign-in               |
| `GOOGLE_OAUTH_SECRET`    | GCP OAuth client                | Google sign-in               |
| `DATABASE_URL`           | Neon pooled connection string   | Prisma runtime queries       |
| `DIRECT_URL`             | Neon unpooled connection string | Prisma Migrate               |
| `R2_ACCOUNT_ID`          | Cloudflare account ID           | R2 S3 endpoint hostname      |
| `R2_ACCESS_KEY_ID`       | R2 API token                    | GeoTIFF storage              |
| `R2_SECRET_ACCESS_KEY`   | R2 API token                    | GeoTIFF storage              |
| `R2_BUCKET`              | R2 bucket name                  | GeoTIFF storage              |
| `BETTER_AUTH_SECRET`     | `openssl rand -base64 32`       | Better Auth signing secret   |
| `BETTER_AUTH_URL`        | Backend origin                  | OAuth callback origin        |
| `RESEND_API_KEY`         | Resend API key                  | Transactional email          |
| `EMAIL_FROM`             | Verified Resend sender          | Auth email sender            |
| `EMAIL_ASSET_BASE_URL`   | Public image origin             | Email image URLs             |
| `APEX_DOMAIN`            | `solarsim.tech`                 | Apex redirect middleware     |
| `BACKEND_PORT`           | Local only                      | Backend dev port             |
| `FRONTEND_URL`           | Local or production origin      | Backend CORS                 |
| `PDF_TOKEN_SECRET`       | `openssl rand -hex 32`          | PDF token signing            |
| `PORT`                   | Heroku runtime                  | Do not set by hand           |
| `NODE_ENV`               | Runtime / Heroku config         | Production mode              |

## Appendix B: Glossary of CLIs

| CLI       | Meaning                                                 |
| --------- | ------------------------------------------------------- |
| `neon`    | Optional CLI for Neon projects and connection strings   |
| `gcloud`  | Manages Google Cloud projects, APIs, and credentials    |
| `gh`      | GitHub CLI for secrets, PRs, and workflow inspection    |
| `heroku`  | Manages the backend app, config vars, domains, and logs |
| `vercel`  | Deploys and configures the PDF function                 |
| `dig`     | Queries DNS records from the terminal                   |
| `openssl` | Generates secure random secrets and checks TLS          |

Last verified: 25/08/26 (against main @ 138da56)
