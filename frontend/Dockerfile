# Stage 1: Build React app
FROM node:18-alpine as build-stage

WORKDIR /app/frontend

# Install dependencies (leveraging Docker cache)
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# Copy source code
COPY . .

# Set build-time environment variable for Vite
ARG VITE_APP_API_URL
ENV VITE_APP_API_URL=${VITE_APP_API_URL}

# Build app for production (Vite outputs to 'dist')
RUN npm run build

# ---

# Stage 2: Serve app with Nginx
FROM nginx:alpine as production-stage

# Copy built app from build stage
COPY --from=build-stage /app/frontend/dist /usr/share/nginx/html

# Copy custom Nginx config (for routing & API proxying)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose Nginx port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]