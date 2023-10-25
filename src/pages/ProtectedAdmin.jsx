import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";
import { usuarios } from "@/config/firebaseapp";
import { getDoc, doc } from "firebase/firestore";

export default function ProtectedAdmin({ children }) {
    const { authState, user, setUser } = useAuth();

    useEffect(() => {
        const unsubscribe = authState(async (user) => {
            console.log(user);
            if (user === null) setUser(null);
            else {
                const documento = await getDoc(doc(usuarios, user.uid))
                if (documento.exists()) setUser({ ...documento.data(), id: user.uid });
                else setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    if (user === null) {
        return <Navigate to="/login" />;
    }

    if (user) {
        if (user.rol === 'admin') return children
        else return <Navigate to='/noAuthorized' />
    }
}
