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
  const presenceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [error, setError] = useState<Error | null>(null);
  
  // Refs to track current values in callbacks
  const peerIdRef = useRef(peerId);
  const userIdRef = useRef(userId);
  
  useEffect(() => {
    peerIdRef.current = peerId;
  }, [peerId]);
  
  useEffect(() => {
    userIdRef.current = userId;
  }, [userId]);

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
    console.log("from handleIncoming", data);
    const currentPeerId = peerIdRef.current;
    const currentUserId = userIdRef.current;

    try {
      // Handle presence updates
      if (data.action === 'presence' && data.sender_id === currentPeerId) {
        updatePeerStatus(data.content);
        return;
      }

      // Handle typing indicator
      if (data.action === 'typing' && data.sender_id === currentPeerId) {
        setIsTyping(true);
        clearTimeout((handleIncoming as any)._typingTimer);
        (handleIncoming as any)._typingTimer = setTimeout(() => setIsTyping(false), 2000);
        return;
      }

      // Handle message read receipts
      if (data.action === 'read' && data.sender_id === currentPeerId) {
        console.log('📖 Read receipt received');
        setMessages(prev => prev.map(msg => ({
          ...msg,
          is_read: msg.receiver_id === currentPeerId ? true : msg.is_read
        })));
        return;
      }

      console.log('✅ Past all early returns, processing regular message');
      
      // Handle regular messages - Normalize timestamp FIRST
      console.log('📨 Processing message:', data);
      
      const rawMsg = data as MessageOut;
      
      // Normalize timestamp - add 'Z' if it doesn't have timezone info
      const normalizedTimestamp = rawMsg.timestamp && typeof rawMsg.timestamp === 'string'
        ? (rawMsg.timestamp.endsWith('Z') || /[+-]\d{2}:\d{2}$/.test(rawMsg.timestamp)
            ? rawMsg.timestamp
            : rawMsg.timestamp + 'Z')
        : rawMsg.timestamp;
      
      const msg: MessageOut = {
        ...rawMsg,
        timestamp: normalizedTimestamp
      };
      
      console.log('🔧 Normalized message:', { 
        original: rawMsg.timestamp, 
        normalized: msg.timestamp,
        content: msg.content 
      });
      
      if (
        (msg.sender_id === currentUserId && msg.receiver_id === currentPeerId) ||
        (msg.sender_id === currentPeerId && msg.receiver_id === currentUserId)
      ) {
        // Update or add the message
        setMessages(prev => {
          // First, try to find by server-provided ID
          let existingMsgIndex = msg.id ? prev.findIndex(m => m.id === msg.id) : -1;
          
          // If not found by ID, try to find temp message by content and timestamp proximity
          if (existingMsgIndex < 0) {
            existingMsgIndex = prev.findIndex(m => 
              m.sender_id === msg.sender_id &&
              m.receiver_id === msg.receiver_id &&
              m.content === msg.content &&
              m.id?.startsWith('temp-') &&
              Math.abs(new Date(m.timestamp).getTime() - new Date(msg.timestamp).getTime()) < 10000 // Within 10 seconds
            );
          }

          if (existingMsgIndex >= 0) {
            // Update existing message (replace temp with server message)
            console.log('✅ Replacing temp message with server message:', {
              tempId: prev[existingMsgIndex].id,
              serverId: msg.id,
              content: msg.content
            });
            const newMessages = [...prev];
            newMessages[existingMsgIndex] = {
              ...msg,
              status: 'sent',
              is_read: msg.is_read || (msg.sender_id === currentUserId)
            };
            return newMessages;
          } else {
            // Add new message
            console.log('➕ Adding new message:', {
              id: msg.id,
              content: msg.content,
              status: msg.sender_id === currentUserId ? 'sent' : 'sent'
            });
            return [...prev, {
              ...msg,
              status: 'sent',
              is_read: msg.is_read || (msg.sender_id === currentUserId)
            }];
          }
        });

        // Update peer status to online when receiving a message
        if (msg.sender_id === currentPeerId) {
          updatePeerStatus('online');

          // Mark message as read if it's from the peer
          if (!msg.is_read) {
            chatSocket.sendRead(currentPeerId);
          }
        }
      }
    } catch (err) {
      console.error('❌ Failed to handle incoming message:', err);
      setError(err instanceof Error ? err : new Error('Failed to process message'));
    }
  }, [updatePeerStatus]);

  const sendMessage = useCallback((content: string, messageType: 'text' | 'image' | 'file' = 'text') => {
    try {
      console.log('Sending message:', content);
      const tempId = `temp-${Date.now()}`;

      // Add temporary message with sending status
      const tempMessage: MessageOut = {
        id: tempId,
        sender_id: userId,
        receiver_id: peerId,
        timestamp: new Date().toISOString(),
        status: 'sending',
        is_read: false,
        action: 'message',
        content: content,
        message_type: messageType
      };

      setMessages(prev => [...prev, tempMessage]);

      // Send the actual message with message type
      chatSocket.sendMessage({
        sender_id: userId,
        receiver_id: peerId,
        timestamp: new Date().toISOString(),
        is_read: false,
        action: 'message',
        content: content,
        message_type: messageType
      } as MessageOut);

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

  // WebSocket connection effect
  useEffect(() => {
    if (!accessToken || !userId) {
      setError(new Error('Missing required authentication data'));
      return;
    }

    const connectWebSocket = async () => {
      try {
        // Disconnect any existing connection
        chatSocket.disconnect();

        // Set up message handler first
        chatSocket.onMessage(handleIncoming);

        // Then connect
        chatSocket.connect(accessToken, userId);
        setIsConnected(true);

        // Initial presence update
        if (peerId) {
          chatSocket.sendPresence(peerId, 'online');
        }
      } catch (err) {
        console.error('❌ WebSocket connection error:', err);
        setError(err instanceof Error ? err : new Error('Failed to connect to WebSocket'));
        setIsConnected(false);
      }
    };

    connectWebSocket();

    return () => {
      chatSocket.offMessage(handleIncoming);
      chatSocket.disconnect();
      setIsConnected(false);
    };
  }, [accessToken, userId, handleIncoming, peerId]);

  // Send presence updates when component mounts, peer changes, or connection status changes
  useEffect(() => {
    if (!isConnected || !peerId) return;

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
    sendRead,
    isConnected,
    isPeerOnline: peerStatus === 'online',
    peerStatus,
    error
  };
};