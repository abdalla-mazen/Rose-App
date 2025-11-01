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
import { PhoneInput } from "@/components/ui/phone-input";
import { accountProfileSchema, AccountProfileValues } from "@/lib/schemas/account.schema";
import { AccountProfile } from "@/lib/types/account-profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import React from "react";
import { useForm } from "react-hook-form";

type props = {
  session: AccountProfile | null;
};

export default function AccountEditProfile({ session }: props) {
  // If no session
  if (!session) {
    return <div>No user data available</div>;
  }

  // Translations
  const t = useTranslations();

  // Hooks
  const form = useForm<AccountProfileValues>({
    defaultValues: {
      firstName: session.firstName || "",
      lastName: session.lastName || "",
      email: session.email || "",
      phone: session.phone || "",
      gender: session.gender,
    },
    resolver: zodResolver(accountProfileSchema),
  });

  return (
    <Form {...form}>
      <form className="text-zinc-600 text-start">
        <div className="flex gap-5">
          <div className="w-1/2">
            {/* First name */}
            <FormField
              name="firstName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  {/* Label */}
                  <FormLabel className="capitalize">{t("firstname")}</FormLabel>

                  {/* Field */}
                  <FormControl>
                    <Input {...field} placeholder="seif" />
                  </FormControl>

                  {/* Feedback */}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/2">
            {/* Last name */}
            <FormField
              name="lastName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  {/* Label */}
                  <FormLabel className="capitalize">{t("lastname")}</FormLabel>

                  {/* Field */}
                  <FormControl>
                    <Input {...field} placeholder="eldin" />
                  </FormControl>

                  {/* Feedback */}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Email */}
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem className="pt-2.5">
              {/* Label */}
              <FormLabel className="capitalize">{t("email")}</FormLabel>

              {/* Field */}
              <FormControl>
                <Input {...field} placeholder="user@example.com" />
              </FormControl>

              {/* Feedback */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone */}
        <FormField
          name="phone"
          control={form.control}
          render={({ field }) => (
            <FormItem className="pt-2.5">
              {/* Label */}
              <FormLabel className="capitalize">{t("phone")}</FormLabel>

              {/* Field */}
              <FormControl>
                <PhoneInput {...field} placeholder="01005493046" />
              </FormControl>

              {/* Feedback */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Gender */}
        <FormField
          name="gender"
          control={form.control}
          render={({ field }) => (
            <FormItem className="pt-2.5">
              <FormLabel className="capitalize">{t("gender")}</FormLabel>
              <FormControl>
                <Input value={field.value === "male" ? t("male") : t("female")} disabled />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex justify-between mt-20">
          <Button variant="ghost" className="w-56 text-maroon-500 capitalize">
            {t("delete-my-account")}
          </Button>
          <Button className="bg-maroon-600 rounded-xl w-56 capitalize">{t("save-changes")}</Button>
        </div>
      </form>
    </Form>
  );
}
