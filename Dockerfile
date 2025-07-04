# Base image
FROM node:18

# Set working directory for backend
WORKDIR /app/backend

# Copy backend
COPY backend/package.json .
RUN npm install
COPY backend .

# Set working directory for frontend
WORKDIR /app/frontend

# Copy frontend
COPY frontend/package.json .
COPY frontend/index.html .
COPY frontend/src ./src
RUN npm install && npm run build

# Serve frontend using backend
WORKDIR /app/backend
EXPOSE 3000
CMD ["node", "index.js"]
