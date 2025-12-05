import { string, z } from "zod";

export const addProductSchema = z.object({
  title: z.string().nonempty("Product title is required"),
  description: z.string().nonempty("Product description is required"),
  price: z.string().nonempty("Please enter a valid price"),
  discount: z.string(),
  priceAfterDiscount: z.string(),
  quantity: z.string().nonempty("Product quantity is required"),
  category: z.string().nonempty("Please select a category for the product"),
  occasion: z.string().nonempty("Please select a occasion for the product"),
  imgCover: z.array(z.union([z.instanceof(File), z.string()])).min(1),
  images: z.array(z.union([z.instanceof(File), z.string()])).min(1),
});

export const updateProductSchema = z.object({
  title: z.string().nonempty("Product title is required"),
  description: z.string().nonempty("Product description is required"),
  price: z.number().int("Please enter a valid price"),
  discount: z.number().optional(),
  priceAfterDiscount: z.number(),
  quantity: z.number().int("Product quantity is required"),
  category: z.string().nonempty("Please select a category for the product"),
  occasion: z.string().optional(),
  imgCover: z.string(),
  images: z.array(z.string()),
});

export type AddProductValues = z.infer<typeof addProductSchema>;
export type UpdateProductValues = z.infer<typeof updateProductSchema>;
