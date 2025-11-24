"use server";

import {  AddressPayload } from "../types/address";
import getToken from "../utils/get-token";

export async function cashPayment(data :AddressPayload) {
  const token = await getToken();

  const response = await fetch(`${process.env.API}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token?.accessToken}`,
    },
    body: JSON.stringify(data),
  });
  const payload = await response.json();

  return payload;
}
