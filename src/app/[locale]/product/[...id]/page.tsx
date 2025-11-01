import ProductReviews from "../../products/[...id]/_components/product-reviews/_components/product-reviews";
import RelatedProducts from "../../products/[...id]/_components/related-products/related-products";

export default function RelatedProductsPage({ params }: { params: { id: string } }) {
  const productId = params.id;

  return (
    <div>
      <ProductReviews productId={productId} />
      <RelatedProducts productId={productId} />
    </div>
  );
}
