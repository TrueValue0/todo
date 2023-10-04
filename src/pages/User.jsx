import Layout from '@/components/layouts/Layout'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button'
import { useAuth } from '@/context/AuthProvider';

export default function User() {

    const { credentials: { user } } = useAuth();

    console.log(user);

    return (
        <Layout>
            <Container style={{ marginTop: 130 }} >
                <Card>
                    <Card.Body className='d-flex justify-content-center flex-column align-items-center'>
                        <Card.Title>
                            <Image width='180px' src="https://www.pngkey.com/png/full/72-729716_user-avatar-png-graphic-free-download-icon.png" roundedCircle />
                        </Card.Title>
                        <Card.Subtitle className="my-2 text-muted fs-2">Nombre</Card.Subtitle>
                        <Card.Text className='text-center text-muted'>
                            With supporting text below as a natural lead-in to additional content.
                        </Card.Text>
                        <Button variant="primary">Editar</Button>
                    </Card.Body>
                </Card>
            </Container>
        </Layout>
    )
}