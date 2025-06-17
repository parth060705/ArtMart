import React from 'react';

// Utility function to generate mock artworks
const generateMockItems = () => {
  const artworks = Array.from({ length: 6 }).map((_, idx) => ({
    id: idx + 1,
    name: `Artwork #${idx + 1}`,
    price: parseFloat((Math.random() * 100 + 20).toFixed(2)),
    quantity: 1,
    image: `https://picsum.photos/300/200`,
  }));

  return {
    cart: artworks.slice(0, 3),
    wishlist: artworks.slice(3),
  };
};

const Cart = ({
  cartItems: propCartItems = [],
  wishlistItems: propWishlistItems = [],
  onIncrease = () => {},
  onDecrease = () => {},
  onRemoveFromCart = () => {},
  onMoveToWishlist = () => {},
  onRemoveFromWishlist = () => {},
  onMoveToCart = () => {},
}) => {
  const mock = generateMockItems();

  const cartItems =
    Array.isArray(propCartItems) && propCartItems.length > 0
      ? propCartItems
      : mock.cart;

  const wishlistItems =
    Array.isArray(propWishlistItems) && propWishlistItems.length > 0
      ? propWishlistItems
      : mock.wishlist;

  const calculateTotal = () => {
    return cartItems
      .reduce((sum, item) => sum + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div className="p-6 w-screen min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 space-y-10">
      {/* Cart Section */}
      <section>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">🛒 Your Orders</h2>
        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center p-4 bg-white rounded-xl shadow"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onDecrease(item.id)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    −
                  </button>
                  <span className="min-w-[20px] text-center">{item.quantity}</span>
                  <button
                    onClick={() => onIncrease(item.id)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                  <button
                    onClick={() => onMoveToWishlist(item.id)}
                    className="text-blue-500 hover:text-blue-700 ml-2"
                    title="Move to Wishlist"
                  >
                    ♡
                  </button>
                  <button
                    onClick={() => onRemoveFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 ml-2"
                    title="Remove from Cart"
                  >
                    ✕
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {cartItems.length > 0 && (
          <div className="mt-6">
            <div className="flex justify-between font-semibold text-lg">
              <span>Total:</span>
              <span>${calculateTotal()}</span>
            </div>
            <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
              Proceed to Checkout
            </button>
          </div>
        )}
      </section>

      {/* Wishlist Section */}
      <section>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">💖 Your Wishlist</h2>
        {wishlistItems.length === 0 ? (
          <p className="text-gray-500">Your wishlist is empty.</p>
        ) : (
          <ul className="space-y-4">
            {wishlistItems.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center p-4 bg-white rounded-xl shadow"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onMoveToCart(item.id)}
                    className="text-green-600 hover:text-green-800"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => onRemoveFromWishlist(item.id)}
                    className="text-red-500 hover:text-red-700 ml-2"
                  >
                    ✕
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default Cart;
