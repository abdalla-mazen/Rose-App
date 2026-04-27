import { useMutation } from "@tanstack/react-query";
import { clearCartAction } from "../_actions/clear-cart.action";

export default function useClearCart() {
  const { isPending, error, mutate } = useMutation({
    mutationFn: async () => {
      const response = await clearCartAction();
      if (response?.error) {
        throw new Error(response.error);
      }

      return response;
    },
  });

  return { error, isPending, clear: mutate };
}
