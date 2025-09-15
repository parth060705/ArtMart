import { useEffect, useState, useCallback } from 'react';
import { chatSocket, MessageOut, MessageBase } from '@/communication/chatSocket';

interface UseChatProps {
  accessToken: string;
  peerId: string;
  userId: string;
}

export const useChat = ({ accessToken, peerId, userId }: UseChatProps) => {
  const [messages, setMessages] = useState<MessageOut[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const handleIncoming = useCallback((data: unknown) => {
    try {
      const msg = data as MessageOut;
      if (
        (msg.sender_id === userId && msg.receiver_id === peerId) ||
        (msg.sender_id === peerId && msg.receiver_id === userId)
      ) {
        setMessages((prev) => [...prev, msg]);
      }

      if ('action' in (data as any) && (data as any).action === 'typing' && 
          (data as any).sender_id === peerId) {
        setIsTyping(true);
        const timer = setTimeout(() => setIsTyping(false), 2000);
        return () => clearTimeout(timer);
      }
    } catch (err) {
      console.error('❌ Failed to handle incoming message:', err);
      setError(err instanceof Error ? err : new Error('Failed to process message'));
    }
  }, [peerId, userId]);

  useEffect(() => {
    if (!accessToken) {
      setError(new Error('No access token provided'));
      return;
    }

    try {
      chatSocket.connect(accessToken);
      setIsConnected(true);
      chatSocket.onMessage(handleIncoming);

      return () => {
        chatSocket.offMessage(handleIncoming);
        chatSocket.disconnect();
        setIsConnected(false);
      };
    } catch (err) {
      console.error('❌ WebSocket connection error:', err);
      setError(err instanceof Error ? err : new Error('Failed to connect to WebSocket'));
      setIsConnected(false);
    }
  }, [accessToken, handleIncoming]);

  const sendMessage = useCallback((content: string) => {
    try {
      chatSocket.sendMessage(peerId, content);
    } catch (err) {
      console.error('❌ Failed to send message:', err);
      setError(err instanceof Error ? err : new Error('Failed to send message'));
    }
  }, [peerId]);

  const sendTyping = useCallback(() => {
    try {
      chatSocket.sendTyping(peerId);
    } catch (err) {
      console.error('❌ Failed to send typing indicator:', err);
      setError(err instanceof Error ? err : new Error('Failed to send typing indicator'));
    }
  }, [peerId]);

  const sendRead = useCallback(() => {
    try {
      chatSocket.sendRead(peerId);
    } catch (err) {
      console.error('❌ Failed to send read receipt:', err);
      setError(err instanceof Error ? err : new Error('Failed to send read receipt'));
    }
  }, [peerId]);

  return { 
    messages, 
    isTyping, 
    isConnected, 
    error,
    sendMessage, 
    sendTyping, 
    sendRead 
  };
};
