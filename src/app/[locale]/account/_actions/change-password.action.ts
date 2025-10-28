"use server";

import { JSON_HEADER } from "@/lib/constants/shared.constant";
import getToken from "@/lib/utils/get-token";

export async function changePasswordAction(data: AccountChangepasswordValues) {
  try {
    const token = await getToken();

    const response = await fetch(`${process.env.API}/auth/change-password`, {
      method: "PATCH",
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${token?.accessToken}`,
      },
      body: JSON.stringify(data),
    });

    const payload = await response.json();

    return payload;
  } catch (error) {
    console.error("Change password error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unexpected error",
    };
  }
}
