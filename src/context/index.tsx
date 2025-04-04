import { createContext, useState } from "react";
import { ProductProps } from "../types/product";

interface UserInfo {
  name: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
}

interface ShoppingCartContextProps {
  cartProducts: ProductProps[];
  setCartProducts: React.Dispatch<React.SetStateAction<ProductProps[]>>;
  userInfo: UserInfo | null;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo | null>>;
  checkoutComplete: boolean;
  setCheckoutComplete: React.Dispatch<React.SetStateAction<boolean>>;
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
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [checkoutComplete, setCheckoutComplete] = useState<boolean>(false);

  return (
    <ShoppingCartContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        userInfo,
        setUserInfo,
        checkoutComplete,
        setCheckoutComplete,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
