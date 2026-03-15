import { auth } from "@/app/lib/auth";
import { NextResponse } from "next/server";
import { z } from "zod";
import db from "@/src/index";
import { user, account } from "@/auth-schema";
import { hashPassword } from "@/app/lib/password";
import { eq } from "drizzle-orm";

// Schema for validating partial user updates
const updateUserSchema = z.object({
  name: z.string().min(2, "Name is too short").optional(),
  email: z.string().email("Invalid email address").optional(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .optional(),
});

/**
 * GET: Fetch a specific user by ID
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const session = await auth.api.getSession({ headers: request.headers });
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [foundUser] = await db.select().from(user).where(eq(user.id, id));

    if (!foundUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(foundUser);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

/**
 * PUT: Update a specific user by ID
 */
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const session = await auth.api.getSession({ headers: request.headers });
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = updateUserSchema.parse(body);

    // Separate password from other user data
    const { password, ...userProfileData } = validatedData;

    // Update user profile info if present
    if (Object.keys(userProfileData).length > 0) {
      await db.update(user).set(userProfileData).where(eq(user.id, id));
    }

    // Update password if present
    if (password) {
      const hashedPassword = await hashPassword(password);
      await db
        .update(account)
        .set({ password: hashedPassword })
        .where(eq(account.userId, id));
    }

    // Fetch the updated user to return
    const [updatedUser] = await db.select().from(user).where(eq(user.id, id));

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // The user object from the 'user' table is safe to return
    return NextResponse.json(updatedUser);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.issues },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

/**
 * DELETE: Remove a specific user by ID
 */
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const session = await auth.api.getSession({ headers: request.headers });
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [deletedUser] = await db
      .delete(user)
      .where(eq(user.id, id))
      .returning();

    if (!deletedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
