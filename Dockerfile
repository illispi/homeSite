FROM node:lts AS build
WORKDIR /app
COPY . .
RUN npm i
RUN npm run prod

ENTRYPOINT ["tail", "-f", "/dev/null"]