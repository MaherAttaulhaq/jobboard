import "dotenv/config";
import * as schema from "./schema";
import { jobsTable, categoriesTable, applicationsTable } from "./schema";
import { eq } from "drizzle-orm"; // Keep eq for queries
import { createSQLiteCloudDrizzle } from "./sqlite-cloud";

async function main() {
  const args = process.argv.slice(2);
  const isCloud = args.includes("--cloud");

  let db: any;

  if (isCloud) {
    const url =
      process.env.DATABASE_URL || process.env.SQLITE_CLOUD_CONNECTION_STRING;
    if (!url) throw new Error("DATABASE_URL is not set for cloud seeding.");

    db = createSQLiteCloudDrizzle(url);
    console.log("Seeding cloud database...");
  } else {
    const { drizzle } = await import("drizzle-orm/better-sqlite3");
    const Database = (await import("better-sqlite3")).default;
    const path = await import("path");

    const dbFileName = process.env.DB_FILE_NAME || "sqlite.db";
    const connectionString = path.resolve(dbFileName);
    const sqlite = new Database(connectionString);
    db = drizzle({ sqlite } as any);
    console.log("Seeding local database...");
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

  await db
    .insert(schema.categoriesTable)
    .values(categories)
    .onConflictDoNothing();
  console.log("Categories seeding complete.");

  console.log("✅ Seeding finished successfully!");
}

main().catch((err) => {
  if (err.code === "SQLITE_ERROR" && err.message.includes("no such table")) {
    console.log(err);
    console.error("\n❌ Error: Database tables do not exist.");
    console.error("   Please make sure you run the migration command first.");
    console.error(
      "   If you are targeting cloud database run: npm run db:migrate -- --cloud",
    );
    console.error(
      "   If you are targeting local database run: npm run db:migrate",
    );
    console.error(
      "👉 Please run migrations first to create the tables:\n   npm run db:migrate\n",
    );
  } else {
    console.error("Seeding failed", err);
  }
  process.exit(1);
});
