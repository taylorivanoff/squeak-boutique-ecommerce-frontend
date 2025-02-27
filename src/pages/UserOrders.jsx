import React from "react";
import { useQuery } from "@tanstack/react-query";
import API from "../api/apiClient";

const UserOrders = () => {
  const {
    data: orders = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const response = await API.get("/orders");
      return response.data.data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching orders.</div>;
  }

  return (
    <div>
      <h3>Your Orders</h3>
      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <>
          {orders.map((order) => (
            <div key={order.id}>
              <strong>Order ID: {order.id}</strong>
              <table>
                <tbody>
                  <tr>
                    <td>Status</td>
                    <td>{order.status}</td>
                  </tr>
                  <tr>
                    <td>Total Order Amount</td>
                    <td>${order.total_amount.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td>Payment Method</td>
                    <td>{order.payment_method}</td>
                  </tr>
                  <tr>
                    <td>Delivery Address</td>
                    <td>{order.address}</td>
                  </tr>
                </tbody>
              </table>
              <strong>Products</strong>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.order_item.quantity}</td>
                      <td>${item.order_item.sold_at_price.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <hr />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default UserOrders;
