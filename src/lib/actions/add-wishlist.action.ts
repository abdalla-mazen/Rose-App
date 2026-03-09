"use server";

import { userToken } from "../utils/get-token";


export async function addWishlist(_id: string) {
  // Get token from cookies
 const token = await userToken()

  // Send POST request to API
  const response = await fetch(`${process.env.API}/wishlist`, {
    method: "POST",
    body: JSON.stringify({ productId: _id }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const payload = await response.json();

  return payload;
}
