import { createContext, useState } from "react";
import { ProductProps } from "../types/product";

interface ShoppingCartContextProps {
  cartProducts: ProductProps[];
  setCartProducts: React.Dispatch<React.SetStateAction<ProductProps[]>>;
}

export const ShoppingCartContext = createContext<ShoppingCartContextProps>(
  {} as ShoppingCartContextProps
);

interface ShoppingCartProviderProps {
  children: React.ReactNode;
}

export const ShoppingCartProvider = ({
  children,
}: ShoppingCartProviderProps) => {
  const [cartProducts, setCartProducts] = useState<ProductProps[]>([]);

  return (
    <ShoppingCartContext.Provider value={{ cartProducts, setCartProducts }}>
      {children}
    </ShoppingCartContext.Provider>
  );
};
