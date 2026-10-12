import { useState,useEffect } from "react";
const API_URL =import.meta.env.VITE_API_URL;
const STATUS={
  cheking:{text:"Connecting to server...",dot:"bg-marigold animate-pulse"},
  online:{
    text:"Server connected",dot:"bg-leaf"
  },
    offline: { text: "Can't reach server. Check F12 → Console.", dot: "bg-danger" },
}
function App(){
  const [status,setStatus]=useState("cheking");
  useEffect( ()=>{
    const checkServer=async ()=>{
try{
const res=await fetch(`${API_URL}/`);
if(!res.ok){
  throw new Error("Bad response")
}
setStatus("online");
}
catch(error){
 setStatus("offline");
}
    };
    checkServer();

  },[]);
  const current=STATUS[status];
  return (
    <main className="min-h-screen flex flex-col justify-center px-6 sm:px-16">
      <h1 className="font-display text-6xl sm:text-8xl font-extrabold tracking-tight">Chat App</h1>
      <p className="mt-3 text-lg text-ink/70">Dosto se kare baat, bina rukaawat k</p>
      <div className="mt-10 inline-flex w-fit items-center gap-3 border border-ink/10 bg-white px-4 py-2">
      <span className={`h-2.5 w-2.5 rounded-full ${current.dot}`}></span>
              <span className="text-sm font-medium">{current.text}</span></div>
    </main>
  )
}
export default App;