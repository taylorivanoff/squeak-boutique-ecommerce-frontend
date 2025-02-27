import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, useMemo } from "react";
import API from "../api/apiClient";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const { token, role } = useAuth();

  // Fetch cart
  const fetchCart = async () => {
    const response = await API.get("/cart");
    return response.data;
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

  // Add items to cart
  const add = async (item) => {
    const response = await API.post("/cart/add", {
      product_id: item.id,
      quantity: 1,
    });
    return response.data;
  };

  const addMutation = useMutation({
    mutationFn: add,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  // Remove items from cart
  const remove = async (item) => {
    const response = await API.post("/cart/remove", {
      product_id: item.product_id,
      quantity: 1,
    });
    return response.data;
  };

  const removeMutation = useMutation({
    mutationFn: remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  // Calculate total quantity and subtotal
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
