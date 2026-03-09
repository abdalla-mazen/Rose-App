// import { useTranslations } from "next-intl";
// import z from "zod";

// export const useContactSchema = ()  =>
// {
//      // Translation
//   const t = useTranslations();

//   // Schema
//   return  z.object({
//   name: z.string().min(1, "Name is required"),
//   email: z.email("Invalid email").min(1, "Email is required"),
//   phone: z
//     .string()
//     .min(1, "Phone is required")
//     .regex(/^01[0125][0-9]{8}$/, " Enter a valid Egyptian phone number"),
//   subject: z.string().min(1, "Subject is required"),
//   message: z.string().min(1, "Message is required"),
// });
// }
// export type ContactValues = z.infer<ReturnType<typeof useContactSchema>>



import { useTranslations } from "next-intl";
import { z } from "zod";

export const useContactSchema = () => {
  const t = useTranslations(); 

  return z.object({
    name: z
      .string()
      .min(1, t("nameRequired")),

    email: z
      .string()
      .min(1, t("emailRequired"))
      .email(t("emailInvalid")),

    phone: z
      .string()
      .min(1, t("phoneRequired"))
      .regex(
        /^01[0125][0-9]{8}$/,
        t("phoneInvalid")
      ),

    subject: z
      .string()
      .min(1, t("subjectRequired")),

    message: z
      .string()
      .min(1, t("messageRequired")),
  });
};

export type ContactValues = z.infer<ReturnType<typeof useContactSchema>>;