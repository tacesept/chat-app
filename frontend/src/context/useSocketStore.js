// useSocketStore.js
import { create } from "zustand";
import io from "socket.io-client";
import useConversation from "./useConversation";

import notificationSound from "../assets/sounds/notification.mp3";

export const useSocketStore = create((set, get) => ({
  socket: null,
  onlineUsers: [],

  // Connect socket
  connectSocket: (authUser) => {
    if (!authUser || get().socket) return;

    const socket = io("/", {
      query: { userId: authUser._id },
    });

    // Listen for online users update
    socket.on("getOnlineUsers", (users) => set({ onlineUsers: users }));

    // Save socket instance in the store
    set({ socket });
  },

  // Listen for new messages (safe, avoids duplicates)
  listenNewMessages: () => {
    const socket = get().socket;
    if (!socket) return;

    const { addMessage } = useConversation.getState();

    // Remove previous listener if it exists
    socket.off("newMessage");

    socket.on("newMessage", (msg) => {
      addMessage(msg);

      // play sound
      const sound = new Audio(notificationSound);
      sound.play().catch((err) => {
        console.warn("Autoplay blocked:", err);
      });
    });
  },

  // Add generic listener for other events
  addSocketListener: (event, callback) => {
    const socket = get().socket;
    if (!socket) return;

    socket.off(event); // remove old listener
    socket.on(event, callback);
  },

  // Disconnect socket
  disconnectSocket: () => {
    if (get().socket) {
      get().socket.close();
      set({ socket: null, onlineUsers: [] });
    }
  },
}));
