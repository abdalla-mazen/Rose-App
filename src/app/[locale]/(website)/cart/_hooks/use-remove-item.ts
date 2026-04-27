import { useMutation } from "@tanstack/react-query";
import { removeItemAction } from "../_actions/remove-item.action";

export default function useRemoveItem() {
  const { isPending, error, mutate, variables } = useMutation({
    mutationFn: async ({ productId }: { productId: string }) => {
      const response = await removeItemAction(productId);
      if (response?.error) {
        throw new Error(response.error);
      }

      return response;
    },
  });

  return { error, isPending, removeItem: mutate, variables };
}
