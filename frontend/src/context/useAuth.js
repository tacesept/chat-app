// useAuth.js
import { create } from "zustand";

export const useAuth = create((set) => ({
  authUser: JSON.parse(localStorage.getItem("chat-user")) || null,
  setAuthUser: (authUser) => {
    if (authUser) {
      localStorage.setItem("chat-user", JSON.stringify(authUser));
    } else {
      localStorage.removeItem("chat-user");
    }
    set({ authUser });
  },
}));
