import { createContext, useContext, useState } from 'react';
import { auth, usuarios } from '@/config/firebaseapp';
import { doc, setDoc } from "firebase/firestore";
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

    const [user, setUser] = useState(undefined);

    const signup = (email, password) => createUserWithEmailAndPassword(auth, email, password);

    const login = (email, password) => signInWithEmailAndPassword(auth, email, password);

    const logout = () => signOut(auth);

    const resetPassword = async (email) => await sendPasswordResetEmail(auth, email);

    const authState = (observer) => onAuthStateChanged(auth, observer);

    const updateUser = async () => user && await setDoc(doc(usuarios, user.id), user);


    return (
        <authContext.Provider value={{ signup, login, logout, resetPassword, authState, user, setUser, updateUser }}>
            {children}
        </authContext.Provider>
    )
}