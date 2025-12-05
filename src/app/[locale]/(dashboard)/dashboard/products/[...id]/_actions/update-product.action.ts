"use server";

import { JSON_HEADER } from "@/lib/constants/shared.constant";
import { UpdateProductValues } from "@/lib/schemas/add-update-product.schema";
import getToken from "@/lib/utils/get-token";

export async function updateProductAction(data: UpdateProductValues, productId: string) {
  try {
    // Get token
    const token = await getToken();

    const response = await fetch(`${process.env.API}/products/${productId}`, {
      method: "PUT",
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${token?.accessToken}`,
      },
      body: JSON.stringify(data),
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
