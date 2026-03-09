import { useTranslations } from "next-intl";
import { z } from "zod";

export const useProductsSchema = () => {
  const t = useTranslations();

  return z.object({
    title: z.string().nonempty(t("product-title-required")),

    description: z
      .string()
      .min(10, t("product-description-min")),

    price: z
      .string()
      .nonempty(t("product-price-required"))
      .refine((val) => Number(val) > 0, {
        message: t("product-price-positive"),
      }),

    category: z.string().nonempty(t("product-category-required")),

    image: z.any().optional(),
  });
};

export type ProductForm = z.infer<
  ReturnType<typeof useProductsSchema>
>;