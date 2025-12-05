import { Button } from "@/components/ui/button";
import { BestSellingApi } from "@/lib/apis/product.api";
import Link from "next/link";

export default async function page() {
  const products = await BestSellingApi();

  return (
    <div>
      <div className="flex">
        Products page
        <Link href="/dashboard/products/add-product">
          <Button>Add product</Button>
        </Link>
      </div>
      {products.map((prod) => (
        <ul className="flex gap-10">
          <li>{prod.title}</li>
          <li>{prod.price}</li>

          <Link href={`/dashboard/products/${prod._id}`}>
            <Button>Edit</Button>
          </Link>
          <Button>Delete</Button>
        </ul>
      ))}
    </div>
  );
}
