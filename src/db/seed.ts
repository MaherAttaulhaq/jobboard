import db from "../index";
import { applicationsTable, jobsTable, categoriesTable } from "./schema";

async function seed() {
  console.log("Seeding database...");

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

  await db.insert(categoriesTable).values(categories).onConflictDoNothing();
  console.log("Categories seeding complete.");

  console.log("Seeding complete!");
}

seed().catch((err) => {
  console.error("Seeding failed", err);
  process.exit(1);
});
