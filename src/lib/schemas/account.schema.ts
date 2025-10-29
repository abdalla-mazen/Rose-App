import { z } from "zod";

export const accountProfileSchema = z.object({
  firstName: z.string().nonempty("Your first name is required"),
  lastName: z.string().nonempty("Your last name is required"),
  email: z.string().nonempty("Your email is required"),
  phone: z
    .string()
    .min(10, "Phone must be at least 10 digits")
    .nonempty("Your phone number is required"),
  gender: z.string(),
});

export const accountChangepasswordSchema = z
  .object({
    oldPassword: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .nonempty("Your old password is required"),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .nonempty("Your new password is required"),

    rePassword: z.string().nonempty("Please confirm your password"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Your new passwords do not match",
    path: ["rePassword"],
  });

export type AccountProfileValues = z.infer<typeof accountProfileSchema>;
export type AccountChangepasswordValues = z.infer<typeof accountChangepasswordSchema>;
