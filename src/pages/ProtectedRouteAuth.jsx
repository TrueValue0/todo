import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";
import { usuarios } from "@/config/firebaseapp";
import { getDoc, doc } from "firebase/firestore";

export default function ProtectedRouteAuth({ children }) {
    const { authState, user, setUser, creatingUser } = useAuth();

    useEffect(() => {
        let unsubscribe;
        if (!creatingUser) {
            unsubscribe = authState(async (user) => {
                if (user === null) setUser(null);
                else {
                    const documento = await getDoc(doc(usuarios, user.uid))
                    if (documento.exists()) setUser({ ...documento.data(), id: user.uid });
                    else setUser(null);
                }
            });
        }
        return () => { if (unsubscribe) unsubscribe() }
    }, []);

    if (user === null) {
        return <Navigate to="/login" />;
    }

    if (user) return children
}
