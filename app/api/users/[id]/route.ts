import { NextResponse } from "next/server";
import db from "@/src/db/index";
import { user as usersTable } from "../../../../auth-schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

const paramsSchema = z.object({
  id: z.string().min(1, { message: "User ID cannot be empty." }),
});

const updateUserSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  image: z.string().nullable().optional(),
});

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const validation = paramsSchema.safeParse(params);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validation.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }
    const { id } = validation.data;

    // Select specific fields to avoid exposing sensitive data like password hashes
    const [user] = await db
      .select({
        id: usersTable.id,
        name: usersTable.name,
        email: usersTable.email,
        image: usersTable.image,
      })
      .from(usersTable)
      .where(eq(usersTable.id, id));

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const paramsValidation = paramsSchema.safeParse(params);

    if (!paramsValidation.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: paramsValidation.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }
    const { id } = paramsValidation.data;

    const body = await request.json();
    const bodyValidation = updateUserSchema.safeParse(body);

    if (!bodyValidation.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: bodyValidation.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const { name, image } = bodyValidation.data;

    const [updatedUser] = await db
      .update(usersTable)
      .set({
        ...(name ? { name } : {}),
        ...(image !== undefined ? { image } : {}),
      })
      .where(eq(usersTable.id, id))
      .returning({
        id: usersTable.id,
        name: usersTable.name,
        email: usersTable.email,
        image: usersTable.image,
      });

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const validation = paramsSchema.safeParse(params);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validation.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }
    const { id } = validation.data;

    const [deletedUser] = await db
      .delete(usersTable)
      .where(eq(usersTable.id, id))
      .returning({ id: usersTable.id });

    if (!deletedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 },
    );
  }
}
