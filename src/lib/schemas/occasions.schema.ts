import { useTranslations } from "next-intl";
import z from "zod";

export const useOccasionsSchema = () => {
  const t = useTranslations();

  return z.object({
    name: z.string().nonempty(t("name-required-error")),
    image: z.any(),
  });
};

export type Occasions = z.infer<
  ReturnType<typeof useOccasionsSchema>
>;
