import { createContext,useState,useContext} from "react";
const AuthContext=createContext(null);
export function AuthProvider({children}){
  const [token,setToken]=useState(()=>localStorage.getItem("token"));
  const [user,setUser]=useState(()=>{
    const saved =localStorage.getItem("user");
    return saved? JSON.parse(save) :null;
  })
  const login =(data)=>{
    localStorage.setItem("token",data.token);
    localStorage.setItem("user",JSON.stringify(data.user));
    setToken(data.token);
    setUser(data.user);
  }
  const logout=()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  }
return (
  <AuthContext.Provider value={{user,token,login,logout}}>{children}</AuthContext.Provider>
)
}
export function useAuth(){
  return useContext(AuthContext);
}