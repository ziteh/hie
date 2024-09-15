# Use Node.js 20 as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and pnpm-lock.yaml (or package-lock.json)
COPY package*.json ./

# Install dependencies using pnpm
RUN npm install -g pnpm
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Expose the port your Next.js app will run on
EXPOSE 3000

# Build the Next.js app
RUN pnpm run build

# Start the app
CMD ["pnpm", "start"]
