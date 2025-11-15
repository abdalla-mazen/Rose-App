import { useTranslations } from "next-intl";
import { z } from "zod";

export const useAddNewAddressScheme = () => {
  // Translation
  const t = useTranslations();
  const scheme = z.object({
    city: z.string().min(1, t("add-new-address-city-constraint")),
    address: z.string().min(10, t("add-new-address-address-constraint")),
    phone: z.string().min(1, t("phone-req")).min(10, t("phone-mess")),
  });

  return scheme;
};

export type AddNewAddressScheme = z.infer<ReturnType<typeof useAddNewAddressScheme>>;
