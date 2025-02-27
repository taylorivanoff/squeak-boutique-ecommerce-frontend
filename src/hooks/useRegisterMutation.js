import { useMutation } from "@tanstack/react-query";
import API from "../api/apiClient";

const useRegisterMutation = (login, onSuccess) => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await API.post("/register", data);
      login(response.data.data.token, response.data.data.user.role);
    },
    onSuccess,
  });
};

export default useRegisterMutation;
