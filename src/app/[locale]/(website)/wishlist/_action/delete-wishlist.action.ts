"use server";

import { JSON_HEADER } from "@/lib/constants/shared.constant";
import { userToken } from "@/lib/utils/get-token";
import { revalidatePath } from "next/cache";

export default async function deleteWishlistAction(wishlistId : string) {
  const token = await userToken();
  const data = await fetch(`${process.env.API}/wishlist/${wishlistId}`, {
    method: "DELETE",
    headers: {
      ...JSON_HEADER,
      Authorization: `Bearer ${token}`,
    },
  });

   revalidatePath("/wishlist");
  return data.json();
}

