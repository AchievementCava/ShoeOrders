# Dockerfile
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# Build the SvelteKit app
RUN npm run build

# Expose port and start the app
EXPOSE 3000
CMD ["npm", "run", "preview", "--", "--port", "3000", "--host"]

