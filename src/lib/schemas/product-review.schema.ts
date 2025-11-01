import { useTranslations } from "next-intl";
import { z } from "zod";

export const useProductReviewScheme = () => {
  // Translation
  const t = useTranslations();

  const scheme = z.object({
    title: z
      .string()
      .min(1, t("title-is-required"))
      .min(3, t("title-constraints")),
    comment: z
      .string()
      .min(1, t("comment-is-required"))
      .min(10, t("comment-constraints")),
  });

  return scheme;
};

export type ProductReviewScheme = z.infer<
  ReturnType<typeof useProductReviewScheme>
>;
