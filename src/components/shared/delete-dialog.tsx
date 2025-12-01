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
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";

// Props Type
type DialogProps = {
  deletedItem: string;
  trigger: React.ReactNode;
  itemId: string;
  deleteHook: () => {
    mutate: (
      itemId: string,
      options?: {
        onSuccess?: () => void;
        onError?: (error: Error) => void;
      },
    ) => void;
    isPending: boolean;
    isError?: boolean;
    error?: Error;
  };
};

export default function DeleteDialog({ deletedItem, trigger, itemId, deleteHook }: DialogProps) {
  // Translation
  const t = useTranslations();

  // State
  const [open, setOpen] = useState(false);

  // Mutation
  const { mutate, isPending } = deleteHook();

  // Handle delete
  const handleDelete = () => {
    mutate(itemId, {
      onSuccess: () => {
        toast.success(t("deleted-successfully"));
        setOpen(false);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
          {t("delete-dialog-confirm")}
          {deletedItem} ?
        </DialogDescription>

        {/* Footer */}
        <DialogFooter className="gap-2">
          {/* Close */}
          <DialogClose asChild>
            <Button type="button" variant="subtle">
              cancel{" "}
            </Button>
          </DialogClose>

          {/* Deleting */}
          <Button
            type="button"
            variant="primary"
            onClick={handleDelete}
            className="bg-red-600 text-white capitalize"
            disabled={isPending}
          >
            {isPending ? t("deleting") : t("confirm")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
