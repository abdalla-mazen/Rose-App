import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // Get page number from query params
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") || "1";

  try {
    // Fetch occasions from API
    const res = await fetch(
      `${process.env.API}/occasions?page=${page}&limit=10`,  
      { cache: "no-store" }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch occasions");
    }

    // Return JSON data
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    // Return error response
    return NextResponse.json(
      { error: "Error fetching occasions", message: error.message },
      { status: 500 }
    );
  }
}