FROM node:alpine AS build
WORKDIR /app
COPY . .
RUN npm i
RUN npm run prod

FROM node:alpine as static
COPY --from=build /app/dist /container
COPY --from=build entrypoint.sh entrypoint.sh

RUN chmod +x ./entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]
CMD ["run"]

