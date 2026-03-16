import { NextResponse } from "next/server";
import { z } from "zod";
import db from "@/src/index";
import { categoriesTable } from "@/src/db/schema";

export async function GET() {
  try {
    const categories = await db.select().from(categoriesTable);
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 },
    );
  }
}

const createCategorySchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = createCategorySchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validation.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const { name } = validation.data;

    const [newCategory] = await db
      .insert(categoriesTable)
      .values({ name })
      .returning();

    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json(
      { error: "Failed to create category. It might already exist." },
      { status: 500 },
    );
  }
}
