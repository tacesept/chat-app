import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/useAuth";
import { useSocketStore } from "../context/useSocketStore";

const useSignup = () => {
  const [loading, setLoading] = useState(false);

  const setAuthUser = useAuth((state) => state.setAuthUser);
  const connectSocket = useSocketStore((s) => s.connectSocket);

  const signup = async ({ email, name, password, confirmPassword, gender }) => {
    const success = handleInputErrors({
      email,
      name,
      password,
      confirmPassword,
      gender,
    });
    if (!success) return;
    try {
      setLoading(true);
      const res = await fetch("api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name,
          password,
          confirmPassword,
          gender,
        }),
        credentials: "include",
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data);
      connectSocket(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

export default useSignup;

function handleInputErrors({ email, name, password, confirmPassword, gender }) {
  if (!email || !name || !password || !confirmPassword || !gender) {
    toast.error("Please fill in all fields");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  return true;
}
