import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'sqlite',
  driver: 'sqlite-cloud',
  dbCredentials: {
    url: process.env.SQLITE_CLOUD_CONNECTION_STRING!,
  },
});
