import { useState,useEffect } from "react";

export function useCountdown(start){
const[secondsLeft,setSecondsLeft]=useState(start);
  useEffect(() => {
    if (secondsLeft === 0) return;
    const timer = setTimeout(() => setSecondsLeft(secondsLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft]);
  const restart=()=>setSecondsLeft(start);
    return { secondsLeft, restart };
}