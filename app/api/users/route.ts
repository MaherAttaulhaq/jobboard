import { auth } from "@/lib/better-auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";
import db from "@/src/db/index";
import { user, account } from "@/auth-schema";
import { hashPassword } from "../../lib/password"; // Use absolute alias
import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";

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

    const users = await db.select().from(user);
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
 * Public: Allows new users to sign up
 */
export async function POST(request: Request) {
  try {
    // 2. Validate Input
    const body = await request.json();
    const validatedData = signupSchema.parse(body);

    // 3. Check if user already exists
    const [existingUser] = await db
      .select()
      .from(user)
      .where(eq(user.email, validatedData.email))
      .limit(1);

    if (existingUser) {
      return NextResponse.json(
        { error: "A user with this email already exists." },
        { status: 409 }, // 409 Conflict
      );
    }

    // 4. Manual Hashing with bcrypt
    const hashedPassword = await hashPassword(validatedData.password);

    const userId = randomUUID();
    const now = new Date();

    // 5. Manual Database Insertion using Drizzle
    const [newUser] = await db
      .insert(user)
      .values({
        id: userId,
        name: validatedData.name,
        email: validatedData.email,
        emailVerified: false,
        image: validatedData.image,
        createdAt: now,
        updatedAt: now,
      })
      .returning();

    // Create account record for credentials
    await db.insert(account).values({
      id: randomUUID(),
      userId: userId,
      accountId: validatedData.email,
      providerId: "credential",
      password: hashedPassword,
      createdAt: now,
      updatedAt: now,
    });

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
