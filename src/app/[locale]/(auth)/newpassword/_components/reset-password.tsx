"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetPasswordValues, useResetPasswordSchema } from "@/lib/schemas/forget.schema";
import useResetPassword from "../_hooks/use-resetPassword";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { CircleX, LoaderCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import PasswordInputRHF from "@/components/shared/password-input-RHF";

export default function ResetPassword() {
  // Translation
  const t = useTranslations();

  // Mutation
  const { isPending, error, resetPassword } = useResetPassword();

  // Form
  const schema = useResetPasswordSchema();
  const form = useForm<ResetPasswordValues>({
    defaultValues: {
      email: "",
      password: "",
      newPassword: "",
    },
    resolver: zodResolver(schema),
  });
  const { isValid, isSubmitted } = form.formState;

  //  Function
  const onSubmit = (values: ResetPasswordValues) => {
    localStorage.removeItem("email");
    resetPassword(values);
  };

  // Effect
  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      form.setValue("email", email);
    }
  }, [form]);

  return (
    <div className="space-y-6 mx-auto w-full max-w-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Password */}
          <PasswordInputRHF name="password" label={t("password-label")} />

          {/* Confirm Password */}
          <PasswordInputRHF name="newPassword" label={t("confirm-password-label")} />

          {/* Error Validation */}
          {(form.formState.errors.password || form.formState.errors.newPassword) && (
            <>
              <div className="relative">
                <CircleX className="left-1/2 z-10 absolute bg-white dark:bg-zinc-800 rounded-full w-fit text-maroon-600 dark:text-softPink-300 -translate-x-1/2 -translate-y-1/2" />
              </div>
              <Alert className="dark:bg-zinc-800 mb-4 border-maroon-600 dark:border-softPink-300 text-center">
                <AlertDescription className="text-zinc-700 dark:text-zinc-50">
                  {t("operationFailed")}
                </AlertDescription>
              </Alert>
            </>
          )}

          {/* Error from server */}
          {error && (
            <Alert className="mb-4 dark:text-softPink-300 text-center">
              <AlertDescription>{error.message}</AlertDescription>
            </Alert>
          )}

          {/* Submit button */}
          <Button
            type="submit"
            className="w-full"
            disabled={isPending || (!isValid && isSubmitted)}
            variant={"primary"}
          >
            {isPending ? <LoaderCircle className="animate-spin" /> : t("reset-password")}
          </Button>
        </form>
      </Form>
    </div>
  );
}
