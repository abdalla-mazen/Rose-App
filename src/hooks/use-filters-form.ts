"use client";

import { useRouter, usePathname } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductFiltersValues, ProductFiltersSchema } from "@/lib/schemas/products-filters.schema";
import { useEffect } from "react";

export function useFiltersForm(defaultValues?: ProductFiltersValues) {
  // Variables
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Current URL values
  const currentValues: ProductFiltersValues = {
    category: searchParams.get("category") || "",
    rating: searchParams.get("rateAvg") || "",
    occasion: searchParams.get("occasion") || "",
    price: searchParams.get("price") || "",
  };

  // schema
  const form = useForm<ProductFiltersValues>({
    resolver: zodResolver(ProductFiltersSchema),
    defaultValues: defaultValues || currentValues,
  });

  // Sync form values with URL parameters
  const updateUrl = (values: ProductFiltersValues) => {
    const params = new URLSearchParams();

    if (values.category) params.set("category", values.category);
    if (values.rating) params.set("rating", values.rating);

    // replace the URL without adding a new entry to the history
    router.replace(`${pathname}?${params.toString()}`);
  };

  // Watch form changes and update URL
  useEffect(() => {
    const subscription = form.watch((values) => {
      updateUrl(values);
    });

    // unsubscribe
    return () => subscription.unsubscribe();
  }, [form.watch, pathname, router]);

  return form;
}
