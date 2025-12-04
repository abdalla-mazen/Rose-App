import { useMutation } from "@tanstack/react-query";
import updateOccasionsAction from "../_actions/update-occasions.action";

type UpdateOccasionData = {
  formData: FormData;
  id: string;
};

export default function useUpdateOccasions() {
  const { isPending, error, mutate } = useMutation({
    mutationFn: async ({ formData, id }: UpdateOccasionData) => {
      const response = await updateOccasionsAction({ formData, id });
      if (response?.error) {
        throw new Error(response.error);
      }

      return response;
    },
  });
  return { isPending, error, updateOccasion: mutate };
}
