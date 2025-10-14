# ---------- Stage 1: Build ----------
FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build NestJS project
RUN yarn build


# ---------- Stage 2: Runtime ----------
FROM node:22-alpine AS runner
WORKDIR /app

# Copy only what’s needed for runtime
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/generated ./generated
COPY --from=builder /app/package.json /app/yarn.lock ./

RUN yarn install --production --frozen-lockfile

EXPOSE 8001
CMD ["node", "dist/main.js"]
