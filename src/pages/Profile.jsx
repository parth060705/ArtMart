import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { updateProfile } from '../service/userService'; // Your update API
import userIcon from '../assets/user.png';

const Profile = () => {
  const { user, logout, refreshUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    profileImage: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profileImage') {
      setFormData((prev) => ({ ...prev, profileImage: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) payload.append(key, value);
      });

      await updateProfile(payload);
      await refreshUser();
      setEditing(false);
    } catch (err) {
      console.error('Update failed', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Profile Sidebar */}
          <div className="bg-purple-600 md:w-1/3 flex flex-col items-center justify-center text-white p-6">
            <img
              src={user?.profileImage || userIcon}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-white shadow-md mb-4 object-cover"
            />
            <h2 className="text-xl font-bold">{user?.name}</h2>
            <p className="text-sm">{user?.username}</p>
            <p className="text-xs text-purple-200 mt-1">{user?.email}</p>
          </div>

          {/* Profile Info */}
          <div className="flex-1 p-6 md:p-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Profile Information</h3>

            {editing ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm text-gray-600">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600">Shipping Address</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600">Profile Picture</label>
                  <input type="file" name="profileImage" onChange={handleChange} className="mt-1" />
                </div>
                <div className="flex gap-3">
                  <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                    Save
                  </button>
                  <button type="button" onClick={() => setEditing(false)} className="text-gray-600 hover:underline">
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-2">
                <p><strong>Name:</strong> {user?.name}</p>
                <p><strong>Email:</strong> {user?.email}</p>
                <p><strong>Phone:</strong> {user?.phone}</p>
                <p><strong>Address:</strong> {user?.address}</p>
              </div>
            )}

            {!editing && (
              <div className="flex flex-wrap gap-4 mt-6">
                <button
                  onClick={() => setEditing(true)}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                >
                  Edit Profile
                </button>
                <Link to="/cart">
                  <button className="border border-purple-600 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-100">
                    View Orders
                  </button>
                </Link>
                <Link to="/Artistdashboard">
                  <button className="border border-purple-600 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-100">
                    Artist Dashboard
                  </button>
                </Link>
                <button
                  onClick={logout}
                  className="text-red-500 px-4 py-2 rounded-lg hover:text-red-700 ml-auto"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
