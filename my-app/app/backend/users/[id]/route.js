import { NextResponse } from "next/server";
import User from "../../../models/User";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const user = await User.findByPk(id);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: "User found successfully",
        data: user,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "failed to find user" },
      { status: 500 },
    );
  }
}
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();

    const user = await User.findByPk(id);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    await user.update({
      name: body.name,
      email: body.email,
    });

    return NextResponse.json(
      {
        message: "User updated successfully",
        data: user,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Update user error:", error);

    return NextResponse.json(
      { message: "Failed to update user" },
      { status: 500 },
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    const user = await User.findByPk(id);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    await user.destroy();

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Delete user error:", error);

    return NextResponse.json(
      { message: "Failed to delete user" },
      { status: 500 },
    );
  }
}


export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();

    const user = await User.findByPk(id);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const allowedFields = {};

    if (body.name !== undefined) {
      allowedFields.name = body.name;
    }

    if (body.email !== undefined) {
      allowedFields.email = body.email;
    }

    if (Object.keys(allowedFields).length === 0) {
      return NextResponse.json(
        { message: "No valid fields provided for update" },
        { status: 400 },
      );
    }

    await user.update(allowedFields);

    return NextResponse.json(
      {
        message: "User partially updated successfully",
        data: user,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("PATCH user error:", error);

    return NextResponse.json(
      { message: "Failed to update user" },
      { status: 500 },
    );
  }
}
