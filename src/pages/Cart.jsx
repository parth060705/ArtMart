import React from 'react';

const fallbackImage = 'https://via.placeholder.com/100x100?text=No+Image';

const generateMockItems = () => {
  const artworks = Array.from({ length: 6 }).map((_, idx) => ({
    id: idx + 1,
    name: `Artwork #${idx + 1}`,
    price: parseFloat((Math.random() * 100 + 20).toFixed(2)),
    quantity: 1,
    image: fallbackImage,
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

  const calculateTotal = () =>
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-blue-200 to-purple-300 py-10 px-6 sm:px-10 lg:px-20 font-sans">
      {/* HEADER */}
      <header className="max-w-7xl mx-auto mb-12 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-2">🎨 My Art Collection</h1>
        <p className="text-gray-600 text-lg">Curate your favorite artworks with ease</p>
      </header>

      {/* CART SECTION */}
      <section className="max-w-7xl mx-auto mb-16">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">🛒 Shopping Cart</h2>

        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-center">Your cart is currently empty.</p>
        ) : (
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row justify-between items-center bg-white rounded-xl shadow-lg p-6 transition hover:shadow-2xl"
              >
                <div className="flex items-center gap-6 w-full md:w-auto">
                  <img
                    src={item.image || fallbackImage}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg border"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-4 md:mt-0">
                  <button
                    onClick={() => onDecrease(item.id)}
                    className="bg-gray-100 hover:bg-gray-300 px-3 py-1 rounded-full text-lg"
                  >
                    −
                  </button>
                  <span className="min-w-[24px] text-center font-medium">{item.quantity}</span>
                  <button
                    onClick={() => onIncrease(item.id)}
                    className="bg-gray-100 hover:bg-gray-300 px-3 py-1 rounded-full text-lg"
                  >
                    +
                  </button>
                </div>

                <div className="flex items-center gap-4 mt-4 md:mt-0">
                  <button
                    onClick={() => onMoveToWishlist(item.id)}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Move to Wishlist
                  </button>
                  <button
                    onClick={() => onRemoveFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 text-lg"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {cartItems.length > 0 && (
          <div className="mt-10 text-right">
            <p className="text-2xl font-bold text-gray-800 mb-4">
              Total: ${calculateTotal()}
            </p>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-semibold transition">
              Proceed to Checkout
            </button>
          </div>
        )}
      </section>

      {/* WISHLIST SECTION */}
      <section className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">💖 Wishlist</h2>

        {wishlistItems.length === 0 ? (
          <p className="text-center text-gray-500">Your wishlist is empty.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className="bg-white p-5 rounded-xl shadow-md flex flex-col justify-between transition hover:shadow-xl"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image || fallbackImage}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg border"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">${item.price.toFixed(2)}</p>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-6">
                  <button
                    onClick={() => onMoveToCart(item.id)}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => onRemoveFromWishlist(item.id)}
                    className="text-red-500 hover:text-red-700 text-lg"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Cart;
