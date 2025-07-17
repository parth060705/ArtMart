import React, { useState, useEffect } from 'react';
// import api from '../service/admin_api';

const emptyArtwork = {
  id: '',
  title: '',
  description: '',
  price: '',
  category: '',
  isSold: false,
  images: [],
  file: null,
  artistId: '',
  createdAt: '',
};

const ArtworkManage = () => {
  const [artworks, setArtworks] = useState([]);
  const [form, setForm] = useState(emptyArtwork);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchArtworks = async () => {
    try {
      const res = await api.get('/artworks');
      setArtworks(res.data);
    } catch (err) {
      console.error('Error fetching artworks:', err);
    }
  };

  useEffect(() => {
    fetchArtworks();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setForm({ ...form, [name]: checked });
    } else if (type === 'file') {
      setForm({ ...form, file: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      for (const [key, value] of Object.entries(form)) {
        if (key === 'file' && value) {
          formData.append('file', value);
        } else if (!['id', 'images', 'file', 'createdAt'].includes(key)) {
          formData.append(key, value);
        }
      }

      if (editingId) {
        await api.patch(`/artworks/${editingId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        await api.post('/artworks', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      setForm(emptyArtwork);
      setEditingId(null);
      setShowForm(false);
      fetchArtworks();
    } catch (err) {
      console.error('Error saving artwork:', err);
    }
  };

  const handleEdit = (art) => {
    setForm({
      ...emptyArtwork,
      ...art,
      isSold: Boolean(art.isSold),
      file: null,
    });
    setEditingId(art.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this artwork?')) return;
    try {
      await api.delete(`/artworks/${id}`);
      fetchArtworks();
    } catch (err) {
      console.error('Error deleting artwork:', err);
    }
  };

  const openCreateForm = () => {
    setForm(emptyArtwork);
    setEditingId(null);
    setShowForm(true);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Artwork Management</h1>

      <button
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded"
        onClick={openCreateForm}
      >
        Add New Artwork
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded shadow space-y-4">
          {editingId && (
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">ID</label>
              <input
                type="text"
                name="id"
                value={form.id}
                readOnly
                className="w-full p-2 border rounded bg-gray-100 text-gray-600"
              />
            </div>
          )}

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleInputChange}
              rows={3}
              required
              className="w-full p-2 border rounded"
            ></textarea>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Price ($)</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Category</label>
            <input
              type="text"
              name="category"
              value={form.category}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Artist ID</label>
            <input
              type="text"
              name="artistId"
              value={form.artistId}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>

          {editingId && (
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Created At</label>
              <input
                type="text"
                name="createdAt"
                value={new Date(form.createdAt).toLocaleString()}
                readOnly
                className="w-full p-2 border rounded bg-gray-100 text-gray-600"
              />
            </div>
          )}

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="isSold"
              checked={form.isSold}
              onChange={handleInputChange}
            />
            <label className="text-sm font-medium text-gray-700">Mark as Sold</label>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Upload Image</label>
            <input
              type="file"
              name="file"
              accept="image/*"
              onChange={handleInputChange}
              className="w-full"
            />
          </div>

          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded" type="submit">
            {editingId ? 'Update Artwork' : 'Create Artwork'}
          </button>
        </form>
      )}

      {/* Table with all 10 columns */}
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-left">Description</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Sold</th>
              <th className="p-4 text-left">Artist ID</th>
              <th className="p-4 text-left">Created At</th>
              <th className="p-4 text-left">Images</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {artworks.map((art) => (
              <tr key={art.id} className="border-t">
                <td className="p-4">{art.id}</td>
                <td className="p-4">{art.title}</td>
                <td className="p-4">{art.description}</td>
                <td className="p-4">${art.price}</td>
                <td className="p-4">{art.category}</td>
                <td className="p-4">{art.isSold ? 'Yes' : 'No'}</td>
                <td className="p-4">{art.artistId}</td>
                <td className="p-4">{new Date(art.createdAt).toLocaleString()}</td>
                <td className="p-4">
                  {art.images?.length > 0 ? (
                    <div className="flex gap-2">
                      {art.images.map((img, i) => (
                        <img
                          key={i}
                          src={
                            img.startsWith('http')
                              ? img
                              : `${import.meta.env.VITE_API_URL}/media/${img}`
                          }
                          alt={`Artwork ${i}`}
                          className="w-14 h-14 object-cover rounded"
                        />
                      ))}
                    </div>
                  ) : (
                    'No image'
                  )}
                </td>
                <td className="p-4 space-x-2">
                  <button
                    onClick={() => handleEdit(art)}
                    className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(art.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {artworks.length === 0 && (
              <tr>
                <td colSpan="10" className="p-4 text-center text-gray-500">
                  No artworks found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ArtworkManage;
