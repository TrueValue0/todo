import { ref, listAll } from "firebase/storage";
import { storage } from "@/config/firebaseapp";
import { useEffect, useState } from "react";

export default function ListarDocumento({ idDoc, id } = { idDoc: '', id: '' }) {
    const [documentos, setDocumentos] = useState([])
    const listaRef = ref(storage, `${idDoc}/${id}/documentos`);

    useEffect(() => {
        listAll(listaRef)
            .then(res => {
                setDocumentos(res.items)
            })
    }, []);
    return (
        <>
            <h3>Documentos</h3>
            {documentos.map(documento => {
                console.log(documento);
            })}
        </>);
}

