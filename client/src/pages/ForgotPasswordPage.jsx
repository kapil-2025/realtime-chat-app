import AuthLayout from "../components/AuthLayout";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { apiRequest } from "../lib/api";

function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
      const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await apiRequest("/api/auth/forgot-password", { method: "POST", body: { email } });
      navigate("/reset-password", { state: { email } });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <AuthLayout>
            <h1 className="font-display text-5xl font-extrabold tracking-tight">Reset your password</h1>
      <p className="mt-3 text-ink/70">
        Enter your account email and we'll send you a 6-digit code.
      </p>
            <form  onSubmit={handleSubmit}  className="mt-8 flex flex-col gap-4">
                      <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium">Email</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            required             value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-xl border border-ink/15 bg-white px-4 py-3 outline-none focus:border-inland focus:ring-2 focus:ring-inland/20"
          />
        </div>        {error && (
          <p role="alert" className="rounded-xl bg-danger/10 px-4 py-3 text-sm text-danger">
            {error}
          </p>
        )}
                <button
          type="submit"  disabled={loading} 
          className="mt-2 rounded-xl bg-inland px-4 py-3 font-semibold text-white hover:bg-inland/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
        {loading ? "Sending..." : "Send reset code"}
        </button>
      </form>
            <p className="mt-6 text-sm text-ink/70">
        Remembered it? <Link to="/login" className="font-semibold text-inland underline">Back to log in</Link>
      </p>
    </AuthLayout>
  );
}

export default ForgotPasswordPage;