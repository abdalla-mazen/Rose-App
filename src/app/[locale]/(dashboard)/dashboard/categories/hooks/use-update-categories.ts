"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

interface UpdateCategoryPayload {
  id: string;
  name: string;
}

export default function useUpdateCategories() {
  const queryClient = useQueryClient();
  const t = useTranslations();

  const mutation = useMutation({
    mutationFn: async ({ id, name }: UpdateCategoryPayload) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/categories/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name }),
        }
      );

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload?.message || "Something went wrong");
      }

      return payload;
    },

    onSuccess: () => {
      toast.success(t("category-updated-successfully"));

      // Refetch categories list
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },

    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return {
    updateCategory: mutation.mutate,
    isPending: mutation.isPending,
    error: mutation.error,
  };
}
