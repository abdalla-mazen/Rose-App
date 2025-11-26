"use client";

import { useMutation } from "@tanstack/react-query";
import { addProductAction } from "../_actions/add-product.action";

export default function useAddProduct() {
  const { error, isPending, mutate } = useMutation({
    mutationFn: async (values: FormData) => {
      const response = await addProductAction(values);

      if ("error" in response) {
        throw new Error(response.error);
      }

      // return response;
      location.href = "/dashboard/products";

      return response;
    },
  });

  return { isPending, error, addProduct: mutate };
}
