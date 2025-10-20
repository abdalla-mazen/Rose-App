import { BestSellingApi } from "@/lib/apis/product.api";
import React from "react";
import DisplayProduct from "../_components/display-product";

export default async function Page() {
  const products = await BestSellingApi();

  return (
    <div className="flex justify-center items-center mx-auto max-w-[1440px]">
      {/* <h1>Products Page</h1> */}

      <div className="grid grid-cols-3">
        {products.map((prod) => (
          <DisplayProduct key={prod._id} {...prod} />
        ))}
      </div>
    </div>
  );
}
