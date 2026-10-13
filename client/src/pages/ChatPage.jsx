import { useAuth } from "../context/AuthContext";

function ChatPage() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center justify-between border-b border-ink/10 bg-white px-6 py-4">
        <p className="font-display text-xl font-extrabold text-inland">Chat App</p>

        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-inland font-semibold text-white">
            {user?.name?.charAt(0).toUpperCase()}
          </span>
          <span className="hidden font-medium sm:inline">{user?.name}</span>
          <button
            type="button"
            onClick={logout}
            className="rounded-xl border border-ink/15 px-4 py-2 text-sm font-semibold hover:bg-paper"
          >
            Log out
          </button>
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <h1 className="font-display text-4xl font-extrabold tracking-tight">
          Hi, {user?.name} 👋
        </h1>
        <p className="mt-3 text-ink/70">Your chats will show up here soon.</p>
      </main>
    </div>
  );
}

export default ChatPage;