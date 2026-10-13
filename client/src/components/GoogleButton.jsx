import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
const API_URL = import.meta.env.VITE_API_URL;
function GoogleButton() {
    const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
    const handleSuccess = async (response) => {
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential: response.credential }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        return;
      }

      login(data);
      navigate("/chat", { replace: true });
    } catch (err) {
      console.error("Google login error:", err);
      setError("Can't reach the server. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
<div className="flex flex-col items-center gap-3 ">
  <GoogleLogin   onSuccess={handleSuccess}
        onError={() => setError("Google sign-in didn't work. Please try again.")}
        theme="outline"
        size="large"
        text="continue_with"
        shape="rectangular"></GoogleLogin>
              {loading && <p className="text-sm text-ink/70">Signing you in...</p>}
      {error && (
        <p role="alert" className="w-full rounded-xl bg-danger/10 px-4 py-3 text-sm text-danger">
          {error}
        </p>
      )}
</div>
  );
}

export default GoogleButton;