import { defineConfig } from "drizzle-kit";
const url= 'postgres://hono-app:root@0.0.0.0:5432/dev-db'

export default defineConfig({
  schema: "./schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: url
  }
});
