import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { apiRequest } from "../lib/api";
function GoogleButton({text="continue_with"}) {
    const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
    const handleSuccess = async (response) => {
    setError("");
    setLoading(true);

        try {
      const data = await apiRequest("/api/auth/google", {
        method: "POST",
        body: { credential: response.credential },
      });
      login(data);
      navigate("/chat", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
<div className="flex flex-col items-center gap-3 ">
  <GoogleLogin onSuccess={handleSuccess}
        onError={() => setError("Google sign-in didn't work. Please try again.")}
        
        theme="outline"
        size="large"
        text={text}
        shape="rectangular" ></GoogleLogin>
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