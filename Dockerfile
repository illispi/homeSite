FROM node:20-alpine AS build
WORKDIR /app
COPY . .
RUN npm i --force
RUN npm run prod

FROM node:20-alpine as static
COPY --from=build /app/dist /container
COPY --from=build /app/entrypoint.sh ./entrypoint.sh

RUN chmod +x ./entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]
CMD ["run"]

