
import { useTranslations } from "next-intl";
import z from "zod";

// Coupon Schema
export const useCouponSchema = () => {
  // Translation
  const t = useTranslations();

  // Schema
  return z.object({
    code: z
    .string("enter code")
     .min(3, " code must be at least 3 characters")
    .max(40, " code must be at most 40 characters"),
  });
};
// type  Coupon Schema
export type CouponValues = z.infer<ReturnType<typeof useCouponSchema>>;