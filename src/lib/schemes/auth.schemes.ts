import z from "zod";

// Forgot Password Schema
export const forgetSchema = z.object({
  email: z.email("Invalid Email").nonempty("Your Email is required"),
});
export type ForgetValues = z.infer<typeof forgetSchema>;


export const resetPasswordSchema = z
  .object({
    email: z.email(),
    password: z
      .string("Invalid Password")
      .nonempty("Your Password is required"),
    newPassword: z
      .string("Invalid Password")
      .nonempty("Your Password is required"),
  })
  .refine((data) => data.password === data.newPassword, {
    error: "Passwords do not match",
    path: ["newPassword"],
  });

export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;
