import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import { toastError } from "../util/toasty";

import { api } from "../services/api";
import { Product, Stock } from "../types";

interface CartProviderProps {
  children: ReactNode;
}

interface UpdateProductAmount {
  productId: number;
  amount: number;
}

interface CartContextData {
  cart: Product[];
  addProduct: (productId: number) => Promise<void>;
  removeProduct: (productId: number) => void;
  updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<Product[]>(() => {
    const storagedCart = localStorage.getItem("@RocketShoes:cart");
    if (storagedCart) {
      return JSON.parse(storagedCart);
    }
    return [];
  });

  const addProduct = async (productId: number) => {
    api
      .get(`/stock/${productId}`)
      .then((e) => {
        if (e.data.amount > 0) {
          api
            .get(`/products/${productId}`)
            .then((product) =>
              setCart(cart === [] ? [product.data] : [...cart, product.data])
            );
        }
      })
      .catch((_) => toastError("Não foi possivel adicionar ao carrinho"));
  };

  const removeProduct = (productId: number) => {
    let position = 0;
    for (let x in cart) {
      if (cart[x].id === productId) {
        position = parseInt(x);
        break;
      }
    }
    if (position !== 0) {
      const newCart = cart.splice(position, 1);
      setCart(newCart);
    }
    setCart([]);
  };

  const updateProductAmount = async ({
    productId,
    amount,
  }: UpdateProductAmount) => {
    try {
      // TODO
    } catch {
      // TODO
    }
  };
  useEffect(() => {
    localStorage.setItem("@RocketShoes:cart", JSON.stringify(cart));
  }, [cart]);
  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, updateProductAmount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}
