import { useMutation, useQueryClient } from "@tanstack/react-query";
import API from "../api/apiClient";

const useCartMutations = () => {
  const queryClient = useQueryClient();

  const add = async (item) => {
    const response = await API.post("/cart/add", {
      product_id: item.id,
      quantity: 1,
    });
    return response.data.data;
  };

  const remove = async (item) => {
    const response = await API.post("/cart/remove", {
      product_id: item.product_id,
      quantity: 1,
    });
    return response.data.data;
  };

  const addMutation = useMutation({
    mutationFn: add,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const removeMutation = useMutation({
    mutationFn: remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  return { addMutation, removeMutation };
};

export default useCartMutations;