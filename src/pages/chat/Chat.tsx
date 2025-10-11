import React, { useRef, useState, useEffect, useCallback } from "react";
import { useChat } from "@/hooks/chat/useChat";
import { useUserProfile } from "@/hooks/user/auth/useUserProfile";
import { UserProfile } from "@/lib/types";
import { useGetUserProfilePublic } from "@/hooks/user/useUserProfilePublic";
import type { MessageOut } from '@/communication/chatSocket';

type ChatMessage = MessageOut & {
  // Add any additional fields specific to the Chat component
  status?: 'sending' | 'sent' | 'failed' | 'delivered';
  id?: string;
};
import { FiPaperclip, FiSend, FiSmile, FiImage } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ChatProps {
  chatUserId: string;
  messages: ChatMessage[];
}

const Chat: React.FC<ChatProps> = ({
  chatUserId,
  messages: initialMessages,
}) => {
  const { data: currentUser } = useUserProfile();
  const { data: peerData } = useGetUserProfilePublic(chatUserId);
  const currentUserId: string = currentUser?.id.toString() || '';
  const accessToken = localStorage.getItem('accessToken') || '';
  const [input, setInput] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    messages: realtimeMessages = [],
    isTyping,
    sendMessage,
    sendTyping,
    isConnected,
    peerStatus
  } = useChat({
    accessToken,
    peerId: chatUserId,
    userId: currentUserId
  });

  // Combine chat history with real-time messages
  const [combinedMessages, setCombinedMessages] = useState<ChatMessage[]>(initialMessages || []);
  const navigate = useNavigate();

  // Update combined messages when any source changes
  useEffect(() => {
    // Create a map to track unique messages by a composite key
    const messageMap = new Map<string, ChatMessage>();

    // Helper function to add a message to the map
    const addMessageToMap = (msg: ChatMessage | MessageOut) => {
      const message: ChatMessage = {
        ...msg,
        timestamp: 'timestamp' in msg ? msg.timestamp : new Date().toISOString(),
        status: 'status' in msg ? msg.status : 'sent'
      };

      const key = `${message.sender_id}-${message.timestamp}-${String(message.content || '').substring(0, 20)}`;
      if (key) {
        messageMap.set(key, message);
      }
    };

    // Add all historical messages
    initialMessages.forEach(addMessageToMap);

    // Add real-time messages (these will overwrite any messages with the same key)
    realtimeMessages.forEach(addMessageToMap);

    // Convert to array and sort by timestamp
    const sortedMessages = Array.from(messageMap.values()).sort(
      (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );

    setCombinedMessages(sortedMessages);
  }, [initialMessages, realtimeMessages]);

  const scrollToBottom = useCallback(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [combinedMessages, scrollToBottom]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const messageContent = input.trim();
    if (messageContent) {
      const tempMessage: ChatMessage = {
        sender_id: currentUserId,
        receiver_id: chatUserId,
        content: messageContent,
        timestamp: new Date().toISOString(),
        status: 'sending',
        is_read: false,
        id: `temp-${Date.now()}`
      };

      // Add the temporary message to the combined messages
      setCombinedMessages(prev => [...prev, tempMessage]);

      // Clear input and send the message
      setInput("");
      sendMessage(messageContent);

      // Scroll to bottom to show the new message
      setTimeout(scrollToBottom, 100);
    }
  };

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    sendTyping();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  if (!currentUserId || !accessToken) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="text-center p-6 max-w-sm w-full">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your chat...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start md:items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="w-full max-w-2xl h-dvh flex flex-col bg-white overflow-hidden transform transition-all duration-300 relative">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white absolute top-0 left-0 right-0 z-20">
          <div className="flex items-center space-x-3">
            {/* back arrow  */}
            <ChevronLeft onClick={() => navigate(-1)} s />
            <div className="relative">
              <img
                src={peerData?.profileImage || "/default-avatar.png"}
                alt={peerData?.username || "user"}
                className="w-12 h-12 rounded-full object-cover border-2 border-white shadow"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center">
                <h2 className="text-lg font-semibold truncate">
                  {peerData?.name}
                </h2>
              </div>
              <div className="flex items-center space-x-2">
                {isTyping ? (
                  <motion.div
                    className="flex items-center space-x-1"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                  >
                    <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    <span className="text-xs text-indigo-100 ml-1">typing...</span>
                  </motion.div>
                ) : (
                  <div className="flex items-center">
                    <span
                      className={`inline-block w-2 h-2 rounded-full mr-1.5 ${peerStatus === 'online' ? 'bg-green-400' :
                        peerStatus === 'away' ? 'bg-yellow-400' : 'bg-gray-400'
                        } ${peerStatus === 'online' ? 'animate-pulse' : ''}`}
                    ></span>
                    <span className="text-xs text-indigo-100 font-medium capitalize">
                      {peerStatus === 'online' ? 'Online' :
                        peerStatus === 'away' ? 'Away' : 'Offline'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50  my-20">
          <AnimatePresence>
            {combinedMessages.map((msg) => {
              const isMine = msg.sender_id === currentUserId;
              return (
                <motion.div
                  key={`${msg.sender_id}-${msg.timestamp}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`relative max-w-xs lg:max-w-md px-4 py-2 rounded-2xl shadow-sm ${isMine
                      ? 'bg-indigo-600 text-white rounded-br-none'
                      : 'bg-white text-gray-800 rounded-bl-none border border-gray-200'
                      }`}
                  >
                    <div className="text-sm">{msg.content}</div>
                    <div className={`flex items-center justify-end space-x-1 mt-1 ${isMine ? 'text-indigo-200' : 'text-gray-500'}`}>
                      <span className="text-xs">
                        {new Date(msg.timestamp).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                      {isMine && (
                        <span className="text-xs">
                          {msg.status === 'sending' ? (
                            <span className="opacity-70">Sending</span>
                          ) : msg.status === 'failed' ? (
                            <span className="text-red-400">Failed</span>
                          ) : msg.is_read ? (
                            <span className="text-blue-300">✓✓</span>
                          ) : (
                            <span className="opacity-50">✓</span>
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center space-x-1 px-4 py-2 bg-white rounded-full w-20 shadow-sm"
            >
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </motion.div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSubmit} className="p-4 border-t bg-white absolute bottom-0 left-0 right-0">
          <div className="relative flex items-center">
            <div className="flex md:space-x-2 md:mr-2">
              <button
                type="button"
                className="p-2 text-gray-500 hover:text-indigo-600 transition-colors"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              >
                <FiSmile className="w-5 h-5" />
              </button>
            </div>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={handleTyping}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="flex-1 py-2 sm:py-2.5 px-3 sm:px-4 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all duration-200 text-sm sm:text-base"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="ml-1 sm:ml-2 p-1.5 sm:p-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0"
            >
              <FiSend className="w-5 h-5" />
            </button>
          </div>

          {/* Emoji Picker */}
          {showEmojiPicker && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-20 left-0 w-full bg-white rounded-lg shadow-lg p-4 border border-gray-200"
            >
              <div className="grid grid-cols-8 gap-2">
                {['😀', '😊', '😂', '❤️', '👍', '👋', '🎨', '👀'].map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => {
                      setInput(prev => prev + emoji);
                      setShowEmojiPicker(false);
                    }}
                    className="text-2xl p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Chat;
