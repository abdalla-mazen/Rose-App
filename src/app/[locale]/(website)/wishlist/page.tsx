import getWishlist from "@/lib/apis/wishlist.api";
import { WishlistResponse } from "@/lib/types/wishlist";
import React from "react";
import CardWishlist from "./_components/card-wishlist";
import Subtitle from "@/components/shared/subtitle";
import { getTranslations } from "next-intl/server";
import EmptyWishlist from "./_components/empty-wishlist";

export default async function Page() {
  const t = await getTranslations();
  const data: WishlistResponse = await getWishlist();
  return (
    <>
      {data.count === 0 ? (
        <EmptyWishlist />
      ) : (
        <>
          <div className="text-center p-4 w-fit mx-auto">
            <Subtitle title={t("wishlist")} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-5 gap-9">
            <CardWishlist data={data} />
          </div>
        </>
      )}
    </>
  );
}
