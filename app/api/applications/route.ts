import { NextResponse } from "next/server";
import { z } from "zod";

// Define the schema for job application data
const jobApplicationSchema = z.object({
  jobId: z.number().int().positive(),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  phone: z.string().min(1, "Phone number is required"),
  coverLetter: z.string().optional(),
  resumeUrl: z.string().url("Invalid URL for resume"),
});

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();

    // Validate the request body against the schema
    const validatedData = jobApplicationSchema.parse(body);

    // TODO: Process the job application data
    // This could involve saving it to a database, sending emails, etc.
    console.log("Job application data:", validatedData);

    return NextResponse.json(
      { message: "Job application submitted successfully" },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Handle Zod validation errors
      return NextResponse.json(
        { error: "Validation failed", details: error.issues },
        { status: 400 },
      );
    }

    // Handle other errors
    console.error("Failed to submit job application:", error);
    return NextResponse.json(
      { error: "Failed to submit job application" },
      { status: 500 },
    );
  }
}

// Optionally, you can also handle GET requests to retrieve application data
// export async function GET(request: Request) { ... }
