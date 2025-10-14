import { useTranslations } from "next-intl";
import { email, z } from "zod";

export const registerSchema = (t: ReturnType<typeof useTranslations>) =>
  z
    .object({
      firstName: z.string().nonempty(t("firstname-req")),
      lastName: z.string().nonempty(t("lastname-req")),
      email: z.string().nonempty(t("email-req")),
      password: z
        .string()
        .min(6, t("password-mess"))
        .nonempty(t("password-req")),
      rePassword: z.string().nonempty(t("confirm-password-req")),
      phone: z.string().min(10, t("phone-mess")).nonempty(t("phone-req")),
      gender: z.enum(["male", "female"]),
    })
    .refine((data) => data.password === data.rePassword, {
      message: t("confirm-password-mess"),
      path: ["rePassword"],
    });

export type RegisterValues = z.infer<typeof registerSchema>;
