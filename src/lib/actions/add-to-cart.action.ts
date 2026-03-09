"use server";

import { JSON_HEADER } from "@/lib/constants/shared.constant";
import getToken from "@/lib/utils/get-token";
import { revalidatePath } from "next/cache";

// Types
type AddToCartFields = {
  product: string;
  quantity: number;
};

export const AddToCartAction = async (data: AddToCartFields) => {
  try {
    // Get token
    const token = await getToken();

    const response = await fetch(`${process.env.API}/cart`, {
      method: "POST",
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${token?.accessToken}`,
      },
      body: JSON.stringify(data),
    });

    const payload: ApiResponse<AddToCartResponse> = await response.json();
    revalidatePath("/cart");
    return payload;
  } catch (error) {
    console.error("Add to cart error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unexpected error",
    };
  }
};
