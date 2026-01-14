import { axiosClient } from '@/lib/axios';

export type FeedbackType = 'bug' | 'general' | 'feature_request' | 'suggestion';

export interface CreateFeedbackPayload {
  type: FeedbackType;
  message: string;
  rating?: 0 | 1;
  page?: string;
  feature?: string;
}

export interface CreateFeedbackResponse {
  id?: string;
  message?: string;
  success?: boolean;
}

export const submitFeedback = async (payload: CreateFeedbackPayload): Promise<CreateFeedbackResponse> => {
  const response = await axiosClient.post('/auth/feedback', payload);
  return response.data;
};
