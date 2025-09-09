// src/pages/chat/ChatWrapper.tsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserProfile } from "@/lib/types";
import Chat from "./uiChat";

const ChatWrapper = () => {
  const { peerId } = useParams<{ peerId: string }>();
  const [peer, setPeer] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (!peerId) return;
    fetch(`/api/users/${peerId}`)
      .then((res) => res.json())
      .then(setPeer)
      .catch(console.error);
  }, [peerId]);

  if (!peerId || !peer) return <div>Loading chat...</div>;

  return <Chat chatUserId={Number(peerId)} chatUserAvatar={peer} chatUserStatus="Active now" />;
};

export default ChatWrapper;
