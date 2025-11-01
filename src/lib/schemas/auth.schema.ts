import { useTranslations } from "next-intl";
import { z } from "zod";

export const useRegisterSchema = () => {
  // Translation
  const t = useTranslations();

  return z
    .object({
      firstName: z.string().nonempty(t("firstname-req")),
      lastName: z.string().nonempty(t("lastname-req")),
      email: z.string().nonempty(t("email-req")),
      password: z.string().min(6, t("password-mess")).nonempty(t("password-req")),
      rePassword: z.string().nonempty(t("confirm-password-req")),
      phone: z.string().min(10, t("phone-mess")).nonempty(t("phone-req")),
      gender: z.enum(["male", "female"]),
    })
    .refine((data) => data.password === data.rePassword, {
      message: t("confirm-password-mess"),
      path: ["rePassword"],
    });
};

export const useLoginFormSchema = () => {
  // Translation
  const t = useTranslations();

  const schema = z.object({
    email: z.email(t("validation.email.invalid")).min(1, t("validation.email.required")),
    password: z.string().min(1, t("validation.password.required")),
  });

  return schema;
};

export type LoginFormInput = z.infer<ReturnType<typeof useLoginFormSchema>>;
export type RegisterValues = z.infer<ReturnType<typeof useRegisterSchema>>;
