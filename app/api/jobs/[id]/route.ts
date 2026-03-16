import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import db from "@/src/index";
import { jobsTable, applicationsTable } from "@/src/db/schema";
import { z } from "zod";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const jobId = parseInt(id);

    if (isNaN(jobId)) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    const [job] = await db
      .select()
      .from(jobsTable)
      .where(eq(jobsTable.id, jobId));

    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json(job);
  } catch (error) {
    console.error("Error fetching job:", error);
    return NextResponse.json({ error: "Failed to fetch job" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const jobId = parseInt(id);

    if (isNaN(jobId)) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    const [deletedJob] = await db
      .delete(jobsTable)
      .where(eq(jobsTable.id, jobId))
      .returning();

    if (!deletedJob) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Job deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting job:", error);
    return NextResponse.json(
      { error: "Failed to delete job" },
      { status: 500 },
    );
  }
}

const submitJobApplicationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  resume_link: z.string().url("Invalid URL for resume"),
  cover_note: z.string().optional(),
  userId: z.string().optional(),
});

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const jobId = parseInt(id);

    if (isNaN(jobId)) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    const body = await request.json();
    const validatedData = submitJobApplicationSchema.parse(body);

    const [newApplication] = await db
      .insert(applicationsTable)
      .values({
        job_id: jobId,
        userId: validatedData.userId,
        name: validatedData.name,
        email: validatedData.email,
        resume_link: validatedData.resume_link,
        cover_note: validatedData.cover_note || "",
      })
      .returning();

    return NextResponse.json(
      {
        message: "Job application submitted successfully",
        application: newApplication,
      },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.issues },
        { status: 400 },
      );
    }
    console.error("Error submitting application:", error);
    return NextResponse.json(
      { error: "Failed to submit job application" },
      { status: 500 },
    );
  }
}
