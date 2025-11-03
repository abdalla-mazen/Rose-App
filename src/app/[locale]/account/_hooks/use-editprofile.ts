"use client";

import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { DeleteMyAccountAction, EditProfileAction } from "../_actions/edit-profile.action";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export function useEditprofile() {
  // Translations
  const t = useTranslations();
  const router = useRouter();

  const { isPending, error, mutate } = useMutation({
    mutationFn: async (data: AccountEditprofileFields) => {
      const response = await EditProfileAction(data);

      if ("error" in response) {
        throw new Error(response.error);
      }

      toast.success(t("edit-profile-success"), {
        position: "bottom-right",
        duration: 1500,
      });

      // Refresh page to change name in dropdown menu if name is chnaged
      router.refresh();
    },
  });

  return { editProfileError: error, editProfilePending: isPending, editProfile: mutate };
}

export function useDeleteMyAccount() {
  // Translations
  const t = useTranslations();

  const { isPending, error, mutate } = useMutation({
    mutationFn: async () => {
      const response = await DeleteMyAccountAction();

      if ("error" in response) {
        throw new Error(response.error);
      }

      toast.success(t("delete-account-success"), {
        position: "bottom-right",
        duration: 1500,
      });

      await signOut({ callbackUrl: "/register" });
    },
  });

  return {
    deleteMyAccountError: error,
    deleteMyAccountPending: isPending,
    deleteMyAccount: mutate,
  };
}
