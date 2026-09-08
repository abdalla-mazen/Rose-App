"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import addOccasions from "../_actions/add-occasions.action";

export default function useAddOccasions() {
  // Navigation
  const router = useRouter();

  const { isPending, error, mutate } = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await addOccasions(formData);

      if (response?.error) {
        throw new Error(response.error);
      }
      if (response?.message === "success") {
        router.push("/dashboard/occasions");
      }
      return response;
    },
  });
  return { isPending, error, addOccasion: mutate };
}