# Multi-stage build
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Production stage
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY --from=builder /app/src ./src

EXPOSE 8080

CMD ["node", "src/app.js"]