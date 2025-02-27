import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartProvider } from "./context/CartContext"; // Import your CartProvider
import { ProductProvider } from "./context/ProductContext"; // If you're also using ProductProvider
import { AuthProvider } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductDetail from "./components/Product/ProductDetail";

import UserLogin from "./pages/UserLogin";
import UserRegister from "./pages/UserRegister";
import UserOrders from "./pages/UserOrders";

import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";

import SupplierLogin from "./pages/SupplierLogin";
import SupplierRegister from "./pages/SupplierRegister";
import SupplierProductList from "./components/Product/SupplierProductList";
import SupplierProductForm from "./components/Product/SupplierProductForm";
import SupplierOrders from "./pages/SupplierOrders";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <ProductProvider>
            <Router>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/user/login" element={<UserLogin />} />
                <Route path="/user/register" element={<UserRegister />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/orders" element={<UserOrders />} />
                <Route path="/order-success" element={<OrderSuccess />} />
                <Route path="/supplier/login" element={<SupplierLogin />} />
                <Route
                  path="/supplier/register"
                  element={<SupplierRegister />}
                />
                <Route
                  path="/supplier/products"
                  element={<SupplierProductList />}
                />
                <Route
                  path="/supplier/products/create"
                  element={<SupplierProductForm />}
                />
                <Route path="/supplier/orders" element={<SupplierOrders />} />
              </Routes>
            </Router>
          </ProductProvider>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
