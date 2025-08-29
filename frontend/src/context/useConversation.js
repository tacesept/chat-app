// useConversation.js
import { create } from "zustand";

const useConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (conversation) =>
    set({ selectedConversation: conversation }),
  messages: [],
  setMessages: (messages) => set({ messages }),
  addMessage: (msg) => set((state) => ({ messages: [...state.messages, msg] })),
}));

export default useConversation;
