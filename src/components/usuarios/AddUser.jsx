import { useTareaDoc } from '@/hooks/useTareaDoc';
import { generateUUID } from '@/services/generarUUID';
import { useState } from 'react';
import { Col, Image, Row } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function AddUser({ volver }) {

    const [imagen, setImagen] = useState('https://cdn-icons-png.flaticon.com/512/6386/6386976.png')

    const handleFileChange = (e) => {
        console.log(e.target.files)
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = (event) => {
                setImagen(event.target.result);
            }

            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <Form className='w-100'>
                <h2 className='text-center mb-2'>Añadir Usuario</h2>
                <Row>
                    <Col>
                        <div className='d-flex justify-content-center align-items-center my-2'>
                            <Image rounded width={200} src={imagen} className='mx-auto' />
                        </div>
                        <Form.Group>
                            <Form.Label>Avatar: </Form.Label>
                            <Form.Control className='w-auto d-inline-block ms-2' onChange={handleFileChange} accept='image/*' type='file' />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col className='mt-3'>
                        <FloatingLabel style={{ minWidth: 245 }} label='Nombre'>
                            <Form.Control
                                placeholder=' '
                            //value={newEvento.title}
                            //onChange={handleChangeTitulo}
                            />
                        </FloatingLabel>

                    </Col>
                    <Col className='mt-3'>
                        <FloatingLabel style={{ minWidth: 245 }} label='Apellidos'>
                            <Form.Control
                                placeholder=' '
                            //value={newEvento.title}
                            //onChange={handleChangeTitulo}
                            />
                        </FloatingLabel>
                    </Col>
                </Row>

                <Row>
                    <Col className='mt-3'>
                        <FloatingLabel style={{ minWidth: 245 }} label='Email'>
                            <Form.Control
                                placeholder=' '
                            //value={newEvento.title}
                            //onChange={handleChangeTitulo}
                            />
                        </FloatingLabel>

                    </Col>
                    <Col className='mt-3'>
                        <Row>
                            <Col>
                                <Form.Label className='w-auto m-0 me-2 p-0'>Rol:</Form.Label>
                                <Form.Select style={{ minWidth: 250 }} className='d-inline w-auto'>
                                    <option>Usuario</option>
                                    <option value='admin'>Administrador</option>
                                </Form.Select>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button onClick={volver}>Volver</Button>
                    </Col>
                    <Col>
                        <Button>Guardar</Button>
                    </Col>
                </Row>
            </Form >
        </>
    )
}