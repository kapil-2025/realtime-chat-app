import { useState,useEffect } from "react";
import AuthLayout from "../components/AuthLayout";

import { useLocation, Navigate } from "react-router";
const API_URL = import.meta.env.VITE_API_URL;
function VerifyOtpPage() {
  const location = useLocation();
  const email = location.state?.email;
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [secondsLeft,setSecondsLeft]=useState(60);
  const [resending,setResending]=useState(false);
  const [info,setInfo]=useState("");
  useEffect(()=>{if(secondsLeft===0){
    return;
  }
const timer=setTimeout(()=>setSecondsLeft(secondsLeft-1),1000);
return ()=>clearTimeout(timer);

},[secondsLeft])
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message);
        return;
      }
      setVerified(true);
      console.log("token", data.token);
    } catch (error) {
      console.error("Verify error:", error);
      setError("Can't reach the server. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };
  const handleResend=async()=>{
    setError("");
    setInfo("");
    setResending(true);
    try{
      const res = await fetch(`${API_URL}/api/auth/resend-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        return;
      }
      setInfo("A new code is on its way. Check your email.")
       setOtp("");
      setSecondsLeft(60);
    }
    catch(err){
      console.error("Resend error:",err);
      setError("Can't reach the server. Check your connection and try again.")
    }
    finally{
      setResending(false);
    }
  }
  if (!email) {
    return <Navigate to="/register" replace />;
  }
  return (
    <AuthLayout>
      <h1 className="font-display text-5xl font-extrabold tracking-tight">
        Check your email
      </h1>
      <p className="mt-3 text-ink/70">
        We sent a 6-digit code to {" "}
        <span className="font-semibold text-ink">{email}</span>
      </p>
      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
        <label htmlFor="otp" className="text-sm font-medium">
          Verification code
        </label>
        <input
          type="text"
          id="otp"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={6}
          required
          placeholder="000000"
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
          className="rounded-xl border border-ink/15 bg-white px-4 py-3 text-center font-display text-3xl font-extrabold tracking-[0.5em] outline-none placeholder:text-ink/20 focus:border-inland focus:ring-2 focus:ring-inland/20"
        />
        {error && (
          <p
            role="alert"
            className="rounded-xl bg-danger/10 px-4 py-3 text-sm text-danger"
          >
            {error}
          </p>
        )}
                {info && (
          <p className="rounded-xl bg-inland/10 px-4 py-3 text-sm text-inland">
            {info}
          </p>
        )}
        {verified && (
          <p className="rounded-xl bg-leaf/10 px-4 py-3 text-sm text-leaf">
            Email verified! You're all set.
          </p>
        )}
        <button
          type="submit"
          disabled={loading || otp.length !== 6}
          className="mt-2 rounded-xl bg-inland px-4 py-3 font-semibold text-white hover:bg-inland/90 disabled:cursor-not-allowed disabled:opacity-60 "
        >
          {loading ? "Verifying..." : "Verify email"}
        </button>
      </form>
      {!verified &&   <p className="mt-6 text-sm text-ink/70"> Didn't get the code? {secondsLeft>0? (<span className="font-medium"> Resend in {secondsLeft}s</span>):(
        <button type="button" onClick={handleResend}  disabled={resending}  className="font-semibold text-inland underline">   {resending ? "Sending..." : "Resend code"}</button>
      )}
      </p>}
    
    </AuthLayout>
  );
}
export default VerifyOtpPage;
