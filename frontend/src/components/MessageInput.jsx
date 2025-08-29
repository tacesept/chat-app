import { useState } from "react";
import useSendMessage from "../hooks/useSendMessage";

const MessageInput = () => {
  const [input, setInput] = useState("");

  const { sendMessage } = useSendMessage();

  const handleSend = async () => {
    if (!input.trim()) return;
    await sendMessage(input);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // prevent new line
      handleSend();
    }
  };
  return (
    <div className="flex p-2 border-t bg-white">
      <textarea
        placeholder="Type a message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="text-black flex-1 p-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
        rows={1}
      />
      <button
        onClick={handleSend}
        className="bg-blue-500 text-white px-4 rounded-r hover:bg-blue-600"
      >
        Send
      </button>
    </div>
  );
};
export default MessageInput;
