FROM oven/bun:latest

WORKDIR /Hono-app

COPY package.json ./
COPY bun.lockb ./

RUN bun install
RUN bun run build

COPY . .

EXPOSE 3000

CMD [ "/Hono-app/app" ]



