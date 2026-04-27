"use server";

import { userToken } from "@/lib/utils/get-token";
import { revalidatePath } from "next/cache";

export async function removeItemAction(productId: string) {
  const token = await userToken();

  const response = await fetch(`${process.env.API}/cart/${productId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  revalidatePath("/cart");
  return response.json();
}
