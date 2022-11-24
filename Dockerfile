FROM node:16.17.1-alpine as build-stage

WORKDIR app

COPY package*.json ./

RUN npm install

# copy all files from workspace into workdir /app
COPY . .

# Serve the app
CMD npm run start
