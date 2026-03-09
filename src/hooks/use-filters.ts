
// "use client";

// import { usePathname, useRouter } from "@/i18n/navigation";
// import { useSearchParams } from "next/navigation";
// import { useCallback, useMemo } from "react";
// import { ProductFilters } from "@/lib/types/filters";

// export function useFilters() {
//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();

//   const currentFilters = useMemo<ProductFilters>(() => {
//     return {
//       occasionIds: searchParams.getAll("occasion"),
//       categoryIds: searchParams.getAll("category"),
//       minPrice: searchParams.get("price[gte]")
//         ? Number(searchParams.get("price[gte]"))
//         : undefined,
//       maxPrice: searchParams.get("price[lte]")
//         ? Number(searchParams.get("price[lte]"))
//         : undefined,
//     };
//   }, [searchParams]);

//   const updateFilters = useCallback(
//     (newFilters: Partial<ProductFilters>) => {
//       const params = new URLSearchParams(searchParams.toString());

//       if (newFilters.occasionIds !== undefined) {
//         params.delete("occasion");
//         newFilters.occasionIds.forEach(id =>
//           params.append("occasion", id)
//         );
//       }

//       if (newFilters.categoryIds !== undefined) {
//         params.delete("category");
//         newFilters.categoryIds.forEach(id =>
//           params.append("category", id)
//         );
//       }

//       if (newFilters.minPrice !== undefined) {
//         newFilters.minPrice
//           ? params.set("price[gte]", String(newFilters.minPrice))
//           : params.delete("price[gte]");
//       }

//       if (newFilters.maxPrice !== undefined) {
//         newFilters.maxPrice
//           ? params.set("price[lte]", String(newFilters.maxPrice))
//           : params.delete("price[lte]");
//       }

//       router.push(`${pathname}?${params.toString()}`, { scroll: false });
//     },
//     [router, pathname, searchParams]
//   );

//   const toggleCategory = useCallback(
//     (id: string) => {
//       const current = currentFilters.categoryIds || [];
//       const updated = current.includes(id)
//         ? current.filter(x => x !== id)
//         : [...current, id];

//       updateFilters({ categoryIds: updated });
//     },
//     [currentFilters.categoryIds, updateFilters]
//   );

//   const resetCategories = useCallback(() => {
//     updateFilters({ categoryIds: [] });
//   }, [updateFilters]);

//   const resetAllFilters = useCallback(() => {
//     router.push(pathname, { scroll: false });
//   }, [router, pathname]);

//   return {
//     currentFilters,
//     toggleCategory,
//     resetCategories,
//     resetAllFilters,
//   };
// }


// "use client";

// import { usePathname, useRouter } from "@/i18n/navigation";
// import { useSearchParams } from "next/navigation";
// import { useCallback, useMemo } from "react";
// import { ProductFilters } from "@/lib/types/filters";

// export function useFilters() {
//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();

//   const currentFilters = useMemo<ProductFilters>(() => {
//     return {
//       categoryIds: searchParams.getAll("category"),
//       occasionIds: searchParams.getAll("occasion"),
//       minPrice: searchParams.get("price[gte]")
//         ? Number(searchParams.get("price[gte]"))
//         : undefined,
//       maxPrice: searchParams.get("price[lte]")
//         ? Number(searchParams.get("price[lte]"))
//         : undefined,
//     };
//   }, [searchParams]);

//   const updateFilters = useCallback(
//     (newFilters: Partial<ProductFilters>) => {
//       const params = new URLSearchParams(searchParams.toString());

//       if (newFilters.categoryIds !== undefined) {
//         params.delete("category");
//         newFilters.categoryIds.forEach((id) =>
//           params.append("category", id)
//         );
//       }

//       if (newFilters.occasionIds !== undefined) {
//         params.delete("occasion");
//         newFilters.occasionIds.forEach((id) =>
//           params.append("occasion", id)
//         );
//       }

//    if (newFilters.minPrice !== undefined) {
//   if (newFilters.minPrice) {
//     params.set("price[gte]", String(newFilters.minPrice));
//   } else {
//     params.delete("price[gte]");
//   }
// }


//    if (newFilters.maxPrice !== undefined) {
//   if (newFilters.maxPrice) {
//     params.set("price[lte]", String(newFilters.maxPrice));
//   } else {
//     params.delete("price[lte]");
//   }
// }


//       router.push(`${pathname}?${params.toString()}`, {
//         scroll: false,
//       });
//     },
//     [router, pathname, searchParams]
//   );

//   const toggleCategory = useCallback(
//     (id: string) => {
//       const current = currentFilters.categoryIds || [];
//       const updated = current.includes(id)
//         ? current.filter((x) => x !== id)
//         : [...current, id];

//       updateFilters({ categoryIds: updated });
//     },
//     [currentFilters.categoryIds, updateFilters]
//   );

//   const toggleOccasion = useCallback(
//     (id: string) => {
//       const current = currentFilters.occasionIds || [];
//       const updated = current.includes(id)
//         ? current.filter((x) => x !== id)
//         : [...current, id];

//       updateFilters({ occasionIds: updated });
//     },
//     [currentFilters.occasionIds, updateFilters]
//   );

//   const resetCategories = useCallback(() => {
//     updateFilters({ categoryIds: [] });
//   }, [updateFilters]);

//   const resetOccasions = useCallback(() => {
//     updateFilters({ occasionIds: [] });
//   }, [updateFilters]);

//   const resetAllFilters = useCallback(() => {
//     router.push(pathname, { scroll: false });
//   }, [router, pathname]);

//   return {
//     currentFilters,
//     toggleCategory,
//     toggleOccasion,
//     resetCategories,
//     resetOccasions,
//     resetAllFilters,
//   };
// }

"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import { ProductFilters } from "@/lib/types/filters";

export function useFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 🔹 Read current filters from URL
  const currentFilters = useMemo<ProductFilters>(() => {
    return {
      categoryIds: searchParams.getAll("category"),
      occasionIds: searchParams.getAll("occasion"),
      minPrice: searchParams.get("price[gte]") != null
        ? Number(searchParams.get("price[gte]"))
        : undefined,
      maxPrice: searchParams.get("price[lte]") != null
        ? Number(searchParams.get("price[lte]"))
        : undefined,
    };
  }, [searchParams]);

  // 🔹 Update URL filters
  const updateFilters = useCallback(
    (newFilters: Partial<ProductFilters>) => {
      const params = new URLSearchParams(searchParams.toString());

      // Categories
      if (newFilters.categoryIds !== undefined) {
        params.delete("category");
        newFilters.categoryIds.forEach((id) => {
          params.append("category", id);
        });
      }

      // Occasions
      if (newFilters.occasionIds !== undefined) {
        params.delete("occasion");
        newFilters.occasionIds.forEach((id) => {
          params.append("occasion", id);
        });
      }

      // Min price (0 safe)
      if (newFilters.minPrice != null) {
        params.set("price[gte]", String(newFilters.minPrice));
      } else {
        params.delete("price[gte]");
      }

      // Max price (0 safe)
      if (newFilters.maxPrice != null) {
        params.set("price[lte]", String(newFilters.maxPrice));
      } else {
        params.delete("price[lte]");
      }

      const query = params.toString();

      router.push(
        query ? `${pathname}?${query}` : pathname,
        { scroll: false }
      );
    },
    [router, pathname, searchParams]
  );

  // 🔹 Toggle category
  const toggleCategory = useCallback(
    (id: string) => {
      const current = currentFilters.categoryIds || [];
      const updated = current.includes(id)
        ? current.filter((x) => x !== id)
        : [...current, id];

      updateFilters({ categoryIds: updated });
    },
    [currentFilters.categoryIds, updateFilters]
  );

  // 🔹 Toggle occasion
  const toggleOccasion = useCallback(
    (id: string) => {
      const current = currentFilters.occasionIds || [];
      const updated = current.includes(id)
        ? current.filter((x) => x !== id)
        : [...current, id];

      updateFilters({ occasionIds: updated });
    },
    [currentFilters.occasionIds, updateFilters]
  );

  // 🔹 Resets
  const resetCategories = useCallback(() => {
    updateFilters({ categoryIds: [] });
  }, [updateFilters]);

  const resetOccasions = useCallback(() => {
    updateFilters({ occasionIds: [] });
  }, [updateFilters]);

  const resetAllFilters = useCallback(() => {
    router.push(pathname, { scroll: false });
  }, [router, pathname]);

  return {
    currentFilters,
    updateFilters, // 👈 مهم جدًا
    toggleCategory,
    toggleOccasion,
    resetCategories,
    resetOccasions,
    resetAllFilters,
  };
}
