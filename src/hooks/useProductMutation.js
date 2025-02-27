import { useMutation, useQueryClient } from "@tanstack/react-query";
import API from "../api/apiClient";

const useProductMutation = (product, onSuccess) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (formData) => {
      if (product) {
        return await API.post(`/supplier/products/${product.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        return await API.post("/supplier/products", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["supplierProducts"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      onSuccess();
    },
  });

  return mutation;
};

export default useProductMutation;
