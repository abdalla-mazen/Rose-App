import { NextResponse } from "next/server";

const API_BASE = process.env.NEXT_PUBLIC_API;

export async function GET() {
  try {
    const res = await fetch(`${API_BASE}/search/filters`, {
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch filters" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching filters:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
