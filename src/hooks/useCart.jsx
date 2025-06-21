// src/hooks/useCart.js
import { useContext } from 'react';
import { CartContext } from '../context/Cartcontext';

const useCart = () => {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    updateQuantity,
    getCartTotal,
  } = useContext(CartContext);

  return {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    updateQuantity,
    getCartTotal,
  };
};

export default useCart;
