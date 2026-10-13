import { Link } from "react-router";
import ServerStatus from "../components/ServerStatus";

function RegisterPage() {
  return (
    <main className="min-h-screen flex flex-col justify-center px-6 sm:px-16">
      <h1 className="font-display text-5xl font-extrabold tracking-tight">Create account</h1>
      <p className="mt-3 text-ink/70">
        Already have an account? <Link to="/login" className="font-semibold text-inland underline">Log in</Link>
      </p>
      <div className="mt-10">
        <ServerStatus />
      </div>
    </main>
  );
}

export default RegisterPage;