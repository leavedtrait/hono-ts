FROM oven/bun:latest

WORKDIR /Hono-app

COPY src ./src
COPY package.json ./
COPY bun.lockb ./
RUN bun install
RUN bun install && bun run build

COPY . .

EXPOSE 3000

CMD ["bun", "run", "start"]



