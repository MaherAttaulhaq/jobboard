import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import db from "@/src/db";
import { jobsTable } from "@/src/db/schema";
import { desc, eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

// Validation schema for creating a job
const jobCreateSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  company: z.string().min(2, "Company name must be at least 2 characters"),
  location: z.string().min(2, "Location is required"),
  category: z.string().optional(),
  description: z.string().optional(),
});

// Validation schema for GET query parameters
const querySchema = z.object({
  category: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = jobCreateSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { errors: validation.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    // Insert new job into the database
    const newJob = await db
      .insert(jobsTable)
      .values(validation.data)
      .returning()
      .get();

    return NextResponse.json(newJob, { status: 201 });
  } catch (error) {
    console.error("POST /api/jobs error:", error);
    return NextResponse.json(
      { error: "Failed to create job listing" },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    // If category is "all" or empty, don't filter by category
    const categoryFilter =
      category && category.toLowerCase() !== "all" && category.trim() !== ""
        ? category
        : undefined;

    const validation = querySchema.safeParse({ category });

    if (!validation.success) {
      return NextResponse.json(
        { errors: validation.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    // Fetch jobs with optional category filtering
    const results = await db
      .select()
      .from(jobsTable)
      .where(
        categoryFilter ? eq(jobsTable.category, categoryFilter) : undefined,
      )
      .orderBy(desc(jobsTable.id))
      .all();

    return NextResponse.json(results);
  } catch (error) {
    console.error("GET /api/jobs error:", error);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 },
    );
  }
}
