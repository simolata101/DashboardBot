# Use Node.js base image
FROM node:18

# Create app directory
WORKDIR /app

# Copy backend files
COPY backend ./backend

# Copy frontend files
COPY frontend ./frontend

# Install backend dependencies
WORKDIR /app/backend
RUN npm install

# Install frontend dependencies and build it
WORKDIR /app/frontend
RUN npm install
RUN npm run build

# Serve the frontend with backend (e.g., via Express static files)
WORKDIR /app/backend

# Expose the backend port
EXPOSE 3000

# Start the backend server
CMD ["node", "index.js"]
