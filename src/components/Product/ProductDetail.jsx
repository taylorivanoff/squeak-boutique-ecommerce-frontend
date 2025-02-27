import { Link, useParams } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useProducts } from "../../context/ProductContext";
import { useAuth } from "../../context/AuthContext";

const ProductDetail = () => {
  const { id } = useParams();
  const { products, isPending, error } = useProducts();
  const { addToCart } = useCart();
  const { token, role } = useAuth();

  const product = products?.find((p) => p.id.toString() === id);

  if (isPending) return <p>Loading product...</p>;
  if (error) return <p>Error loading product</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <article>
      <img alt={product.name} src={product.image_url} width={360} />
      <h4>{product.name}</h4>
      <h5>{product.supplier?.name}</h5>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <>
        {token && role === "customer" ? (
          <button onClick={() => addToCart(product)} disabled={isPending}>
            {isPending ? "Added to Cart" : "Add to Cart"}
          </button>
        ) : (
          <p>
            {!role && (
              <>
                <Link to="/user/login">Login</Link> or{" "}
                <Link to="/user/register">Register</Link> to add to cart
              </>
            )}
          </p>
        )}
      </>
    </article>
  );
};

export default ProductDetail;
