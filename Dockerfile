FROM node:20-slim

RUN apt-get update && \
    # Add ca-certificate package to make git work over HTTPS
    apt-get install --reinstall ca-certificates -y && \
    update-ca-certificates

USER node

# Install project dependencies
WORKDIR /usr/src/app
COPY --chown=node:node package*.json ./
RUN npm install
# Copy the rest of the application code
COPY --chown=node:node . .

# Expose the port the app runs on
EXPOSE 5173

# Start the app
CMD ["npm", "run", "dev"]
