import React, { Suspense } from "react";
import { AddressSkeleton } from "@/components/skeletons/address.skeletons";
import { GetAddress } from "@/lib/apis/get-address.api";
import CheckoutSteps from "./_components/checkout-step";

async function CheckoutWithData() {
  const addresses = (await GetAddress()) ?? [];
  return <CheckoutSteps addresses={addresses} />;
}

export default function Page() {
  return (
    <div className="flex w-7xl gap-6 mx-20 mt-16 py-5">
      <div className="w-full ">
        <Suspense fallback={<AddressSkeleton />}>
          <CheckoutWithData />
        </Suspense>
      </div>
    </div>
  );
}
