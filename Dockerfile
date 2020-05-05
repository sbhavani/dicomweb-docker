FROM node:slim

WORKDIR /app

COPY dicomweb-server/package.json .
RUN npm install --quiet

COPY dicomweb-server/ .

COPY development.js.example config/development.js
