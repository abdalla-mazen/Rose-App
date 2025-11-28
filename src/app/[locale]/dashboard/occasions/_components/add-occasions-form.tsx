"use client";

import FileInput from "@/components/ui/file-input";
import { Form, FormLabel, FormField, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { OccasionsSchema } from "@/lib/schemas/occasions.schema";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { CircleX, LoaderCircle } from "lucide-react";
import useAddOccasions from "../_hooks/use-occasions";
import { occasions } from "../_actions/add-occasions.action";


export default function AddOccasionsForm() {
  // Mutations
  const { error, isPending, addOccasion } = useAddOccasions();

  // Form
  const schema = OccasionsSchema();
  const form = useForm<occasions>({
    defaultValues: {
      name: "",
      image: undefined,
    },
    resolver: zodResolver(schema),
  });
  const { isValid, isSubmitted } = form.formState;

  // Function
  const onSubmit: SubmitHandler<occasions> = async (values) => {
    // change to FormData
    const formData = new FormData();
    formData.append("name", values.name);

    if (values.image) {
      formData.append("image", values.image);
    }
    addOccasion(formData  as unknown as occasions);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Name Field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <div>
              <FormLabel className="text-sm font-medium text-zinc-800 dark:text-zinc-100">
                Occasion Name
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter occasion name" {...field} />
              </FormControl>
              <FormMessage />
            </div>
          )}
        />

        {/* Image Field */}
        <FormField
          control={form.control}
          name="image"
          render={({ field: { onChange, ...field } }) => (
            <div>
              <FileInput
                label="Occasion image *"
                buttonText="Choose File"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  onChange(file);
                }}
                {...field}
              />
              <FormMessage />
            </div>
          )}
        />

        {/* Error Validation */}
        {(form.formState.errors.name || form.formState.errors.image) && (
          <>
            <div className="relative">
              <CircleX className="left-1/2 z-10 absolute bg-white dark:bg-zinc-800 rounded-full w-fit text-maroon-600 dark:text-softPink-300 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <Alert className="dark:bg-zinc-800 mb-4 border-maroon-600 dark:border-softPink-300 text-center">
              <AlertDescription className="text-zinc-700 dark:text-zinc-50">
                Failed to add occasion
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
          {isPending ? <LoaderCircle className="animate-spin" /> : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
