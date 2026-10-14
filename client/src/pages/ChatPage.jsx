import { useState } from "react";
import Sidebar from "../components/chat/Sidebar";
import ChatWindow from "../components/chat/ChatWindow";

function ChatPage() {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar onSelect={setSelectedUser} selectedId={selectedUser?._id} />
      <ChatWindow selectedUser={selectedUser} onBack={() => setSelectedUser(null)} />
    </div>
  );
}

export default ChatPage;