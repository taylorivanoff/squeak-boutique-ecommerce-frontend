import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useRegisterMutation from "../hooks/useRegisterMutation";

const UserRegister = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });

  const onSuccess = () => {
    navigate("/");
  };

  const registerMutation = useRegisterMutation(login, onSuccess); 

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
