import React, { useEffect, useState, useRef } from "react";
import { chatSocket, MessageOut } from "@/communication/chatSocket";
import { useUserProfile } from "@/hooks/useUserProfile";
import { UserProfile } from "@/lib/types";

interface ChatProps {
  chatUserId: number;
  chatUserAvatar?: UserProfile;
  chatUserStatus?: string;
}

const Chat: React.FC<ChatProps> = ({
  chatUserId,
  chatUserAvatar,
  chatUserStatus = "Active now",
}) => {
  const { data: currentUser } = useUserProfile();
  const currentUserId = currentUser?.id;

  const [messages, setMessages] = useState<MessageOut[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!currentUserId || !chatUserId) return;

    chatSocket.connect(currentUserId);

    const handleMessage = (data: any) => {
      if (data.action === "message") {
        const msg: MessageOut = data;
        if (
          (msg.sender_id === currentUserId && msg.receiver_id === chatUserId) ||
          (msg.sender_id === chatUserId && msg.receiver_id === currentUserId)
        ) {
          setMessages((prev) => [...prev, msg]);
        }
      }

      if (data.action === "typing" && data.sender_id === chatUserId) {
        setIsTyping(true);
        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = setTimeout(() => setIsTyping(false), 2000);
      }
    };

    chatSocket.onMessage(handleMessage);

    return () => {
      chatSocket.offMessage(handleMessage);
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
  }, [currentUserId, chatUserId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim() || !currentUserId) return;
    chatSocket.sendMessage(chatUserId, input.trim());
    setInput("");
  };

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    if (currentUserId) chatSocket.sendTyping(chatUserId);
  };

  if (!currentUserId) {
    return <div className="p-4 text-gray-500">⚠️ Loading your profile...</div>;
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="w-full max-w-md h-[90vh] flex flex-col bg-white rounded-2xl shadow-lg overflow-hidden">
        
        {/* Header */}
        <div className="flex flex-col items-center p-6 border-b">
          <img
            src={chatUserAvatar?.profileImage || "https://via.placeholder.com/80"}
            alt={chatUserAvatar?.username || "user"}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="mt-3 text-lg font-semibold text-gray-900">
            {chatUserAvatar?.name || chatUserAvatar?.username || `User ${chatUserId}`}
          </div>
          <div className="text-sm text-gray-500">{chatUserStatus}</div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, idx) => {
            const isMine = msg.sender_id === currentUserId;
            return (
              <div
                key={idx}
                className={`flex ${isMine ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`px-4 py-2 rounded-2xl max-w-xs shadow-sm ${
                    isMine
                      ? "bg-green-500 text-white rounded-br-none"
                      : "bg-gray-100 text-gray-800 rounded-bl-none"
                  }`}
                >
                  <div>{msg.content}</div>
                  <div className="text-[10px] text-gray-400 mt-1 flex justify-end">
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-200 text-gray-600 px-3 py-2 rounded-2xl text-sm animate-pulse">
                <span>● ● ●</span>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t">
          <div className="flex items-center bg-gray-100 rounded-full px-3 py-2">
            <button className="text-gray-500 text-xl">＋</button>
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 bg-transparent px-3 focus:outline-none text-gray-700"
              value={input}
              onChange={handleTyping}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="bg-green-600 hover:bg-green-700 text-white rounded-full p-2"
            >
              ↑
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
