import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { TAKS_TYPES, empresas } from '@/config/constantes';
import { useAuth } from '@/context/AuthProvider';
import Plaficicacion from '@/components/todos/Planificacion';

export default function ModalEditarEvento({ ver, evento, cerrar, seter, guardar, reset }) {

    const { user } = useAuth();

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
                                    disabled={user.rol !== 'admin'}
                                    onChange={handleTitle}
                                    value={evento.title}
                                    type="text"
                                    autoFocus
                                />
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3">
                                <Form.Label>Visitas</Form.Label>
                                <Form.Select value={evento.extendedProps.visita} onChange={changeTipo} disabled={user.rol !== 'admin'}>
                                    {TAKS_TYPES.map(value => <option key={value}>{value}</option>)}
                                </Form.Select>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group as={Col} className="mb-3">
                                <Form.Label>Empresas</Form.Label>
                                <Form.Select value={evento.extendedProps.empresa} onChange={changeEmpresas} disabled={user.rol !== 'admin'}>
                                    <option value=''>Selecciona una empresa</option>
                                    {empresas.map(value => <option key={value}>{value}</option>)}
                                </Form.Select>
                            </Form.Group>
                        </Row>
                        <Form.Group className="mb-3">
                            <Form.Label>Objetivo</Form.Label>
                            <Form.Control
                                disabled={user.rol !== 'admin'}
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