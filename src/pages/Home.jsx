// src/pages/Home.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';

const artworksData = [
   {
    id: 1,
    name: 'Sunset Dreams',
    price: 1200,
    image: 'https://via.placeholder.com/300x200?text=Sunset+Dreams',
  },
  {
    id: 2,
    name: 'Cosmic Whispers',
    price: 1800,
    image: 'https://via.placeholder.com/300x200?text=Cosmic+Whispers',
  },
  {
    id: 3,
    name: 'Cityscape Lights',
    price: 950,
    image: 'https://via.placeholder.com/300x200?text=Cityscape+Lights',
  },
  {
    id: 4,
    name: 'Dream Forest',
    price: 1450,
    image: 'https://via.placeholder.com/300x200?text=Dream+Forest',
  },
  {
    id: 5,
    name: 'Dream Forest',
    price: 1550,
    image: 'https://via.placeholder.com/300x200?text=Dream+Forest',
  },
  {
    id: 6,
    name: 'Dream Forest',
    price: 1460,
    image: 'https://via.placeholder.com/300x200?text=Dream+Forest',
  },
];

const Home = () => {
  const [wishlist, setWishlist] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const addToCart = (artwork) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === artwork.id);
      if (existing) {
        return prev.map((item) =>
          item.id === artwork.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { ...artwork, quantity: 1 }];
      }
    });
    alert(`${artwork.name} added to cart`);
  };

  return (
    <div className="w-full min-h-screen grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 py-6">
      {artworksData.map((art) => (
        <div
          key={art.id}
          className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 relative"
        >
          <Link to={`/art/${art.id}`}>
            <img src={art.image} alt={art.name} className="w-full h-48 object-cover" />
          </Link>
          <div className="p-4 space-y-1">
            <Link to={`/art/${art.id}`}>
              <h2 className="text-lg font-semibold text-gray-800">{art.name}</h2>
            </Link>
            <p className="text-purple-600 font-bold">₹{art.price}</p>
            <button
              onClick={() => addToCart(art)}
              className="mt-2 flex items-center gap-2 bg-purple-500 text-white text-sm px-4 py-2 rounded-full hover:bg-purple-600 transition"
            >
              <ShoppingCart className="w-4 h-4" /> Add to Cart
            </button>
          </div>
          <button
            onClick={() => toggleWishlist(art.id)}
            className="absolute top-3 right-3"
          >
            <Heart
              className={`w-5 h-5 ${wishlist.includes(art.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'
                }`}
            />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Home;
