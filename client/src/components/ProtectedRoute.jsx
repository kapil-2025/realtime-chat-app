import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";

function ProjectRoute({children}){
  const {token}=useAuth();
  if(!token){
    return <Navigate to="/login" replace />
  }
  return (
    children

  )
}
export default ProjectRoute;