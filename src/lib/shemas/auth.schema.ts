import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.email("Invalid Email Address").min(1, "Please enter your email"),
  password: z.string().min(1, "Please enter your password"),
});

export type LoginFormInput = z.infer<typeof loginFormSchema>;
