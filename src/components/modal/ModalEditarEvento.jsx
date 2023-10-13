import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export default function ModalEditarEvento({ evento, cerrar }) {
    const { ver, titulo, fecha, descripcion, } = evento;

    return (
        <>
            <Modal show={ver} onHide={cerrar}>
                <Modal.Header closeButton>
                    <Modal.Title>Evento</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="name@example.com"
                                autoFocus
                                defaultValue={titulo}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Descripcion</Form.Label>
                            <Form.Control as="textarea" rows={3} defaultValue={descripcion} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={cerrar}>
                        Cerrar
                    </Button>
                    <Button variant="primary" onClick={cerrar}>
                        Guardar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}