"use client";

import { Form, FormLabel, FormField, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import useAddCategories from "../hooks/useAddCategories";
import { useCategoriesSchema } from "@/lib/schemas/categories.schema";

export interface CategoryForm {
  name: string;
}

export default function AddCategoriesForm() {

  const { isPending, error, addCategory } = useAddCategories();
  const schema = useCategoriesSchema();

  const form = useForm<CategoryForm>({
    defaultValues: { name: "" },
    resolver: zodResolver(schema),
  });

  const { isValid, isSubmitted } = form.formState;

  const onSubmit: SubmitHandler<CategoryForm> = async (values) => {
    addCategory(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full dark:bg-zinc-800"  >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <div>
              <FormLabel className="text-sm font-medium text-zinc-800 dark:text-zinc-100 capitalize dark:bg-zinc-800    ">
                category name <span className="text-maroon-600 dark:text-softPink-300">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter category name" {...field} />
              </FormControl>
              <FormMessage />
            </div>
          )}
        />

        {/* Error */}
        {form.formState.errors.name && (
          <Alert className="dark:bg-zinc-800 mb-4 border-maroon-600 dark:border-softPink-300 text-center">
            <AlertDescription className="capitalize">failed to add category</AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert className="mb-4 dark:text-softPink-300 text-center">
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        )}

        <Button
          type="submit"
          className="w-full"
          disabled={isPending || (!isValid && isSubmitted)}
          variant="primary"
        >
          {isPending ? <LoaderCircle className="animate-spin" /> : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
