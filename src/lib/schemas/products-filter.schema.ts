import { z } from "zod";

export const ProductFiltersSchema = z.object({
  category: z.string().optional(),
  rating: z.string().min(1).max(5).optional(),
  occasion: z.string().optional(),
  price: z.string().optional(),
});

export type ProductFiltersValues = z.infer<typeof ProductFiltersSchema>;