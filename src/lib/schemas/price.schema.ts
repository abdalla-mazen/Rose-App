//validation 

import { z } from "zod";

export const priceFilterSchema = z
  .object({
    minPrice: z
      .number()
      .min(0, "Minimum price must be 0 or greater")
      .optional()
      .or(z.literal("")),
    maxPrice: z
      .number()
      .min(0, "Maximum price must be 0 or greater")
      .optional()
      .or(z.literal("")),
  })
  .refine(
    (data) => {
      if (
        data.minPrice !== "" &&
        data.maxPrice !== "" &&
        data.minPrice !== undefined &&
        data.maxPrice !== undefined
      ) {
        return data.minPrice <= data.maxPrice;
      }
      return true;
    },
    {
      message: "Minimum price must be less than or equal to maximum price",
      path: ["minPrice"],
    }
  );

export type PriceFilterFormData = z.infer<typeof priceFilterSchema>;