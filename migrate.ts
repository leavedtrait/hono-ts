
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from 'postgres';

const migrationsClient = postgres(`${Bun.env.DATABASE_URL}`, {
  max: 1,
});
const db = drizzle(migrationsClient);
await migrate(db, { migrationsFolder: '...' });