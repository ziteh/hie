FROM node:20-alpine AS base

# Build stage
FROM base AS build

WORKDIR /app

ENV DATABASE_URL=file:/app/db/hie_sqlite.db

COPY package.json pnpm-lock.yaml* ./
RUN corepack enable pnpm && pnpm install --frozen-lockfile

COPY . .
RUN pnpm run prisma:update && pnpm run build

# Remove dev dependencies
RUN pnpm prune --prod

# Production stage
FROM base

WORKDIR /app

ENV NODE_ENV=production
ENV DATABASE_URL=file:/app/db/hie_sqlite.db

RUN npm install -g pnpm

COPY --from=build /app/db/hie_sqlite.db /app/db/hie_sqlite.db
COPY --from=build /app/.next /app/.next
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/package.json /app/package.json
COPY --from=build /app/public /app/public

EXPOSE 3000

CMD ["pnpm", "run", "start"]
