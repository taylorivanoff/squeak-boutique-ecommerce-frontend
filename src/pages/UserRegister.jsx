import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import API from "../api/apiClient";
import { useAuth } from "../context/AuthContext";

const UserRegister = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });

  const registerMutation = useMutation({
    mutationFn: async (data) => {
      const response = await API.post("/register", data);
      login(response.data.data.token, response.data.data.user.role);
    },
    onSuccess: () => navigate("/"),
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerMutation.mutate(formData);
  };

  return (
    <div>
      <h2>Register</h2>
      {registerMutation.isError && (
        <p className="notice">{registerMutation.error.response.data.message}</p>
      )}
      <form onSubmit={handleSubmit}>
        <p>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            required
          />
        </p>
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

        <button type="submit" disabled={registerMutation.isPending}>
          {registerMutation.isPending ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default UserRegister;
