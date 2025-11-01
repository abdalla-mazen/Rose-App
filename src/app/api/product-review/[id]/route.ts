import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const response = await fetch(`${process.env.API}/products/${params.id}/reviews`);

  if (!response.ok) {
    return NextResponse.json("Something went wrong from get product reviews function api");
  }

  const payload = await response.json();

  return NextResponse.json(payload);
}
