import AuthLayout from "../components/AuthLayout";

function VerifyOtpPage(){
  return(
   <AuthLayout>
      <h1 className="font-display text-5xl font-extrabold tracking-tight">Check your email</h1>
      <p className="mt-3 text-ink/70">Enter the 6-digit code we sent you.</p>
    </AuthLayout>
  )
}
export default VerifyOtpPage;