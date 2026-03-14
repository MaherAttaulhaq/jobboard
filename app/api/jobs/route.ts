import { NextResponse } from "next/server";
import { z } from "zod";
import db from "../../../src/index";
import { jobsTable } from "../../../src/db/schema";

const createJobSchema = z.object({
  title: z.string().min(1, "Title is required"),
  company: z.string().min(1, "Company is required"),
  location: z.string().min(1, "Location is required"),
  category: z.string().optional(),
  description: z.string().min(1, "Description is required"),
});

export async function GET() {
  try {
    const jobs = await db.select().from(jobsTable);
    return NextResponse.json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate request body
    const validatedData = createJobSchema.parse(body);

    // TODO: Add admin authentication check here

    const [newJob] = await db
      .insert(jobsTable)
      .values(validatedData)
      .returning();

    return NextResponse.json(newJob, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.issues },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { error: "Failed to create job" },
      { status: 500 },
    );
  }
}
