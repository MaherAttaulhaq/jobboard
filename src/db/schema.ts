import { relations } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import {
  user as authUserTable,
  userRelations as authUserRelations,
  session as authSessionTable,
  account as authAccountTable,
  verification as authVerificationTable,
  sessionRelations as authSessionRelations,
  accountRelations as authAccountRelations,
} from "../../auth-schema";

// Export the auth `user` table so Drizzle's schema generation can include it.
export const user = authUserTable;
export const userRelations = authUserRelations;
export const session = authSessionTable;
export const account = authAccountTable;
export const verification = authVerificationTable;
export const sessionRelations = authSessionRelations;
export const accountRelations = authAccountRelations;

export const categoriesTable = sqliteTable("categories", {
  id: int("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),
});

export const jobsTable = sqliteTable("jobs", {
  id: int("id").primaryKey({ autoIncrement: true }),

  title: text("title").notNull(),

  company: text("company").notNull(),

  location: text("location").notNull(),

  category: text("category"),

  description: text("description"),

  created_at: text("created_at").default("CURRENT_TIMESTAMP"),
});

export const applicationsTable = sqliteTable("applications", {
  id: int("id").primaryKey({ autoIncrement: true }),

  job_id: int("job_id")
    .notNull()
    .references(() => jobsTable.id),

  // Use the user table from the auth schema
  userId: text("user_id").references(() => authUserTable.id),

  name: text("name").notNull(),

  email: text("email").notNull(),

  resume_link: text("resume_link"),

  cover_note: text("cover_note"),

  created_at: text("created_at").default("CURRENT_TIMESTAMP"),
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
