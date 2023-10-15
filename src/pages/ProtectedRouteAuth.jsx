import { useEffect } from "react";
import { useAuth } from "@/context/AuthProvider";
import { Navigate } from "react-router-dom";

export default function ProtectedRouteAuth({ children }) {
    const { authState, user, setUser } = useAuth();

    useEffect(() => {
        const unsubscribe = authState((user) => {
            setUser(user);
        });
        return () => unsubscribe();
    }, []);

    if (user === null) {
        return <Navigate to="/login" />;
    }

    if (user) return children
}
