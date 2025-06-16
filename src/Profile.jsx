import React from 'react';

const Profile = () => {
  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-blue-200 to-purple-300 text-white py-10">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden transition hover:shadow-2xl">
        <div className="flex flex-col items-center px-6 py-8 text-center">
          <img
            className="w-20 h-20 rounded-full border-4 border-purple-300 object-cover mb-4"
            src="src\assets\user.png"
            alt="User Profile"
          />
          <h2 className="text-xl font-bold text-gray-800">Parth Gharat</h2>
          <p className="text-sm text-gray-500 mb-1">parth.gharat@example.com</p>
          <p className="text-sm text-gray-500">+91 9876543210</p>

          <div className="mt-6 w-full text-left">
            <h3 className="text-md font-semibold text-gray-700 mb-2">Shipping Address</h3>
            <p className="text-sm text-gray-600">
              19A, Sunshine Building,<br />
              Opp: Domino's Pizza, 1st Cross Road,<br />
              Lokhandwala Market, Andheri West,<br />
              Mumbai, Maharashtra 400053
            </p>
          </div>

          <div className="mt-6 w-full text-left">
            <h3 className="text-md font-semibold text-gray-700 mb-2">Recent Orders</h3>
            <p className="text-sm text-gray-600 italic">You haven't placed any orders yet.</p>
          </div>

          <div className="flex gap-4 mt-8">
            <button className="bg-purple-500 text-white px-4 py-2 rounded-full text-sm hover:bg-purple-600 transition">
              Edit Profile
            </button>
            <button className="border border-purple-500 text-purple-500 px-4 py-2 rounded-full text-sm hover:bg-purple-100 transition">
              View Orders
            </button>
          </div>
          <div>
            <button className="text-red-500 px-4 py-2 rounded-full text-sm hover:text-red-700 transition">
              sign out
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
