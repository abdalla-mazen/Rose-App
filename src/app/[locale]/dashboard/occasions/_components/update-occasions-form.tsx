"use client";

import { Form, FormLabel, FormField, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { OccasionsSchema } from "@/lib/schemas/occasions.schema";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { CircleX, LoaderCircle, Image } from "lucide-react";
import { Occasion } from "@/lib/types/occasion";
import useUpdateOccasions from "../_hooks/use-update-occasions";


export type ImageFile = `${string}.${"jpg" | "jpeg" | "png" | "gif"}`;
interface occasions {
  name: string;
  image: ImageFile;
}

export default function UpdateOccasionsForm({ data }: { data: Occasion }) {
  // Mutations
  const { error, isPending, updateOccasion } = useUpdateOccasions();

  //  Form
  const schema = OccasionsSchema();
  const form = useForm<occasions>({
    defaultValues: {
      name: "",
      image: undefined,
    },
    resolver: zodResolver(schema),
  });
  const { isValid, isSubmitted } = form.formState;

  //   Function
  const onSubmit: SubmitHandler<occasions> = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    if (values.image) {
      formData.append("image", values.image);
    }
    updateOccasion({ formData, id: data._id });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-3/5  ">
        {/* Name Field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <div>
              <FormLabel className="text-sm font-medium text-zinc-800 dark:text-zinc-100">
                Occasion Name <span className="text-red-600">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder={data?.name ?? "Loading..."} {...field} />
              </FormControl>
              <FormMessage />
            </div>
          )}
        />

        <div className="flex justify-end w-full">
          <Button className="bg-white border border-black/10 text-blue-600 w-48 justify-start gap-2 mb-32">
            <Image />
            View occasion image
          </Button>
        </div>
        {/* Error Validation */}
        {form.formState.errors.name && (
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
          className="w-full text-sm font-semibold "
          disabled={isPending || (!isValid && isSubmitted)}
          variant={"primary"}
        >
          {isPending ? <LoaderCircle className="animate-spin" /> : "Update Occasion"}
        </Button>
      </form>
    </Form>
  );
}
