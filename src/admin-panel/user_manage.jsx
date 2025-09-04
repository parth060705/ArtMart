import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Toaster, toast } from "sonner";
import {
  useAdminUsers,
  useCreateUser,
  useUpdateUser,
  useDeleteUser,
} from "@/admin_hooks/userfetch";
import ProductSearchBar from "@/components/ProductSearchBar"; // ⬅️ adjust path if needed

const DEFAULT_IMAGE = "https://example.com/default.jpg";

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
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // search

  const { data: users = [], isLoading, refetch } = useAdminUsers();
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
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const formData = {
        ...form,
        role: form.role.toLowerCase(),
        profileImage: DEFAULT_IMAGE,
      };

      if (editingId) {
        delete formData.password;
        await updateUser.mutateAsync({ id: editingId, user: formData });
        toast.success("User updated successfully!");
      } else {
        if (!form.password) {
          setError("Password is required for new users.");
          return;
        }
        await createUser.mutateAsync(formData);
        toast.success("User created successfully!");
      }

      resetForm();
      await refetch();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save user.");
      setError("Failed to save user. Please check your inputs.");
    }
  };

  const handleEdit = (user) => {
    const { id, ...rest } = user;
    setForm({ ...rest, password: "" });
    setEditingId(id);
    setModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteUser.mutateAsync(confirmDeleteId);
      toast.success("User deleted successfully!");
      setConfirmDeleteId(null);
      await refetch();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete user.");
    }
  };

  // 🔍 Filter users by search
  const filteredUsers = users.filter((u) => {
    const q = searchQuery.toLowerCase();
    return (
      u.name?.toLowerCase().includes(q) ||
      u.email?.toLowerCase().includes(q) ||
      u.username?.toLowerCase().includes(q) ||
      u.location?.toLowerCase().includes(q) ||
      u.role?.toLowerCase().includes(q) ||
      u.phone?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Toaster richColors position="top-right" />
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-800">User Management</h1>

        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          {/* Search Bar */}
          <ProductSearchBar value={searchQuery} onChange={setSearchQuery} />

          <Button
            onClick={() => {
              resetForm();
              setModalOpen(true);
            }}
            className="px-1 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            + Add User
          </Button>
        </div>
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
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-t hover:bg-gray-50">
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
                      <Button
                        onClick={() => handleEdit(user)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => setConfirmDeleteId(user.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={11} className="p-4 text-center text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* User Form Modal */}
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
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    ) : key === "gender" ? (
                      <select
                        name={key}
                        value={form[key]}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                      >
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                        <option value="Prefer not to say">
                          Prefer not to say
                        </option>
                      </select>
                    ) : (
                      <input
                        type={key === "password" ? "password" : "text"}
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
                <Button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {editingId ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {confirmDeleteId && (
        <div className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
            <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
            <p className="mb-6 text-gray-700">
              Are you sure you want to delete this user?
            </p>
            <div className="flex justify-center gap-4">
              <Button
                onClick={() => setConfirmDeleteId(null)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </Button>
              <Button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Yes, Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManage;
