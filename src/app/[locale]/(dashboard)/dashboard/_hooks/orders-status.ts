import { getOrdersStatus } from "@/lib/apis/orders-status.api";
import { useQuery } from "@tanstack/react-query";

export function useOrderStatus() {
  const { data } = useQuery({
    queryKey: ["order-status"],
    queryFn: getOrdersStatus,
  });

  return { data };
}
