"use server";

import getToken from "@/lib/utils/get-token";

type AddToCartFields = {
  product: string;
  quantity: number;
};

export const AddToCartAction = async (data: AddToCartFields) => {
  try {
    const token = await getToken();
    const response = await fetch(`${process.env.API}/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.accessToken}`,
      },
      body: JSON.stringify(data),
    });

    const payload: ApiResponse<AddToCartResponse> = await response.json();

    return payload;
  } catch (error) {
    console.error("Add to cart error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unexpected error",
    };
  }
};
