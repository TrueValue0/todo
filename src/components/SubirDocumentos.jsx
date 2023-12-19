import { useEffect, useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL, getMetadata } from 'firebase/storage';
import { storage } from '@/config/firebaseapp'; // Asegúrate de importar tu configuración de Firebase
import { useAlertContext } from '@/context/AlertProvider';
import { Form } from 'react-bootstrap';
import ListarDocumentos from './ListarDocumentos';
import { getDocumentos } from '@/services/data';


export default function SubirDocumentos({ idDoc, id } = { idDoc: '', id: '' }) {
    const [progress, setProgress] = useState(0);
    const [documentos, setDocumentos] = useState([]);
    const { confirmacion, error, alerta, informativo } = useAlertContext();

    const cargarDocumentos = async () => {
        const ficheros = await getDocumentos({ idDoc, id });
        setDocumentos(ficheros);
    }


    const handleChange = (e) => {
        const ficheros = e.target.files;
        if (ficheros.length > 0) {
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
                        cargarDocumentos();
                    }
                );
            });
        } else {
            informativo('No has seleccionado ningun archivo');
        }
    };

    useEffect(() => {
        cargarDocumentos();
    }, [])

    return (
        <>
            <ListarDocumentos documentos={documentos} setDocumentos={setDocumentos} />
            <div className='d-flex justify-content-between '>
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