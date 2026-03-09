import { useMutation } from "@tanstack/react-query";
import deleteCategoryAction from "../_actions/delete-category.action";


export default function useDeleteCategories() {
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (id: string) => {
      const response = await deleteCategoryAction(id);
      if (response?.error) throw new Error(response.error);
      return response;
    },
  });
  return { isPending, error, deleteCategory: mutate };
}
