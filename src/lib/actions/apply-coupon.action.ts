"use server";

import getToken from "../utils/get-token";

export async function applyCouponAction(code: string) {
  const token = await getToken();

  const response = await fetch(`${process.env.API}/coupons/apply`, {
    method: "POST",
    body: JSON.stringify({ code }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token?.accessToken}`,
    },
  });
  const payload = await response.json();

  return payload;
}
