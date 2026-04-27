import { useMutation } from "@tanstack/react-query";
import { updateQuantityAction } from "../_actions/update-quantity.action";

export default function useUpdateQuantity() {
  const { isPending, error, mutate } = useMutation({
    mutationFn: async ({ productId, quantity }: { productId: string; quantity: number }) => {
      const response = await updateQuantityAction(productId, quantity);
      if (response?.error) {
        throw new Error(response.error);
      }

      return response;
    },
  });

  return { error, isPending, updateQuantity: mutate };
}
