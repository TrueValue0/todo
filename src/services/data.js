import { tareas, usuarios } from "@/config/firebaseapp";
import { getDocs } from "firebase/firestore";

export async function getAllEvents() {
    const querySnapshot = await getDocs(tareas);
    let tareasData = [];
    querySnapshot.forEach((doc) => tareasData.push({ ...doc.data(), uid: doc.id }));
    tareasData = tareasData.filter(usuario => usuario.tareas.length > 0 && usuario.usuario !== 'PRUEBA');
    return tareasData;
}

export async function getAllUsers() {
    const querySnapshot = await getDocs(usuarios);

    let usuariosData = [];
    querySnapshot.forEach(doc => usuariosData.push({ id: doc.id, ...doc.data(), }));

    //Ordenar nombres de usuarios alfabeticamente.
    usuariosData.sort((a, b) => a.nombre.localeCompare(b.nombre));
    usuariosData = usuariosData.filter(value => value.nombre !== 'PRUEBA');

    return usuariosData;
};