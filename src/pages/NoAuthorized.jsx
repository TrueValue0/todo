import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import '@/pages/noAutorizado.css';

export default function NoAuthorized() {
    const navigate = useNavigate();
    return (
        <>
            <div className='general-noAuth'>
                <div className="lock"></div>
                <div className="message">
                    <h1>Acceso Denegado</h1>
                    <p>Porfavor, comunicate con el administrador si crees que esto es un error</p>
                    <Button variant="secondary" onClick={() => navigate('/')} >Volver al Inicio</Button>
                </div>
            </div>
        </>
    )
}