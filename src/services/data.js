import { tareas, usuarios, storage } from "@/config/firebaseapp";
import { getDocs } from "firebase/firestore";
import { deleteObject, getDownloadURL, getMetadata, listAll, ref } from "firebase/storage";

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
    //Filtramos el usuario de prueba.
    usuariosData.sort((a, b) => a.nombre.localeCompare(b.nombre));
    usuariosData = usuariosData.filter(value => value.nombre !== 'PRUEBA');

    return usuariosData;
};

export function obtenerTipoArchivo(nombreArchivo) {
    const extension = nombreArchivo.split('.').pop().toLowerCase();
    if (extension === 'pdf') {
        return 'pdf';
    } else if (extension === 'txt') {
        return 'txt';
    } else if (extension === 'docx' || extension === 'doc') {
        return 'word';
    } else {
        return 'desconocido';
    }
};

export async function getDocumentos({ idDoc, id }) {
    try {
        console.log(id);
        const listaRef = ref(storage, `${idDoc}/${id}/documentos`);
        const { items } = await listAll(listaRef);
        console.log(items);
        // Usamos Promise.all para esperar a que todas las promesas se resuelvan
        return await Promise.all(items.map(async (fichero) => {
            const url = await getDownloadURL(fichero);
            const metadata = await getMetadata(fichero)
            const tipoArchivo = obtenerTipoArchivo(fichero.name);

            return { url, name: fichero.name, type: tipoArchivo, ref: fichero, metadata }
        }));


    } catch (e) {
        console.error("Error al obtener la lista de documentos", e)
    }
}

export async function deleteAllDocuments({ idDoc, id }) {
    try {
        const listaRef = ref(storage, `${idDoc}/${id}/documentos`);
        const { items } = await listAll(listaRef);
        items.map(async fichero => await deleteObject(fichero))
    } catch (error) {
        console.error("Error al eliminar los documento.", error);
    }
}
