import axios from 'axios';

const API_BASE_URL = 'https://protect-api.auroraa.in';

export interface WatermarkUploadResult {
  blob: Blob;
  filename?: string;
  contentType?: string;
}

const getFilenameFromContentDisposition = (contentDisposition?: string): string | undefined => {
  if (!contentDisposition) return undefined;
  const match = /filename\*?=(?:UTF-8''|"?)([^";]+)"?/i.exec(contentDisposition);
  if (!match?.[1]) return undefined;
  try {
    return decodeURIComponent(match[1]);
  } catch {
    return match[1];
  }
};

export const uploadWatermark = async (file: File): Promise<WatermarkUploadResult> => {
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
      responseType: 'blob',
    });

    const contentDisposition = response.headers?.['content-disposition'] as string | undefined;
    const contentType = (response.headers?.['content-type'] as string | undefined) || response.data?.type;

    return {
      blob: response.data,
      filename: getFilenameFromContentDisposition(contentDisposition),
      contentType,
    };
  } catch (error) {
    console.error('Watermark upload error:', error);
    throw error;
  }
};
