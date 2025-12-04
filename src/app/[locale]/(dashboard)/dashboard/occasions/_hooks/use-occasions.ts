import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import addOccasions from "../_actions/add-occasions.action";

export type ImageFile = `${string}.${"jpg" | "jpeg" | "png" | "gif"}`;

interface occasions {
  name: string;
  image: ImageFile;
}
export default function useAddOccasions() {
  // Navigation
  const router = useRouter();

  const { isPending, error, mutate } = useMutation({
    mutationFn: async (data: occasions) => {
      const response = await addOccasions(data);

      if (response?.error) {
        throw new Error(response.error);
      }
      if (response?.message === "success") {
        router.push("/dashboard/occasions");
      }
      return response;
    },
  });
  return { isPending, error, addOccasion: mutate };
}
