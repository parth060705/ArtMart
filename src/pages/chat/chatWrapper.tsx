// src/pages/chat/ChatWrapper.tsx
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Chat from './Chat';
import { useGetUserProfilePublic } from '@/hooks/user/useUserProfilePublic';
import { useAuth } from '@/hooks/user/auth/UseAuth';
import { Routes } from '@/lib/routes';

const ChatWrapper = () => {
  const { peerId } = useParams<{ peerId: string }>();
  const { data: peerData } = useGetUserProfilePublic(peerId || "");
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // if not authenticated return to login page
  useEffect(() => {
    if (!isAuthenticated) {
      navigate(`/${Routes.AuthLoginPage}`, {
        state: { from: Routes.ChatPage },
        replace: true
      });
    }
  }, [isAuthenticated, navigate]);

  if (!peerId || !peerData) {
    return <div className="flex items-center justify-center h-screen">Loading chat...</div>;
  }

  return (
    <Chat
      peerData={peerData}
    />
  );
};

export default ChatWrapper;
