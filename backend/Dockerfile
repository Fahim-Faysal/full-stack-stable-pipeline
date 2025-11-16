# Use lightweight Node base image
FROM node:20-alpine

WORKDIR /app

# Copy package files first for caching
COPY package*.json ./

# Install production deps only (CI runs tests before this job)
RUN npm ci --only=production

# Copy app sources
COPY . .

# Expose port and run
EXPOSE 3000
CMD ["node", "app.js"]
