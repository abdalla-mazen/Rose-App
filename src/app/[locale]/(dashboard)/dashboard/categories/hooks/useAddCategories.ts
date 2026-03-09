import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import addCategoryAction from "../_actions/add-category.action";


interface CategoryForm {
  name: string;
}

export default function useAddCategories() {
  const router = useRouter();
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (data: CategoryForm) => {
      const response = await addCategoryAction(data);
      if (response?.error) throw new Error(response.error);
      if (response?.message === "success") router.push("/dashboard/categories");
      return response;
    },
  });

  return { isPending, error, addCategory: mutate };
}
