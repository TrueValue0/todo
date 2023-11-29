import ModalAnyadirEvento from '@/components/modal/ModalAnyadirEvento';
import { Card, Container, Form } from "react-bootstrap";
import { useEventos } from "@/context/EventoProvider";
import LogoAlargado from '@/assets/logoAlargado.jsx';
import { useAuth } from "@/context/AuthProvider";
import Layout from "@/components/layouts/Layout";
import { GoPlus } from "react-icons/go";
import Todos from "@/components/todos/Todos";
import { useEffect, useState } from "react";
import { useUsers } from "@/hooks/useUser";
import { Paper } from "@mui/material";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useMediaQuery } from "@/hooks/useMediaQuery";
import Leyenda from "@/components/Leyenda";
import { getAllEvents } from "@/services/data";


export default function Tareas() {


    const { user } = useAuth();
    const { users } = useUsers();
    const { idCustom, setIdCustom, pendientes, finalizadas } = useEventos();
    const [modal, setModal] = useState(false);
    const [allCalendars, setAllCalendars] = useState(false);
    const [allEvents, setAllEvents] = useState([]);
    const [adminPendientes, setAdminPendientes] = useState([]);
    const [adminFinalizadas, setAdminFinalizadas] = useState([]);
    const verModal = () => setModal(true);
    const cerrarModal = () => setModal(false);

    const handleSelect = event => {
        setAllCalendars(false);
        setIdCustom(event.target.value)
        if (user.id === event.target.value && user.rol === 'admin') {
            setAllCalendars(true);
        }
    }

    const currentComercial = users.find(user => user.id === idCustom);
    const movil = useMediaQuery('550');

    const styleIcon = movil ? { fontSize: 55, cursor: 'pointer', position: 'fixed', bottom: '120', right: '40' } :
        { fontSize: 50, cursor: 'pointer' };

    const cargarDatos = async () => {
        let fusion = await getAllEvents();
        fusion = fusion.map(value => value.tareas.map(evnt => ({
            ...evnt,
            extendedProps: { ...evnt.extendedProps, usuario: value.usuario, idDoc: value.uid },
            backgroundColor: (evnt.extendedProps.visita === 'Comercial') ? '#008f39' : (evnt.extendedProps.visita === 'Bodega') ? '#0000ff' : (evnt.extendedProps.visita === 'Cata') ? '#cb3234' : '#008f39',
        }))).flatMap(value => value);
        if (allCalendars) {
            setAllEvents(fusion);
        }
    }

    function dividirEventosPorCompletado(lista) {
        const eventosFinalizados = lista.filter(evento => evento.extendedProps.completed);
        const eventosPendientes = lista.filter(evento => !evento.extendedProps.completed);
        setAdminPendientes(eventosPendientes);
        setAdminFinalizadas(eventosFinalizados);
    }

    useEffect(() => {
        setIdCustom(user.id)
        if (user.rol === 'admin') setAllCalendars(true);
    }, [])

    useEffect(() => {
        cargarDatos();
    }, [allCalendars])


    useEffect(() => {
        dividirEventosPorCompletado(allEvents)
    }, [allEvents])


    return (
        <Layout>
            <Container fluid='md' style={{ marginTop: 80, marginBottom: 100 }}>
                <LogoAlargado className='m-auto d-block my-3' width='400px' />

                <div className="d-flex justify-content-between align-items-center my-2">
                    {user.rol === 'admin' && <> <Paper className='d-inline-block p-3 my-3'>
                        <Form.Select onChange={handleSelect} value={currentComercial ? currentComercial.id : ''} >
                            <option value=''>Selecciona un agente</option>
                            {users.map(user => {
                                if (user.nombre !== 'PRUEBA') return (<option key={user.id} value={user.id}>{user.nombre}</option>)
                            })
                            }
                        </Form.Select>
                    </Paper>
                        <Form.Check
                            disabled={idCustom !== user.id}
                            onChange={e => setAllCalendars(e.target.checked)}
                            checked={allCalendars}
                            type="switch"
                            label="Combinar calendarios"
                        />
                    </>
                    }
                    <Leyenda />
                    <GoPlus
                        className="text-white bg-primary rounded-5 d-block"
                        style={styleIcon}
                        onClick={verModal}
                    />
                </div>
                <Card >
                    <Tabs
                        style={{ position: 'static' }}
                        defaultActiveKey="pendientes"
                        className="mb-3 "
                        justify
                        variant="pills"
                    >
                        <Tab eventKey="pendientes" title="Pendientes">
                            <Todos uid={idCustom} lista={user.id === idCustom && user.rol === 'admin' && allCalendars ? adminPendientes : pendientes} />
                        </Tab>
                        <Tab eventKey="finalizadas" title="Finalizadas">
                            <Todos uid={idCustom} lista={user.id === idCustom && user.rol === 'admin' && allCalendars ? adminFinalizadas : finalizadas} />
                        </Tab>
                    </Tabs>
                </Card>
            </Container>
            <ModalAnyadirEvento ver={modal} cerrar={cerrarModal} />
        </Layout>
    )
}