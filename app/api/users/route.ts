import { auth } from "@/app/lib/auth";
import { NextResponse } from "next/server";
import { z } from "zod";
import db from "@/src/index";
import { usersTable } from "@/src/db/schema";
import { hashPassword } from "@/app/lib/password";

// Schema for validating user signup data
const signupSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  image: z.string().url().optional(),
});

/**
 * GET: Fetch all users
 * Protected: Requires a valid session
 */
export async function GET(request: Request) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const users = await db.select().from(usersTable);
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

/**
 * POST: Create a new user
 * Protected: Requires authentication (Admin/Manager context)
 */
export async function POST(request: Request) {
  try {
    // 1. Check Authentication
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Validate Input
    const body = await request.json();
    const validatedData = signupSchema.parse(body);

    // 3. Manual Hashing with bcrypt
    const hashedPassword = await hashPassword(validatedData.password);

    // 4. Manual Database Insertion using Drizzle
    const [newUser] = await db
      .insert(usersTable)
      .values({
        name: validatedData.name,
        email: validatedData.email,
        password: hashedPassword,
      })
      .returning();

    return NextResponse.json(
      { id: newUser.id, name: newUser.name, email: newUser.email },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.issues },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to create user",
      },
      { status: 500 },
    );
  }
}
