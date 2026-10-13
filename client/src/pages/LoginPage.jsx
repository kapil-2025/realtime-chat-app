import { useState } from "react";

import { Link,Navigate,useLocation, useNavigate} from "react-router";
import { useAuth } from "../context/AuthContext";
import GoogleButton from "../components/GoogleButton";
import ServerStatus from "../components/ServerStatus";
import AuthLayout from "../components/AuthLayout";
const API_URL = import.meta.env.VITE_API_URL;
function LoginPage() {
    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [needsVerify,setNeedsVerify]=useState(false);
  const {login}=useAuth();
  const navigate=useNavigate();
    const location = useLocation();
  const successMessage = location.state?.message;
    const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setNeedsVerify(false);
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
            if (!res.ok) {
              if(res.status==403){
                setNeedsVerify(true);
              }
        setError(data.message);
        return;
      }
      login(data);
      navigate("/chat",{replace:true})
    } catch (err) {
      console.error("Login error:", err);
      setError("Can't reach the server. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };
    const handleVerifyNow = async () => {
    try {
      await fetch(`${API_URL}/api/auth/resend-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } catch (err) {
      console.error("Resend error:", err);
    }
    navigate("/verify-otp", { state: { email } });
  };
  return (
    <AuthLayout>
      <h1 className="font-display text-5xl font-extrabold tracking-tight">Log in</h1>
      <p className="mt-3 text-ink/70">
        New here? <Link to="/register" className="font-semibold text-inland underline">Create an account</Link>
      </p>
      {successMessage && (
        <p className="mt-6 rounded-xl bg-leaf/10 px-4 py-3 text-sm text-leaf">
          {successMessage}
        </p>
      )}
      <form  onSubmit={handleSubmit}  className="mt-8 flex flex-col gap-4">                         {/* 🆕 Fix 1A */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium">Email</label>
          <input
            type="email"
            id="email"
            autoComplete="email"
            required
            value={email} onChange={(e)=>setEmail(e.target.value)}
            className="rounded-xl border border-ink/15 bg-white px-4 py-3 outline-none focus:border-inland focus:ring-2 focus:ring-inland/20"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className="text-sm font-medium">Password</label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            required             value={password}
            onChange={(e) => setPassword(e.target.value)} 
            className="rounded-xl border border-ink/15 bg-white px-4 py-3 outline-none focus:border-inland focus:ring-2 focus:ring-inland/20"
          />
          <Link to="/forgot-password" className="self-end text-sm font-semibold text-inland hover:underline">
            Forgot password?
          </Link>                                                            {/* 🆕 Fix 2 */}
        </div>
                {error && (
          <p role="alert" className="rounded-xl bg-danger/10 px-4 py-3 text-sm text-danger">
            {error}
          </p>
        )}
                {needsVerify && (
          <button
            type="button"
            onClick={handleVerifyNow}
            className="rounded-xl border border-inland px-4 py-3 font-semibold text-inland hover:bg-inland/5"
          >
            Verify my email
          </button>
        )}
        <button type="submit"    disabled={loading} className="mt-2 rounded-xl bg-inland px-4 py-3 font-semibold text-white hover:bg-inland/90 disabled:cursor-not-allowed disabled:opacity-60"> {loading ? "Logging in..." : "Log in"}</button>
      </form>                                                              {/* 🆕 Fix 1B */}
<div className="my-6 flex items-center gap-3 text-xs text-ink/50">
        <span className="h-px flex-1 bg-ink/10" />
        or
        <span className="h-px flex-1 bg-ink/10" />
      </div>

      <GoogleButton />
      <div className="mt-10">
        <ServerStatus />
      </div>
    </AuthLayout>
  );}

export default LoginPage;