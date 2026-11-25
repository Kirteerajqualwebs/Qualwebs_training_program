import { NextResponse } from "next/server";
import sequelize from "../../config/database";
import User from "../../models/User.js";

export async function GET() {
  try {
    await sequelize.authenticate();

    await User.sync();

    return NextResponse.json({
      message: "Database connected and Users table created successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Database operation failed" },
      { status: 500 }
    );
  }
}