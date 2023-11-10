import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import { useTareaDoc } from '@/hooks/useTareaDoc'
import { fechaConHora } from '@/services/generarUUID'
import { TAKS_TYPES } from '@/config/constantes';

export default function ModalAnyadirEvento({ ver, cerrar, refresh }) {

    /* const { allDay, titulo, fecha, fechaFin, descripcion, tipo } = evento; */
    const [horas, setHoras] = useState({
        inicio: '00:00',
        fin: '00:00'
    });

    const eventoInicial = {
        titulo: "",
        fecha: "",
        fechaFin: '',
        descripcion: "",
        tipo: 'General',
        allDay: false,
    }
    const { addEvent } = useTareaDoc();

    const [evento, setEvento] = useState(eventoInicial);

    const handleChangeTitulo = event => setEvento(prev => ({ ...prev, titulo: event.target.value }))

    const changeDescripcion = event => setEvento(prev => ({ ...prev, descripcion: event.target.value }));

    const changeTipo = event => setEvento(prev => ({ ...prev, tipo: event.target.value }));

    const handleChangeDate = event => setEvento(prev => ({ ...prev, fecha: event.target.value }))

    const handleFechaFin = event => setEvento(prev => ({ ...prev, fechaFin: event.target.value }));

    const handleAllDay = event => setEvento(prev => ({ ...prev, allDay: event.target.checked }));

    const handleHoraInicio = event => { setHoras(prev => ({ ...prev, inicio: event.target.value })) }

    const handleHoraFin = event => setHoras(prev => ({ ...prev, fin: event.target.value }));

    const guardarEvento = () => {
        if (evento.titulo !== "") {
            let event;
            if (evento.allDay) {
                event = {
                    id: crypto.randomUUID(),
                    title: evento.titulo,
                    start: fechaConHora({ fecha: evento.fecha, horas: horas.inicio }),
                    end: fechaConHora({ fecha: evento.fecha, horas: horas.inicio }),
                    allDay: evento.allDay,
                    extendedProps: {
                        description: evento.descripcion,
                        tipo: evento.tipo,
                    }
                }
            } else {
                event = {
                    id: crypto.randomUUID(),
                    title: evento.titulo,
                    start: fechaConHora({ fecha: evento.fecha, horas: horas.inicio }),
                    end: fechaConHora({ fecha: evento.fechaFin, horas: horas.fin }),
                    allDay: evento.allDay,
                    extendedProps: {
                        description: evento.descripcion,
                        tipo: evento.tipo,
                    }
                }
            }

            addEvent(event);
            setEvento(eventoInicial)
            cerrar();
            //refresh();
        } else {
            setEvento(eventoInicial);
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
                        <Row className="mb-3">
                            <Form.Group as={Col} className='col-8' controlId="exampleForm.ControlInput1">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    autoFocus
                                    value={evento.titulo}
                                    onChange={handleChangeTitulo}
                                />
                            </Form.Group>
                            <Form.Group as={Col} className='col-4' >
                                <Form.Check // prettier-ignore
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
                                    value={evento.fecha}
                                    onChange={handleChangeDate}
                                    type='date'
                                />
                            </Form.Group> :
                            <>
                                <Row className='mb-2'>
                                    <Form.Group as={Col}>
                                        <Form.Label>Fecha Inicio</Form.Label>
                                        <Form.Control
                                            value={evento.fecha}
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
                                            value={evento.fechaFin}
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
                        <Form.Group as={Col} className="mb-3">
                            <Form.Label>Tipos</Form.Label>
                            <Form.Select onChange={changeTipo}>
                                {TAKS_TYPES.map(value => <option key={value}>{value}</option>)}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Descripcion</Form.Label>
                            <Form.Control as="textarea" rows={3} value={evento.descripcion} onChange={changeDescripcion} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={cerrar}>
                        Cerrar
                    </Button>
                    <Button variant="primary" onClick={guardarEvento}>
                        Guardar
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    )
}