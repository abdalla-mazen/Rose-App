import { LoginFormInput } from "@/lib/schemes/auth.schema";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { AddToCartAction } from "../../products/[...id]/_actions/add-to-cart.action";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export default function useLogin() {
  // Translations
  const t = useTranslations();

  // Merge guest cart after login
  async function mergeGuestCartAfterLogin() {
    const cart = localStorage.getItem("cart");
    if (!cart) return;

    const guestCart = JSON.parse(cart);

    // Send each product to backend
    for (const item of guestCart) {
      await AddToCartAction({
        product: item._id,
        quantity: item.quantity,
      });
    }

    // Clear guest cart
    localStorage.removeItem("cart");
  }

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
    onSuccess: async (response) => {
      // Handle successful login
      if (response?.url) {
        try {
          // Set login status in localStorage
          localStorage.setItem("isLoggedIn", "true");

          // Merge guest cart
          await mergeGuestCartAfterLogin();
          toast.success(t("merge-cart"), {
            position: "top-center",
            duration: 2000,
          });

          const url = new URL(response.url);
          const callbackUrl = url.searchParams.get("callbackUrl") || "/";
          location.href = callbackUrl;
        } catch (error) {
          console.error("Error merging guest cart:", error);
          toast.error(t("merge-cart-error"), {
            position: "top-center",
            duration: 2000,
          });
        }
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
