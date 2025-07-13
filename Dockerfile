# Base image
FROM node:18

# Create app directory
WORKDIR /app

# Copy files
COPY package*.json ./
RUN npm install

# Copy remaining code
COPY . .

# Expose port
EXPOSE 3000

# Start command
CMD ["node", "index.js"]
