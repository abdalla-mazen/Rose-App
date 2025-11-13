"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Trash } from "lucide-react";
import { useDeleteUserAddress } from "../_hooks/use-delete-user-address";
import { useTranslations } from "next-intl";

export default function DeleteAddressModal({
  trigger,
  addressId,
}: {
  trigger: React.ReactNode;
  addressId: string;
}) {
  // Translations
  const t = useTranslations();

  // Mutation
  const { mutate: deleteAddress, isPending } = useDeleteUserAddress();

  return (
    <Dialog>
      {/* Dialog trigger */}
      {trigger}

      {/* Content */}
      <DialogContent
        showCloseButton
        className="flex flex-col justify-between mx-auto px-4 border border-gray-300 rounded-lg max-w-md sm:min-h-80"
      >
        {/* Header */}
        <DialogHeader>
          {/* Title */}
          <DialogTitle className="mb-4 translate-y-7">
            <div className="flex justify-center">
              <div className="flex justify-center items-center bg-zinc-100 rounded-full w-28 h-28">
                <div className="flex justify-center items-center bg-zinc-200 rounded-full w-20 h-20">
                  <Trash className="w-7 h-7 text-zinc-800" />
                </div>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        {/* Description */}
        <DialogDescription className="font-semibold text-zinc-800 text-xl text-center">
          {t("delete-msg")}
        </DialogDescription>

        {/* Footer */}
        <DialogFooter className="gap-2">
          {/* Close */}
          <DialogClose asChild>
            <Button type="button" variant="subtle">
              {t("cancel")}
            </Button>
          </DialogClose>

          {/* Deleting */}
          <DialogClose asChild>
            <Button
              type="button"
              variant="primary"
              onClick={() => deleteAddress(addressId)}
              className="bg-red-600 text-white capitalize"
              disabled={isPending}
            >
              {isPending ? t("deleting") : t("confirm")}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
