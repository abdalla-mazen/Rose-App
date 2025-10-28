"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

const API_BASE = process.env.NEXT_PUBLIC_API;

async function fetchProducts(query: string) {
  const res = await fetch(`${API_BASE}/products?${query}`, {
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to load products");
  return res.json();
}

export function useProductQuery() {
  const searchParams = useSearchParams();
  const query = searchParams.toString();

  return useQuery({
    queryKey: ["products", query],
    queryFn: () => fetchProducts(query),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
  });
}
