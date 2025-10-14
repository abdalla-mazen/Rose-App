import { RegisterValues } from "@/lib/schemas/auth.schema";
import { useMutation } from "@tanstack/react-query";
import { registerAction } from "../_actions/register.action";

export default function useRegister() {
  const { error, isPending, mutate } = useMutation({
    mutationFn: async (values: RegisterValues) => {
      const payload = await registerAction(values);

      if (payload.message !== "success") {
        throw new Error(payload.message);
      }

      location.href = "/signin";
    },
  });

  return { isPending, error, register: mutate };
}
