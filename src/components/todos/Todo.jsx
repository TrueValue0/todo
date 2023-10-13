import { useState } from 'react';
import { FormCheck, ListGroup, Accordion, Button, Form, Row, Col } from 'react-bootstrap'
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import { BiTrash } from 'react-icons/bi'
import { formatearFecha } from '@/services/generarUUID.js'

function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey);

    return (
        <Button
            className='border-0 p-0 m-0'
            variant="light"
            onClick={decoratedOnClick}
        >
            {children}
        </Button>
    );
}


export default function Todo({ evento, removeTodo, completeTodo, actualizar }) {
    const { title = '', id = 0, extendedProps: { completed, description = '', tipo = '' }, start } = evento;
    const pointer = { cursor: 'pointer' };
    const [tarea, setTarea] = useState({
        id,
        title,
        description,
        completed,
        tipo,
        start
    })
    return (
        <>
            <ListGroup.Item className='border-0'>
                <Accordion className='border-bottom'>
                    <div className='d-flex justify-content-between align-items-center '>
                        <FormCheck value={completed} onChange={(event) => completeTodo(id, event.target.checked)} />
                        <CustomToggle eventKey='1'><h4 style={pointer} className={completed ? 'text-decoration-line-through m-0 my-2' : 'm-0 my-2'}>{tarea.title}</h4></CustomToggle>
                        <BiTrash onClick={() => removeTodo(id)} style={pointer} className='fs-4' />
                    </div>
                    <Accordion.Collapse eventKey='1'>
                        <Form className='d-flex flex-column justify-content-center align-content-center'>
                            <Form.Group as={Row}>
                                <Form.Label column sm="3" className='text-center'>Fecha</Form.Label>
                                <Col sm="9">
                                    <span>{formatearFecha(tarea.start)}</span>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Form.Label column sm="3" className='text-center'>Titulo</Form.Label>
                                <Col sm="9">
                                    <Form.Control
                                        onChange={event => setTarea(prev => ({ ...prev, title: event.target.value }))}
                                        value={tarea.title}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className='mt-1'>
                                <Form.Label column sm="3" className='text-center'>Tipo</Form.Label>
                                <Col sm="9">
                                    <Form.Select onChange={event => setTarea(prev => ({ ...prev, tipo: event.target.value }))}>
                                        <option>General</option>
                                        <option value="visita">Visita</option>
                                        <option value="venta">Venta</option>
                                        <option value="tour">Tour</option>
                                    </Form.Select>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className='mt-1'>
                                <Form.Label column sm="3" className='text-center'>Descripcion</Form.Label>
                                <Col sm="9">
                                    <Form.Control
                                        onChange={event => setTarea(prev => ({ ...prev, description: event.target.value }))}
                                        value={tarea.description}
                                    />
                                </Col>
                            </Form.Group>
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