import CardProduct from "./card-product";

interface ProductsListProps {
  products: Product[];
}

export default function ProductsList({ products }: ProductsListProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {/* loop over products */}
      {products.map((product) => (
        <CardProduct key={product._id} product={product} />
      ))}
    </div>
  );
}
