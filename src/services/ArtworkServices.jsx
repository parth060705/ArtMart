// src/services/artworkService.js
import api from './api';

export const getAllArtworks = () => api.get('/artworks');

export const getArtworkById = (id) => api.get(`/artworks/${id}`);

export const uploadArtwork = (formData) =>
  api.post('/artworks', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export const deleteArtwork = (id) => api.delete(`/artworks/${id}`);
