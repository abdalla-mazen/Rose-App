"use client";

import { useQuery } from "@tanstack/react-query";

// Local route handler fetch
async function fetchFilters() {
  const res = await fetch("/api/filters", {
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to load filters");
  }

  return res.json();
}

// Custom hook for filters
export function useFiltersQuery() {
  return useQuery({
    queryKey: ["filters"],
    queryFn: fetchFilters,
    staleTime: 10 * 60 * 1000, // cache for 10 mins
  });
}
