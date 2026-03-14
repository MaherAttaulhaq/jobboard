import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import db from "../../../src/index";
import { applicationsTable, jobsTable } from "../../../src/db/schema";

export async function GET() {
  try {
    // Fetch applications and join with jobs to get the job title
    const applications = await db
      .select({
        id: applicationsTable.id,
        name: applicationsTable.name,
        email: applicationsTable.email,
        resume_link: applicationsTable.resume_link,
        cover_note: applicationsTable.cover_note,
        created_at: applicationsTable.created_at,
        jobTitle: jobsTable.title,
        jobCompany: jobsTable.company,
      })
      .from(applicationsTable)
      .innerJoin(jobsTable, eq(applicationsTable.job_id, jobsTable.id))
      .orderBy(applicationsTable.created_at);

    return NextResponse.json(applications);
  } catch (error) {
    console.error("Failed to fetch applications:", error);
    return NextResponse.json(
      { error: "Failed to fetch applications" },
      { status: 500 },
    );
  }
}
