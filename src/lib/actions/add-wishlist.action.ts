"use server";

import { cookies } from "next/headers";

export async function addWishlist(_id: string) {
  // Get token from cookies
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  // Send POST request to API
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/v1/wishlist/add`,
    {
      method: "POST",
      body: JSON.stringify({ productId: _id }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const payload = await response.json();

  return payload;
}
