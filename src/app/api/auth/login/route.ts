import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await fetch(`${API_URL}/API/Users/Login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, {
        status: response.status,
      });
    }

    const accessToken = data?.data?.accessToken;

    if (!accessToken) {
      return NextResponse.json(
        { message: "Access token was not returned." },
        { status: 401 },
      );
    }

    const nextResponse = NextResponse.json({
      status: data.status,
      message: data.message,
    });

    nextResponse.cookies.set("auth-token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return nextResponse;
  } catch (error) {
    console.error(error);

    return NextResponse.json({ message: "Login failed." }, { status: 500 });
  }
}
