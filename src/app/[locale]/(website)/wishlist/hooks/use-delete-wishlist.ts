"use client";

import { useMutation } from "@tanstack/react-query";
import deleteWishlistAction from "../_action/delete-wishlist.action";

export function useDeleteWishlist() {
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (productId: string) => {
      const response = await deleteWishlistAction(productId);
      if (response?.error) {
        throw new Error(response.error);
      }
      return response;
    },
  });

  return { isPending, error, deleteFromWishList: mutate };
}
