"use client";

import { useMutation } from "@tanstack/react-query";
import { changePasswordAction } from "../_actions/change-password.action";
import { toast } from "sonner";
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";

export default function useChangePassword() {
  // Transaltions
  const t = useTranslations();

  // Hooks
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (data: AccountChangepasswordFields) => {
      const response = await changePasswordAction(data);

      if ("error" in response) {
        throw new Error(response.error);
      }

      toast.success(t("change-password-success"), {
        position: "bottom-right",
        duration: 1000,
      });

      await signOut({ callbackUrl: "/login" });
    },
  });

  return { changePassword: mutate, error, isPending };
}
