import { useMutation } from "@tanstack/react-query";
import { productReview } from "../actions/product-review.action";

export function useSendProductReview() {
  return useMutation({
    mutationFn: (body: SendReview) => productReview(body),
  });
}
