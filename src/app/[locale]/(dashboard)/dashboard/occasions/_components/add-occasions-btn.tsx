"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

export default function AddOccasionsBtn() {
// Translations
const t = useTranslations();

  return (
    <Button variant={"primary"} className="w-52">
      <Plus className="text-white" />
      <Link href={"/dashboard/occasions/add-occasions"}>{t("add-a-new-occasion")}</Link>
    </Button>
  );
}
