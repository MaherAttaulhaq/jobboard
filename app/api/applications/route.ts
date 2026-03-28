import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { eq, desc } from "drizzle-orm";
import db from "../../../src/db/index";
import { applicationsTable, jobsTable } from "../../../src/db/schema";

// Validation schema for submitting an application
const applicationSchema = z.object({
  job_id: z.number().int("Invalid job ID"),
  userId: z.string().optional(),
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  resume_link: z.string().url("Invalid URL").optional().or(z.literal("")),
  cover_note: z.string().optional(),
});

// Validation schema for GET query parameters
const querySchema = z.object({
  jobId: z.coerce.number().int().optional(),
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const jobId = searchParams.get("jobId");

    const validation = querySchema.safeParse({ jobId });

    if (!validation.success) {
      return NextResponse.json(
        { errors: validation.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

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
      .where(
        validation.data.jobId
          ? eq(applicationsTable.job_id, validation.data.jobId)
          : undefined,
      )
      .orderBy(desc(applicationsTable.created_at));

    return NextResponse.json(applications);
  } catch (error) {
    console.error("Failed to fetch applications:", error);
    return NextResponse.json(
      { error: "Failed to fetch applications" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = applicationSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { errors: validation.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    // Insert new application into the database
    const newApplication = await db
      .insert(applicationsTable)
      .values(validation.data)
      .returning()
      .get();

    return NextResponse.json(newApplication, { status: 201 });
  } catch (error) {
    console.error("POST /api/applications error:", error);
    return NextResponse.json(
      { error: "Failed to submit application" },
      { status: 500 },
    );
  }
}
