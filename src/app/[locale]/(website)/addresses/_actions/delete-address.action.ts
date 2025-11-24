"use server";

import { AUTHORIZATION_HEADER } from "@/lib/constants/shared.constant";
import { userToken } from "@/lib/utils/get-token";

export async function deleteAddress(id: string) {
  try {
    // Get Token
    const token = await userToken();

    // Check if no token
    if (!token) {
      return "unauthorized user";
    }

    // Response
    const res = await fetch(`${process.env.API}/addresses/${id}`, {
      method: "DELETE",
      headers: {
        ...AUTHORIZATION_HEADER(token),
      },
    });

    // Check if there is a problem in the response
    if (!res.ok) {
      return { message: "Something went wrong", code: res.status };
    }

    // Parse the json
    const payload = await res.json();

    return payload;
  } catch (error) {
    return error;
  }
}
