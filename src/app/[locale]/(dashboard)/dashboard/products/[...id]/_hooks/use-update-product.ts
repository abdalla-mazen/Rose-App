"use client";

import { useMutation } from "@tanstack/react-query";
import { updateProductAction } from "../_actions/update-product.action";
import { UpdateProductValues } from "@/lib/schemas/add-update-product.schema";
import { useRouter } from "next/navigation";

export default function useUpdateProduct(productId: string) {
  // Router navigation
  const router = useRouter();

  const { error, isPending, mutateAsync } = useMutation({
    mutationFn: async (values: UpdateProductValues) => {
      const response = await updateProductAction(values, productId);

      if ("error" in response) {
        throw new Error(response.error);
      }
    },
    onSuccess: () => {
      router.push("/dashboard/products");
    },
  });

  return { isPending, error, updateProduct: mutateAsync };
}
