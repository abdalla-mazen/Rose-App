import { LoginFormInput } from "@/lib/shemas/auth.schema";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";

export default function useLogin() {
  const { isPending, mutate, error } = useMutation({
    mutationFn: async (values: LoginFormInput) => {
      const response = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (response?.error) {
        throw new Error(response.error);
      }

      return response;
    },
    onSuccess: (response) => {
      // Handle successful login
      if (response?.url) {
        const url = new URL(response.url);
        const callbackUrl = url.searchParams.get("callbackUrl") || "/";
        location.href = callbackUrl;
      } else {
        location.href = "/";
      }
    },
    onError: (error: Error) => {
      console.error("Login failed:", error.message);
    },
  });

  return {
    isPending,
    login: mutate,
    error: error?.message,
  };
}
