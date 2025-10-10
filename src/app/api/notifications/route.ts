import { NextResponse } from "next/server";

export async function GET() {
  // const token = cookies().get("token")?.value;

  // if (!token) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // }

  const res = await fetch(
    "https://flower.elevateegy.com/api/v1/notifications/user",
    {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjhlNjAzZDQ3ZmVlNjhhNGMyZTlhMzQzIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NjAwNDU5NTd9.NWYfOe0xQOHvvK5O5o4Y7ECECzetuwmL1NYdrXE6gLc`,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch notifications" },
      { status: res.status }
    );
  }

  const data = await res.json();

  return NextResponse.json(data);
}
