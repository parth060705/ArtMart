import React, { useState, useEffect } from "react";
import {
  useAdminUsers,
  useCreateUser,
  useUpdateUser,
  useDeleteUser,
} from "@/admin_hooks/userfetch";

const emptyUser = {
  name: "",
  email: "",
  username: "",
  location: "",
  gender: "",
  age: "",
  pincode: "",
  role: "",
  phone: "",
  password: "",
};

const UserManage = () => {
  const [form, setForm] = useState(emptyUser);
  const [editingId, setEditingId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState(null);

  const { data: users = [], isLoading } = useAdminUsers();
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();
  const deleteUser = useDeleteUser();

  const resetForm = () => {
    setForm(emptyUser);
    setEditingId(null);
    setError(null);
    setModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const formData = { ...form };
      if (editingId) {
        delete formData.password;
        await updateUser.mutateAsync({ id: editingId, user: formData });
      } else {
        if (!form.password) {
          setError("Password is required for new users.");
          return;
        }
        await createUser.mutateAsync(formData);
      }
      resetForm();
    } catch (err) {
      console.error(err);
      setError("Failed to save user. Please check your inputs.");
    }
  };

  const handleEdit = (user) => {
    const { id, ...rest } = user;
    setForm({ ...rest, password: "" });
    setEditingId(id);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUser.mutate(id);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
        <button
          onClick={() => {
            resetForm();
            setModalOpen(true);
          }}
          className="px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          + Add User
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-x-auto">
        {isLoading ? (
          <div className="p-6 text-gray-500">Loading users...</div>
        ) : (
          <table className="min-w-full text-sm text-gray-800">
            <thead className="bg-gray-100 text-left font-semibold">
              <tr>
                {[
                  "ID",
                  "Name",
                  "Email",
                  "Username",
                  "Location",
                  "Gender",
                  "Age",
                  "Pincode",
                  "Phone",
                  "Role",
                  "Actions",
                ].map((col) => (
                  <th key={col} className="p-3">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-3 text-xs">{user.id}</td>
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.username}</td>
                  <td className="p-3">{user.location}</td>
                  <td className="p-3">{user.gender}</td>
                  <td className="p-3">{user.age}</td>
                  <td className="p-3">{user.pincode}</td>
                  <td className="p-3">{user.phone}</td>
                  <td className="p-3">{user.role}</td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(user)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="11" className="p-4 text-center text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <div className="bg-white p-6 w-full max-w-3xl rounded shadow-lg relative">
            <h2 className="text-xl font-semibold mb-4">
              {editingId ? "Edit User" : "Add User"}
            </h2>
            {error && (
              <div className="text-red-600 bg-red-100 p-2 rounded mb-4">
                {error}
              </div>
            )}
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {Object.keys(emptyUser).map((key) => {
                if (key === "password" && editingId) return null;
                return (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-700 capitalize">
                      {key}
                    </label>
                    {key === "role" ? (
                      <select
                        name={key}
                        value={form[key]}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                      >
                        <option value="">Select</option>
                        <option value="User">User</option>
                        <option value="Admin">Admin</option>
                      </select>
                    ) : (
                      <input
                        type={
                          key === "age" || key === "pincode"
                            ? "number"
                            : key === "password"
                            ? "password"
                            : "text"
                        }
                        name={key}
                        value={form[key]}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    )}
                  </div>
                );
              })}
              <div className="col-span-full flex justify-end gap-4 mt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {editingId ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManage;
