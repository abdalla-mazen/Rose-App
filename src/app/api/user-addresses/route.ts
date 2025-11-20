import { AUTHORIZATION_HEADER } from "@/lib/constants/shared.constant";
import { userToken } from "@/lib/utils/get-token";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Get user token
    const token = await userToken();

    // Check if no user token
    if (!token) {
      return NextResponse.json("Unauthorized user..............");
    }

    // Response
    const res = await fetch(`${process.env.API}/addresses`, {
      method: "GET",
      headers: {
        ...AUTHORIZATION_HEADER(token),
      },
    });

    // Check the response
    if (!res.ok) {
      return NextResponse.json({ message: "Something went wrong", code: res.status });
    }

    const payload = await res.json();

    return NextResponse.json(payload);
  } catch (error) {
    return NextResponse.json(error);
  }
}
