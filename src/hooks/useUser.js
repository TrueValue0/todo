import { usuarios } from '@/config/firebaseapp'
import { getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export function useUsers() {

    const [users, setUsers] = useState([]);

    const cargarUsuarios = async () => {
        const querySnapshot = await getDocs(usuarios);

        let usuariosData = [];
        querySnapshot.forEach(doc => usuariosData.push({ id: doc.id, ...doc.data(), }));

        setUsers(usuariosData);
    };

    useEffect(() => {
        cargarUsuarios();
    }, [])
    return { users }
}