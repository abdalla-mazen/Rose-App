import { AUTHORIZATION_HEADER } from "@/lib/constants/shared.constant";
import { userToken } from "@/lib/utils/get-token";
import { NextResponse } from "next/server";

export async function GET() {
  const token = await userToken();

  try {
    const res = await fetch(`${process.env.API}/statistics/orders`, {
      headers: {
        ...AUTHORIZATION_HEADER(token!),
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
