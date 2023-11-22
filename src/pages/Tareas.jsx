import { Card, Container, Form } from "react-bootstrap";
import { GoPlus } from "react-icons/go";
import Layout from "@/components/layouts/Layout";
import Todos from "@/components/todos/Todos";
import { useEffect, useState } from "react";
import LogoAlargado from '@/assets/logoAlargado.jsx'
import ModalAnyadirEvento from '@/components/modal/ModalAnyadirEvento'
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";
import { useUsers } from "@/hooks/useUser";
import { useEventos } from "@/context/EventoProvider";
import { Paper } from "@mui/material";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useMediaQuery } from "@/hooks/useMediaQuery";
import Leyenda from "@/components/Leyenda";


export default function Tareas() {


    const { user } = useAuth();
    const { users } = useUsers();
    const { idCustom, setIdCustom, pendientes, finalizadas } = useEventos();
    const [modal, setModal] = useState(false);
    const verModal = () => setModal(true);
    const cerrarModal = () => setModal(false);

    const handleSelect = event => setIdCustom(event.target.value);

    const currentComercial = users.find(user => user.id === idCustom);
    const movil = useMediaQuery('550');

    const styleIcon = movil ? { fontSize: 55, cursor: 'pointer', position: 'fixed', bottom: '120', right: '40' } :
        { fontSize: 50, cursor: 'pointer' };

    return (
        <Layout>
            <Container fluid='md' style={{ marginTop: 80, marginBottom: 100 }}>
                <LogoAlargado className='m-auto d-block my-3' width='400px' />

                <div className="d-flex justify-content-between align-items-center my-2">
                    {user.rol === 'admin' && <Paper className='d-inline-block p-3 my-3'>
                        <Form.Select onChange={handleSelect} value={currentComercial ? currentComercial.id : ''} >
                            <option value=''>Selecciona un agente</option>
                            {users.map(user => {
                                if (user.nombre !== 'PRUEBA') return (<option key={user.id} value={user.id}>{user.nombre}</option>)
                            })
                            }
                        </Form.Select>
                    </Paper>}
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
                            <Todos uid={idCustom} lista={pendientes} />
                        </Tab>
                        <Tab eventKey="finalizadas" title="Finalizadas">
                            <Todos uid={idCustom} lista={finalizadas} />
                        </Tab>
                    </Tabs>
                </Card>
            </Container>
            <ModalAnyadirEvento ver={modal} cerrar={cerrarModal} />
        </Layout>
    )
}