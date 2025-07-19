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
  phone: ""
};

const UserManage = () => {
  const [form, setForm] = useState(emptyUser);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  //  Fetch users
  const { data: users = [], isLoading } = useAdminUsers();

  //  Mutations
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();
  const deleteUser = useDeleteUser();

  const resetForm = () => {
    setForm(emptyUser);
    setEditingId(null);
    setShowForm(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      console.log("🔄 Updating:", editingId, form);
      updateUser.mutate({ id: editingId, user: form });
    } else {
      console.log(" Creating:", form);
      createUser.mutate(form);
    }

    resetForm();
  };

  const handleEdit = (user) => {
    const { id, ...rest } = user;
    setForm(rest);
    setEditingId(id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUser.mutate(id);
    }
  };

  useEffect(() => {
    if (updateUser.isError) {
      alert("Update failed. Check console.");
    }
    if (updateUser.isSuccess) {
      console.log(" Update success");
    }
  }, [updateUser.isError, updateUser.isSuccess]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">User Management</h1>

      <button
        onClick={() => {
          setForm(emptyUser);
          setEditingId(null);
          setShowForm(true);
        }}
        className="mb-6 px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        + Add User
      </button>

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
              {key === "role" ? (
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
                  type={key === "age" || key === "pincode" ? "number" : "text"}
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
              className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {editingId ? "Update User" : "Create User"}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-5 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="bg-white shadow rounded-lg overflow-x-auto">
        {isLoading ? (
          <div className="p-6 text-gray-500">Loading users...</div>
        ) : (
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
                <th className="p-4">Phone</th>
                <th className="p-4">Role</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t hover:bg-gray-50">
                  <td className="p-4 text-xs text-gray-700">{user.id}</td>
                  <td className="p-4">{user.name}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">{user.username}</td>
                  <td className="p-4">{user.location}</td>
                  <td className="p-4">{user.gender}</td>
                  <td className="p-4">{user.age}</td>
                  <td className="p-4">{user.pincode}</td>
                  <td className="p-4">{user.phone}</td>
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
        )}
      </div>
    </div>
  );
};

export default UserManage;
