"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "@/i18n/navigation";
import { MoveRight } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

export default function CheckOutButton() {
  // Translations
  const t = useTranslations();

  // Navigation
  const router = useRouter();

  return (
    <Button
      variant={"primary"}
      onClick={() => router.push("/checkout")}
      className="py-2.5 px-4 mt-6 h-16"
    >
      {t("checkout")} <MoveRight className="rtl:rotate-180" />
    </Button>
  );
}
