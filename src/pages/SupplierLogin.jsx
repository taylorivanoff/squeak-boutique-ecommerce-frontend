import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import API from "../api/apiClient";
import { useAuth } from "../context/AuthContext";

const SupplierLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "supplier",
  });

  const loginMutation = useMutation({
    mutationFn: async (data) => {
      const response = await API.post("/login", data);
      login(response.data.data.token, response.data.data.user.role);
    },
    onSuccess: () => navigate("/"),
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation.mutate(formData);
  };

  return (
    <div>
      <h2>Supplier Login</h2>
      {loginMutation.isError && (
        <p className="notice">
          {loginMutation.error.response.data.data.message}
        </p>
      )}
      <form onSubmit={handleSubmit} method="post">
        <p>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
        </p>
        <p>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
        </p>
        <button type="submit" disabled={loginMutation.isPending}>
          {loginMutation.isPending ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default SupplierLogin;
