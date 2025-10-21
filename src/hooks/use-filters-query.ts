"use client";

import { useQuery } from "@tanstack/react-query";

const API_BASE = process.env.NEXT_PUBLIC_API;

//  Fetch all available filters (occasions, price range, etc.)
async function fetchFilters() {
  const res = await fetch(`${API_BASE}/search/filters`, {
    headers: { "Content-Type": "application/json" },
    cache: "no-store", // disable caching (always fresh)
  });

  if (!res.ok) {
    throw new Error("Failed to load filters");
  }

  return res.json();
}
// Custom React Query hook to get filters data

export function useFiltersQuery() {
  return useQuery({
    queryKey: ["filters"],
    queryFn: fetchFilters,
    staleTime: 1000 * 60 * 10, // cache for 10 minutes
  });
}
