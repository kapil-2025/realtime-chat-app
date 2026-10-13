import { Link } from "react-router";
import ServerStatus from "../components/ServerStatus";

function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col justify-center px-6 sm:px-16">
      <h1 className="font-display text-5xl font-extrabold tracking-tight">Log in</h1>
      <p className="mt-3 text-ink/70">
        New here? <Link to="/register" className="font-semibold text-inland underline">Create an account</Link>
      </p>
      <div className="mt-10">
        <ServerStatus />
      </div>
    </main>
  );
}

export default LoginPage;