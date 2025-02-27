import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const CartPage = () => {
  const { cart, removeFromCart, isPending, error, subtotal } = useCart();

  if (isPending || !cart) return <p>Loading cart...</p>;
  if (error) return <p>Error loading cart</p>;

  return (
    <div>
      <h3>Your Cart</h3>
      {cart.length === 0 ? (
        <p>Your cart is empty. Add some products!</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id}>
              <img
                alt={item.product.name}
                src={item.product.image_url}
                width={64}
              />
              <p>
                {item.product.supplier.name} - {item.product.name} - $
                {item.product.price} - Qty: {item.quantity}
                {"   "}
                <button onClick={() => removeFromCart(item)}>X</button>
              </p>
            </div>
          ))}
        </div>
      )}
      {cart.length > 0 && (
        <>
          <h5>Subtotal ${subtotal}</h5>

          <Link to="/checkout">
            <button>Proceed to Checkout</button>
          </Link>
        </>
      )}
    </div>
  );
};

export default CartPage;
