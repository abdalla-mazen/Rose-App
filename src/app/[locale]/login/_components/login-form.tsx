"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginFormInput, loginFormSchema } from "@/lib/shemas/auth.schema";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PasswordInput from "@/components/ui/password-input";
import { useEffect } from "react";
import { Link } from "@/i18n/navigation";
import useLogin from "../_hooks/use-login";
import ErrorMessage from "@/components/shared/error-message";
import { useTranslations } from "next-intl";

export default function LoginForm() {
  // Translation
  const t = useTranslations();

  // Form
  const form = useForm<LoginFormInput>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginFormSchema),
  });

  const { isPending, login, error } = useLogin();

  const onSubmitHandler: SubmitHandler<LoginFormInput> = (values) => {
    login(values);
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      form.setFocus("email");
    }, 0);

    return () => clearTimeout(timerId);
  }, [form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitHandler)} className="space-y-4">
        {/* Email form field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium text-sm capitalize">
                {t("email-label")}
              </FormLabel>
              <FormControl>
                <Input type="email" placeholder="user@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password form field */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium text-sm">
                {t("password-label")}
              </FormLabel>
              <FormControl>
                <PasswordInput {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Forgot password */}
        <div className="flex flex-col items-center space-y-6 pt-2">
          <div className="w-full rtl:text-start text-end">
            <Link
              href="/forgot-password"
              className="text-maroon-700 dark:text-softPink-300 text-sm hover:underline"
            >
              {t("forgot-password")}
            </Link>
          </div>

          {/* Error message */}
          <ErrorMessage message={error} />

          {/* Submit button */}
          <Button
            type="submit"
            variant="primary"
            loading={isPending}
            disabled={
              isPending ||
              (form.formState.isSubmitted && !form.formState.isValid)
            }
            className="w-full"
          >
            {t("login-button")}
          </Button>

          {/* Register */}
          <p>
            {t.rich("no-account", {
              Link: (chunks) => (
                <Link
                  href="/register"
                  className="font-medium text-maroon-700 dark:text-softPink-300 text-sm hover:underline"
                >
                  {chunks}
                </Link>
              ),
            })}
          </p>
        </div>
      </form>
    </Form>
  );
}
