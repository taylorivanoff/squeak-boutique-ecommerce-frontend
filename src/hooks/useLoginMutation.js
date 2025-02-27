import { useMutation } from "@tanstack/react-query";
import API from "../api/apiClient";

const useLoginMutation = (login, onSuccess) => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await API.post("/login", data);
      login(response.data.data.token, response.data.data.user.role);
    },
    onSuccess,
  });
};

export default useLoginMutation;
