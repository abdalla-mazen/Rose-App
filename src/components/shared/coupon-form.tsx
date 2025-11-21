"use client";

import { useCoupon } from "@/hooks/use-coupon";
import { CouponValues, useCouponSchema } from "@/lib/schemas/coupon.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { CircleX, LoaderCircle, Ticket } from "lucide-react";
import { Alert, AlertDescription } from "../ui/alert";
import { Button } from "../ui/button";
import CouponInput from "./coupon-input";

export default function CouponForm() {
  // Translation
  const t = useTranslations();

  // Mutation
  const { isPending, error, applyCoupon } = useCoupon();

  // Form
  const schema = useCouponSchema();
  const form = useForm<CouponValues>({
    defaultValues: {
      code: "",
    },
    resolver: zodResolver(schema),
  });
  const { isValid, isSubmitted } = form.formState;

  // Function
  const onSubmit: SubmitHandler<CouponValues> = (values) => {
    applyCoupon(values.code);
  };

  return (
    <div className="w-full">
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          {/* Input and Button Row */}
          <div className="flex items-start gap-2 w-full">
            {/* Email field */}
            <div className="flex-1 ">
              <CouponInput />
            </div>

            {/* submit button */}
            <Button
              disabled={isPending || (!isValid && isSubmitted)}
              className="w-40  py-6"
              variant={"primary"}
            >
              {isPending ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                <span className="flex items-center gap-2">
                  <Ticket /> {t("apply_coupon")}
                </span>
              )}
            </Button>
          </div>

          {/* Feedback Messages */}
          {form.formState.errors.code && (
            <div className=" py-2">
              {/* Error validation */}
              <div className="relative">
                <CircleX className="absolute bg-white dark:bg-zinc-800 rounded-full w-fit -translate-y-1/2 left-1/2 -translate-x-1/2 z-10 text-maroon-600 dark:text-softPink-300" />
              </div>
              <Alert className="text-center border-maroon-600 dark:border-softPink-300 dark:bg-zinc-800">
                <AlertDescription className="text-zinc-700 dark:text-zinc-50">
                  {t("operationFailed")}
                </AlertDescription>
              </Alert>
            </div>
          )}

          {/* Error from server */}
          {error && (
            <Alert className=" text-center text-maroon-600 border border-maroon-600 dark:border-softPink-300 dark:bg-zinc-800 dark:text-softPink-300">
              <AlertDescription>{error.message}</AlertDescription>
            </Alert>
          )}
        </form>
      </FormProvider>
    </div>
  );
}
