import { useAlert } from "@/hooks/useAlert";
import { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Form, Row, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";
import { HiEyeOff, HiEye } from "react-icons/hi";
import { doc, getDoc } from "firebase/firestore";
import { usuarios } from "@/config/firebaseapp";
import LogoVertical from "@/assets/logoVertical";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useEventos } from "@/context/EventoProvider";

export default function Login() {
    const navigate = useNavigate();
    const [eye, setEye] = useState(true);
    const { alert, confirmacion, error } = useAlert();
    const { login, user, setUser, authState } = useAuth();
    const { setIdCustom } = useEventos();
    const movil = useMediaQuery('990');

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const { email, password } = Object.fromEntries(new FormData(event.target));
            const userCrentials = await login(email, password);
            setIdCustom(userCrentials.user.uid);
            confirmacion('Login confirmado');
            navigate('/');
            authState(async (user) => {
                if (user === null) setUser(null);
                else {
                    const documento = await getDoc(doc(usuarios, user.uid))
                    if (documento.exists()) setUser({ ...documento.data(), id: user.uid });
                    else setUser(null);
                }
            });
        } catch (e) {
            error('Correo o Contraseña incorrectos.');
        }
    };

    useEffect(() => {
        if (user) navigate('/')
    }, [user])


    return (
        <>
            <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#808080' }}>
                <Container className="my-4">
                    <div className={`px-2 py-5 p-md-4 p m-auto bg-white rounded-4 ${movil ? 'w-100' : 'w-50'}`}>
                        <LogoVertical className='m-auto d-block' width='100%' />
                        <h3 className="text-center fw-bold text-primary mt-3">Login</h3>
                        <Form noValidate onSubmit={handleSubmit} className="w-100">
                            <Form.Group className="form-outline mb-4">
                                <Form.Label>Email</Form.Label >
                                <Form.Control name="email" type="email" required />
                                <Form.Control.Feedback type="invalid">Correo Requerido</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control className="position-relative" name="password" type={eye ? 'password' : 'text'} required />
                                {
                                    eye ?
                                        <HiEyeOff style={{ cursor: 'pointer', position: 'absolute', top: 40, right: 15, fontSize: '22px' }} onClick={() => setEye(false)} /> :
                                        <HiEye style={{ cursor: 'pointer', position: 'absolute', top: 40, right: 15, fontSize: '22px' }} onClick={() => setEye(true)} />
                                }
                                <Form.Control.Feedback type="invalid">Contraseña Requerida</Form.Control.Feedback>
                            </Form.Group>

                            <Row className="my-2">
                                <Col className="d-flex justify-content-end">

                                    <Button variant="link" className="text-decoration-none"><Link to='/resetPassword' className="text-decoration-none fw-bolder">¿Olvidaste la contraseña?</Link></Button>
                                </Col>
                            </Row>
                            <div className="d-flex justify-content-center">
                                <Button type="submit">Iniciar Sesión</Button>
                            </div>
                        </Form>
                    </div>
                </Container>
                {alert.show && <Alert className="position-absolute bottom-0" variant={alert.variant} dismissible>{alert.message}</Alert>}
            </div>
        </>
    )
}