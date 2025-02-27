import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div>
      <h2>Order placed successfully!</h2>
      <p>Thank you for your order!</p>
      <Link to="/orders">Go to Orders</Link>
    </div>
  );
};

export default OrderSuccess;
