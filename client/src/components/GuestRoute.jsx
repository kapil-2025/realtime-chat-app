import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";
function GuestRoute({ children }) {
const {token}=useAuth();
  if (token) {
    return <Navigate to="/chat" replace />;
  }
    return children;
}

export default GuestRoute;