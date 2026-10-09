const sendEmail=async (to,subject,html)=>{
const response=await fetch("https://api.brevo.com/v3/smtp/email",{method:"POST",
headers:{
  "api-key":process.env.BREVO_API_KEY,
  "content-type":"application/json",
},
body:JSON.stringify({
  sender:{name:process.env.EMAIL_FROM_NAME,email:process.env.EMAIL_FROM},
  to:[{email: to}],
  subject:subject,htmlContent:html
}),
});
if(!response.ok){
  const errorText=await response.text();
  throw new Error(`Email failed :${response.status} ${errorText}`);
}

}
export default sendEmail;