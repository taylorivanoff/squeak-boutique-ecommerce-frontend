import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import API from "../api/apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Checkout = () => {
  const queryClient = useQueryClient();
  const { cart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    address: "",
    paymentMethod: "credit_card",
  });

  const checkout = async () => {
    const orderData = {
      address: formData.address,
      payment_method: formData.paymentMethod,
      items: cart.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
    };
    const response = await API.post("/checkout", orderData);
    return response.data;
  };

  const checkoutMutation = useMutation({
    mutationFn: checkout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    checkoutMutation.mutate();
    navigate("/order-success");
  };

  return (
    <div>
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <p>
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </p>
        <p>
          <label>Payment Method</label>
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
          >
            <option value="credit_card">Credit Card</option>
            <option value="paypal">PayPal</option>
          </select>
        </p>
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default Checkout;
