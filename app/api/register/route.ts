import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import db from "@/src/db";
import { user } from "@/src/db/schema";
import { eq } from "drizzle-orm";

// Validation schema for registration
const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
});

// Validation schema for query parameters
const querySchema = z.object({
  email: z.string().email().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = registerSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { errors: validation.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const { name, email } = validation.data;

    // Check if email is already taken
    const existing = await db
      .select()
      .from(user)
      .where(eq(user.email, email))
      .get();
    if (existing) {
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 409 },
      );
    }

    // Insert new user into the database
    const newUser = await db
      .insert(user)
      .values({
        id: crypto.randomUUID(),
        name,
        email,
      })
      .returning()
      .get();

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("POST /api/register error:", error);
    return NextResponse.json(
      { error: "Failed to register user" },
      { status: 500 },
    );
  }
}

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

    // Fetch users with optional email filtering
    const results = await db
      .select()
      .from(user)
      .where(
        validation.data.email
          ? eq(user.email, validation.data.email)
          : undefined,
      )
      .limit(20)
      .all();

    return NextResponse.json(results);
  } catch (error) {
    console.error("GET /api/register error:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 },
    );
  }
}
