"use client";

import { useMutation } from "@tanstack/react-query";
import { updateProductAction } from "../_actions/update-product.action";
import { UpdateProductValues } from "@/lib/schemas/add-update-product.schema";

export default function useUpdateProduct(productId: string) {
  const { error, isPending, mutateAsync } = useMutation({
    mutationFn: async (values: UpdateProductValues) => {
      const response = await updateProductAction(values, productId);

      if ("error" in response) {
        throw new Error(response.error);
      }

      location.href = "/dashboard/products";
      return response;
    },
  });

  return { isPending, error, updateProduct: mutateAsync };
}
