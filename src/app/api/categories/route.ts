import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // Variables
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") || "1";

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API}/categories?page=${page}&limit=10`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Error fetching categories", message: error.message },
      { status: 500 }
    );
  }
}
