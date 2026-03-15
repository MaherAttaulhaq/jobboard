import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm/_relations";

export const jobsTable = sqliteTable("jobs", {
  id: int().primaryKey({ autoIncrement: true }),

  title: text().notNull(),

  company: text().notNull(),

  location: text().notNull(),

  category: text(),

  description: text(),

  created_at: text().default("CURRENT_TIMESTAMP"),
});

// This table is referenced in your seed script but was missing from the schema.
export const usersTable = sqliteTable("users", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  email: text().notNull().unique(),
  password: text().notNull(),
});

export const applicationsTable = sqliteTable("applications", {
  id: int().primaryKey({ autoIncrement: true }),

  job_id: int()
    .notNull()
    .references(() => jobsTable.id),

  userId: int("user_id").references(() => usersTable.id),

  name: text().notNull(),

  email: text().notNull(),

  resume_link: text(),

  cover_note: text(),

  created_at: text().default("CURRENT_TIMESTAMP"),
});

// Define relations
export const jobsRelations = relations(jobsTable, ({ many }) => ({
  applications: many(applicationsTable),
}));

export const usersRelations = relations(usersTable, ({ many }) => ({
  applications: many(applicationsTable),
}));

export const applicationsRelations = relations(
  applicationsTable,
  ({ one }) => ({
    job: one(jobsTable, {
      fields: [applicationsTable.job_id],
      references: [jobsTable.id],
    }),
    user: one(usersTable, {
      fields: [applicationsTable.userId],
      references: [usersTable.id],
    }),
  }),
);
