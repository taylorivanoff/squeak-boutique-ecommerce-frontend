import { useQuery } from "@tanstack/react-query";
import API from "../api/apiClient";

const SupplierOrders = () => {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["supplierOrders"],
    queryFn: async () => {
      const response = await API.get("/supplier/orders");
      return response.data;
    },
  });

  if (isLoading) return <p>Loading orders...</p>;
  if (error) return <p>Error fetching orders.</p>;

  return (
    <div>
      <h3>Orders for Your Products</h3>
      {products.length === 0 ? (
        <p>You don't have any products listed for sale.</p>
      ) : (
        products.map((product) => (
          <div key={product.id}>
            {product.image_url && (
              <img alt={product.name} src={product.image_url} width={128} />
            )}
            <h4>{product.name}</h4>

            {product.orders?.length === 0 ? (
              <p>This product hasn't been ordered yet.</p>
            ) : (
              <>
                {product.orders.map((order) => (
                  <p key={order.id}>
                    <hr />

                    <strong>Order ID: {order.id}</strong>
                    <table>
                      <tbody>
                        <tr>
                          <td>Status</td>
                          <td>{order.status}</td>
                        </tr>
                        <tr>
                          <td>Supplier Amount</td>
                          <td>${order.supplier_amount}</td>
                        </tr>
                        <tr>
                          <td>Total Order Amount</td>
                          <td>${order.total_amount}</td>
                        </tr>
                        <tr>
                          <td>Delivery Address</td>
                          <td>{order.address}</td>
                        </tr>
                        <tr>
                          <td>Customer Name</td>
                          <td>{order.user.name}</td>
                        </tr>
                        <tr>
                          <td>Customer E-mail</td>
                          <td>{order.user.email}</td>
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
                      {order.items.map((item) => (
                        <tbody>
                          <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.pivot.quantity}</td>
                            <td>${item.pivot.price.toFixed(2)}</td>
                          </tr>
                        </tbody>
                      ))}
                    </table>
                    <hr />
                  </p>
                ))}
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default SupplierOrders;
