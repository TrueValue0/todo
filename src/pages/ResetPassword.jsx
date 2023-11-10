import { useAlert } from "@/hooks/useAlert";
import { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Form, Row, Card } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";

export default function ResetPassword() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const redirect = /* pathname?.location?.pathname ?? */ '/';
    const [validated, setValidated] = useState(false);
    const { alert, confirmacion, error } = useAlert();
    const { user, resetPassword } = useAuth();

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            event.stopPropagation();
            const { email } = Object.fromEntries(new FormData(event.target));
            await resetPassword(email);
            confirmacion('Se ha enviado el email');
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
            <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#808080' }}>
                <Container className="my-4">
                    <Card className="p-5 w-50 m-auto">
                        <h3 className="text-center fw-bold">Reset Password</h3>
                        <img src="uriarte.png" width='150px' className="m-auto" alt="" />
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Form.Group className="form-outline mb-4">
                                <Form.Label>Email</Form.Label >
                                <Form.Control name="email" type="email" required />
                                <Form.Control.Feedback type="invalid">Correo Requerido</Form.Control.Feedback>
                            </Form.Group>

                            <Row className="my-2">
                                <Col className="d-flex justify-content-end">

                                    <Button variant="link" className="text-decoration-none"><Link to='/login' className="text-decoration-none fw-bolder">Volver para iniciar sesion</Link></Button>
                                </Col>
                            </Row>
                            <div className="d-flex justify-content-center">
                                <Button type="submit">Enviar Email</Button>
                            </div>
                        </Form>
                    </Card>
                </Container>
                {alert.show && <Alert className="position-absolute bottom-0" variant={alert.variant} dismissible>{alert.message}</Alert>}
            </div>
        </>
    )
}