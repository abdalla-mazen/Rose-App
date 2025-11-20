import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editAddress } from "../_actions/edit-address.action";

export function useEditUserAddress() {
  // Query client
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: userAddress) => editAddress(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user addresses"] });
    },
  });
}
