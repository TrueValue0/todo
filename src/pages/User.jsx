import Layout from '@/components/layouts/Layout'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button'
import { useAuth } from '@/context/AuthProvider';
import { useState } from 'react';
import SubirImagen from '@/components/SubirImagen';

export default function User() {

    const { user } = useAuth();
    const [editar, setEditar] = useState(false);

    return (
        <Layout>
            <Container style={{ marginTop: 130 }} >
                <Card>
                    {!editar ? <Card.Body className='d-flex justify-content-center flex-column align-items-center'>
                        <Card.Title>
                            <Image width='180px' src={user.avatar} roundedCircle />
                        </Card.Title>
                        <Card.Subtitle className="my-2 text-muted fs-2">{user.nombre}</Card.Subtitle>
                        <Card.Text className='text-center text-muted'>
                            {user.apellidos}
                        </Card.Text>
                        <Button onClick={() => setEditar(true)}>Editar</Button>
                    </Card.Body> :
                        <Card.Body className='d-flex justify-content-center flex-column align-items-center'>
                            <SubirImagen imagen={user.avatar} />
                            <Card.Subtitle className="my-2 text-muted fs-2">{user.nombre}</Card.Subtitle>
                            <Card.Text className='text-center text-muted'>
                                {user.apellidos}
                            </Card.Text>
                            <Button onClick={() => setEditar(false)}>Guardar</Button>
                        </Card.Body>}
                </Card>
            </Container>
        </Layout>
    )
}