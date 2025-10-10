import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    // const token = cookies().get("token")?.value;

    // if (!token) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    // نطلب البيانات من الـ backend API
    const res = await fetch(
      "https://flower.elevateegy.com/api/v1/notifications/unread-count",
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjhlNjAzZDQ3ZmVlNjhhNGMyZTlhMzQzIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NjAwNDU5NTd9.NWYfOe0xQOHvvK5O5o4Y7ECECzetuwmL1NYdrXE6gLc`,
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch unread count" },
        { status: res.status }
      );
    }

    const data = await res.json();

    // نرجع النتيجة للسيرفر الداخلي
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching unread count:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
