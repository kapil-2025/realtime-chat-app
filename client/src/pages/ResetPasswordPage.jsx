
import { useState,useEffect } from "react";import AuthLayout from "../components/AuthLayout";
import { useLocation, Navigate ,useNavigate} from "react-router";

const API_URL = import.meta.env.VITE_API_URL;
function ResetPasswordPage() {
    const location = useLocation();
  const email = location.state?.email;
    const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
    const [secondsLeft, setSecondsLeft] = useState(60);
  const [resending, setResending] = useState(false);
  const [info, setInfo] = useState("");
    const navigate = useNavigate();
      useEffect(() => {
    if (secondsLeft === 0) return;
    const timer = setTimeout(() => setSecondsLeft(secondsLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft]);
    const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        return;
      }
            navigate("/login", {
        replace: true,
        state: { message: "Password updated. Log in with your new password." },
      });
    } catch (err) {
      console.error("Reset password error:", err);
      setError("Can't reach the server. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };
    const handleResend = async () => {
    setError("");
    setInfo("");
    setResending(true);

    try {
      const res = await fetch(`${API_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        return;
      }

      setInfo("If an account exists, a new code is on its way.");
      setOtp("");
      setSecondsLeft(60);
    } catch (err) {
      console.error("Resend reset code error:", err);
      setError("Can't reach the server. Check your connection and try again.");
    } finally {
      setResending(false);
    }
  };
    if (!email) {
    return <Navigate to="/forgot-password" replace />;
  }
  return (
    <AuthLayout>
      <h1 className="font-display text-5xl font-extrabold tracking-tight">Choose a new password</h1>
            <p className="mt-3 text-ink/70">
        If an account exists for <span className="font-semibold text-ink">{email}</span>, we sent a 6-digit code.
      </p>
            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
                      <div className="flex flex-col gap-1.5">
          <label htmlFor="otp" className="text-sm font-medium">Reset code</label>
          <input
            id="otp"
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            required             value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            placeholder="000000"
            className="rounded-xl border border-ink/15 bg-white px-4 py-3 text-center font-display text-3xl font-extrabold tracking-[0.5em] outline-none placeholder:text-ink/20 focus:border-inland focus:ring-2 focus:ring-inland/20"
          />
        </div>
                <div className="flex flex-col gap-1.5">
          <label htmlFor="newPassword" className="text-sm font-medium">New password</label>
          <input
            id="newPassword"
            type="password"
            autoComplete="new-password"
            minLength={6}
            required             value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="rounded-xl border border-ink/15 bg-white px-4 py-3 outline-none focus:border-inland focus:ring-2 focus:ring-inland/20"
          />
          <p className="text-xs text-ink/60">At least 6 characters</p>
        </div>
                <div className="flex flex-col gap-1.5">
          <label htmlFor="confirmPassword" className="text-sm font-medium">Confirm new password</label>
          <input
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
            minLength={6}
            required             value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="rounded-xl border border-ink/15 bg-white px-4 py-3 outline-none focus:border-inland focus:ring-2 focus:ring-inland/20"
          />
        </div>
                {error && (
          <p role="alert" className="rounded-xl bg-danger/10 px-4 py-3 text-sm text-danger">
            {error}
          </p>
        )}
                {info && (
          <p className="rounded-xl bg-inland/10 px-4 py-3 text-sm text-inland">
            {info}
          </p>
        )}
                <button
          type="submit"  disabled={loading || otp.length !== 6}
          className="mt-2 rounded-xl bg-inland px-4 py-3 font-semibold text-white hover:bg-inland/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
           {loading ? "Resetting..." : "Reset password"}
        </button>
      </form>
            <p className="mt-6 text-sm text-ink/70">
        Didn't get the code?{" "}
        {secondsLeft > 0 ? (
          <span className="font-medium">Resend in {secondsLeft}s</span>
        ) : (
          <button
            type="button"
            onClick={handleResend}
            disabled={resending}
            className="font-semibold text-inland underline disabled:opacity-60"
          >
            {resending ? "Sending..." : "Resend code"}
          </button>
        )}
      </p>
    </AuthLayout>
  );
}

export default ResetPasswordPage;