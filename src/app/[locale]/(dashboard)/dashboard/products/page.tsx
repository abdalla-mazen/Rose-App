import { BestSellingApi } from "@/lib/apis/product.api";
import ProductTable from "./_components/product-table";

export default async function page() {
  const products: Product[] = await BestSellingApi();

  return <ProductTable products={products} />;
}
