import { useAuth } from "@/context/AuthProvider"
import { Navigate, useLocation } from "react-router-dom";
export default function ProtectedRouteAuth({ children }) {
    const location = useLocation();
    const { credentials: { isAuthenticated } } = useAuth();
    if (!isAuthenticated) {
        return <Navigate to='/login' state={{ location }} />
    }
    return children
}