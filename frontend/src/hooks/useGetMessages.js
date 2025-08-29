import { useEffect, useState } from "react";

import toast from "react-hot-toast";
import { useParams } from "react-router";
import { useSocketStore } from "../context/useSocketStore";
import useConversation from "../context/useConversation";

const useGetMessages = () => {
  const { id: selectedConversation } = useParams();
  const [loading, setLoading] = useState(false);

  const { socket, listenNewMessages } = useSocketStore();
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);

      try {
        const res = await fetch(
          `http://localhost:5001/api/messages/${selectedConversation}`,
          {
            credentials: "include",
          }
        );
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setMessages(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation) getMessages();
  }, [selectedConversation, setMessages]);

  useEffect(() => {
    if (!socket) return; // wait until socket is ready
    listenNewMessages(); // attach listener once

    return () => {
      socket.off("newMessage");
    };
  }, [socket, listenNewMessages]); // re-run if socket changes

  return { messages, loading, selectedConversation };
};
export default useGetMessages;
