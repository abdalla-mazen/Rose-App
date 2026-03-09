"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export default function useAddProduct() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const t = useTranslations();

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/products`,
        {
          method: "POST",
          body: formData,
        }
      );

      const payload = await res.json();

      if (!res.ok) {
        throw new Error(payload?.message || "Something went wrong");
      }

      return payload;
    },

    onSuccess: () => {
      toast.success(t("product-added-successfully"));
      queryClient.invalidateQueries({ queryKey: ["products"] });
      router.push("/dashboard/products");
    },

    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return {
    addProduct: mutation.mutate,
    isPending: mutation.isPending,
    error: mutation.error,
  };
}