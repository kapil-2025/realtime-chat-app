import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import { useSocket } from "../../context/SocketContext";
import { apiRequest } from "../../lib/api";

const formatTime = (date) =>
  new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
const addUnique = (list, msg) =>
  list.some((m) => m._id === msg._id) ? list : [...list, msg];
function ChatWindow({ selectedUser, onBack }) {
  const { user, token } = useAuth();
  const socket=useSocket();
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [messagesError, setMessagesError] = useState("");
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");
  const bottomRef = useRef(null);
  const selectedId = selectedUser?._id;

  useEffect(() => {
    if (!selectedId) return;
    let ignore = false;

    const loadMessages = async () => {
      setLoadingMessages(true);
      setMessagesError("");
      setMessages([]);
      try {
        const data = await apiRequest(`/api/messages/${selectedId}`, { token });
        if (!ignore) setMessages(data);
      } catch (err) {
        if (!ignore) setMessagesError(err.message);
      } finally {
        if (!ignore) setLoadingMessages(false);
      }
    };

    loadMessages();

    return () => {
      ignore = true;
    };
  }, [selectedId, token]);

  useEffect(() => {
    if (!socket || !selectedId) return;

    const handleNew = (msg) => {
      const belongsHere = msg.sender === selectedId || msg.receiver === selectedId;
      if (!belongsHere) return;
      setMessages((prev) => addUnique(prev, msg));
    };

    socket.on("message:new", handleNew);

    return () => {
      socket.off("message:new", handleNew);
    };
  }, [socket, selectedId]);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    const message = text.trim();
    if (!message || sending) return;

    setSending(true);
    setSendError("");
    try {
      const newMessage = await apiRequest("/api/messages", {
        method: "POST",
        body: { receiverId: selectedUser._id, text: message },
        token,
      });
          setMessages((prev) => addUnique(prev, newMessage));
      setText("");
    } catch (err) {
      setSendError(err.message);
    } finally {
      setSending(false);
    }
  };

  if (!selectedUser) {
    return (
      <section className="hidden flex-1 flex-col items-center justify-center bg-paper px-6 text-center md:flex">
        <p className="text-5xl">💬</p>
        <h2 className="mt-4 font-display text-3xl font-extrabold">
          Pick a chat
        </h2>
        <p className="mt-2 max-w-xs text-ink/60">
          Choose someone from the list to start a conversation.
        </p>
      </section>
    );
  }

  return (
    <section className="flex flex-1 flex-col bg-paper">
      <header className="flex items-center gap-3 border-b border-ink/10 bg-white px-4 py-3">
        <button
          type="button"
          onClick={onBack}
          aria-label="Back to chats"
          className="rounded-full px-2 text-2xl leading-none text-ink/70 hover:bg-paper md:hidden"
        >
          ←
        </button>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink/10 font-semibold text-ink">
          {selectedUser.name.charAt(0).toUpperCase()}
        </span>
        <div className="min-w-0">
          <p className="truncate font-semibold">{selectedUser.name}</p>
          <p className="truncate text-sm text-ink/60">{selectedUser.email}</p>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        {loadingMessages && (
          <p className="py-6 text-center text-sm text-ink/50">
            Loading messages...
          </p>
        )}

        {messagesError && (
          <p
            role="alert"
            className="mx-auto my-4 max-w-sm rounded-xl bg-danger/10 px-4 py-3 text-center text-sm text-danger"
          >
            {messagesError}
          </p>
        )}

        {!loadingMessages && !messagesError && messages.length === 0 && (
          <div className="flex h-full items-center justify-center">
            <p className="text-ink/60">No messages yet. Say hi 👋</p>
          </div>
        )}
        <ul className="flex flex-col gap-2">
          {messages.map((msg) => {
            const isMine = msg.sender === user._id;
            return (
              <li
                key={msg._id}
                className={`flex ${isMine ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl px-3.5 py-2 shadow-sm ${
                    isMine
                      ? "rounded-br-sm bg-inland text-white"
                      : "rounded-bl-sm bg-white text-ink"
                  }`}
                >
                  <p className="whitespace-pre-wrap break-words">{msg.text}</p>
                  <p
                    className={`mt-1 text-right text-[11px] ${isMine ? "text-white/70" : "text-ink/50"}`}
                  >
                    {formatTime(msg.createdAt)}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
        <div ref={bottomRef}></div>
      </div>

      <form
        onSubmit={handleSend}
        className="flex items-center gap-2 border-t border-ink/10 bg-white px-4 py-3"
      >
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message"
          aria-label="Message"
          autoComplete="off"
          className="flex-1 rounded-full bg-paper px-4 py-2.5 outline-none focus:ring-2 focus:ring-inland/20"
        />
        <button
          type="submit"
          disabled={!text.trim() || sending}
          className="rounded-full bg-inland px-5 py-2.5 font-semibold text-white hover:bg-inland/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
           {sending ? "Sending..." : "Send"}
        </button>
      </form>
    </section>
  );
}

export default ChatWindow;
