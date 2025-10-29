import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import RatingStarts from "./rating-stars";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductReviewScheme, useProductReviewScheme } from "@/lib/schemes/product-review.scheme";
import { useSendProductReview } from "../hooks/use-send-product-review";

export default function ReviewForm({ productId }: { productId: string }) {
  // Translation
  const t = useTranslations();

  // State
  const [ratingChange, setRatingChange] = useState<number>(0);

  // Hooks

  // Check authentication
  const { data: session } = useSession();

  // Scheme
  const scheme = useProductReviewScheme();

  // Mutation
  const reviewMutation = useSendProductReview();

  // Form
  const form = useForm<ProductReviewScheme>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      title: "",
      comment: "",
    },
    resolver: zodResolver(scheme),
  });

  // Functions
  const onRatingChange = (rate: number) => {
    setRatingChange(rate);
  };

  const onSubmit: SubmitHandler<ProductReviewScheme> = (data) => {
    // Validate rating before submission
    if (ratingChange === 0) {
      alert(t("validating-rating"));
      return;
    }

    // Data
    const reviewData = {
      product: productId[0],
      rating: ratingChange,
      title: data.title,
      comment: data.comment,
    };

    reviewMutation.mutate(reviewData, {
      onSuccess: () => {
        form.reset();
        setRatingChange(0);
      },
      onError: (error) => {
        console.error("Review submission failed:", error);
        alert("Failed to submit review. Please try again.");
      },
    });
  };

  return (
    <div className="relative p-2">
      {/* Actual form (blurred when unauthenticated) */}
      <div className={` ${!session ? "blur-sm" : ""}`}>
        <RatingStarts onRatingChange={onRatingChange} />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
            {/* Title form field */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-sm capitalize">
                    {t("review-title")}
                  </FormLabel>
                  <FormControl>
                    <Input type="text" placeholder={t("review-title-placeholder")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Comment field */}
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-sm capitalize">
                    {t("review-comment")}
                  </FormLabel>
                  <FormControl>
                    <Textarea placeholder={t("review-comment-placeholder")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              variant="primary"
              type="submit"
              disabled={reviewMutation.isPending || ratingChange === 0}
            >
              {reviewMutation.isPending ? t("submitting") : t("add-review")}
            </Button>
          </form>
        </Form>
      </div>

      {/* Overlay message */}
      {!session && (
        <div className="absolute inset-0 flex justify-center items-center rounded-lg">
          <p className="px-4 font-semibold text-zinc-800 dark:text-zinc-200 text-base text-center capitalize">
            {t("add-review-overlay")}
          </p>
        </div>
      )}
    </div>
  );
}
