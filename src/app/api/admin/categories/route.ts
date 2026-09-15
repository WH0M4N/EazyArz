import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const response = await fetch(`${API_URL}/API/Categories/GetAllCategories`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 },
    );
  }
}
