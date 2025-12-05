"use server";

import getToken from "@/lib/utils/get-token";

export async function addProductAction(data: FormData) {
  try {
    // Get token
    const token = await getToken();

    const response = await fetch(`${process.env.API}/products`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token?.accessToken}`,
      },
      body: data,
    });

    const payload: ApiResponse<AddUpdateProduct> = await response.json();

    return payload;
  } catch (error) {
    console.error("Add product error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unexpected error",
    };
  }
}
