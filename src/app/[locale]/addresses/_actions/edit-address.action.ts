"use server";

import { AUTHORIZATION_HEADER } from "@/lib/constants/shared.constant";
import { userToken } from "@/lib/utils/get-token";

export async function editAddress(data: userAddress) {
  console.log("data-ID--------------:", data._id);
  try {
    // Get Token
    const token = await userToken();

    // Check if no token
    if (!token) {
      return "unauthorized user";
    }

    // Response
    const res = await fetch(`${process.env.API}/addresses/${data._id}`, {
      method: "PATCH",
      headers: {
        ...AUTHORIZATION_HEADER(token),
      },
      body: JSON.stringify(data),
    });

    // Check if there is a problem in the response
    if (!res.ok) {
      return { message: "Something went wrong", code: res.status };
    }

    // Parse the json
    const payload = await res.json();

    console.log("payload----------------:", payload);

    return payload;
  } catch (error) {
    console.log("error------------------:", error);
    return error;
  }
}
