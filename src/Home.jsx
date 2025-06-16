import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react'; // Using Lucide icons

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

const Home = ({ sidebarVisible }) => {
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
    <div className="min-h-screen w-screen bg-gradient-to-br from-blue-200 to-purple-300 text-white flex flex-col overflow-x-hidden">
      <div className="flex flex-1 md:flex-row">
        
        {/* Sidebar */}
        {sidebarVisible && (
          <aside className="w-full md:w-50 bg-transparent text-black p-4 md:block text-sm">
            <div className="space-y-2">
              <button className='hover:bg-white transition duration-200 cursor-pointer px-4 py-2 rounded-lg w-full text-left'>Search artist</button>
              <button className='hover:bg-white transition duration-200 cursor-pointer px-4 py-2 rounded-lg w-full text-left'>B</button>
              <button className='hover:bg-white transition duration-200 cursor-pointer px-4 py-2 rounded-lg w-full text-left'>C</button>
              <button className='hover:bg-white transition duration-200 cursor-pointer px-4 py-2 rounded-lg w-full text-left'>D</button>
            </div>
            <div className='mt-30'>
              <Link to="/profile" aria-label="View profile">
                <img src="src/assets/user.png" alt="profile" className="w-14 h-14 rounded-full hover:w-15 hover:h-15 transition duration-200" />
              </Link>
              <p className='text-gray-800 font-bold pl-3.5'>you</p>
            </div>
          </aside>
        )}

        {/* Main Content */}
        <main className="flex-1 bg-transparent p-6">
          <h1 className="text-3xl font-bold text-slate-900 mb-6 text-center">Explore Artworks</h1>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                  className="absolute top-3 right-3 bg-white p-1 rounded-full hover:bg-purple-100 transition"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      wishlist.includes(art.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
