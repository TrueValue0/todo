import { useState } from 'react';
import { FormCheck, ListGroup, Accordion, Button, Form, Row, Col, Alert } from 'react-bootstrap'
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import { BiTrash } from 'react-icons/bi'
import { formatearFecha } from '@/services/generarUUID.js'
import { TAKS_TYPES, empresas } from '@/config/constantes';
import { useAuth } from '@/context/AuthProvider';
import { useAlert } from '@/hooks/useAlert';
import Plaficicacion from './Planificacion';

function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey);

    return (
        <Button
            className='border-0 p-0 m-0 d-flex align-items-center gap-3'
            variant="light"
            onClick={decoratedOnClick}
        >
            {children}
        </Button>
    );
}


export default function Todo({ evento, removeTodo, completeTodo, actualizar }) {
    const { user } = useAuth();
    const { title = '', id = '', allDay, end, extendedProps: { completed, objetivo = '', visita = '', conclusiones = '', empresa = '', planificacion = [] }, start } = evento;
    const pointer = { cursor: 'pointer' };
    const [tarea, setTarea] = useState({
        id,
        title,
        start,
        end,
        allDay,
        extendedProps: {
            completed,
            objetivo,
            visita,
            conclusiones,
            empresa,
            planificacion,
        }

    })

    const remove = () => {
        if (user.rol === 'admin') removeTodo(id);
        else return;
    }
    return (
        <>
            <ListGroup.Item className='border-0'>
                <Accordion className='border-bottom'>
                    <div className='d-flex justify-content-between align-items-center '>
                        <FormCheck value={completed} onChange={(event) => completeTodo(id, event.target.checked)} />
                        <CustomToggle eventKey='1'>
                            <h4 style={pointer} className={completed ? 'text-decoration-line-through m-0 my-2' : 'm-0 my-2'}>{tarea.title}</h4>
                            <span>{formatearFecha(tarea.start)}</span>
                        </CustomToggle>
                        <BiTrash onClick={remove} style={pointer} className='fs-4' />
                    </div>
                    <Accordion.Collapse eventKey='1'>
                        <Form className='d-flex flex-column justify-content-center align-content-center'>
                            <Form.Group as={Row}>
                                <Form.Label column sm="3" className='text-center'>Asunto</Form.Label>
                                <Col sm="9">
                                    <Form.Control
                                        disabled={user.rol !== 'admin'}
                                        onChange={event => setTarea(prev => ({ ...prev, title: event.target.value }))}
                                        value={tarea.title}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className='mt-1'>
                                <Form.Label column sm="3" className='text-center'>Visita</Form.Label>
                                <Col sm="9">
                                    <Form.Select
                                        disabled={user.rol !== 'admin'}
                                        value={tarea.extendedProps.visita}
                                        onChange={event => setTarea(prev => ({ ...prev, extendedProps: { ...prev.extendedProps, visita: event.target.value } }))}>
                                        {TAKS_TYPES.map(value => <option key={value}>{value}</option>)}
                                    </Form.Select>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className='mt-1'>
                                <Form.Label column sm="3" className='text-center'>Empresa</Form.Label>
                                <Col sm="9">
                                    <Form.Select
                                        disabled={user.rol !== 'admin'}
                                        value={tarea.extendedProps.empresa}
                                        onChange={event => setTarea(prev => ({ ...prev, extendedProps: { ...prev.extendedProps, empresa: event.target.value } }))}>
                                        {empresas.map(value => <option key={value}>{value}</option>)}
                                    </Form.Select>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className='mt-1'>
                                <Form.Label column sm="3" className='text-center'>Objetivo</Form.Label>
                                <Col sm="9">
                                    <Form.Control
                                        disabled={user.rol !== 'admin'}
                                        as='textarea'
                                        onChange={event => setTarea(prev => ({ ...prev, extendedProps: { ...prev.extendedProps, objetivo: event.target.value } }))}
                                        value={tarea.extendedProps.objetivo}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className='mt-1'>
                                <Form.Label column sm="3" className='text-center'>Conclusiones</Form.Label>
                                <Col sm="9">
                                    <Form.Control
                                        onChange={event => setTarea(prev => ({ ...prev, extendedProps: { ...prev.extendedProps, conclusiones: event.target.value } }))}
                                        value={tarea.extendedProps.conclusiones}
                                    />
                                </Col>
                            </Form.Group>
                            <Row className='my-3'>
                                <Col>
                                    <Plaficicacion
                                        lista={tarea.extendedProps.planificacion}
                                        setLista={array => setTarea(prev => ({ ...prev, extendedProps: { ...prev.extendedProps, planificacion: array } }))}
                                    />
                                </Col>
                            </Row>

                            <Form.Group as={Row} className='justify-content-center my-2'>
                                <Button className='w-75' onClick={() => actualizar(id, tarea)}>Actualizar</Button>
                            </Form.Group>
                        </Form>
                    </Accordion.Collapse>
                </Accordion>
            </ListGroup.Item >
        </>
    )
}