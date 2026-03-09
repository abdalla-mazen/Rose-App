"use client";

import {
  Form,
  FormLabel,
  FormField,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { CircleX, LoaderCircle } from "lucide-react";

import { useTranslations } from "next-intl";
import {
  useCategoriesSchema
  
} from "@/lib/schemas/categories.schema";
import useUpdateCategories from "../hooks/use-update-categories";
import { CategoryForm } from "./add-categories-form";

export default function UpdateCategoriesForm({
  data,
}: {
  data: Category;
}) {
  // Translations
  const t = useTranslations();

  // Mutations
  const { error, isPending, updateCategory } = useUpdateCategories();

  // Form
  const schema = useCategoriesSchema();
  const form = useForm<CategoryForm>({
    defaultValues: {
      name: data?.name || "",
    },
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const { isValid, isSubmitted } = form.formState;

  // Submit
  const onSubmit: SubmitHandler<CategoryForm> = async (values) => {
    updateCategory({
      name: values.name,
      id: data._id,
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-3/5"
      >
        {/* Name Field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <div>
              <FormLabel className="text-sm font-medium text-zinc-800 dark:text-zinc-100">
                {t("category-name")}
                <span className="text-red-600">*</span>
              </FormLabel>

              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </div>
          )}
        />

        {/* Validation Error */}
        {form.formState.errors.name && (
          <>
            <div className="relative">
              <CircleX className="left-1/2 z-10 absolute bg-white dark:bg-zinc-800 rounded-full w-fit text-maroon-600 dark:text-softPink-300 -translate-x-1/2 -translate-y-1/2" />
            </div>

            <Alert className="dark:bg-zinc-800 mb-4 border-maroon-600 dark:border-softPink-300 text-center">
              <AlertDescription className="text-zinc-700 dark:text-zinc-50">
                {t("failed-to-update-category")}
              </AlertDescription>
            </Alert>
          </>
        )}

        {/* Server Error */}
        {error && (
          <Alert className="mb-4 dark:text-softPink-300 text-center">
            <AlertDescription>
              {error.message}
            </AlertDescription>
          </Alert>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full text-sm font-semibold"
          disabled={isPending || (!isValid && isSubmitted)}
          variant="primary"
        >
          {isPending ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            t("update-category")
          )}
        </Button>
      </form>
    </Form>
  );
}
