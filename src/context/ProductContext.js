import React, { createContext, useContext } from "react";
import API from "../api/apiClient";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./AuthContext";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const { token, role } = useAuth();

  const fetchProducts = async () => {
    const response = await API.get("/products");
    return response.data;
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
