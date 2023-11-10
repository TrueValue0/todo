import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { TAKS_TYPES } from '@/config/constantes';

export default function ModalEditarEvento({ ver, evento, cerrar, seter, guardar, reset }) {

    const changeTipo = event => seter(prev => ({ ...prev, extendedProps: { ...prev.extendedProps, tipo: event.target.value } }));
    const handleDescrpcion = event => seter(prev => ({ ...prev, extendedProps: { ...prev.extendedProps, description: event.target.value } }));
    const handleTitle = event => seter(prev => ({ ...prev, title: event.target.value }));

    const guardarModal = () => {
        guardar();
        reset();
        cerrar();
    }

    return (
        <>
            <Modal show={ver} onHide={cerrar}>
                <Modal.Header closeButton>
                    <Modal.Title>Evento</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                            <Form.Group as={Col} className="mb-3">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    onChange={handleTitle}
                                    value={evento.title}
                                    type="text"
                                    autoFocus
                                />
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3">
                                <Form.Label>Tipos</Form.Label>
                                <Form.Select value={evento.extendedProps.tipo} onChange={changeTipo}>
                                    {TAKS_TYPES.map(value => <option key={value}>{value}</option>)}
                                </Form.Select>
                            </Form.Group>
                        </Row>
                        <Form.Group className="mb-3">
                            <Form.Label>Descripcion</Form.Label>
                            <Form.Control
                                value={evento.extendedProps.description}
                                onChange={handleDescrpcion}
                                as="textarea" rows={3} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={cerrar}>
                        Cerrar
                    </Button>
                    <Button variant="primary" onClick={guardarModal}>
                        Guardar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}