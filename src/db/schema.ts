import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const jobsTable = sqliteTable("jobs", {
  id: int().primaryKey({ autoIncrement: true }),

  title: text().notNull(),

  company: text().notNull(),

  location: text().notNull(),

  category: text(),

  description: text(),

  created_at: text().default("CURRENT_TIMESTAMP"),
});
export const applicationsTable = sqliteTable("applications", {
  id: int().primaryKey({ autoIncrement: true }),

  job_id: int()
    .notNull()
    .references(() => jobsTable.id),

  name: text().notNull(),

  email: text().notNull(),

  resume_link: text(),

  cover_note: text(),

  created_at: text().default("CURRENT_TIMESTAMP"),
});

export const usersTable = sqliteTable("users", {
  id: int().primaryKey({ autoIncrement: true }),

  name: text().notNull(),

  email: text().notNull().unique(),

  password: text().notNull(),

  created_at: text().default("CURRENT_TIMESTAMP"),
});
