import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { totalQuantity } = useCart();
  const { token, logout, role } = useAuth();

  const handleLogout = () => {
    logout();

    navigate("/");
  };

  return (
    <header>
      <nav>
        <Link to="/" className="hover:underline">
          Home
        </Link>

        {token ? (
          <>
            {role === "customer" && (
              <>
                <Link to="/orders" className="hover:underline">
                  Orders
                </Link>

                <Link to="/cart" className="hover:underline">
                  Cart {totalQuantity > 0 && `(${totalQuantity})`}
                </Link>
              </>
            )}

            {role === "supplier" && (
              <>
                <Link to="/supplier/orders" className="hover:underline">
                  Manage Orders
                </Link>

                <Link to="/supplier/products" className="hover:underline">
                  Manage Products
                </Link>
              </>
            )}

            <button onClick={handleLogout} className="hover:underline">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/user/login" className="hover:underline">
              Login
            </Link>
            <Link to="/user/register" className="hover:underline">
              Register
            </Link>
            <Link to="/supplier/login" className="hover:underline">
              Supplier Login
            </Link>
            <Link to="/supplier/register" className="hover:underline">
              Supplier Register
            </Link>
          </>
        )}
      </nav>

      <h2>🧵 Squeak Boutique</h2>
      <p>
        <i>"High-fashion for stylish rodents"</i>
      </p>
    </header>
  );
};

export default Navbar;
