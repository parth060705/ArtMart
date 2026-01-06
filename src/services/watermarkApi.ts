import axios from 'axios';

const API_BASE_URL = 'https://protect-api.auroraa.in';

export interface WatermarkUploadResponse {
  success: boolean;
  message?: string;
  data?: any;
}

export const uploadWatermark = async (file: File): Promise<WatermarkUploadResponse> => {
  const token = localStorage.getItem('accessToken');
  
  if (!token) {
    throw new Error('No authentication token found');
  }

  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post(`${API_BASE_URL}/watermark/upload`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Watermark upload error:', error);
    throw error;
  }
};
