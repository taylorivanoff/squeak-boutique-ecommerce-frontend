import { useMutation, useQueryClient } from "@tanstack/react-query";
import API from "../api/apiClient";

const useDeleteProductMutation = (refetch) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => API.delete(`/supplier/products/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["supplierProducts"] });

      refetch();
    },
  });
};

export default useDeleteProductMutation;
