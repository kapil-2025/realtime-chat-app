import { useState } from "react";

function ChatWindow({ selectedUser, onBack }) {
  const [text, setText] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    const message = text.trim();
    if (!message) return;
    console.log("Send to", selectedUser.name, ":", message);
    setText("");
  };

  if (!selectedUser) {
    return (
      <section className="hidden flex-1 flex-col items-center justify-center bg-paper px-6 text-center md:flex">
        <p className="text-5xl">💬</p>
        <h2 className="mt-4 font-display text-3xl font-extrabold">Pick a chat</h2>
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

      <div className="flex flex-1 items-center justify-center overflow-y-auto px-6 text-center">
        <p className="text-ink/60">No messages yet. Say hi 👋</p>
      </div>

      <form onSubmit={handleSend} className="flex items-center gap-2 border-t border-ink/10 bg-white px-4 py-3">
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
          disabled={!text.trim()}
          className="rounded-full bg-inland px-5 py-2.5 font-semibold text-white hover:bg-inland/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </section>
  );
}

export default ChatWindow;