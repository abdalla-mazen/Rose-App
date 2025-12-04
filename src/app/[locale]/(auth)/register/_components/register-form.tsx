"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRegisterSchema, RegisterValues } from "@/lib/schemas/auth.schema";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PhoneInput } from "@/components/ui/phone-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useRegister from "../_hooks/use-register";
import { useTranslations } from "next-intl";
import { LoaderCircle } from "lucide-react";
import PasswordInput from "@/components/ui/password-input";
import ErrorMessage from "@/components/shared/error-message";

export default function RegisterForm() {
  // Translations
  const t = useTranslations();

  // Hooks
  const registerSchema = useRegisterSchema();
  const { error, isPending, register } = useRegister();

  const form = useForm<RegisterValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
      gender: "male",
    },
    resolver: zodResolver(registerSchema),
  });

  // On submit
  const onSubmit: SubmitHandler<RegisterValues> = async (values) => {
    register(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="text-zinc-600 dark:text-zinc-50 text-start"
      >
        <div className="flex gap-5">
          <div className="w-1/2">
            {/* First name */}
            <FormField
              name="firstName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  {/* Label */}
                  <FormLabel>{t("firstname")}</FormLabel>

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
                  <FormLabel>{t("lastname")}</FormLabel>

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
            <FormItem className="">
              {/* Label */}
              <FormLabel>{t("email")}</FormLabel>

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
            <FormItem>
              {/* Label */}
              <FormLabel>{t("phone")}</FormLabel>

              {/* Field */}
              <FormControl>
                <PhoneInput defaultCountry="EG" {...field} placeholder="01005493046" />
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
            <FormItem className="">
              {/* Label */}
              <FormLabel>{t("gender")}</FormLabel>

              {/* Field */}
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">{t("male")}</SelectItem>
                    <SelectItem value="female">{t("female")}</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>

              {/* Feedback */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              {/* Label */}
              <FormLabel>{t("password")}</FormLabel>

              {/* Field */}
              <FormControl>
                <PasswordInput {...field} placeholder="********" />
              </FormControl>

              {/* Feedback */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Re password */}
        <FormField
          name="rePassword"
          control={form.control}
          render={({ field }) => (
            <FormItem className="">
              {/* Label */}
              <FormLabel>{t("confirm-password")}</FormLabel>

              {/* Field */}
              <FormControl>
                <PasswordInput {...field} placeholder="********" />
              </FormControl>

              {/* Feedback */}
              <FormMessage />
            </FormItem>
          )}
        />

        {error && <ErrorMessage message={error.message} />}

        <Button
          disabled={isPending || (form.formState.isSubmitted && !form.formState.isValid)}
          type="submit"
          className="bg-maroon-600 dark:bg-softPink-300 my-2 w-full dark:text-zinc-800 capitalize"
        >
          {isPending ? (
            <LoaderCircle className="me-2 animate-spin" size={16} />
          ) : (
            t("create-account")
          )}
        </Button>
      </form>
    </Form>
  );
}
