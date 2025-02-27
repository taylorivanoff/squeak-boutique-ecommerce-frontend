import { useProducts } from "../../context/ProductContext";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const { products, isPending, error } = useProducts();

  if (isPending) return <div>Loading products...</div>;
  if (error) return <div>Error loading products</div>;

  return (
    <div>
      <h3>All products</h3>
      <div>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
