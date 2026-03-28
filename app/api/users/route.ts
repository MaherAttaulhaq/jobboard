import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import db from "@/src/db";
import { user } from "@/src/db/schema";
import { eq, desc } from "drizzle-orm";

// Validation schema for creating/updating a user
const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  image: z.string().url("Invalid image URL").optional().nullable(),
});

// Validation schema for GET query parameters
const querySchema = z.object({
  email: z.string().email().optional(),
});

/**
 * GET /api/users
 * Fetches a list of users, optionally filtered by email.
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email") || undefined;

    const validation = querySchema.safeParse({ email });

    if (!validation.success) {
      return NextResponse.json(
        { errors: validation.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const results = await db
      .select()
      .from(user)
      .where(
        validation.data.email
          ? eq(user.email, validation.data.email)
          : undefined,
      )
      .orderBy(desc(user.id))
      .limit(50)
      .all();

    return NextResponse.json(results);
  } catch (error) {
    console.error("GET /api/users error:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 },
    );
  }
}

/**
 * POST /api/users
 * Creates a new user entry in the database.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = userSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { errors: validation.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    // Check for existing user to prevent duplicates
    const existing = await db
      .select()
      .from(user)
      .where(eq(user.email, validation.data.email))
      .get();
    if (existing) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 },
      );
    }

    const newUser = await db
      .insert(user)
      .values({
        id: crypto.randomUUID(),
        ...validation.data,
      })
      .returning()
      .get();

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("POST /api/users error:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 },
    );
  }
}
