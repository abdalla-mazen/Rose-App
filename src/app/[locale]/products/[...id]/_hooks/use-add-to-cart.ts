import { useMutation } from "@tanstack/react-query";
import { AddToCartAction } from "../_actions/add-to-cart.action";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

// Types
type AddToCartFields = {
  product: string;
  quantity: number;
};

export default function useAddToCart() {
  // Translations
  const t = useTranslations();

  // Mutation
  const { error, isPending, mutate } = useMutation({
    mutationFn: async (data: AddToCartFields) => {
      const response = await AddToCartAction(data);

      if ("error" in response) {
        throw new Error(response.error);
      }

      return response;
    },

    // Callbacks
    // Success
    onSuccess: () => {
      toast.success(t("added-to-cart-successfully-as-a-logged-in-user"), {
        position: "bottom-right",
        duration: 1000,
      });
    },

    // Error
    onError: (error: Error) => {
      toast.error(error.message || t("added-to-cart-error"), {
        position: "bottom-right",
        duration: 1000,
      });
    },
  });

  return { isPending, error, addToCart: mutate };
}
