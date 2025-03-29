import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { Cart, Home, ProductDetail } from "./pages";
import { ShoppingCartProvider } from "./context";

createRoot(document.getElementById("root")!).render(
  <ShoppingCartProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  </ShoppingCartProvider>
);
