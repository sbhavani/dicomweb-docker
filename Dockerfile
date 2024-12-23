FROM ubuntu:24.04

WORKDIR /app

# Install curl, git, and Node.js dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    ca-certificates \
    gnupg

# Add NodeSource repository for Node.js 20.x (LTS)
RUN curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
RUN echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_20.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list

# Install Node.js
RUN apt-get update && apt-get install -y nodejs

# Clone the repository and set the working directory
RUN git clone https://github.com/dcmjs-org/dicomweb-server /app/dicomweb-server
WORKDIR /app/dicomweb-server

# Install Node.js dependencies
RUN npm install --quiet

# Copy the configuration file
COPY development.js.example config/development.js
