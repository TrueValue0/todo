import { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '@/config/firebaseapp'; // Asegúrate de importar tu configuración de Firebase
import { useAlert } from '@/hooks/useAlert';
/* import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row'; */
import Image from 'react-bootstrap/Image';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { useAuth } from '@/context/AuthProvider';

export default function SubirImagen({ imagen = '' } = {}) {
    const [image, setImage] = useState(null);
    //const [progress, setProgress] = useState(0);
    let progress = 0
    const [url, setUrl] = useState(imagen);
    const { alert, confirmacion, error, alerta } = useAlert();
    const { setUser, updateUser } = useAuth()

    const handleChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setImage(file)
            const reader = new FileReader();
            reader.onload = (event) => {
                setUrl(event.target.result);
            }
            reader.readAsDataURL(file);
        }
    };

    const handleUpload = async () => {
        const uploadRef = ref(storage, `avatars/${image.name}`);

        const uploadTask = uploadBytesResumable(uploadRef, image);

        uploadTask.on('state_changed',
            (snapshot) => {
                progress = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

                switch (snapshot.state) {
                    case 'paused':
                        alerta('Subida pausada');
                        break;
                }
                if (progress === 100) {
                    progress = 0
                    confirmacion('Archivo subido ✅')
                }
            },
            (e) => {
                error(e.message);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    setUrl(url)
                    setUser(prev => ({ ...prev, avatar: url }));
                });
                updateUser();
            }
        );
    };

    return (
        <>
            <div className='d-flex flex-column justify-content-center align-items-center gap-3'>
                <Image width='180px' roundedCircle src={url} alt="Uploaded" />
                <ProgressBar animated now={progress} />
                <input accept='image/*' type="file" onChange={handleChange} />
                <Button onClick={handleUpload}>Subir Imagen</Button>
            </div>
            {alert.show && <Alert className="position-absolute bottom-0" variant={alert.variant} dismissible>{alert.message}</Alert>}
        </>
    );
};