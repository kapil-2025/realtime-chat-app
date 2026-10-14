function ChatWindow() {
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

export default ChatWindow;