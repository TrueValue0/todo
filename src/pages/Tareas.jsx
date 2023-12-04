import { useEffect, useState } from "react";

//Components //
import ModalAnyadirEvento from '@/components/modal/ModalAnyadirEvento';
import { Card, Container, Form, Tab, Tabs } from "react-bootstrap";
import LogoAlargado from '@/assets/logoAlargado.jsx';
import Layout from "@/components/layouts/Layout";
import Todos from "@/components/todos/Todos";
import Leyenda from "@/components/Leyenda";
import Paper from "@mui/material/Paper";
import { GoPlus } from "react-icons/go";

//Utils //
import { useEventos } from "@/context/EventoProvider";
import { useAuth } from "@/context/AuthProvider";
import { useUsers } from "@/hooks/useUser";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { getAllEvents } from "@/services/data";


export default function Tareas() {


    const { user } = useAuth();
    const { users } = useUsers();
    const { idCustom, setIdCustom, pendientes, finalizadas, allCalendars, setAllCalendars } = useEventos();
    const [modal, setModal] = useState(false);
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

    const styleIcon = movil ? { fontSize: 55, cursor: 'pointer', position: 'fixed', bottom: '120', right: '40', zIndex: 2 } :
        { fontSize: 50, cursor: 'pointer' };

    const cargarDatos = async () => {
        let fusion = await getAllEvents();
        fusion = fusion.map(value => value.tareas.map(evnt => ({
            ...evnt,
            extendedProps: { ...evnt.extendedProps, usuario: value.usuario, idDoc: value.uid },
            backgroundColor: (evnt.extendedProps.visita === 'Comercial') ? '#008f39' : (evnt.extendedProps.visita === 'Bodega') ? '#3788d8' : (evnt.extendedProps.visita === 'Cata') ? '#cb3234' : '#008f39',
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

    const actualizarLista = async () => {
        await cargarDatos()
    }

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
                        <Form.Select onChange={handleSelect}
                            defaultValue={currentComercial ? currentComercial.id : user.id}
                            value={idCustom} >
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
                            <Todos
                                calendarActivos={allCalendars}
                                uid={idCustom}
                                lista={user.id === idCustom && user.rol === 'admin' && allCalendars ? adminPendientes : pendientes}
                                cargarDatos={cargarDatos}
                            />
                        </Tab>
                        <Tab eventKey="finalizadas" title="Finalizadas">
                            <Todos
                                calendarActivos={allCalendars}
                                uid={idCustom}
                                lista={user.id === idCustom && user.rol === 'admin' && allCalendars ? adminFinalizadas : finalizadas}
                                cargarDatos={cargarDatos}
                            />
                        </Tab>
                    </Tabs>
                </Card>
            </Container>
            <ModalAnyadirEvento actualizar={actualizarLista} ver={modal} cerrar={cerrarModal} />
        </Layout>
    )
}