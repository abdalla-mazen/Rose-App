"use server";

import { userToken } from "@/lib/utils/get-token";
import { revalidatePath } from "next/cache";

export async function updateQuantityAction(productId: string, quantity: number) {
  const token = await userToken();

  const response = await fetch(`${process.env.API}/cart/${productId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ quantity }),
  });
  
  revalidatePath("/cart");
  return response.json();
}
