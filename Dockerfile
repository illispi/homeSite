FROM oven/bun:1 AS build
WORKDIR /app
COPY . .
RUN bun install
RUN bun run prod

FROM oven/bun:1 as static
COPY --from=build /app/dist /container
COPY --from=build /app/entrypoint.sh ./entrypoint.sh

RUN chmod +x ./entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]
CMD ["run"]

