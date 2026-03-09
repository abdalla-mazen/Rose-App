import CardProduct from "./card-product";

interface ProductsListProps {
 message?: string,
  metadata?: { currentPage: number, totalPages: number, limit:   number, totalItems: number },
  products: { products: Product[] };
}

export default function ProductsList({ products }: ProductsListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full md:w-2/3 md:mx-auto p-3 md:gap-5">
      {/* loop over products */}
      {products?.products.map((product) => (
        <CardProduct key={product._id} product={product} />
      ))}
    </div>
  );
}
