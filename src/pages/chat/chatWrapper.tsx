// src/pages/chat/ChatWrapper.tsx
import { useParams } from "react-router-dom";
import Chat from "./Chat";
import { useGetUserProfilePublic } from "@/hooks/user/useUserProfilePublic";

const ChatWrapper = () => {
  const { peerId } = useParams<{ peerId: string }>();
  const { data: peerData } = useGetUserProfilePublic(peerId || "");
  if (!peerId || !peerData) return <div>Loading chat...</div>;

  return <Chat peerData={peerData} />;
};

export default ChatWrapper;
