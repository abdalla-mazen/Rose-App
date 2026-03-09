import { ContactValues } from "@/lib/schemas/contact.schema";
import { useMutation } from "@tanstack/react-query";
import { contactAction } from "../_actions/contact.action";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export default function useContact() {
  // Translation
  const t = useTranslations();

  //   Mutation action
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (values: ContactValues) => {
      // Call server action
      const response = await contactAction(values);

      // Handle Error
      if ("error" in response) {
        throw new Error(response.error || "Something went wrong");
      }

      toast.success(t("contactSuccess"), {
        duration: 1500,
        style: {
          background: "#16a34a",
          color: "#fff",
          padding: "12px 16px",
          borderRadius: "10px",
          fontWeight: 500,
        },
      });

      return response;
    },
  });
  return { isPending, error, contact: mutate };
}
