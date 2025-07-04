FROM node:18

WORKDIR /app/backend
COPY backend/package.json .
RUN npm install
COPY backend .

WORKDIR /app/frontend
COPY frontend/package.json .
COPY frontend/index.html .
COPY frontend/src ./src
RUN npm install && npm run build

WORKDIR /app/backend
EXPOSE 3000
CMD ["node", "index.js"]
