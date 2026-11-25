import { NextResponse } from "next/server";
import User from "../../models/User";

export async function GET() {
  try {
    const users = await User.findAll();

    return NextResponse.json(
      {
        message: "Users fetched successfully",
        data: users,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Fetch users error:", error);

    return NextResponse.json(
      { message: "Failed to fetch users" },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    const user = await User.create({
      name: body.name,
      email: body.email,
    });

    return NextResponse.json(
      {
        message: "User created successfully",
        data: user,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("User creation error:", error);

    return NextResponse.json(
      { message: "Failed to create user" },
      { status: 500 },
    );
  }
}

export async function PATCH(request) {
  const body = await request.json();

  return NextResponse.json({
    message: "User partially updated successfully",
    updatedData: body,
  });
}

export async function DELETE() {
  return NextResponse.json({
    message: "User deleted successfully",
  });
}
