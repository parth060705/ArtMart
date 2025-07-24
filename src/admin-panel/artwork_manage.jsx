import React, { useState } from "react";
import {
  useAdminArtworks,
  useDeleteArtwork,
  useUpdateArtwork,
} from "@/admin_hooks/artworkfetch";

const emptyArtwork = {
  id: "",
  title: "",
  description: "",
  price: "",
  category: "",
  isSold: false,
  images: [],
  file: null,
  artistId: "",
  artist: {
    username: "",
    profileImage: "",
  },
  createdAt: "",
};

const ArtworkManage = () => {
  const [form, setForm] = useState(emptyArtwork);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const { data: artworks = [], isLoading, refetch } = useAdminArtworks();
  const deleteArtwork = useDeleteArtwork();
  const updateArtwork = useUpdateArtwork();

  const handleEdit = (art) => {
    setForm({ ...emptyArtwork, ...art, isSold: Boolean(art.isSold), file: null });
    setEditingId(art.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this artwork?")) {
      deleteArtwork.mutate(id, {
        onSuccess: () => refetch(),
      });
    }
  };

  const openCreateForm = () => {
    setForm(emptyArtwork);
    setEditingId(null);
    setShowForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setForm({ ...form, [name]: checked });
    } else if (type === "file") {
      setForm({ ...form, file: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      const updatedData = { ...form };
      delete updatedData.file;
      updateArtwork.mutate(
        { id: editingId, artwork: updatedData },
        {
          onSuccess: () => {
            alert("Artwork updated!");
            setShowForm(false);
            setForm(emptyArtwork);
            setEditingId(null);
            refetch();
          },
          onError: (err) => {
            console.error("❌ Update failed:", err);
            alert("Failed to update artwork.");
          },
        }
      );
    } else {
      alert("🔧 Create functionality not implemented yet.");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Artwork Management</h1>
        <button
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium"
          onClick={openCreateForm}
        >
          + Add Artwork
        </button>
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 relative">
            <h2 className="text-xl font-semibold mb-4">
              {editingId ? "Edit Artwork" : "Add Artwork"}
            </h2>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={form.title}
                  onChange={handleInputChange}
                  className="border p-2 rounded w-full"
                  required
                />
                <input
                  type="text"
                  name="category"
                  placeholder="Category"
                  value={form.category}
                  onChange={handleInputChange}
                  className="border p-2 rounded w-full"
                />
                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={form.price}
                  onChange={handleInputChange}
                  className="border p-2 rounded w-full"
                />
                <input
                  type="text"
                  name="artistId"
                  placeholder="Artist ID"
                  value={form.artistId}
                  onChange={handleInputChange}
                  className="border p-2 rounded w-full"
                />
                <div className="flex items-center space-x-2 col-span-2">
                  <label className="text-sm">Sold:</label>
                  <input
                    type="checkbox"
                    name="isSold"
                    checked={form.isSold}
                    onChange={handleInputChange}
                  />
                </div>
                <input
                  type="file"
                  name="file"
                  onChange={handleInputChange}
                  className="border p-2 rounded w-full col-span-2"
                />
              </div>
              <textarea
                name="description"
                rows={3}
                placeholder="Description"
                value={form.description}
                onChange={handleInputChange}
                className="border p-2 rounded w-full"
              ></textarea>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
                >
                  {editingId ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        {isLoading ? (
          <div className="p-6 text-gray-500 animate-pulse">Loading artworks...</div>
        ) : (
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                {[
                  "ID",
                  "Title",
                  "Description",
                  "Price",
                  "Category",
                  "Sold",
                  "Artist Name",
                  // "Artist Logo",
                  "Artist ID",
                  "Created At",
                  "Images",
                  "Actions",
                ].map((head) => (
                  <th key={head} className="px-4 py-3 text-left whitespace-nowrap">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {artworks.map((art) => (
                <tr key={art.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3">{art.id}</td>
                  <td className="px-4 py-3 font-medium">{art.title}</td>
                  <td className="px-4 py-3 max-w-xs truncate">{art.description}</td>
                  <td className="px-4 py-3 text-green-700 font-semibold">{art.price}</td>
                  <td className="px-4 py-3">{art.category}</td>
                  <td className="px-4 py-3">
                    {art.isSold ? (
                      <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-semibold">
                        Sold
                      </span>
                    ) : (
                      <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs font-semibold">
                        Available
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">{art.artist?.username || "—"}</td>
                  {/* <td className="px-4 py-3">
                    {art.artist?.profileImage ? (
                      <img
                        src={
                          art.artist.profileImage.startsWith("http")
                            ? art.artist.profileImage
                            : `${import.meta.env.VITE_API_URL}/media/${art.artist.profileImage}`
                        }
                        alt="Artist"
                        className="w-10 h-10 rounded-full object-cover border shadow"
                      />
                    ) : (
                      <span className="text-gray-400 text-xs">No image</span>
                    )}
                  </td> */}
                  <td className="px-4 py-3">{art.artistId || "—"}</td>
                  <td className="px-4 py-3">
                    {art.createdAt ? new Date(art.createdAt).toLocaleDateString() : "—"}
                  </td>
                  <td className="px-4 py-3 max-w-[120px]">
                    {art.images?.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {art.images.slice(0, 2).map((img, i) => (
                          <img
                            key={i}
                            src={
                              img.startsWith("http")
                                ? img
                                : `${import.meta.env.VITE_API_URL}/media/${img}`
                            }
                            alt="Artwork"
                            className="w-10 h-10 object-cover rounded shadow-sm"
                          />
                        ))}
                        {art.images.length > 2 && (
                          <span className="text-xs text-gray-500">+{art.images.length - 2}</span>
                        )}
                      </div>
                    ) : (
                      <span className="text-gray-400 text-xs">No image</span>
                    )}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex flex-col sm:flex-row gap-2">
                      <button
                        onClick={() => handleEdit(art)}
                        className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-xs"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(art.id)}
                        className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-xs"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {artworks.length === 0 && (
                <tr>
                  <td colSpan={12} className="px-4 py-6 text-center text-gray-400">
                    No artworks found.
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

export default ArtworkManage;
