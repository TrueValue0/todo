import { Form } from 'react-bootstrap';
import ListarDocumentos from './ListarDocumentos';
import { useEffect, useState } from 'react';
import { useAuth } from "@/context/AuthProvider";
import { useEventos } from "@/context/EventoProvider";
import { ref, uploadBytesResumable, listAll, getMetadata, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '@/config/firebaseapp'; // Asegúrate de importar tu configuración de Firebase
import { useAlertContext } from '@/context/AlertProvider';
import { obtenerTipoArchivo } from '@/services/data'

export default function SubirDocumentos({ idDoc, id, anyadir } = { idDoc: '', id: '', anyadir: false }) {
    const [documentos, setDocumentos] = useState([]);
    const [progress, setProgress] = useState(0);
    const { confirmacion, error, alerta, informativo } = useAlertContext();
    const { user } = useAuth();
    const { ids } = useEventos();

    async function getDocumentos() {
        if (user.rol === 'admin' && anyadir) {
            try {
                ids.map(async value => {
                    const listaRef = ref(storage, `${value}/${id}/documentos`);
                    const { items } = await listAll(listaRef);
                    setDocumentos(await Promise.all(items.map(async (fichero) => {
                        const url = await getDownloadURL(fichero);
                        const metadata = await getMetadata(fichero)
                        const tipoArchivo = obtenerTipoArchivo(fichero.name);

                        return { url, name: fichero.name, type: tipoArchivo, ref: fichero, metadata }
                    })))
                })
                return []

            } catch (e) {
                console.error("Error al obtener la lista de documentos", e)
            }
        } else {
            try {
                const listaRef = ref(storage, `${idDoc}/${id}/documentos`);
                const { items } = await listAll(listaRef);
                // Usamos Promise.all para esperar a que todas las promesas se resuelvan
                setDocumentos(await Promise.all(items.map(async (fichero) => {
                    const url = await getDownloadURL(fichero);
                    const metadata = await getMetadata(fichero)
                    const tipoArchivo = obtenerTipoArchivo(fichero.name);

                    return { url, name: fichero.name, type: tipoArchivo, ref: fichero, metadata }
                })))


            } catch (e) {
                console.error("Error al obtener la lista de documentos", e)
            }
        }

    }


    const handleChange = (e) => {
        const ficheros = e.target.files;
        if (ficheros.length > 0) {
            if (user.rol === 'admin' && anyadir) {
                const files = Array.from(ficheros);
                files.map(file => {

                    ids.map(value => {
                        const uploadRef = ref(storage, `${value}/${id}/documentos/${file.name}`)
                        const uploadTask = uploadBytesResumable(uploadRef, file);
                        uploadTask.on('state_changed',
                            (snapshot) => {
                                setProgress(((snapshot.bytesTransferred / snapshot.totalBytes) * 100));
                                switch (snapshot.state) {
                                    case 'paused':
                                        alerta('Subida pausada');
                                        break;
                                }
                                if (progress === 100) {
                                    setProgress(0)
                                    confirmacion('Archivo subido ✅')
                                }
                            },
                            (e) => {
                                error(e.message);
                            },
                            () => {
                                getDocumentos();
                            }
                        );
                    })
                });
            } else {
                const files = Array.from(ficheros);
                files.map(file => {
                    const uploadRef = ref(storage, `${idDoc}/${id}/documentos/${file.name}`);

                    const uploadTask = uploadBytesResumable(uploadRef, file);

                    uploadTask.on('state_changed',
                        (snapshot) => {
                            setProgress(((snapshot.bytesTransferred / snapshot.totalBytes) * 100));
                            switch (snapshot.state) {
                                case 'paused':
                                    alerta('Subida pausada');
                                    break;
                            }
                            if (progress === 100) {
                                setProgress(0)
                                confirmacion('Archivo subido ✅')
                            }
                        },
                        (e) => {
                            error(e.message);
                        },
                        () => {
                            getDocumentos();
                        }
                    );
                });
            }
        } else {
            informativo('No has seleccionado ningun archivo');
        }
    };

    const eliminardoc = async (index) => {
        const fichero = documentos[index];
        if (fichero && fichero.ref) {
            try {
                await deleteObject(fichero.ref);
                const nuevosDocumentos = [...documentos];
                nuevosDocumentos.splice(index, 1);
                setDocumentos(nuevosDocumentos);
            } catch (error) {
                console.error("Error al eliminar el documento.", error);
            }
        }
    }

    useEffect(() => {
        getDocumentos();
    }, []);

    return (
        <>
            <ListarDocumentos documentos={documentos} eliminar={eliminardoc} />
            <div>
                <Form.Control
                    multiple
                    className='w-auto'
                    accept='*'
                    type="file"
                    onChange={handleChange}
                />
            </div>
        </>
    );
};