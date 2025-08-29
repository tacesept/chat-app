import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/useAuth";



const useLogout = () => {
  const [loading, setLoading] = useState(false);

  const setAuthUser = useAuth((state) => state.setAuthUser);

  const logout = async () => {
    try {
      setLoading(true);

      const res = await fetch("http://localhost:5001/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      localStorage.removeItem("chat-user");
      setAuthUser(null);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, logout };
};

export default useLogout;
