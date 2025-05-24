FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
# Install all dependencies (including devDependencies) for build
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Create the production image
FROM node:20-alpine
WORKDIR /app
# Copy package.json and package-lock.json
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json* ./
# Install only production dependencies
RUN npm install --production
# Copy the built application from the builder stage
COPY --from=builder /app/dist ./dist

# Expose the port the app runs on
EXPOSE 3000
CMD [ "node", "dist/main" ]
