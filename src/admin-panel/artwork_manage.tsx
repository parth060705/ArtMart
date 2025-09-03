import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Artwork } from "@/lib/types";
import {
  useAdminArtworks,
  useDeleteArtwork,
  useUpdateArtwork,
} from "@/admin_hooks/artworkfetch";

const emptyArtwork: Artwork = {
  id: "",
  title: "",
  description: "",
  price: 0,
  tags: [],
  quantity: 0,
  category: "",
  isSold: false,
  images: [],
  file: [],
  artistId: "",
  artist: {
    username: "",
    profileImage: "",
  },
  createdAt: "",
};

const normalizeTag = (tag: string) => {
  let t = tag.trim().replace(/^#*/, ""); // remove extra #
  return t ? `#${t}` : "";
};

const ArtworkManage = () => {
  const [form, setForm] = useState(emptyArtwork);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [tagInput, setTagInput] = useState("");

  const { data: artworks = [], isLoading, refetch } = useAdminArtworks();
  const deleteArtwork = useDeleteArtwork();
  const updateArtwork = useUpdateArtwork();

  const handleEdit = (art: Artwork) => {
    setForm({
      ...emptyArtwork,
      ...art,
      isSold: Boolean(art.isSold),
      file: [],
      tags: (art.tags || []).map(normalizeTag),
    });
    setEditingId(art.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    const toastId = toast.custom((t) => (
      <div className="bg-white p-4 rounded shadow-lg">
        <div className="mb-2 text-sm">
          Are you sure you want to delete this artwork?
        </div>
        <div className="flex justify-end gap-2">
          <Button
            onClick={() => {
              deleteArtwork.mutate(id, {
                onSuccess: () => {
                  toast.dismiss(toastId);
                  toast.success("Artwork deleted successfully!");
                  refetch();
                },
                onError: () => {
                  toast.dismiss(toastId);
                  toast.error("Failed to delete artwork.");
                },
              });
            }}
            className="bg-red-600 text-white text-xs px-3 py-1 rounded"
          >
            Yes, Delete
          </Button>
          <Button
            onClick={() => toast.dismiss(toastId)}
            className="text-gray-500 hover:underline text-xs"
          >
            Cancel
          </Button>
        </div>
      </div>
    ));
  };

  const openCreateForm = () => {
    setForm(emptyArtwork);
    setTagInput("");
    setEditingId(null);
    setShowForm(true);
  };

  const handleInputChange = (e: any) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setForm({ ...form, [name]: checked });
    } else if (type === "file") {
      setForm({ ...form, file: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const addTagFromInput = () => {
    const newTag = normalizeTag(tagInput);
    if (newTag && !form.tags.includes(newTag)) {
      setForm({ ...form, tags: [...form.tags, newTag] });
    }
    setTagInput("");
  };

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("category", form.category);
    formData.append("price", form.price.toString());
    formData.append("quantity", form.quantity.toString());
    formData.append("tags", form.tags.join(","));
    formData.append("isSold", form.isSold.toString());

    if (form.file && form.file instanceof File) {
      formData.append("files", form.file);
    }

    if (editingId) {
      updateArtwork.mutate(
        { id: editingId, data: formData },
        {
          onSuccess: () => {
            toast.success("Artwork updated successfully!");
            setShowForm(false);
            setForm(emptyArtwork);
            setEditingId(null);
            setTagInput("");
            refetch();
          },
          onError: (err) => {
            console.error("❌ Update failed:", err);
            toast.error("Failed to update artwork.");
          },
        }
      );
    } else {
      toast.warning("Create functionality not implemented yet.");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Artwork Management</h1>
        <Button
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium"
          onClick={openCreateForm}
        >
          + Add Artwork
        </Button>
      </div>

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
                  type="number"
                  name="quantity"
                  placeholder="Quantity"
                  value={form.quantity}
                  onChange={handleInputChange}
                  className="border p-2 rounded w-full"
                  min={0}
                />
                <input
                  type="text"
                  name="artistId"
                  placeholder="Artist ID"
                  value={form.artistId}
                  onChange={handleInputChange}
                  className="border p-2 rounded w-full"
                />

                {/* Tags Input */}
                <div className="col-span-2">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {form.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs flex items-center gap-1"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() =>
                            setForm({
                              ...form,
                              tags: form.tags.filter((_, idx) => idx !== i),
                            })
                          }
                          className="text-red-500 hover:text-red-700"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  <input
                    type="text"
                    placeholder="Type tag and press comma"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "," || e.key === "Enter") {
                        e.preventDefault();
                        addTagFromInput();
                      }
                    }}
                    className="border p-2 rounded w-full"
                  />
                </div>

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
                <Button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
                >
                  {editingId ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        {isLoading ? (
          <div className="p-6 text-gray-500 animate-pulse">
            Loading artworks...
          </div>
        ) : (
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                {[
                  "ID",
                  "Title",
                  "Description",
                  "Price",
                  "Quantity",
                  "Tags",
                  "Category",
                  "Sold",
                  "Artist Name",
                  "Artist ID",
                  "Created At",
                  "Images",
                  "Actions",
                ].map((head) => (
                  <th
                    key={head}
                    className="px-4 py-3 text-left whitespace-nowrap"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {artworks.map((art: Artwork) => (
                <tr key={art.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3">{art.id}</td>
                  <td className="px-4 py-3 font-medium">{art.title}</td>
                  <td className="px-4 py-3 max-w-xs truncate">
                    {art.description}
                  </td>
                  <td className="px-4 py-3 text-green-700 font-semibold">
                    {art.price}
                  </td>
                  <td className="px-4 py-3">{art.quantity}</td>
                  <td className="px-4 py-3">
                    {(art.tags || []).map(normalizeTag).join(", ")}
                  </td>
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
                  <td className="px-4 py-3">{art.artistId || "—"}</td>
                  <td className="px-4 py-3">
                    {art.createdAt
                      ? new Date(art.createdAt).toLocaleDateString()
                      : "—"}
                  </td>
                  <td className="px-4 py-3 max-w-[120px]">
                    {art.images?.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {art.images.slice(0, 2).map((img, i) => (
                          <img
                            key={img.id || i}
                            src={img.url}
                            alt={art.title || "Artwork"}
                            className="w-10 h-10 object-cover rounded shadow-sm"
                          />
                        ))}
                        {art.images.length > 2 && (
                          <span className="text-xs text-gray-500">
                            +{art.images.length - 2}
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-gray-400 text-xs">No image</span>
                    )}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button
                        onClick={() => handleEdit(art)}
                        className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-xs"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDelete(art.id)}
                        className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-xs"
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {artworks.length === 0 && (
                <tr>
                  <td
                    colSpan={13}
                    className="px-4 py-6 text-center text-gray-400"
                  >
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
