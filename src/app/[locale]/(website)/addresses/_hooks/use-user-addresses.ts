import { getUserAddresses } from "@/lib/apis/addresses.api";
import { useQuery } from "@tanstack/react-query";

export function useUserAddresses() {
  // Query
  const { data, isLoading } = useQuery({
    queryKey: ["user addresses"],
    queryFn: getUserAddresses,
  });

  return { data, isLoading };
}
