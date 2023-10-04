import { useTareaDoc } from '@/hooks/useTareaDoc';
import { generateUUID } from '@/services/generarUUID';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export default function ModalAddEvent({ ver, cerrar }) {

    const { addEvent } = useTareaDoc();

    const hoy = new Date().toISOString().slice(0, 10);
    const initialEvent = {
        id: generateUUID(),
        title: '',
        start: hoy,
        extendedProps: {
            completed: false,
            description: ''
        }
    }
    const [newEvento, setNewEvento] = useState(initialEvent)

    const handleChangeTitulo = (event) => setNewEvento(prev => ({ ...prev, title: event.target.value }))
    const changeDescripcion = (event) => setNewEvento(prev => ({ ...prev, extendedProps: { ...prev.extendedProps, description: event.target.value } }))
    const handleChangeDate = (event) => setNewEvento(prev => ({ ...prev, start: event.target.value }))
    const borrar = () => {
        cerrar();
        setNewEvento(initialEvent)
    }

    const guardar = () => {
        addEvent(newEvento);
        borrar();
    }


    return (
        <>
            <Modal show={ver} onHide={borrar}>
                <Modal.Header closeButton>
                    <Modal.Title>Evento</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                autoFocus
                                value={newEvento.title}
                                onChange={handleChangeTitulo}
                            />
                            <Form.Label>Fecha</Form.Label>
                            <Form.Control
                                value={newEvento.start}
                                onChange={handleChangeDate}
                                type='date'
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Descripcion</Form.Label>
                            <Form.Control as="textarea" rows={3} value={newEvento.extendedProps.description} onChange={changeDescripcion} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={borrar}>
                        Cerrar
                    </Button>
                    <Button variant="primary" onClick={guardar}>
                        Guardar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}