"use client";

import { addWishlist } from "@/lib/actions/add-wishlist.action";
import { useMutation } from "@tanstack/react-query";

export function useWishlist() {
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (productId: string) => {
      const response = await addWishlist(productId);
      if (response?.error) {
        throw new Error(response.error);
      }
      if (response?.message === "success") {
        // Toaster
      }

      return response;
    },
  });

  return { isPending, error, addToWishList: mutate };
}
