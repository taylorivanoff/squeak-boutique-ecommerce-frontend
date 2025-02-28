import { useQuery } from "@tanstack/react-query";
import SupplierProductForm from "./SupplierProductForm";
import API from "../../api/apiClient";
import { Link } from "react-router-dom";
import useDeleteProductMutation from "../../hooks/useDeleteProductMutation";

const SupplierProductList = () => {
  const { data: products = [], refetch } = useQuery({
    queryKey: ["supplierProducts"],
    queryFn: () => API.get("/supplier/products").then((res) => res.data.data),
  });

  const deleteMutation = useDeleteProductMutation(refetch);

  return (
    <div>
      <h2>Your Products</h2>
      <Link to="/supplier/products/create">Add New Product</Link>
      <section>
        {products.map((product) => (
          <div key={product.id}>
            {product.image_url && (
              <img alt={product.name} src={product.image_url} width={128} />
            )}
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
            <button onClick={() => deleteMutation.mutate(product.id)}>
              Delete
            </button>
            <SupplierProductForm product={product} onSuccess={refetch} /> <hr />
          </div>
        ))}
      </section>
    </div>
  );
};

export default SupplierProductList;
