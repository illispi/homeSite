FROM node:lts AS build
WORKDIR /app
COPY . .
RUN npm i
RUN npm run prod

CMD ["echo", "Container is running. Press Ctrl+C to exit."]