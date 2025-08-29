import { Navigate, Route, Routes } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/login";
import Signup from "./pages/signup";

import Message from "./pages/Message";
import Test from "./pages/Test";
import { useAuth } from "./context/useAuth";
import { useSocketStore } from "./context/useSocketStore";
import { useEffect } from "react";

const App = () => {
  const authUser = useAuth((state) => state.authUser);
  const connectSocket = useSocketStore((s) => s.connectSocket);
  const disconnectSocket = useSocketStore((s) => s.disconnectSocket);

  useEffect(() => {
    if (authUser) {
      connectSocket(authUser); // connect once after login
    } else {
      disconnectSocket(); // disconnect on logout
    }

    // cleanup when app unmounts
    return () => disconnectSocket();
  }, [authUser]);
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/:id"
          element={authUser ? <Message /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to={"/"} /> : <Login />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to={"/"} /> : <Signup />}
        />
      </Routes>
    </div>
  );
};
export default App;
