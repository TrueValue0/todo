import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Row, Col } from 'react-bootstrap';
import { db } from '@/config/firebaseapp'
import { doc, updateDoc } from 'firebase/firestore'

export default function EditUsuario({ content, seter, handleClose } = { show: false }) {

    const handleFileChange = (e) => {

        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                seter(prev => ({ ...prev, avatar: event.target.result }));
            }
            reader.readAsDataURL(file);
        }
    };

    const guardar = async () => {
        const refDoc = doc(db, 'usuarios', content.uid);
        const copia = { ...content };
        delete content.uid;
        delete content.id;
        await updateDoc(refDoc, { ...content })
        seter(copia);
        handleClose();
    }

    return (
        <>
            <Modal show={content.ver} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar usuario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                            <Form.Group as={Col} className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={content.nombre}
                                    onChange={e => seter(prev => ({ ...prev, nombre: e.target.value }))}
                                    autoFocus
                                />
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Apellidos</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={content.apellidos}
                                    onChange={e => seter(prev => ({ ...prev, apellidos: e.target.value }))}
                                />
                            </Form.Group>
                        </Row>

                        <Row>
                            <Form.Group as={Col} className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    value={content.email}
                                    onChange={e => seter(prev => ({ ...prev, email: e.target.value }))}
                                    placeholder="nombre@ejemplo.com"
                                    required
                                />
                            </Form.Group>

                            <Form.Group as={Col} className='d-flex align-items-center'>
                                <Form.Label>Avatar: </Form.Label>
                                <Form.Control size='sm' className='w-auto d-inline-block ms-2' onChange={handleFileChange} accept='image/*' type='file' />
                            </Form.Group>
                        </Row>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                    <Button variant="primary" onClick={guardar}>
                        Guardar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}