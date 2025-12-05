"use client";

import { useMutation } from "@tanstack/react-query";
import { addProductAction } from "../_actions/add-product.action";
import { useRouter } from "next/navigation";

export default function useAddProduct() {
  // Router navigation
  const router = useRouter();

  const { error, isPending, mutate } = useMutation({
    mutationFn: async (values: FormData) => {
      const response = await addProductAction(values);

      if ("error" in response) {
        throw new Error(response.error);
      }

      return response;
    },

    onSuccess: () => {
      router.push("/dashboard/products");
    },
  });

  return { isPending, error, addProduct: mutate };
}
