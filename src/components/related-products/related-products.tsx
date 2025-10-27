"use client";

import ProductsCarousel from "@/components/shared/products-carousel";
import { useRelatedProducts } from "./hooks/use-related-products";
import { useTranslations } from "next-intl";
import RelatedProductsSkeleton from "./_skeleton/related-products.skeleton";

export default function RelatedProducts({ productId }: { productId: string }) {
  // Translation
  const t = useTranslations();

  // hooks
  const { data, isLoading, error } = useRelatedProducts(productId);

  const relatedProducts = data.relatedProducts;

  // Don't render if loading or error
  if (isLoading) {
    return <RelatedProductsSkeleton />;
  }

  if (error) {
    return (
      <div className="mt-6 text-maroon-700 text-4xl text-center capitalize">
        {t("related-products-error")}
      </div>
    );
  }

  // Don't render if no products
  if (!relatedProducts || relatedProducts.length === 0) {
    return null;
  }

  return (
    <div className="mx-auto my-12 max-w-7xl">
      <h2 className="flex items-center gap-2 my-5 font-bold text-maroon-700 dark:text-softPink-200 text-4xl capitalize -translate-x-3">
        {t.rich("related-products", {
          span: (chunk) => (
            <span className="before:bottom-1 before:left-1 before:-z-10 before:absolute relative flex items-center gap-2 before:bg-softPink-100 before:dark:bg-zinc-700 py-1 ps-1 before:rounded-e-2xl before:w-[120%] before:h-4 rtl:before:-translate-x-12">
              {chunk}
            </span>
          ),
          span1: (chunk) => (
            <span className="after:block after:bg-softPink-600 dark:after:bg-softPink-500 after:w-1/2 after:h-[2px] after:content-[''] after:translate-y-1">
              {chunk}
            </span>
          ),
        })}
      </h2>

      <ProductsCarousel products={relatedProducts} />
    </div>
  );
}
