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
type DeleteDialogProps = {
  deletedItem: string;
  trigger: React.ReactNode;
  itemId: string;
  deleteHook: (itemId: string) => void | Promise<void>; // function للحذف
};

export default function DeleteDialog({
  deletedItem,
  trigger,
  itemId,
  deleteHook,
}: DeleteDialogProps) {
  const t = useTranslations();

  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteHook(itemId);
      toast.success(t("deleted-successfully"));
      setOpen(false);
    } catch (error: any) {
      toast.error(error.message || t("delete-failed"));
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Trigger Button */}
      {trigger}

      {/* Modal Content */}
      <DialogContent
        showCloseButton
        className="flex flex-col justify-between mx-auto px-4 border border-gray-300 rounded-lg max-w-md sm:min-h-80"
      >
        {/* Header */}
        <DialogHeader>
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
          {t("delete-dialog-confirm")} {deletedItem} ?
        </DialogDescription>

        {/* Footer */}
        <DialogFooter className="gap-2">
          <DialogClose asChild>
            <Button type="button" variant="subtle">
              {t("cancel")}
            </Button>
          </DialogClose>

          <Button
            type="button"
            variant="primary"
            onClick={handleDelete}
            className="bg-red-600 text-white capitalize"
            disabled={isDeleting}
          >
            {isDeleting ? t("deleting") : t("confirm")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
