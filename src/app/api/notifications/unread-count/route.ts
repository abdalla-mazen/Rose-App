import getToken from "@/lib/utils/get-token";
import { NextResponse } from "next/server";

export async function GET() {
  const jwt = await getToken();
  const token = jwt?.accessToken;

  try {
    // Fetch unread notifications count from the backend API
    const res = await fetch(`${process.env.API}/notifications/unread-count`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch unread count" }, { status: res.status });
    }

    const payload = await res.json();

    // Return the fetched data to the client
    return NextResponse.json(payload);
  } catch (error) {
    console.error("Error fetching unread count:", error);

    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
