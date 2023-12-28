FROM node:lts AS build
WORKDIR /app
COPY . .
RUN npm i
RUN npm run astro build