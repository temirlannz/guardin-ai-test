# ---------- Stage 1: Build ----------
FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build


# ---------- Stage 2: Runtime ----------
FROM node:22-alpine AS runner

WORKDIR /app

COPY --from=builder /app/package.json /app/yarn.lock ./
COPY --from=builder /app/dist ./dist

RUN npm config set registry https://registry.npmjs.org
RUN yarn install --production --frozen-lockfile

EXPOSE 8001
CMD ["yarn", "start:prod"]
