import Layout from '@/components/layouts/Layout'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import { useAuth } from '@/context/AuthProvider';
import { useState } from 'react';
import SubirImagen from '@/components/SubirImagen';
import { Form, Row } from 'react-bootstrap';

export default function User() {

    const { user, setUser, updateUser } = useAuth();
    const [editar, setEditar] = useState(false);

    const guardar = () => {
        setEditar(false);
        updateUser();
    }

    return (
        <Layout>
            <Container style={{ marginTop: 130 }} >
                <Card>
                    {!editar ? <Card.Body className='d-flex justify-content-center flex-column align-items-center'>
                        <Card.Title>
                            <Image width='200px' height='200px' src={user.avatar} roundedCircle className='object-fit-cover' />
                        </Card.Title>
                        <Card.Subtitle className="my-2 text-muted fs-2">{user.nombre}</Card.Subtitle>
                        <Card.Text className='text-center text-muted'>
                            {user.apellidos}
                        </Card.Text>
                        <Button onClick={() => setEditar(true)}>Editar</Button>
                    </Card.Body> :
                        <Card.Body className='d-flex justify-content-center flex-column align-items-center'>
                            <SubirImagen imagen={user.avatar} />
                            <Row className='my-2 gap-2'>
                                <Form.Label>Nombre:<Form.Control value={user.nombre} onChange={(e) => setUser(prev => ({ ...prev, nombre: e.target.value }))} /></Form.Label>
                                <Form.Label>Apellidos:<Form.Control value={user.apellidos} onChange={e => setUser(prev => ({ ...prev, apellidos: e.target.value }))} /></Form.Label>
                            </Row>
                            <Button onClick={guardar}>Guardar</Button>
                        </Card.Body>}
                </Card>
            </Container>
        </Layout>
    )
}