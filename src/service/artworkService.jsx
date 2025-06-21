import api from './api';

// Get all artworks (for gallery, home, etc.)
export const getAllArtworks = () => api.get('/artworks');

// Get details of a single artwork by ID
export const getArtworkById = (id) => api.get(`/artworks/${id}`);

// Upload new artwork (with images, optional video, etc.)
export const uploadArtwork = (formData) =>
  api.post('/artworks', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

// Delete an artwork by ID
export const deleteArtwork = (id) => api.delete(`/artworks/${id}`);

// Get all artworks uploaded by a specific artist
export const getArtworksByArtist = async (artistId) => {
  const res = await api.get(`/artworks?artistId=${artistId}`);
  return res.data;
};
