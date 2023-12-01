import { useEffect, useState } from 'react';

//Components // 
import { Row, Col, Container, Accordion, Form, Button } from 'react-bootstrap';
import SelectorMultiple from '@/components/SelectorMultiple';
import LogoAlargado from '@/assets/logoAlargado.jsx';
import Layout from '@/components/layouts/Layout'
import { ImCross, ImCheckboxChecked } from "react-icons/im";
import { Paper } from '@mui/material';
import PDFDocument from '@/components/PDFDocument'

//Utils
import { formatearFecha } from '@/services/generarUUID';
import { getAllEvents } from '@/services/data';
import { useUsers } from '@/hooks/useUser';
import { TAKS_TYPES, empresas } from '@/config/constantes';

export default function Informes() {

    const { users } = useUsers();


    const initalFilters = {
        nombre: '',
        fecha: '',
        empresa: [],
        visita: [],
        comerciales: [],
        completed: false,
    }

    const evento = {
        id: '',
        title: '',
        start: '', //Start es una fecha
        end: '', //Fecha es una fecha
        allDay: true,
        extendedProps: {
            completed: false,
            objetivo: '',
            visita: '',
            conclusiones: '',
            empresa: '',
            planificacion: [],
        }
    }

    const [backup, setBackup] = useState([])
    const [informes, setInformes] = useState([]);
    const [filtros, setFiltros] = useState(initalFilters);




    const cargarTareas = async () => {
        let tareasData = await getAllEvents();
        tareasData.sort((a, b) => a.usuario.localeCompare(b.usuario));
        tareasData = tareasData.map(value => (value.start) ? { ...value, start: value.start.slice(0, 10) } : { ...value })
            .flatMap((usuario) => {
                return usuario.tareas.map((tarea) => {
                    return {
                        id: tarea.id,
                        nombre: usuario.usuario ?? '',
                        title: tarea.title ?? '',
                        objetivo: tarea.extendedProps.objetivo ?? 'Sin descripción',
                        empresa: tarea.extendedProps.empresa ?? '',
                        fecha: tarea.start ?? '',
                        completed: tarea.extendedProps.completed,
                        visita: tarea.extendedProps.visita,
                        conclusiones: tarea.extendedProps.conclusiones,
                        planificacion: tarea.extendedProps.planificacion,
                    }
                })
            });
        setBackup(tareasData);
        setInformes(tareasData);
    };

    const handleBuscar = event => setFiltros(prev => ({ ...prev, nombre: event.target.value }));

    const handleFecha = event => setFiltros(prev => ({ ...prev, fecha: event.target.value }));

    const setComerciales = event => setFiltros(prev => ({ ...prev, comerciales: event.target.value }));

    const setTipos = event => setFiltros(prev => ({ ...prev, visita: event.target.value }));

    const setEmpresas = event => setFiltros(prev => ({ ...prev, empresa: event.target.value }));

    const filtrar = () => {
        const informesFiltrados = backup.filter((informe) => {
            const nombreMatch = filtros.nombre ? informe.title.toLowerCase().includes(filtros.nombre.toLowerCase()) : true;
            const fechaMatch = filtros.fecha ? informe.fecha.includes(filtros.fecha) : true;
            const empresasMatch = filtros.empresa.length === 0 || filtros.empresa.includes(informe.empresa);
            const comercialesMatch = filtros.comerciales.length === 0 || filtros.comerciales.includes(informe.nombre);
            const visitaMatch = filtros.visita.length === 0 || filtros.visita.includes(informe.visita);
            const completedMatch = informe.completed === filtros.completed;

            return nombreMatch && fechaMatch && comercialesMatch && empresasMatch && visitaMatch && completedMatch;
        });
        setInformes(informesFiltrados);
    };

    useEffect(filtrar, [filtros])

    useEffect(() => {
        cargarTareas();
    }, [])

    return (
        <Layout>
            <Form style={{ marginTop: 80 }}>
                <Container>
                    <LogoAlargado className='m-auto d-block my-3' width='400px' />
                    <Paper elevation={3} className='p-4' >
                        <Row className='mt-2'>
                            <Col>
                                <Form.Control type='text' placeholder="Buscar ..." onChange={handleBuscar} />
                            </Col>
                        </Row>

                        <div className=' d-flex flex-wrap gap-3 align-items-center mt-2'>
                            <Form.Control style={{ minWidth: 180 }} className='d-inline-block' type="month" onChange={handleFecha} />
                            <SelectorMultiple label='Comerciales' names={users.map(value => value.nombre)} agent={filtros.comerciales} setAgent={setComerciales} />
                            <SelectorMultiple label='Visitas' names={TAKS_TYPES} agent={filtros.visita} setAgent={setTipos} />
                            <SelectorMultiple label='Empresas' names={empresas} agent={filtros.empresa} setAgent={setEmpresas} />
                            <Form.Check label="Completado" type="switch" checked={filtros.completed} onChange={e => setFiltros(prev => ({ ...prev, completed: e.target.checked }))} />
                            <Button className='h-50 d-inline-block' onClick={filtrar}>Buscar</Button>
                        </div>
                    </Paper>

                    <Paper className='mt-2'>
                        <Row className='p-4' style={{ marginRight: 18 }}>
                            <Col className='fw-semibold text-center'>Comercial</Col>
                            <Col className='fw-semibold text-center'>Asunto</Col>
                            <Col className='fw-semibold text-center'>Fecha</Col>
                            <Col className='fw-semibold text-center'>Visita</Col>
                            <Col className='fw-semibold text-center'>Empresa</Col>
                            <Col className='fw-semibold text-center'>Completado</Col>
                        </Row>
                        <Accordion>
                            {informes.length > 0 && informes?.map((evento) => (
                                <Accordion.Item key={evento.id} eventKey={evento.id}>
                                    <Accordion.Header>
                                        <Row className='p-4 w-100' /* style={{ minHeight: 40 }} */>
                                            <Col className='text-truncate text-center'>{evento.nombre}</Col>
                                            <Col className='text-truncate text-center'>{evento.title}</Col>
                                            <Col className='text-truncate text-center'>{formatearFecha(evento.fecha)}</Col>
                                            <Col className='text-truncate text-center'>{evento.visita === '' ? 'Sin visita' : evento.visita}</Col>
                                            <Col className='text-truncate text-center'>{evento.empresa === '' ? 'Sin empresa' : evento.empresa}</Col>
                                            <Col className='text-truncate text-center'>{evento.completed ?
                                                < ImCheckboxChecked color='#008f39' /> :
                                                <ImCross color='#cb3234' />
                                            }</Col>
                                        </Row>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <h5>Objetivo: </h5>
                                        <Paper className='p-3 my-2' elevation={1}>
                                            {evento.objetivo}
                                        </Paper>
                                        <h5>Conclusiones: </h5>
                                        <Paper className='p-3 my-2' elevation={1}>
                                            {evento.objetivo}
                                        </Paper>
                                        <h5>Planificación:</h5>
                                        <Paper className='p-3 my-2' elevation={1}>
                                            <ol>
                                                {evento.planificacion.map((valor, index) => (
                                                    <li className='fw-bold' key={index} variant="primary">  <span className='fw-normal'>{valor}</span></li>
                                                ))}
                                            </ol>
                                        </Paper>
                                    </Accordion.Body>
                                </Accordion.Item>
                            ))}
                        </Accordion>
                    </Paper>

                </Container>
            </Form>
            {/* <PDFDocument /> */}
        </Layout >
    )
}