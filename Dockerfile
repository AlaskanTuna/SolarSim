# syntax=docker/dockerfile:1

FROM node:24-slim AS base
WORKDIR /app
# Installed in the BASE stage, not just runtime: Prisma resolves its query-engine
# binary target from the OpenSSL it detects at install/generate time. Without it
# here, install picks debian-openssl-1.1.x while the image actually runs OpenSSL 3,
# and the server dies with "could not locate the Query Engine for runtime".
RUN apt-get update && apt-get install -y --no-install-recommends openssl \
  && rm -rf /var/lib/apt/lists/* \
  && corepack enable

# ---- Build stage: install with the lockfile, build shared -> prisma -> backend -> frontend
FROM base AS build
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc tsconfig.json ./
COPY prisma ./prisma
COPY shared/package.json shared/tsconfig.json ./shared/
COPY backend/package.json backend/tsconfig.json ./backend/
COPY frontend/package.json frontend/tsconfig.json frontend/components.json ./frontend/
RUN pnpm install --frozen-lockfile
COPY shared ./shared
COPY backend ./backend
COPY frontend ./frontend
# Mirrors the root "build" script (and "heroku-postbuild"):
# @shared/types build -> prisma generate -> backend tsc -> frontend build
RUN pnpm build

# ---- Runtime stage: only what the server needs to run
FROM base AS runtime
ENV NODE_ENV=production
COPY --from=build /app/node_modules ./node_modules
# Workspace link: backend/node_modules/@shared/types -> ../../../shared
COPY --from=build /app/backend/node_modules ./backend/node_modules
COPY --from=build /app/package.json ./
# prisma/schema.prisma + migrations for `prisma migrate deploy` (Procfile release phase)
COPY --from=build /app/prisma ./prisma
# @shared/types is resolved through the backend/node_modules workspace link
COPY --from=build /app/shared/package.json ./shared/package.json
COPY --from=build /app/shared/dist ./shared/dist
COPY --from=build /app/backend/package.json ./backend/package.json
COPY --from=build /app/backend/dist ./backend/dist
# Read from disk at runtime by backend/src/services/chat/knowledge.ts, which
# resolves backend/dist/services/chat -> backend/assets. Not bundled by tsc.
COPY --from=build /app/backend/assets ./backend/assets
# Served by express.static on backend/src/app.ts:85
COPY --from=build /app/frontend/dist ./frontend/dist

RUN groupadd --system solarsim && useradd --system --gid solarsim solarsim \
  && chown -R solarsim:solarsim /app
USER solarsim

# PORT overrides BACKEND_PORT (default 3001) — see backend/src/config/env.ts
EXPOSE 3001

CMD ["node", "backend/dist/server.js"]
