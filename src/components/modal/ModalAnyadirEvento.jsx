import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import { fechaConHora } from '@/services/generarUUID'
import { TAKS_TYPES } from '@/config/constantes';

export default function ModalAnyadirEvento({ evento, cerrar, seter, guardar }) {

    const { ver, allDay, titulo, fecha, fechaFin, descripcion, tipo } = evento;
    const [horas, setHoras] = useState({
        inicio: '00:00',
        fin: '00:00'
    })

    const handleChangeTitulo = event => seter(prev => ({ ...prev, titulo: event.target.value }))

    const changeDescripcion = event => seter(prev => ({ ...prev, descripcion: event.target.value }));

    const changeTipo = event => seter(prev => ({ ...prev, tipo: event.target.value }));

    const handleChangeDate = event => seter(prev => ({ ...prev, fecha: event.target.value }))

    const handleFechaFin = event => seter(prev => ({ ...prev, fechaFin: event.target.value }));

    const handleAllDay = event => seter(prev => ({ ...prev, allDay: event.target.checked }));

    const handleHoraInicio = event => { setHoras(prev => ({ ...prev, inicio: event.target.value })) }

    const handleHoraFin = event => setHoras(prev => ({ ...prev, fin: event.target.value }));

    const guardarEvento = () => {
        if (!allDay) {
            const fechaIni = fechaConHora({ fecha: fecha, horas: horas.inicio });
            seter(prev => ({ ...prev, fecha: fechaIni }));
            const fechaEnd = fechaConHora({ fecha: fechaFin, horas: horas.fin });
            seter(prev => ({ ...prev, fechaFin: fechaEnd }));
            console.log(fechaIni, fechaEnd);
        }
        setTimeout(guardar, 1000);
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
                                    value={titulo}
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
                        {allDay ?
                            <Form.Group>
                                <Form.Label>Fecha</Form.Label>
                                <Form.Control
                                    value={fecha}
                                    onChange={handleChangeDate}
                                    type='date'
                                />
                            </Form.Group> :
                            <>
                                <Row className='mb-2'>
                                    <Form.Group as={Col}>
                                        <Form.Label>Fecha Inicio</Form.Label>
                                        <Form.Control
                                            value={fecha}
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
                                            value={fechaFin}
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
                            <Form.Control as="textarea" rows={3} value={descripcion} onChange={changeDescripcion} />
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