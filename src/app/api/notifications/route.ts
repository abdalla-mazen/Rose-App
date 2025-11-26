import getToken from "@/lib/utils/get-token";
import { NextResponse } from "next/server";

export async function GET() {
  const jwt = await getToken();
  const token = jwt?.accessToken;

  try {
    // 🔹 Fetch notifications from the external API
    const res = await fetch(`${process.env.API}/notifications/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    // Check the response status
    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch notifications from route handler" },
        { status: res.status }
      );
    }

    const payload = await res.json();

    return NextResponse.json(payload);

  } catch (error) {
    console.error("Error fetching notifications:", error);

    return NextResponse.json(
      { error: "Internal Server Error From handler" },
      { status: 500 }
    );
  }
}
