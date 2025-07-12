import React, { useEffect, useState } from 'react';
import api from '../service/admin_api'; // Your custom API handler

// Template for an empty user
const emptyUser = {
  name: '',
  email: '',
  username: '',
  location: '',
  gender: '',
  age: '',
  pincode: '',
  role: '',
};

const UserManage = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState(emptyUser);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Fetch users from the server
  const fetchUsers = async () => {
    try {
      const res = await api.get('/users');
      setUsers(res.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission (create or update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/users/${editingId}`, form);
      } else {
        await api.post('/users', form);
      }
      setForm(emptyUser);
      setEditingId(null);
      setShowForm(false);
      fetchUsers();
    } catch (err) {
      console.error('Error saving user:', err);
    }
  };

  // Trigger editing
  const handleEdit = (user) => {
    const { id, ...rest } = user;
    setForm(rest);
    setEditingId(id);
    setShowForm(true);
  };

  // Handle user deletion
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await api.delete(`/users/${id}`);
      fetchUsers();
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  // Open empty form for new user
  const openCreateForm = () => {
    setForm(emptyUser);
    setEditingId(null);
    setShowForm(true);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">User Management</h1>

      <button
        onClick={openCreateForm}
        className="mb-6 px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
      >
        + Add User
      </button>

      {/* User Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-10 p-6 bg-white shadow rounded grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {Object.keys(emptyUser).map((key) => (
            <div key={key}>
              <label className="block mb-1 text-sm font-medium text-gray-700 capitalize">
                {key}
              </label>
              {key === 'role' ? (
                <select
                  name="role"
                  value={form.role}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                </select>
              ) : (
                <input
                  type={key === 'age' ? 'number' : 'text'}
                  name={key}
                  value={form[key]}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              )}
            </div>
          ))}
          <div className="col-span-full flex gap-4 justify-end">
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              {editingId ? 'Update User' : 'Create User'}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-5 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* User Table */}
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full text-sm text-gray-800">
          <thead className="bg-gray-100 text-left font-semibold">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Username</th>
              <th className="p-4">Location</th>
              <th className="p-4">Gender</th>
              <th className="p-4">Age</th>
              <th className="p-4">Pincode</th>
              <th className="p-4">Role</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t hover:bg-gray-50">
                <td className="p-4 text-xs text-gray-700 break-all">{user.id}</td>
                <td className="p-4">{user.name}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">{user.username}</td>
                <td className="p-4">{user.location}</td>
                <td className="p-4">{user.gender}</td>
                <td className="p-4">{user.age}</td>
                <td className="p-4">{user.pincode}</td>
                <td className="p-4">{user.role}</td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(user)}
                      className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="10" className="p-4 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManage;
