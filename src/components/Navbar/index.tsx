import { Link } from "react-router";
import CartItem from "../CartItem";
import { useContext } from "react";
import { ShoppingCartContext } from "../../context";

export default function Navbar() {
  const context = useContext(ShoppingCartContext);

  return (
    <nav className="py-6 border-b border-gray-200 mb-6">
      <ul className="flex gap-6 justify-end">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart" className="relative">
          <CartItem />
          <span className="bg-red-400 text-white px-2 py-1 rounded-full text-sm absolute -top-5  -right-3">
            {context.cartProducts.length}
          </span>
        </Link>
      </ul>
    </nav>
  );
}
