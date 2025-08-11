// src/components/Chat.tsx
import React, { useEffect, useState, useRef } from "react";
import { chatSocket, MessageOut } from "@/communication/chatSocket";

interface ChatProps {
  currentUserId: string; // logged-in user id
  chatUserId: string; // the user you are chatting with
}

const Chat: React.FC<ChatProps> = ({ currentUserId, chatUserId }) => {
  const [messages, setMessages] = useState<MessageOut[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Don't connect until we have both IDs
    if (!currentUserId || !chatUserId) {
      console.warn("⚠️ Missing currentUserId or chatUserId, not connecting yet.");
      return;
    }

    // Always use "auth" endpoint
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
        typingTimeoutRef.current = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
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
    if (!input.trim()) return;
    chatSocket.sendMessage(chatUserId, input.trim());
    setInput("");
  };

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    chatSocket.sendTyping(chatUserId);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-green-600 text-white p-4 flex items-center">
        <div className="font-semibold text-lg">{chatUserId}</div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.sender_id === currentUserId
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-2xl max-w-xs shadow ${
                msg.sender_id === currentUserId
                  ? "bg-green-500 text-white"
                  : "bg-white text-gray-800"
              }`}
            >
              <div>{msg.content}</div>
              <div className="text-xs text-gray-500 mt-1 flex justify-end space-x-1">
                <span>
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
                {msg.sender_id === currentUserId && (
                  <span>{msg.is_read ? "✓✓" : "✓"}</span>
                )}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="text-sm text-gray-500 italic">
            {chatUserId} is typing...
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white flex items-center space-x-2">
        <input
          type="text"
          placeholder="Type a message"
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none"
          value={input}
          onChange={handleTyping}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
        />
        <button
          onClick={sendMessage}
          className="bg-green-600 text-white px-4 py-2 rounded-full"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
