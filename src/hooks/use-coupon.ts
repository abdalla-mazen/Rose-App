
import { applyCouponAction } from "@/lib/actions/apply-coupon.action";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCoupon() {

    const queryClient = useQueryClient();
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (code: string) => {
      const response = await applyCouponAction(code);
      if (response?.error) {
        throw new Error(response.error);
      }
      return response;
    },
      onSuccess: (data) => {
      queryClient.setQueryData(["cart"], data.cart);
      console.log(data.cart);
    },
   
  });
  return { isPending, error, applyCoupon: mutate};
}
