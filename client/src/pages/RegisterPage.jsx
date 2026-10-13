import { Link ,useNavigate} from "react-router";
import ServerStatus from "../components/ServerStatus";
import AuthLayout from "../components/AuthLayout";
import GoogleButton from "../components/GoogleButton";
import { useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;

function RegisterPage() {
  const [name, setName]=useState("");
   const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError]=useState("");
  const [loading,setLoading]=useState(false);
  const navigate=useNavigate();

  const handleSubmit =async(e)=>{
    e.preventDefault();
    setError("");
    setLoading(true);
    try{
const res=await fetch(`${API_URL}/api/auth/register`,{method:"POST",headers:{"Content-Type":"application/json"},
body:JSON.stringify({name,email,password})

});
const data= await res.json();
if(!res.ok){
  setError(data.message);
  return;
}
navigate("/verify-otp",{state:{email}});

    }
    catch(error){
      console.error("Register error:",error)
setError("Cant'reach the server. Check your connection and try again.");
    }
    finally{
  setLoading(false);
}

  }
  return (
   <AuthLayout>
      <h1 className="font-display text-5xl font-extrabold tracking-tight">Create account</h1>
      <p className="mt-3 text-ink/70">
        Already have an account? <Link to="/login" className="font-semibold text-inland underline">Log in</Link>
      </p>
      <form onSubmit={handleSubmit}  className="mt-8 flex flex-col gap-4 ">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-sm font-medium ">Name</label>
          <input type="text" id="name" autoComplete="name" required             value={name}
            onChange={(e) => setName(e.target.value)} 
            
            className="rounded-xl border border-ink/15 bg-white px-4 py-3 outline-none focus:border-inland focus:ring-2 focus:ring-inland/20"/>
        </div>
                <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium">Email</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            required   value={email}
            onChange={(e) => setEmail(e.target.value)} 
            className="rounded-xl border border-ink/15 bg-white px-4 py-3 outline-none focus:border-inland focus:ring-2 focus:ring-inland/20"
          />
        </div>
                <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className="text-sm font-medium">Password</label>
          <input
            id="password"
            type="password"
            autoComplete="new-password"
            minLength={6}
            required   value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-xl border border-ink/15 bg-white px-4 py-3 outline-none focus:border-inland focus:ring-2 focus:ring-inland/20"
          />
          <p className="text-xs text-ink/60">At least 6 characters</p>
        </div>
        {error && <p role="alert " className="rounded-xl bg-danger/10 px-4 py-3 text-sm text-danger">{error}</p>}
        <button type="submit" disabled={loading} className="mt-2 rounded-xl bg-inland px-4 py-3 font-semibold text-white hover:bg-inland/90 disabled:cursor-not-allowed disabled:opacity-60">{loading ? "Creating account..." : "Create account"}</button>
      </form>
            <div className="my-6 flex items-center gap-3 text-xs text-ink/50">
        <span className="h-px flex-1 bg-ink/10" />
        or
        <span className="h-px flex-1 bg-ink/10" />
      </div>

      <GoogleButton text="signup_with" />
      <div className="mt-10">
        <ServerStatus />
      </div>
    </AuthLayout>
  );
}

export default RegisterPage;