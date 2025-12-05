"use client";

import React, { createContext, useContext, useState, useMemo } from "react";
import { usePathname } from "next/navigation";

type BreadcrumbContextType = {
  title: string | null;
  setTitle: (value: string | null) => void;
  segments: string[];
};

const BreadcrumbContext = createContext<BreadcrumbContextType | null>(null);

export function ProductBreadcrumbProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Custom title from SetBreadcrumbTitle (for update-product)
  const [title, setTitle] = useState<string | null>(null);

  // Auto-generate segments from URL
  const segments = useMemo(() => {
    if (!pathname) return [];
    return pathname
      .split("/")
      .filter(Boolean)
      .filter((seg) => seg !== "en" && seg !== "dashboard"); // remove language + dashboard
  }, [pathname]);

  return (
    <BreadcrumbContext.Provider value={{ title, setTitle, segments }}>
      {children}
    </BreadcrumbContext.Provider>
  );
}

export function useProductBreadcrumb() {
  const ctx = useContext(BreadcrumbContext);
  if (!ctx) throw new Error("useProductBreadcrumb must be used within provider");
  return ctx;
}
