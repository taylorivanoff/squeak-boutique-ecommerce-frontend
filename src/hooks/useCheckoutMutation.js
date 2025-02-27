import { useMutation, useQueryClient } from "@tanstack/react-query";
import API from "../api/apiClient";

const useCheckoutMutation = () => {
  const queryClient = useQueryClient();

  const checkout = async (formData, cart) => {
    const orderData = {
      address: formData.address,
      payment_method: formData.paymentMethod,
      items: cart.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
    };
    const response = await API.post("/checkout", orderData);
    return response.data.data;
  };

  const checkoutMutation = useMutation({
    mutationFn: (variables) => checkout(variables.formData, variables.cart),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  return { checkoutMutation };
};

export default useCheckoutMutation;
