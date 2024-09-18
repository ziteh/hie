FROM node:20-alpine AS base

# Install dependencies
FROM base AS deps

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json pnpm-lock.yaml* ./
RUN corepack enable pnpm && pnpm install --frozen-lockfile


# Build stage
FROM base AS builder

WORKDIR /app

ENV DATABASE_URL=file:/app/db/hie_sqlite.db

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN \
  corepack enable pnpm && \
  pnpm run prisma:migration && \
  pnpm run build

# Remove dev dependencies
# RUN pnpm prune --prod


# Production stage
FROM base as runner

WORKDIR /app

ENV NODE_ENV=production
ENV DATABASE_URL=file:/app/db/hie_sqlite.db

COPY --from=builder /app/public ./public

# TODO permissions related lines
# RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
# RUN mkdir .next && chown nextjs:nodejs .next

# TODO permissions related lines
# COPY --from=builder --chown=nextjs:nodejs /app/db/hie_sqlite.db /app/db/hie_sqlite.db
# COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

COPY --from=builder /app/db/hie_sqlite.db /app/db/hie_sqlite.db
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# TODO permissions related lines
# USER nextjs

EXPOSE 3000
ENV PORT=3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]
