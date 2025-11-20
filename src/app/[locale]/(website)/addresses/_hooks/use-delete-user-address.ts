import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAddress } from "../_actions/delete-address.action";

export function useDeleteUserAddress() {
  // Query client
  const queryClient = useQueryClient();

  // Mutation
  return useMutation({
    mutationFn: (id: string) => deleteAddress(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user addresses"] });
    },
  });
}
