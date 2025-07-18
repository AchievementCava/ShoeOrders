# We use a builder to reduce the running docker footprint
FROM node:22-alpine AS builder
 
# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of the code
COPY . .
COPY prisma ./prisma

# Generate the prisma db
RUN npx prisma generate

# Build the SvelteKit app
RUN npm run build
RUN npm prune --production

# The product docker after "compilation"
FROM node:22-alpine
WORKDIR /app
COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/
COPY --from=builder /app/prisma prisma/
COPY package.json .
EXPOSE 3000

ENV NODE_ENV=production
CMD sh -c "npx prisma migrate deploy && node build"
