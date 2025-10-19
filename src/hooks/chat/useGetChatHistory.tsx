import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "@/lib/axios";

export const useGetChatHistory = (peerId: string) => {
  return useQuery({
    queryKey: ["chatHistory", peerId],
    queryFn: async () => {
      const { data } = await axiosClient.get(`/auth/chat/history/${peerId}`);
      
      console.log('🔍 Raw data from backend:', data);
      
      // Normalize timestamps to ensure they're treated as UTC
      if (Array.isArray(data)) {
        const normalized = data.map((msg: any) => {
          // If timestamp exists and doesn't have timezone info, add 'Z' to indicate UTC
          if (msg.timestamp && typeof msg.timestamp === 'string') {
            // Check if it already has timezone info (Z, +, or - after the time portion)
            const hasZ = msg.timestamp.endsWith('Z');
            const hasOffset = /[+-]\d{2}:\d{2}$/.test(msg.timestamp);
            
            if (!hasZ && !hasOffset) {
              // Add 'Z' to indicate this is UTC time
              console.log('✅ Normalizing:', msg.timestamp, '→', msg.timestamp + 'Z');
              return {
                ...msg,
                timestamp: msg.timestamp + 'Z'
              };
            }
          }
          
          return msg;
        });
        
        console.log('✅ Normalized data:', normalized);
        return normalized;
      }
      
      return data;      
    },
    staleTime: 0, // Disable cache for now
    gcTime: 0, // Disable garbage collection time
    retry: 1,
  });
};
