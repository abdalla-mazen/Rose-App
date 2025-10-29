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
import PasswordInput from "@/components/ui/password-input";
import {
  accountChangepasswordSchema,
  AccountChangepasswordValues,
} from "@/lib/schemas/account.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useChangePassword from "../_hooks/use-changepassword";
import ErrorMessage from "@/components/shared/error-message";
import { LoaderCircle } from "lucide-react";

export default function AccountChangePassword() {
  // Translations
  const t = useTranslations();

  // Hooks
  const form = useForm<AccountChangepasswordValues>({
    defaultValues: {
      oldPassword: "",
      password: "",
      rePassword: "",
    },
    resolver: zodResolver(accountChangepasswordSchema),
  });

  const { changePassword, error, isPending } = useChangePassword();

  const onSubmit: SubmitHandler<AccountChangepasswordValues> = async (data) => {
    changePassword({
      password: data.oldPassword,
      newPassword: data.password,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* Old Password */}
        <FormField
          control={form.control}
          name="oldPassword"
          render={({ field }) => (
            <FormItem className="pb-6 border-b">
              <FormLabel className="text-left capitalize">{t("old-password")}</FormLabel>
              <FormControl>
                <PasswordInput placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* New Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="pt-6">
              <FormLabel className="text-left capitalize">{t("new-password")}</FormLabel>
              <FormControl>
                <PasswordInput placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Re Password */}
        <FormField
          control={form.control}
          name="rePassword"
          render={({ field }) => (
            <FormItem className="pt-2.5 pb-10">
              <FormLabel className="text-left capitalize">{t("confirm-new-password")}</FormLabel>
              <FormControl>
                <PasswordInput placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Error message */}
        {error && <ErrorMessage message={error.message} />}

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isPending}
            className="bg-maroon-600 mt-20 rounded-xl w-56"
          >
            {t("change-password")} {isPending && <LoaderCircle className="animate-spin" />}
          </Button>
        </div>
      </form>
    </Form>
  );
}
