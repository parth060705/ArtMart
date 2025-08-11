import { useEffect, useState } from "react";
import { chatSocket } from "@/communication/chatSocket";

interface MessageOut {
  sender_id: string;
  receiver_id: string;
  content: string;
  timestamp: string;
  is_read: boolean;
}

export const useChat = (userId: string, peerId: string) => {
  const [messages, setMessages] = useState<MessageOut[]>([]);

  useEffect(() => {
    chatSocket.connect(userId);

    const handleIncoming = (event: MessageEvent) => {
      const data: MessageOut = JSON.parse(event.data);
      setMessages((prev) => [...prev, data]);
    };

    if (chatSocket["socket"]) {
      chatSocket["socket"].onmessage = handleIncoming;
    }

    return () => {
      if (chatSocket["socket"]) {
        chatSocket["socket"].onmessage = null;
      }
    };
  }, [userId]);

  const sendMessage = (content: string) => {
    chatSocket.sendMessage(peerId, content);
  };

  const sendTyping = () => {
    chatSocket.sendTyping(peerId);
  };

  const sendRead = () => {
    chatSocket.sendRead(peerId);
  };

  return { messages, sendMessage, sendTyping, sendRead };
};
