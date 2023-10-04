import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '@/config/firebaseapp';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    onAuthStateChanged,
    signOut
} from 'firebase/auth';



export const authContext = createContext();


export const useAuth = () => {
    const context = useContext(authContext);
    if (!context) throw new Error("There is no Auth provider");
    return context;
}

export default function AuthProvider({ children }) {

    const [credentials, setCredentials] = useState({
        isAuthenticated: false,
        loading: true,
        user: null
    })

    const signup = (email, password) => createUserWithEmailAndPassword(auth, email, password);

    const login = (email, password) => signInWithEmailAndPassword(auth, email, password);

    const logout = () => signOut(auth);

    const resetPassword = async (email) => await sendPasswordResetEmail(auth, email);

    useEffect(() => {
        const unsubuscribe = onAuthStateChanged(auth, (currentUser) => {
            let auth = currentUser !== null;
            setCredentials({ loading: !auth, user: currentUser, isAuthenticated: auth })
        });
        return () => unsubuscribe();
    }, []);

    return (
        <authContext.Provider value={{ credentials, signup, login, logout, resetPassword }}>
            {children}
        </authContext.Provider>
    )
}