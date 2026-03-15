import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm/_relations";
import { user as authUserTable } from "../../auth-schema";

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

  // Use the user table from the auth schema
  userId: text("user_id").references(() => authUserTable.id),

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

export const applicationsRelations = relations(
  applicationsTable,
  ({ one }) => ({
    job: one(jobsTable, {
      fields: [applicationsTable.job_id],
      references: [jobsTable.id],
    }),
    user: one(authUserTable, {
      fields: [applicationsTable.userId],
      references: [authUserTable.id],
    }),
  }),
);
