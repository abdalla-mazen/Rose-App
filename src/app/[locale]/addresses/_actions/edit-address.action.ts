"use server";

import { AUTHORIZATION_HEADER, JSON_HEADER } from "@/lib/constants/shared.constant";
import { userToken } from "@/lib/utils/get-token";

export async function editAddress(data: userAddress) {
  try {
    // Get Token
    const token = await userToken();

    // Check if no token
    if (!token) {
      return "unauthorized user";
    }
    const { _id, ...addressPayload } = data;

    if (!_id) {
      return {
        success: false,
        message: "Address id is required",
        code: 400,
      };
    }

    // Response
    const res = await fetch(`${process.env.API}/addresses/${_id}`, {
      method: "PATCH",
      headers: {
        ...JSON_HEADER,
        ...AUTHORIZATION_HEADER(token),
      },
      body: JSON.stringify(addressPayload),
    });

    // Check if there is a problem in the response
    if (!res.ok) {
      const errorText = await res.text();
      return { message: "Something went wrong", code: res.status, error: errorText };
    }

    // Parse the json
    const payload = await res.json();

    return payload;
  } catch (error) {
    return error;
  }
}
