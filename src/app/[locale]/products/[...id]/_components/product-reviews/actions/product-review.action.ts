"use server";

import { AUTHORIZATION_HEADER, JSON_HEADER } from "@/lib/constants/shared.constant";
import getToken from "@/lib/utils/get-token";

export async function productReview(data: SendReview) {
  // Get token
  const jwt = await getToken();
  const token = jwt?.accessToken;

  // Check if no token
  if (!token) {
    throw new Error("Authentication required. Please log in to submit a review.");
  }

  // Fetch
  const response = await fetch(`${process.env.API}/reviews`, {
    method: "POST",
    headers: {
      ...JSON_HEADER,
      ...AUTHORIZATION_HEADER(token),
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    return "Failed to submit review";
  }

  const payload = await response.json();

  return payload;
}
