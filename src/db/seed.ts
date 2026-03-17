import "dotenv/config";
import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "./schema";
import { applicationsTable, jobsTable, categoriesTable } from "./schema";

async function seed() {
  console.log("Seeding database...");
async function main() {
  const args = process.argv.slice(2);
  const isCloud = args.includes("--cloud");

  const connectionString = process.env.DATABASE_URL || "sqlite.db";
  const sqlite = new Database(connectionString);
  const db = drizzle({ client: sqlite, schema });
  let db;

  if (isCloud) {
    console.log("🌱 Initializing SQLite Cloud connection...");
    const { drizzle } = await import("drizzle-orm/sqlite-cloud");
    const { Database } = await import("@sqlitecloud/drivers");

    const connectionString = process.env.SQLITE_CLOUD_CONNECTION_STRING;
    if (!connectionString) {
      throw new Error("SQLITE_CLOUD_CONNECTION_STRING is not set in .env");
    }

    const client = new Database(connectionString);
    db = drizzle({ client, schema });
  } else {
    console.log("🌱 Initializing Local SQLite connection...");
    const { drizzle } = await import("drizzle-orm/better-sqlite3");
    const Database = (await import("better-sqlite3")).default;

    const connectionString = process.env.DATABASE_URL || "sqlite.db";
    const sqlite = new Database(connectionString);
    // Correct syntax for better-sqlite3 is drizzle(client, { schema })
    db = drizzle(sqlite, { schema });
  }

  await seed(db);
}

async function seed(db: any) {
  console.log("Seeding data...");

  const jobs = [
    {
      title: "Senior Full Stack Engineer",
      company: "TechNova",
      location: "San Francisco, CA",
      category: "Engineering",
      description:
        "We are looking for a Senior Full Stack Engineer to join our core team. You will be working with React, Node.js, and Drizzle ORM.",
    },
    {
      title: "Product Marketing Manager",
      company: "GrowthGenius",
      location: "Remote",
      category: "Marketing",
      description:
        "Lead our product marketing initiatives and drive growth for our new SaaS platform.",
    },
    {
      title: "UI/UX Designer",
      company: "PixelPerfect",
      location: "New York, NY",
      category: "Design",
      description:
        "Create beautiful and intuitive user experiences for our clients.",
    },
  ];

  // Insert jobs and return the created rows to get their IDs
  const insertedJobs = await db.insert(jobsTable).values(jobs).returning();
  const insertedJobs = await db
    .insert(schema.jobsTable)
    .values(jobs)
    .returning();
  console.log(`Inserted ${insertedJobs.length} jobs.`);

  const applications = [
    {
      job_id: insertedJobs[0].id,
      name: "John Doe",
      email: "john.doe@example.com",
      resume_link: "https://example.com/resume/johndoe",
      cover_note:
        "I have 5 years of experience in full stack development and I am a big fan of TechNova.",
    },
    {
      job_id: insertedJobs[2].id,
      name: "Alex Johnson",
      email: "alex.j@example.com",
      resume_link: "https://example.com/resume/alexj",
      cover_note:
        "Here is my portfolio link in the resume. I love pixel perfect designs.",
    },
  ];

  await db.insert(applicationsTable).values(applications);
  await db.insert(schema.applicationsTable).values(applications);
  console.log(`Inserted ${applications.length} applications.`);

  // User seeding has been removed.
  // The new auth schema is more complex and requires a proper user creation flow (e.g., with password hashing).

  console.log("Seeding categories...");
  const categories = [
    { name: "Engineering" },
    { name: "Marketing" },
    { name: "Design" },
    { name: "Product" },
    { name: "Sales" },
    { name: "Support" },
    { name: "Human Resources" },
  ];

  await db.insert(categoriesTable).values(categories).onConflictDoNothing();
  await db
    .insert(schema.categoriesTable)
    .values(categories)
    .onConflictDoNothing();
  console.log("Categories seeding complete.");

  console.log("Seeding complete!");
  console.log("✅ Seeding finished successfully!");
}

seed().catch((err) => {
main().catch((err) => {
  console.error("Seeding failed", err);
  process.exit(1);
});
