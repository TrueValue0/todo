import { useEffect, useState } from "react";
import { getDoc, doc, setDoc, deleteDoc, addDoc, onSnapshot } from "firebase/firestore";
import { usuarios, tareas } from "@/config/firebaseapp";
import { useAuth } from "@/context/AuthProvider";

export function useUsers() {
    const { credentials: { user, loading }, signup } = useAuth();
    const id = user ? user.uid : null;
    const [ids, setIds] = useState([]);
    const [datos, setDatos] = useState([]);

    /*
        const user = {
            avatar:'',
            email:'',
            rol:'',
            usuario:''
        }
    */



    const cargarDoc = async () => {
        if (user) {
            const id = user.uid;
            try {
                const documentoSF = doc(usuarios, id);
                const documento = await getDoc(documentoSF);
                if (documento.exists()) {
                    const docFinal = documento.data();
                    setDatos(docFinal);
                } else {
                    console.log("El documento no existe en Firestore");
                }
            } catch (e) {
                console.log(e);
            }
        }
    }

    const updateUser = async (input) => {
        try {
            const documentoSF = doc(usuarios, id);
            await setDoc(documentoSF, input)
            setDatos(input);
        } catch (e) {
            console.log(e);
        }
    }

    const deleteUser = async () => {
        try {
            await deleteDoc(usuarios, id);
        } catch (error) {
            console.log(error);
        }
    }



    const createUser = async ({ email, password, usuario, avatar } = { usuario: '', avatar: '' }) => {
        try {
            if (datos.rol === 'admin') {
                const usuario = await signup(email, password);
                await addDoc(usuarios, {
                    email,
                    usuario,
                    avatar,
                    rol: rol ?? 'usuario',
                }).then(() => usuario.uid)
                await addDoc(tareas, { tareas: [] }).then(() => usuario.uid)
            }
        } catch (error) {
            console.log('Error al crear el usuario.');
        }
    }

    const pruebas = () => {
        console.log(ids);
    }

    useEffect(() => {
        cargarDoc();
    }, [loading, datos])

    useEffect(() => {

        const unsubscribe = onSnapshot(usuarios, (querySnapshot) => {
            querySnapshot.forEach((documento) => {
                setIds(prev => [prev, ...documento.id]);
                setDatos(prev => [prev, ...documento.data()]);
            })
        })

        return () => unsubscribe();

    }, [])

    return { datos, ids, deleteUser, pruebas, updateUser, createUser };
}