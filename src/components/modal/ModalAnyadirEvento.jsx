import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import { useTareaDoc } from '@/hooks/useTareaDoc'
import { fechaConHora } from '@/services/generarUUID'
import { TAKS_TYPES, empresas } from '@/config/constantes';
import { useEventos } from '@/context/EventoProvider'
import { v4 as uuidv4, } from 'uuid';
import { useAuth } from '@/context/AuthProvider';
import Plaficicacion from '@/components/todos/Planificacion';
import SelectorIds from '@/components/modal/SelectorIds';
import { useMultipleTareas } from '@/hooks/useMultipleTareas';

export default function ModalAnyadirEvento({ ver, cerrar, fechaActual = new Date().toISOString().split('T')[0] } = {}) {

    const { user } = useAuth();

    const { agregarEvento, idCustom } = useEventos();
    const { addEventsMultiple } = useMultipleTareas();

    const [horas, setHoras] = useState({
        inicio: '00:00',
        fin: '00:00'
    });

    const eventoInicial = {
        title: '', // Cambiar el nombre de 'title' a 'asunto'
        start: fechaActual,
        end: fechaActual,
        allDay: true,
        extendedProps: {
            objetivo: '', // Cambiar el nombre de 'description' a 'objetivo'
            completed: false,
            visita: '', // Cambiar el nombre de 'tipo' a 'empresas'
            empresa: '',
            conclusiones: '', // Agregar un campo 'conclusiones'
            planificacion: [],
            isAdmin: false,
        }
    }
    const { addEvent } = useTareaDoc({ uid: idCustom });

    const [evento, setEvento] = useState(eventoInicial);

    useEffect(() => {
        setEvento(eventoInicial);
    }, [fechaActual]);


    const handleChangeTitle = event => setEvento(prev => ({ ...prev, title: event.target.value }));

    const changeObjetivo = event => setEvento(prev => ({ ...prev, extendedProps: { ...prev.extendedProps, objetivo: event.target.value } }));

    const changeConclusiones = event => setEvento(prev => ({ ...prev, extendedProps: { ...prev.extendedProps, conclusiones: event.target.value } }));

    const changeTipo = event => setEvento(prev => ({ ...prev, extendedProps: { ...prev.extendedProps, visita: event.target.value } }));

    const changeEmpresa = event => setEvento(prev => ({ ...prev, extendedProps: { ...prev.extendedProps, empresa: event.target.value } }));

    const handleChangeDate = event => setEvento(prev => ({ ...prev, start: event.target.value }));

    const handleFechaFin = event => setEvento(prev => ({ ...prev, end: event.target.value }));

    const handleAllDay = event => setEvento(prev => ({ ...prev, allDay: event.target.checked }));

    const handleHoraInicio = event => { setHoras(prev => ({ ...prev, inicio: event.target.value })) }

    const handleHoraFin = event => setHoras(prev => ({ ...prev, fin: event.target.value }));

    const crearEvento = () => {
        let event;
        if (evento.titulo === "") return

        if (evento.allDay) {
            event = {
                id: uuidv4(),
                title: evento.title, // Cambiar el nombre de 'title' a 'asunto'
                start: fechaConHora({ fecha: evento.start, horas: horas.inicio }),
                end: fechaConHora({ fecha: evento.start, horas: horas.inicio }),
                allDay: evento.allDay,
                extendedProps: {
                    objetivo: evento.extendedProps.objetivo,
                    completed: evento.extendedProps.completed,
                    visita: evento.extendedProps.visita,
                    empresa: evento.extendedProps.empresa,
                    conclusiones: evento.extendedProps.conclusiones,
                    planificacion: evento.extendedProps.planificacion,
                    isAdmin: user.rol === 'admin',
                }
            }
        } else {
            event = {
                id: uuidv4(),
                title: evento.title, // Cambiar el nombre de 'title' a 'asunto'
                start: fechaConHora({ fecha: evento.start, horas: horas.inicio }),
                end: fechaConHora({ fecha: evento.end, horas: horas.fin }),
                allDay: evento.allDay,
                extendedProps: {
                    objetivo: evento.extendedProps.objetivo,
                    completed: evento.extendedProps.completed,
                    visita: evento.extendedProps.visita,
                    empresa: evento.extendedProps.empresa,
                    conclusiones: evento.extendedProps.conclusiones,
                    planificacion: evento.extendedProps.planificacion,
                    isAdmin: user.rol === 'admin',
                }
            }
        }

        return event;
    }


    const guardarVarios = () => {
        const event = crearEvento();
        addEventsMultiple(event)
        setEvento(eventoInicial)
        cerrar();
    }

    const guardarEvento = () => {
        const event = crearEvento();
        agregarEvento(event);
        addEvent(event);
        setEvento(eventoInicial)
        cerrar();
    }

    const cerrarBien = () => {
        setEvento(eventoInicial);
        cerrar();
    }


    return (
        <>
            <Modal show={ver} onHide={cerrarBien}>
                <Modal.Header closeButton>
                    <Modal.Title>Evento</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                            {user.rol === 'admin' &&
                                <Col>
                                    <SelectorIds ver={ver} />
                                </Col>
                            }
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} className='col-8' controlId="exampleForm.ControlInput1">
                                <Form.Label>Asunto</Form.Label>
                                <Form.Control
                                    autoFocus
                                    value={evento.title}
                                    onChange={handleChangeTitle}
                                />
                            </Form.Group>
                            <Form.Group as={Col} className='col-4' >
                                <Form.Check // prettier-ignore
                                    checked={evento.allDay}
                                    type="switch"
                                    label="Todo el dia"
                                    onChange={handleAllDay}
                                />
                            </Form.Group>
                        </Row>
                        {evento.allDay ?
                            <Form.Group>
                                <Form.Label>Fecha</Form.Label>
                                <Form.Control
                                    value={evento.start}
                                    onChange={handleChangeDate}
                                    type='date'
                                />
                            </Form.Group> :
                            <>
                                <Row className='mb-2'>
                                    <Form.Group as={Col}>
                                        <Form.Label>Fecha Inicio</Form.Label>
                                        <Form.Control
                                            value={evento.start}
                                            onChange={handleChangeDate}
                                            type='date'
                                        />
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label>Hora Inicio</Form.Label>
                                        <Form.Control
                                            required
                                            min='08:00'
                                            max='20:00'
                                            value={horas.inicio}
                                            onChange={handleHoraInicio}
                                            type='time'
                                        />
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>Fecha Fin</Form.Label>
                                        <Form.Control
                                            value={evento.end}
                                            onChange={handleFechaFin}
                                            type='date'
                                        />
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label>Hora Fin</Form.Label>
                                        <Form.Control
                                            required
                                            min='08:00'
                                            max='20:00'
                                            value={horas.fin}
                                            onChange={handleHoraFin}
                                            type='time'
                                        />
                                    </Form.Group>
                                </Row>
                            </>
                        }
                        <Row className='my-2'>
                            <Form.Group as={Col}>
                                <Form.Label>Visita</Form.Label>
                                <Form.Select onChange={changeTipo} disabled={evento.isAdmin}>
                                    <option value=''>Selecciona una visita</option>
                                    {TAKS_TYPES.map(value => <option key={value} value={value}>{value}</option>)}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Empresa</Form.Label>
                                <Form.Select onChange={changeEmpresa} disabled={evento.isAdmin}>
                                    <option value=''>Selecciona una empresa</option>
                                    {empresas.map(value => <option key={value}>{value}</option>)}
                                </Form.Select>
                            </Form.Group>
                        </Row>

                        <Form.Group className="mb-3">
                            <Form.Label>Objetivo</Form.Label>
                            <Form.Control as="textarea" rows={3} value={evento.objetivo} onChange={changeObjetivo} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Conclusiones</Form.Label>
                            <Form.Control as="textarea" rows={3} value={evento.extendedProps.conclusiones} onChange={changeConclusiones} />
                        </Form.Group>

                        <Plaficicacion
                            lista={evento.extendedProps.planificacion}
                            setLista={array => setEvento(prev => ({ ...prev, extendedProps: { ...prev.extendedProps, planificacion: array } }))}
                        />

                    </Form>
                </Modal.Body>
                <Modal.Footer>

                    <Button variant="secondary" onClick={cerrarBien}>
                        Cerrar
                    </Button>
                    {
                        user.rol === 'admin' ?
                            <Button variant="primary" onClick={guardarVarios}>
                                Guardar
                            </Button> :
                            <Button variant="primary" onClick={guardarEvento}>
                                Guardar
                            </Button>
                    }
                </Modal.Footer>
            </Modal >
        </>
    )
}