# --- Stage 1: Build ---
FROM docker.io/jauderho/zola:latest AS builder

USER root

# Copy project files
WORKDIR /project
COPY . .

# Build the site
RUN zola build --output-dir /export

# --- Stage 2: Serve ---
FROM docker.io/nginx:alpine

# Copy the built files from the builder stage to the nginx html folder
COPY --from=builder /export /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
