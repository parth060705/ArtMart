// src/hooks/use_chat.ts
import { useEffect, useState } from "react";
import { chatSocket, MessageOut } from "@/communication/chatSocket";

export const useChat = (userId: string, peerId: string) => {
  const [messages, setMessages] = useState<MessageOut[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!userId) return;

    chatSocket.connect(userId);

    const handleIncoming = (data: any) => {
      try {
        const msg: MessageOut = data;
        if (
          (msg.sender_id === userId && msg.receiver_id === peerId) ||
          (msg.sender_id === peerId && msg.receiver_id === userId)
        ) {
          setMessages((prev) => [...prev, msg]);
        }

        if (data.action === "typing" && data.sender_id === peerId) {
          setIsTyping(true);
          setTimeout(() => setIsTyping(false), 2000);
        }
      } catch (err) {
        console.error("❌ Failed to handle incoming message:", err);
      }
    };

    chatSocket.onMessage(handleIncoming);

    return () => {
      chatSocket.offMessage(handleIncoming);
    };
  }, [userId, peerId]);

  const sendMessage = (content: string) => {
    chatSocket.sendMessage(peerId, content);
  };

  const sendTyping = () => {
    chatSocket.sendTyping(peerId);
  };

  const sendRead = () => {
    chatSocket.sendRead(peerId);
  };

  return { messages, isTyping, sendMessage, sendTyping, sendRead };
};
