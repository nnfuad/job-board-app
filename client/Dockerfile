# ✅ client/Dockerfile - BUILD VERIFICATION
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Verify files were copied ← KEY ADDITION
RUN echo "Files in nginx html:" && ls -la /usr/share/nginx/html/

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN nginx -t  # ← Verify config is valid
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]