import { useEffect, useState } from "react";
import { chatSocket, MessageOut } from "@/communication/chatSocket";

export const useChat = (userId: number, peerId: number) => {
  const [messages, setMessages] = useState<MessageOut[]>([]);

  useEffect(() => {
    chatSocket.connect(userId);

    const handleIncoming = (data: any) => {
      try {
        const msg: MessageOut = data;
        // Only keep messages relevant to this chat
        if (
          (msg.sender_id === userId && msg.receiver_id === peerId) ||
          (msg.sender_id === peerId && msg.receiver_id === userId)
        ) {
          setMessages((prev) => [...prev, msg]);
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

  return { messages, sendMessage, sendTyping, sendRead };
};
