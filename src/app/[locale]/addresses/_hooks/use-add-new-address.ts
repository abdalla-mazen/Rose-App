// Hooks
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewAddress } from "../_actions/add-new-address.action";

export function useAddNewAddress() {
  // Query client
  const queryClient = useQueryClient();

  // Mutation
  return useMutation({
    mutationFn: (data: userAddress) => addNewAddress(data),
    // Optional: Add onSuccess/onError handlers if needed
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user addresses"] });
    },
    onError: (error) => {
      console.error("Failed to add address:", error);
    },
  });
}
