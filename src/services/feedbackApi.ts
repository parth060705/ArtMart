import { axiosClient } from '@/lib/axios';

export type FeedbackType = 'positive' | 'negative';

export interface CreateFeedbackPayload {
  type: FeedbackType;
  message: string;
  page?: string;
  feature?: string;
}

export interface CreateFeedbackResponse {
  id?: string;
  message?: string;
  success?: boolean;
}

export const submitFeedback = async (payload: CreateFeedbackPayload): Promise<CreateFeedbackResponse> => {
  const response = await axiosClient.post('/api/auth/feedback', payload);
  return response.data;
};
