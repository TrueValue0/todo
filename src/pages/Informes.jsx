import { useEffect, useState } from 'react';
import Layout from '@/components/layouts/Layout'
import PDFDocument from '@/components/PDFDocument'
import { Paper } from '@mui/material';
import { Row, Col, Container } from 'react-bootstrap';
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
                        visita: tarea.extendedProps.visita
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

                    <Paper>
                        <Accordion>
                            {informes.length > 0 && informes?.map((evento) => (
                                <Accordion.Item key={evento.id} eventKey={evento.id}>
                                    <Accordion.Header>
                                        <p className='mx-2'>Nombre: {evento.nombre}</p>
                                        <p className='mx-2'>Fecha: {evento.fecha}</p>
                                        <p className='mx-2'>Asunto: {evento.title}</p>
                                        <p className='mx-2'>{evento.completed ? <>Hecho < ImCheckboxChecked color='#008f39' /> </> :
                                            <>Por Hacer <ImCross color='#cb3234' /> </>
                                        }</p>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <p>Visita :{evento.visita}</p>
                                        {evento.objetivo}
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