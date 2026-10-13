import { useState, useEffect } from "react";
const API_URL = import.meta.env.VITE_API_URL;
const STATUS = {
  cheking: {
    text: "Connecting to server...",
    dot: "bg-marigold animate-pulse",
  },
  online: {
    text: "Server connected",
    dot: "bg-leaf",
  },
  offline: {
    text: "Can't reach server. Check F12 → Console.",
    dot: "bg-danger",
  },
};
function ServerStatus() {
  const [status, setStatus] = useState("cheking");
  useEffect(() => {
    const checkServer = async () => {
      try {
        const res = await fetch(`${API_URL}/`);
        if (!res.ok) {
          throw new Error("Bad response");
        }
        setStatus("online");
      } catch (error) {
        setStatus("offline");
      }
    };
    checkServer();
  }, []);
  const current = STATUS[status];
  return (
    <div className=" inline-flex w-fit items-center gap-3 rounded-full border border-ink/10 bg-white px-4 py-2">
      <span className={`h-2.5 w-2.5 rounded-full ${current.dot}`}></span>
      <span className="text-sm font-medium">{current.text}</span>
    </div>
  );
}
export default ServerStatus;
