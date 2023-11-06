import { useAlert } from "@/hooks/useAlert";
import { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Form, Row, Card } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";

export default function Login() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const redirect = /* pathname?.location?.pathname ?? */ '/';
    const [validated, setValidated] = useState(false);
    const { alert, confirmacion, error } = useAlert();
    const { login, user } = useAuth();

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            event.stopPropagation();
            const { email, password } = Object.fromEntries(new FormData(event.target));
            await login(email, password);
            confirmacion('Login confirmado');
            navigate(redirect);
        } catch (e) {
            console.log(e);
            error('Correo o Contraseña incorrectos.');
        }
    };

    useEffect(() => {
        if (user) navigate(redirect)
    }, [user])


    return (
        <>
            <div className="d-flex justify-content-center align-items-center vh-100">
                <Container className="my-4">
                    <Card className="p-5 w-50 m-auto">
                        <h3 className="text-center">Login</h3>
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Form.Group className="form-outline mb-4">
                                <Form.Label>Email address</Form.Label >
                                <Form.Control name="email" type="email" required />
                                <Form.Control.Feedback type="invalid">Correo Requerido</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control name="password" type="password" required />
                                <Form.Control.Feedback type="invalid">Contraseña Requerida</Form.Control.Feedback>
                            </Form.Group>

                            <Row className="mb-4">
                                <Col className="d-flex justify-content-center">
                                    {/* <!-- Simple link --> */}
                                    <a href="#!">Olvidado la contraseña?</a>
                                </Col>
                            </Row>
                            <div className="d-flex justify-content-center">
                                <Button type="submit">Iniciar Sesión</Button>
                            </div>
                        </Form>
                    </Card>
                </Container>
                {alert.show && <Alert className="position-absolute bottom-0" variant={alert.variant} dismissible>{alert.message}</Alert>}
            </div>
        </>
    )
}