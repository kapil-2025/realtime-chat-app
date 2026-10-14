import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { apiRequest } from "../../lib/api";

function Sidebar({onSelect,selectedId}) {
  const { user, token, logout } = useAuth();
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [usersError, setUsersError] = useState("");

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await apiRequest("/api/users", { token });
        setUsers(data);
      } catch (err) {
        setUsersError(err.message);
      } finally {
        setLoadingUsers(false);
      }
    };

    loadUsers();
  }, [token]);

  return (
        <aside className={`${selectedId ? "hidden md:flex" : "flex"} w-full flex-col border-r border-ink/10 bg-white md:w-80`}>
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
        {loadingUsers && (
          <p className="px-2 py-6 text-center text-sm text-ink/50">Loading people...</p>
        )}

        {usersError && (
          <p role="alert" className="mx-2 my-4 rounded-xl bg-danger/10 px-4 py-3 text-sm text-danger">
            {usersError}
          </p>
        )}

        {!loadingUsers && !usersError && users.length === 0 && (
          <p className="px-2 py-6 text-center text-sm text-ink/50">
            No one here yet. Ask a friend to sign up!
          </p>
        )}

        <ul>
          {users.map((person) => (
            <li key={person._id}>
                         <button
                type="button"
                onClick={() => onSelect(person)}
                className={`flex w-full items-center gap-3 rounded-xl px-2 py-2.5 text-left ${
                  selectedId === person._id ? "bg-inland/10" : "hover:bg-paper"
                }`}
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink/10 font-semibold text-ink">
                  {person.name.charAt(0).toUpperCase()}
                </span>
                <span className="min-w-0">
                  <span className="block truncate font-semibold">{person.name}</span>
                  <span className="block truncate text-sm text-ink/60">{person.email}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;