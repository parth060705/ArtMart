// src/pages/chat/ChatWrapper.tsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { chatMessage, UserProfile } from "@/lib/types";
import Chat from "./Chat";
import { useGetChatHistory } from "@/hooks/chat/useGetChatHistory";

const ChatWrapper = () => {
  const { peerId } = useParams<{ peerId: string }>();
  const [peer, setPeer] = useState<UserProfile | null>(null);
  const { data: peerData } = useGetChatHistory(peerId || "");

  if (!peerData) return <div>Loading chat...</div>;

  return <Chat chatUserId={peerId} messages={peerData} chatUserAvatar={peer} chatUserStatus="Active now" />;
  
};

export default ChatWrapper;
