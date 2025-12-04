import { useMutation } from "@tanstack/react-query";
import deleteOccasionAction from "../_actions/delete-occasions.action";

export default function useDeleteOccasions() {
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (id: string) => {
      const response = await deleteOccasionAction(id);

      if (response?.error) {
        throw new Error(response.error);
      }

      return response;
    },
  });
  return { isPending, error, deleteOccasion: mutate };
}

