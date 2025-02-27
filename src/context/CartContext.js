import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useMemo } from "react";
import API from "../api/apiClient";
import { useAuth } from "./AuthContext";
import useCartMutations from "../hooks/useCartMutations";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { token, role } = useAuth();

  const fetchCart = async () => {
    const response = await API.get("/cart");
    return response.data.data;
  };

  const {
    data: cart = [],
    isPending,
    error,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: fetchCart,
    enabled: !!token && role !== "supplier",
  });

  const { addMutation, removeMutation } = useCartMutations();

  const totalQuantity = useMemo(
    () => cart?.reduce((sum, item) => sum + item.quantity, 0) || 0,
    [cart]
  );

  const subtotal = useMemo(
    () =>
      cart?.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      ) || 0,
    [cart]
  );

  return (
    <CartContext.Provider
      value={{
        cart: cart || [],
        totalQuantity,
        subtotal: Number(subtotal.toFixed(2)),
        addToCart: (item) => addMutation.mutate(item),
        removeFromCart: (item) => removeMutation.mutate(item),
        isPending,
        error,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
