import { Card, Container, Form } from "react-bootstrap";
import { BiCalendar, BiPlus } from 'react-icons/bi';
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


export default function Tareas() {


    const { user } = useAuth();
    const { users } = useUsers();
    const { idCustom, setIdCustom } = useEventos();
    const [modal, setModal] = useState(false);
    const verModal = () => setModal(true);
    const cerrarModal = () => setModal(false);

    const handleSelect = event => setIdCustom(event.target.value);

    const currentComercial = users.find(user => user.id === idCustom)

    return (
        <Layout>
            <Container style={{ marginTop: 80, marginBottom: 100 }}>
                <LogoAlargado className='m-auto d-block my-3' width='400px' />
                {user.rol === 'admin' && <Paper className='d-inline-block p-3 my-3'>
                    <Form.Select onChange={handleSelect} value={currentComercial ? currentComercial.id : ''} >
                        <option value=''>Selecciona un agente</option>
                        {users.map(user => {
                            if (user.nombre !== 'PRUEBA') return (<option key={user.id} value={user.id}>{user.nombre}</option>)
                        })
                        }
                    </Form.Select>
                </Paper>}
                <Card >
                    <Tabs
                        style={{ position: 'static' }}
                        defaultActiveKey="home"
                        className="mb-3"
                        justify
                    >
                        <Tab eventKey="pendientes" title="Pendientes">
                            Tab content for Home
                        </Tab>
                        <Tab eventKey="finalizadas" title="Finalizadas">
                            Tab content for Profile
                        </Tab>
                    </Tabs>
                    <Card.Body>
                        <div className="d-flex justify-content-between">
                            <BiPlus color="#4070F4" style={{ fontSize: 40, cursor: 'pointer' }} onClick={verModal} />
                        </div>
                        <Todos uid={idCustom} />
                    </Card.Body>
                </Card>
            </Container>
            <ModalAnyadirEvento
                ver={modal}
                cerrar={cerrarModal}
                uid={idCustom}
                refresh={() => location.reload()}
            />
        </Layout>
    )
}