import { LucideStar } from "lucide-react";
import { useProductReviews } from "../hooks/use-get-product-reviews";
import Image from "next/image";
import ReviewCardSkeleton from "../_skeletons/review-card.skeleton";

export default function ReviewCard({ productId }: { productId: string }) {
  // Hooks
  const { data, error, isLoading } = useProductReviews(productId);
  const productReviews = data?.reviews;

  // Handle loading state
  if (isLoading) {
    return <ReviewCardSkeleton />;
  }

  // Handle error state
  if (error) {
    return <div className="mt-6 text-maroon-700 text-4xl text-center">Something went wrong</div>;
  }

  return (
    <div className="mb-4 px-5 py-4 border-zinc-200 border-b w-[45rem] max-w-[45rem]">
      {productReviews?.map((productReview: Review) => (
        <>
          {/* Heading */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <Image
                src={productReview.user.photo}
                alt="user image"
                className="bg-maroon-600 pt-1.5 rounded-full w-11 h-11 font-semibold text-white text-xl text-center"
                width={45}
                height={45}
              />

              <div className="flex flex-col gap-0.5 font-semibold text-zinc-800 text-base">
                <span className="text-zinc-800 dark:text-zinc-50">
                  {productReview.user.firstName}
                </span>
                <span className="text-zinc-400">
                  {new Date(productReview.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1 my-2.5">
              <div className="flex items-center gap-0.5 my-2.5">
                {Array.from({ length: productReview.rating }).map((_, index) => (
                  <span key={index}>
                    <LucideStar size={20} className="fill-yellow-500 border-none text-yellow-500" />
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <span className="font-semibold text-base">{productReview.title}</span>
            <p>{productReview.comment}</p>
          </div>
        </>
      ))}
    </div>
  );
}
