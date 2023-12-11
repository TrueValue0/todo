import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "@/config/firebaseapp";
import { useEffect, useState } from "react";
import { FaRegFilePdf } from "react-icons/fa6";
import { BsFiletypeTxt } from "react-icons/bs";
import { FaRegFileWord, FaCircle } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";


export default function ListarDocumentos({ idDoc, id } = { idDoc: '', id: '' }) {
    const [documentos, setDocumentos] = useState([{ url: '', name: '' }])
    const listaRef = ref(storage, `${idDoc}/${id}/documentos`);

    useEffect(() => {
        listAll(listaRef)
            .then(async (res) => {
                let ficheros = [];

                // Usamos Promise.all para esperar a que todas las promesas se resuelvan
                await Promise.all(res.items.map(async (fichero) => {
                    const url = await getDownloadURL(fichero);
                    const tipoArchivo = obtenerTipoArchivo(fichero.name);
                    ficheros.push({ url, name: fichero.name, type: tipoArchivo });
                }));

                setDocumentos(ficheros);
            })
            .catch((error) => {
                console.error("Error al obtener la lista de documentos:", error);
            });
    }, []);

    // Función para obtener el tipo de archivo basado en la extensión
    const obtenerTipoArchivo = (nombreArchivo) => {
        const extension = nombreArchivo.split('.').pop().toLowerCase();
        if (extension === 'pdf') {
            return 'pdf';
        } else if (extension === 'txt') {
            return 'txt';
        } else if (extension === 'docx' || extension === 'doc') {
            return 'word';
        } else {
            return 'Desconocido';
        }
    };

    const eliminar = async (index) => {
        const fichero = documentos[index];
        if (fichero && fichero.ref) {
            try {
                await deleteObject(fichero.ref);
                const nuevosDocumentos = [...documentos];
                nuevosDocumentos.splice(index, 1);
                setDocumentos(nuevosDocumentos);
            } catch (error) {
                console.error("Error al eliminar el documento:", error);
            }
        }
    }


    return (
        <>
            <h3>Documentos</h3>
            {documentos.length > 0 && documentos.map((documento, index) => (
                <div key={documento.url}>
                    <div className="d-flex justify-content-around align-items-center">
                        <a className="text-decoration-none" href={documento.url} target="_blank" rel="noopener noreferrer">
                            {documento.type === 'pdf' &&
                                <div className="position-relative">
                                    <FaRegFilePdf color="#8b0000" size={75} />
                                    <button type="button" onClick={() => eliminar(index)} style={{ position: 'absolute', fontSize: 30, top: -22, zIndex: 60, left: -12, color: 'red', cursor: 'pointer', width: 'auto', background: 'transparent', border: 'none', height: 'auto', display: 'inline-block' }}>
                                        <IoMdCloseCircle />
                                    </button>
                                </div>
                            }
                            {documento.type === 'txt' && <BsFiletypeTxt color="#9b9b9b" size={75} />}
                            {documento.type === 'word' && <FaRegFileWord color="#92c5fc" size={75} />}
                            <p className="text-center text-truncate m-0 text-black " style={{ fontSize: 12 }}>{documento.name}</p>
                        </a>
                    </div>
                </div>
            ))}
        </>
    );
}
