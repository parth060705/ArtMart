import { useEffect, useState, useCallback, useRef } from 'react';
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
  const [peerStatus, setPeerStatus] = useState<'online' | 'offline' | 'away'>('offline');
  const lastSeenRef = useRef<{ [key: string]: number }>({});
  const presenceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [error, setError] = useState<Error | null>(null);

  // Update peer status based on presence updates
  const updatePeerStatus = useCallback((status: 'online' | 'away' | 'offline') => {
    setPeerStatus(status);
    
    // Clear any existing timeout
    if (presenceTimeoutRef.current) {
      clearTimeout(presenceTimeoutRef.current);
      presenceTimeoutRef.current = null;
    }
    
    // If user is online, set a timeout to mark as away after 30 seconds
    if (status === 'online') {
      presenceTimeoutRef.current = setTimeout(() => {
        setPeerStatus('away');
      }, 30000);
    }
  }, []);

  const handleIncoming = useCallback((data: any) => {
    try {
      // Handle presence updates
      if (data.action === 'presence' && data.sender_id === peerId) {
        updatePeerStatus(data.content);
        return;
      }

      // Handle typing indicator
      if (data.action === 'typing' && data.sender_id === peerId) {
        setIsTyping(true);
        const timer = setTimeout(() => setIsTyping(false), 2000);
        return () => clearTimeout(timer);
      }

      // Handle message read receipts
      if (data.action === 'read' && data.sender_id === peerId) {
        setMessages(prev => prev.map(msg => ({
          ...msg,
          is_read: msg.receiver_id === peerId ? true : msg.is_read
        })));
        return;
      }

      // Handle regular messages
      const msg = data as MessageOut;
      if (
        (msg.sender_id === userId && msg.receiver_id === peerId) ||
        (msg.sender_id === peerId && msg.receiver_id === userId)
      ) {
        // Update or add the message
        setMessages(prev => {
          const existingMsgIndex = prev.findIndex(m => m.id === msg.id || 
            (m.sender_id === msg.sender_id && m.timestamp === msg.timestamp));
          
          if (existingMsgIndex >= 0) {
            // Update existing message
            const newMessages = [...prev];
            newMessages[existingMsgIndex] = {
              ...newMessages[existingMsgIndex],
              ...msg,
              // Preserve sending status for outgoing messages
              status: msg.sender_id === userId ? (msg.status || 'sent') : 'sent'
            };
            return newMessages;
          } else {
            // Add new message
            return [...prev, {
              ...msg,
              status: msg.sender_id === userId ? (msg.status || 'sent') : 'sent',
              is_read: msg.sender_id === userId // Outgoing messages are read by default
            }];
          }
        });
        
        // Update peer status to online when receiving a message
        if (msg.sender_id === peerId) {
          updatePeerStatus('online');
          
          // Mark message as read if it's from the peer
          if (!msg.is_read) {
            chatSocket.sendRead(peerId);
          }
        }
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
      const tempId = `temp-${Date.now()}`;
      // Add temporary message with sending status
      setMessages(prev => [...prev, {
        id: tempId,
        sender_id: userId,
        receiver_id: peerId,
        content,
        timestamp: new Date().toISOString(),
        status: 'sending',
        is_read: false
      }]);
      
      // Send the actual message
      chatSocket.sendMessage(peerId, content);
      
      return tempId; // Return the temp ID to track this message
    } catch (err) {
      console.error('❌ Failed to send message:', err);
      setError(err instanceof Error ? err : new Error('Failed to send message'));
      return null;
    }
  }, [peerId, userId]);

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

  // Send presence updates when component mounts, peer changes, or connection status changes
  useEffect(() => {
    if (!isConnected) return;

    // Initial presence update
    chatSocket.sendPresence(peerId, 'online');
    
    // Send periodic presence updates
    const interval = setInterval(() => {
      chatSocket.sendPresence(peerId, 'online');
    }, 20000); // Every 20 seconds
    
    // Cleanup on unmount or peer change
    return () => {
      clearInterval(interval);
      // Notify peer that we're going offline
      chatSocket.sendPresence(peerId, 'offline');
    };
  }, [isConnected, peerId]);

  return { 
    messages, 
    isTyping, 
    sendMessage, 
    sendTyping, 
    isConnected,
    isPeerOnline: peerStatus === 'online',
    peerStatus,
    error 
  };
};
