import { useEffect, useState } from 'react';
import Layout from '@/components/layouts/Layout'
import PDFDocument from '@/components/PDFDocument'
import { Paper } from '@mui/material';
import { Row, Col, Container, ListGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { tareas } from '@/config/firebaseapp'
import { getDocs } from 'firebase/firestore';
import SelectorMultiple from '@/components/SelectorMultiple';
import { TAKS_TYPES, empresas } from '@/config/constantes';
import LogoAlargado from '@/assets/logoAlargado.jsx';
import { useUsers } from '@/hooks/useUser';
import Accordion from 'react-bootstrap/Accordion';
import { ImCheckboxChecked } from "react-icons/im";
import { ImCross } from "react-icons/im";
import { formatearFecha } from '@/services/generarUUID';
//  Filtrado de los informes con las horas, agentes, fechas, descripcion, nombre de empresa (BD).
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
        const querySnapshot = await getDocs(tareas);

        let tareasData = [];

        querySnapshot.forEach((doc) => tareasData.push({ ...doc.data() }));

        tareasData.sort((a, b) => a.usuario.localeCompare(b.usuario));
        tareasData = tareasData.map(value => (value.start) ? { ...value, start: value.start.slice(0, 10) } : { ...value });
        tareasData = tareasData.filter(usuario => usuario.tareas.length > 0 && usuario.usuario !== 'PRUEBA') // Filtra los usuarios con tareas no vacías
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
                        <Row className='mt-2 justify-content-center align-items-center'>
                            <Col>
                                <Form.Control type="month" onChange={handleFecha} />
                            </Col>
                            <Col>
                                <SelectorMultiple label='Comerciales' names={users.map(value => value.nombre)} agent={filtros.comerciales} setAgent={setComerciales} />
                            </Col>
                            <Col>
                                <SelectorMultiple label='Visitas' names={TAKS_TYPES} agent={filtros.visita} setAgent={setTipos} />
                            </Col>
                            <Col>
                                <SelectorMultiple label='Empresas' names={empresas} agent={filtros.empresa} setAgent={setEmpresas} />
                            </Col>
                            <Col>
                                <Form.Check label="Completado" type="switch" checked={filtros.completed} onChange={e => setFiltros(prev => ({ ...prev, completed: e.target.checked }))} />
                            </Col>
                            <Col>
                                <Button onClick={filtrar}>Buscar</Button>
                            </Col>
                        </Row>
                    </Paper>

                    <Paper className='mt-2'>
                        <Row className='p-4' /* style={{ minHeight: 40 }} */>
                            <Col className='fw-semibold text-center'>Comercial</Col>
                            <Col className='fw-semibold text-center'>Asunto</Col>
                            <Col className='fw-semibold text-center'>Fecha</Col>
                            <Col className='fw-semibold text-center'>Visita</Col>
                            <Col className='fw-semibold text-center'>Empresa</Col>
                            <Col className='fw-semibold text-center'>Objetivo</Col>
                            <Col className='fw-semibold text-center'>Conclusiones</Col>
                            <Col className='fw-semibold text-center'>Completado</Col>
                        </Row>
                        <Accordion>
                            {informes.length > 0 && informes?.map((evento) => (
                                <Accordion.Item key={evento.id} eventKey={evento.id}>
                                    <Row className='p-4' /* style={{ minHeight: 40 }} */>
                                        <Col className='text-truncate text-center'>{evento.nombre}</Col>
                                        <Col className='text-truncate text-center'>{evento.title}</Col>
                                        <Col className='text-truncate text-center'>{formatearFecha(evento.fecha)}</Col>
                                        <Col className='text-truncate text-center'>{evento.visita === '' ? 'Sin visita' : evento.visita}</Col>
                                        <Col className='text-truncate text-center'>{evento.empresa === '' ? 'Sin empresa' : evento.empresa}</Col>
                                        <Col className='text-truncate text-center'>{evento.objetivo === '' ? 'Sin Objetivo' : evento.objetivo}</Col>
                                        <Col className='text-truncate text-center'>{evento.conclusiones === '' ? 'Sin Conclusiones' : evento.conclusiones}</Col>
                                        <Col className='text-truncate text-center'>{evento.completed ?
                                            < ImCheckboxChecked color='#008f39' /> :
                                            <ImCross color='#cb3234' />
                                        }</Col>
                                    </Row>
                                    <Accordion.Header flush className='border-1 border-bg-black'>
                                        <p className='fs-6 fst-italic'>Mas Detalles</p>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <Row>
                                            <Col className='text-center'><p className='fw-semibold'>Nomnbre: <span className='text-capitalize fw-normal'>{evento.nombre}</span></p></Col>
                                            <Col className='text-center'> <p className='fw-semibold'>Asunto: <span className='text-capitalize fw-normal'>{evento.title}</span></p></Col>
                                            <Col className='text-center'> <p className='fw-semibold'>Fecha: <span className='text-capitalize fw-normal'>{evento.fecha}</span></p></Col>
                                        </Row>
                                        <Row className='mt-2'>
                                            <Col className='text-center'><p className='fw-semibold'>Visita: <span className='text-capitalize fw-normal'>{evento.visita}</span></p></Col>
                                            <Col className='text-center'><p className='fw-semibold'>Empresa: <span className='text-capitalize fw-normal'>{evento.visita}</span></p></Col>
                                        </Row>
                                        <Paper className='p-3 my-2' elevation={1}>
                                            <h5>Objetivo: </h5>
                                            {evento.objetivo}
                                        </Paper>
                                        <Paper className='p-3 my-2' elevation={1}>
                                            <h5>Conclusiones: </h5>
                                            {evento.objetivo}
                                        </Paper>
                                        <h5>Conclusiones:</h5>
                                        <ListGroup>
                                            {evento.planificacion.map(valor => (
                                                <ListGroup.Item variant="primary">{valor}</ListGroup.Item>
                                            ))}
                                        </ListGroup>

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