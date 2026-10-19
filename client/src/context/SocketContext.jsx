import { createContext, useState, useEffect, useContext } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

const SocketContext = createContext(null);

export function SocketProvider({ children }) {
  const { token } = useAuth();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!token) return;

    const s = io(API_URL, { auth: { token } });

    s.on("connect", () => console.log("🔌 socket connected:", s.id));
    s.on("connect_error", (err) => console.log("❌ socket error:", err.message));
    s.on("disconnect", (reason) => console.log("📵 socket disconnected:", reason));

    setSocket(s);

    return () => {
      s.disconnect();
      setSocket(null);
    };
  }, [token]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  return useContext(SocketContext);
}