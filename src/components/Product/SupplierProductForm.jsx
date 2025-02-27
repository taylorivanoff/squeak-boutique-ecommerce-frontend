import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useProductMutation from "../../hooks/useProductMutation";

const SupplierProductForm = ({ product, onSuccess }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: product ? product.name : "",
    price: product ? product.price : "",
    description: product ? product.description : "",
    image: null,
  });

  const mutation = useProductMutation(product, () => {
    setFormData({
      name: product ? formData.name : product.name,
      price: product ? formData.price : product.price,
      description: product ? formData.description : product.description,
      image: null,
    });
  });

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("name", formData.name);
    data.append("price", formData.price);
    data.append("description", formData.description);

    if (formData.image) {
      data.append("image", formData.image);
    }

    mutation.mutate(data);

    navigate("/supplier/products");
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>
        <label htmlFor="name">Product Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Product Name"
          required
        />
      </p>
      <p>
        <label htmlFor="name">Price</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          required
        />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          value={formData.description || ""}
          onChange={handleChange}
          placeholder="Description"
        ></textarea>
      </p>
      <p>
        <label htmlFor="image">Photo</label>
        <input type="file" name="image" onChange={handleChange} />
      </p>
      <button type="submit">
        {mutation.isPending
          ? product
            ? "Updating..."
            : "Adding..."
          : product
          ? "Update Product"
          : "Add Product"}{" "}
      </button>
    </form>
  );
};

export default SupplierProductForm;
