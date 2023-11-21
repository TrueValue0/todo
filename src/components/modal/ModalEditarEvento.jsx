import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { TAKS_TYPES, empresas } from '@/config/constantes';
import Plaficicacion from '@/components/todos/Planificacion';
import { useAuth } from '@/context/AuthProvider';
import { IoTrashOutline } from "react-icons/io5";
import { useEffect, useState } from 'react';

export default function ModalEditarEvento({ ver, evento, cerrar, seter, guardar, reset, removeTodo }) {

    const { user } = useAuth();
    const [disable, setDisable] = useState(true);

    const comprobarAdmin = () => {
        if (user.rol === 'admin') {
            setDisable(false);
        } else if (user.rol !== 'admin' && isAdmin) {
            setDisable(true);
        } else if (user.rol !== 'admin' && isAdmin === false) {
            setDisable(false)
        }
    }

    useEffect(comprobarAdmin, [])

    const changeTipo = event => seter(prev => ({ ...prev, extendedProps: { ...prev.extendedProps, visita: event.target.value } }));
    const changeEmpresas = event => seter(prev => ({ ...prev, extendedProps: { ...prev.extendedProps, empresa: event.target.value } }));
    const handleDescrpcion = event => seter(prev => ({ ...prev, extendedProps: { ...prev.extendedProps, objetivo: event.target.value } }));
    const handleConclusiones = event => seter(prev => ({ ...prev, extendedProps: { ...prev.extendedProps, conclusiones: event.target.value } }));
    const handleTitle = event => seter(prev => ({ ...prev, title: event.target.value }));

    const guardarModal = () => {
        guardar();
        reset();
        cerrar();
    }

    const remove = () => {
        if (!(user.rol !== 'admin' && evento.extendedProps.isAdmin)) {
            removeTodo(evento.id)
            reset();
            cerrar();
        } else {
            reset();
            cerrar();
        }
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
                                <Form.Label>Asunto</Form.Label>
                                <Form.Control
                                    disabled={disable}
                                    onChange={handleTitle}
                                    value={evento.title}
                                    type="text"
                                    autoFocus
                                />
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3">
                                <Form.Label>Visitas</Form.Label>
                                <Form.Select value={evento.extendedProps.visita} onChange={changeTipo} disabled={disable}>
                                    {TAKS_TYPES.map(value => <option key={value}>{value}</option>)}
                                </Form.Select>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group as={Col} className="mb-3">
                                <Form.Label>Empresas</Form.Label>
                                <Form.Select value={evento.extendedProps.empresa} onChange={changeEmpresas} disabled={disable}>
                                    <option value=''>Selecciona una empresa</option>
                                    {empresas.map(value => <option key={value}>{value}</option>)}
                                </Form.Select>
                            </Form.Group>
                        </Row>
                        <Form.Group className="mb-3">
                            <Form.Label>Objetivo</Form.Label>
                            <Form.Control
                                disabled={disable}
                                value={evento.extendedProps.objetivo}
                                onChange={handleDescrpcion}
                                as="textarea"
                                rows={3} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Conclusiones</Form.Label>
                            <Form.Control
                                value={evento.extendedProps.conclusiones}
                                onChange={handleConclusiones}
                                as="textarea"
                                rows={3} />
                        </Form.Group>
                        <Plaficicacion
                            lista={evento.extendedProps.planificacion}
                            setLista={array => seter(prev => ({ ...prev, extendedProps: { ...prev.extendedProps, planificacion: array } }))}
                        />
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='danger' onClick={remove}>
                        <IoTrashOutline />
                        Eliminar
                    </Button>
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