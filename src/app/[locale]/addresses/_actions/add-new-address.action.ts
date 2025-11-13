"use server";

import { AUTHORIZATION_HEADER, JSON_HEADER } from "@/lib/constants/shared.constant";
import { userToken } from "@/lib/utils/get-token";

export async function addNewAddress(data: userAddress) {
  try {
    // Get user token
    const token = await userToken();

    // Check if no user token
    if (!token) {
      return { success: false, message: "Unauthorized user", code: 401 };
    }

    // Response
    const res = await fetch(`${process.env.API}/addresses`, {
      method: "PATCH",
      headers: {
        ...JSON_HEADER,
        ...AUTHORIZATION_HEADER(token),
      },
      body: JSON.stringify(data),
    });

    // Check the response
    if (!res.ok) {
      const errorText = await res.text();
      console.error("Server error response:", errorText);
      return {
        success: false,
        message: "Something went wrong",
        code: res.status,
        error: errorText,
      };
    }

    // Payload
    const payload = await res.json();

    return {
      success: true,
      data: payload,
      code: res.status,
    };
  } catch (error) {
    return {
      success: false,
      message: "Network error",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
