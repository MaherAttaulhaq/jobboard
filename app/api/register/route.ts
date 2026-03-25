import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, name } = body;

    if (!email || !password || !name) {
      return NextResponse.json(
        { message: "Missing email, password, or name" },
        { status: 400 },
      );
    }

    // --- YOUR DATABASE LOGIC GOES HERE ---
    // 1. Validate input (e.g., password strength).
    // 2. Check if user already exists.
    // 3. Hash the password.
    // 4. Create the new user in your database.
    console.log("SUCCESS: Creating user via /api/register:", { email, name });

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.error("Sign-up error:", error);
    return NextResponse.json(
      { message: "An internal server error occurred." },
      { status: 500 },
    );
  }
}
