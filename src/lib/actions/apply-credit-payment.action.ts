"use server";

import { headers } from "next/headers";
import { AddressPayload } from "../types/address";
import getToken from "../utils/get-token";

export async function applyCreditPaymentAction(data: AddressPayload) {
  const token = await getToken();
  const headersList = await headers();

  const host =
    headersList.get("x-forwarded-host") || headersList.get("host");
  const protocol = headersList.get("x-forwarded-proto") || "https";

  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL ?? `${protocol}://${host}`;

  const response = await fetch(
    `${process.env.API}/orders/checkout?url=${encodeURIComponent(appUrl)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.accessToken}`,
      },
      body: JSON.stringify(data),
    }
  );

  return response.json();
}
