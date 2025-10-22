"use client";

import { useRouter, usePathname } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ProductFiltersValues,
  ProductFiltersSchema,
} from "@/lib/schemas/productsFilters.schema";

// hook
export function useFiltersForm(defaultValues?: ProductFiltersValues) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // Current URL values
  const currentValues: ProductFiltersValues = {
    category: searchParams.get("category") || "",
    rating: searchParams.get("rating") || "",
  };

  // schema
  const form = useForm<ProductFiltersValues>({
    resolver: zodResolver(ProductFiltersSchema),
    defaultValues: defaultValues || currentValues,
  });

  //Sync form values with URL parameters
  const updateUrl = (values: ProductFiltersValues) => {
    const params = new URLSearchParams();

    if (values.category) params.set("category", values.category);
    if (values.rating) params.set("rating", values.rating);

    router.replace(`${pathname}?${params.toString()}`);
  };
  //Watch form changes and update URL
  form.watch((values) => updateUrl(values));

  return form;
}
