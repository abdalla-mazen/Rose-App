"use server";

import { JSON_HEADER } from "@/lib/constants/shared.constant";
import getToken from "@/lib/utils/get-token";
import { revalidateTag } from "next/cache";

export async function editProfileAction(data: AccountEditprofileFields) {
  try {
    // Get token
    const token = await getToken();

    const response = await fetch(`${process.env.API}/auth/editProfile`, {
      method: "PUT",
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${token?.accessToken}`,
      },
      body: JSON.stringify(data),
    });

    const payload = await response.json();

    // ✅ Revalidate user profile data everywhere it’s used
    revalidateTag("user-profile");

    return payload;
  } catch (error) {
    console.error("Edit profile error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unexpected error",
    };
  }
}

export async function deleteMyAccountAction() {
  try {
    // Get token
    const token = await getToken();

    const response = await fetch(`${process.env.API}/auth/deleteMe`, {
      method: "DELETE",
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${token?.accessToken}`,
      },
    });

    const payload = await response.json();

    return payload;
  } catch (error) {
    console.error("Edit profile error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unexpected error",
    };
  }
}
