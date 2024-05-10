# Install dependencies only when needed
FROM node:18-alpine AS deps
WORKDIR /frontend
COPY package.json package-lock.json ./
RUN npm install --fetch-timeout=1000000

# Rebuild the source code only when needed
FROM node:18-alpine AS builder
WORKDIR /frontend
COPY --from=deps /frontend/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image, copy all the files and run next
# Production image, copy all the files and run next
FROM node:18-alpine AS runner
WORKDIR /frontend

ENV NODE_ENV production

COPY --from=builder /frontend/next.config.js ./
COPY --from=builder /frontend/public ./public
COPY --from=builder /frontend/.next ./.next
COPY --from=builder /frontend/node_modules ./node_modules
COPY --from=builder /frontend/package.json ./package.json

EXPOSE 3000

CMD ["npm", "start"]
