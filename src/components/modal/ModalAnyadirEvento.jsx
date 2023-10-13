import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export default function ModalAnyadirEvento({ evento, cerrar, seter, guardar }) {

    console.log(evento);
    const { ver, titulo, fecha, descripcion, } = evento;

    const handleChangeTitulo = (event) => {
        const texto = event.target.value;
        seter(prev => ({ ...prev, titulo: texto }))
    }

    const changeDescripcion = (event) => {
        const texto = event.target.value;
        seter(prev => ({ ...prev, descripcion: texto }));
    }

    const handleChangeDate = (event) => seter(prev => ({ ...prev, fecha: event.target.value }))

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
                                autoFocus
                                value={titulo}
                                onChange={handleChangeTitulo}
                            />
                            <Form.Label>Fecha</Form.Label>
                            <Form.Control
                                value={fecha}
                                onChange={handleChangeDate}
                                type='date'
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Descripcion</Form.Label>
                            <Form.Control as="textarea" rows={3} value={descripcion} onChange={changeDescripcion} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={cerrar}>
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