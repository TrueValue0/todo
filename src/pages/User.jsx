import Layout from '@/components/layouts/Layout'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button'
import { useAuth } from '@/context/AuthProvider';

export default function User() {

    const { user } = useAuth();

    console.log(user);

    return (
        <Layout>
            <Container style={{ marginTop: 130 }} >
                <Card>
                    <Card.Body className='d-flex justify-content-center flex-column align-items-center'>
                        <Card.Title>
                            <Image width='180px' src={user.avatar} roundedCircle />
                        </Card.Title>
                        <Card.Subtitle className="my-2 text-muted fs-2">{user.nombre}</Card.Subtitle>
                        <Card.Text className='text-center text-muted'>
                            {user.apellidos}
                        </Card.Text>
                        <Button variant="primary">Editar</Button>
                    </Card.Body>
                </Card>
            </Container>
        </Layout>
    )
}