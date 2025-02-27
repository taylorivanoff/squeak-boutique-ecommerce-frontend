import React, { createContext, useContext } from "react";
import API from "../api/apiClient";
import { useQuery } from "@tanstack/react-query";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const fetchProducts = async () => {
    const response = await API.get("/products");
    return response.data.data;
  };

  const {
    data: products = [],
    isPending,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  return (
    <ProductContext.Provider value={{ products, error, isPending }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
