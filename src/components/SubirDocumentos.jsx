import { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL, getMetadata } from 'firebase/storage';
import { storage } from '@/config/firebaseapp'; // Asegúrate de importar tu configuración de Firebase
import { useAlertContext } from '@/context/AlertProvider';
import DocumentComponent from './documentos/DocumentComponent';
import { Form, Button } from 'react-bootstrap';


export default function SubirDocumentos({ idDoc, id } = { idDoc: '', id: '' }) {
    const [progress, setProgress] = useState(0);
    const [documentos, setDocumentos] = useState([]);
    const { confirmacion, error, alerta, informativo } = useAlertContext();

    function clasificarArchivo(contentType) {

        const tiposDeArchivo = {
            pdf: ['application/pdf'],
            txt: ['text/plain'],
            word: ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
            // Agrega más tipos de archivo según sea necesario
        };

        for (const tipo in tiposDeArchivo) {
            if (tiposDeArchivo[tipo].includes(contentType)) {
                return tipo;
            }
        }
        return 'Desconocido'; // Si no se encuentra coincidencia
    }

    const handleChange = (e) => {
        const ficheros = e.target.files;
        if (ficheros.length > 0) {
            const files = Array.from(ficheros);
            setDocumentos(files);
        } else {
            setDocumentos([]);
            informativo('No has seleccionado ningun archivo');
        }
    };

    const subirDocumentos = () => {
        documentos.map(file => {
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
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        navigator.clipboard.writeText(url)
                    });
                    getMetadata(uploadTask.snapshot.ref).then(metadata => {
                        console.log(metadata);
                    })

                }
            );
        });

    }

    return (
        <>
            <div className='d-flex gap-2 flex-wrap'>
                {documentos.length > 0 && documentos.map(documento => <DocumentComponent documento={documento} />)}
            </div>
            <div className='d-flex justify-content-between '>
                <Form.Control className='w-auto' accept='.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.pdf,text/plain' type="file" multiple onChange={handleChange} />
                <Button onClick={subirDocumentos} >Subir ficheros</Button>
            </div>
        </>
    );
};