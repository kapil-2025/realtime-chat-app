import { useAuth } from "../../context/AuthContext";

function Sidebar() {
  const { user, logout } = useAuth();

  return (
    <aside className="flex w-full flex-col border-r border-ink/10 bg-white md:w-80">
      <header className="flex items-center justify-between border-b border-ink/10 px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-inland font-semibold text-white">
            {user?.name?.charAt(0).toUpperCase()}
          </span>
          <span className="truncate font-semibold">{user?.name}</span>
        </div>
        <button
          type="button"
          onClick={logout}
          className="text-sm font-semibold text-ink/60 hover:text-danger"
        >
          Log out
        </button>
      </header>

      <div className="px-4 pb-2 pt-4">
        <h2 className="font-display text-2xl font-extrabold">Chats</h2>
        <input
          type="search"
          placeholder="Search people"
          aria-label="Search people"
          className="mt-3 w-full rounded-xl bg-paper px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-inland/20"
        />
      </div>

      <div className="flex-1 overflow-y-auto px-2">
        <p className="px-2 py-6 text-center text-sm text-ink/50">People will show up here.</p>
      </div>
    </aside>
  );
}

export default Sidebar;