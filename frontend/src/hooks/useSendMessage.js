import { useState } from "react";

import toast from "react-hot-toast";

import { useParams } from "react-router";
import useConversation from "../context/useConversation";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  const messages = useConversation((s) => s.messages);
  const setMessages = useConversation((s) => s.setMessages);

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5001/api/messages/send/${id}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setMessages([...messages, data]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};
export default useSendMessage;
