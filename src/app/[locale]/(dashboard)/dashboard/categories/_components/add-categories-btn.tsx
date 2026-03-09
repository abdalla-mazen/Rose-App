"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
// import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

export default function AddCategoriesBtn() {
  // const t = useTranslations();
  return (
  
<Link href="/dashboard/categories/add-category">
  <Button variant="primary" className="w-52 flex items-center gap-2">
    <Plus size={18} />
    Add Category
  </Button>
</Link>

  );
}
