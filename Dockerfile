FROM ubuntu:24.04

WORKDIR /app

# Install curl, git, and Node.js dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    ca-certificates \
    gnupg \
    build-essential \
    cmake \
    python3

# Add NodeSource repository for Node.js 20.x (LTS)
RUN curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
RUN echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_20.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list

# Install Node.js
RUN apt-get update && apt-get install -y nodejs

WORKDIR /app

# Install Node.js dependencies
RUN npm install dicomweb-pacs

# update config
# ./node_modules/dicomweb-pacs/config

# Expose the default web server port (as per config)
EXPOSE 5001

# Expose default DICOM port
EXPOSE 8888
