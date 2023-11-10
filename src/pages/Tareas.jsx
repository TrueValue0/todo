import { Card, Container } from "react-bootstrap";
import { BiCalendar, BiPlus } from 'react-icons/bi';
import Layout from "@/components/layouts/Layout";
import Todos from "@/components/todos/Todos";
import { useEffect, useState } from "react";
import LogoAlargado from '@/assets/logoAlargado.jsx'
import ModalAnyadirEvento from '@/components/modal/ModalAnyadirEvento'
import { useNavigate } from "react-router-dom";

export default function Tareas() {

    const [modal, setModal] = useState(false);
    const verModal = () => setModal(true);
    const cerrarModal = () => setModal(false);

    return (
        <Layout>
            <Container style={{ marginTop: 80 }}>
                <LogoAlargado className='m-auto d-block my-3' width='400px' />
                <Card >
                    <Card.Header className="text-center h3">Mis Tareas</Card.Header>
                    <Card.Body>
                        <div className="d-flex justify-content-between">
                            <BiCalendar />
                            <BiPlus color="#4070F4" style={{ fontSize: 40, cursor: 'pointer' }} onClick={verModal} />
                        </div>
                        <Todos />
                    </Card.Body>
                </Card>
            </Container>
            <ModalAnyadirEvento ver={modal} cerrar={cerrarModal} refresh={() => location.reload()} />
        </Layout>
    )
}