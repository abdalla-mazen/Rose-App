import { useMutation } from "@tanstack/react-query";
import { AddToCartAction } from "../_actions/add-to-cart.action";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

type AddToCartFields = {
  product: string;
  quantity: number;
};

export default function useAddToCart() {
  const t = useTranslations();

  const { error, isPending, mutate } = useMutation({
    mutationFn: async (data: AddToCartFields) => {
      const response = await AddToCartAction(data);

      if ("error" in response) {
        throw new Error(response.error);
      }

      toast.success(t("added-to-cart-successfully-as-a-logged-in-user"), {
        position: "bottom-right",
        duration: 2000,
      });

      return response;
    },
  });

  return { isPending, error, addToCart: mutate };
}
