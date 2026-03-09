import { useTranslations } from "next-intl";
import z from "zod";

export const useCategoriesSchema = () => {
  const t = useTranslations();

  return z.object({
    name: z.string().nonempty(t("name-required-error")),
  
  });
};

export type Categories = z.infer<
  ReturnType<typeof useCategoriesSchema>
>;
