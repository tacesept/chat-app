import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import notificationSound from "../assets/sounds/notification.mp3";

const socket = io("/");

export default function App() {
  const [messages, setMessages] = useState([]);
  const [soundAllowed, setSoundAllowed] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      const res = await fetch(
        `api/messages/68aad90bb30f56ab0a07ad09`,
        {
          method: "GET",
          credentials: "include", // if using cookies/jwt
        }
      );
      const data = await res.json();
      setMessages(data);
    };
    fetchMessages();
  }, []);

  // Listen for new messages
  useEffect(() => {
    socket.on("newMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);

      // Play sound if allowed and audio is ready
      if (soundAllowed && audioRef.current) {
        audioRef.current.currentTime = 0; // restart sound
        audioRef.current.play().catch(console.log);
      }
    });

    return () => socket.off("newMessage");
  }, [soundAllowed]);

  // Enable sound on first click
  const enableSound = () => {
    if (!soundAllowed) {
      const audio = new Audio(notificationSound);
      audioRef.current = audio;
      audioRef.current.load(); // preload
      setSoundAllowed(true);
    }
  };

  return (
    <div className="p-4" onClick={enableSound}>
      <h1>📩 Real-Time Chat</h1>
      {!soundAllowed && <p>Click anywhere to enable notification sounds</p>}
      <ul>
        {messages.map((m, index) => (
          <li key={index}>
            <strong>{m.message}: </strong>
            {m.message}
          </li>
        ))}
      </ul>
    </div>
  );
}
