import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { AddToCartAction } from "@/lib/actions/add-to-cart.action";

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
        duration: 1500,
      });
    },

    // Error
    onError: (error: Error) => {
      toast.error(error.message || t("added-to-cart-error"), {
        position: "bottom-right",
        duration: 1500,
      });
    },
  });

  return { isPending, error, addToCart: mutate };
}
