import { useRef, useEffect } from "react";
import MessageInput from "./MessageInput";
import useGetMessages from "../hooks/useGetMessages";

const Chat = () => {
  const { messages, selectedConversation: receiverId } = useGetMessages();

  const scrollRef = useRef(null);

  // Scroll to bottom when messages update
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const Messages =
    messages &&
    messages.map((msg, index) => (
      <div
        key={index}
        className={`flex items-start gap-3 ${
          msg.receiverId === receiverId ? "justify-end" : "justify-start"
        }`}
      >
        {msg.receiverId !== receiverId && (
          <img
            src={"5.jpeg"}
            // alt={msg.user.name}
            className="w-10 h-10 rounded-full object-cover"
          />
        )}

        <div
          className={`flex flex-col ${
            msg.receiverId === receiverId ? "items-end" : "items-start"
          }`}
        >
          <div
            className={`p-3 rounded-lg shadow-sm ${
              msg.receiverId === receiverId
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-800"
            }`}
          >
            {msg.message}
          </div>
          <span className="text-gray-500 text-xs mt-1">
            {new Date(msg.createdAt).toLocaleString()}
          </span>
        </div>

        {msg.receiverId === receiverId && (
          <img
            src={"6.jpeg"}
            // alt={msg.user.name}
            className="w-10 h-10 rounded-full object-cover"
          />
        )}
      </div>
    ));

  return (
    <div className="flex flex-col h-full max-h-screen w-full bg-gray-50">
      {/* Messages Window */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 flex flex-col gap-3"
      >
        {Messages}
      </div>

      {/* Message Input */}
      <MessageInput />
    </div>
  );
};

export default Chat;
