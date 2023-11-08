import ModalAddEvent from "@/components/todos/ModalAddEvent";
import { Card, Container } from "react-bootstrap";
import { BiCalendar, BiPlus } from 'react-icons/bi';
import Layout from "@/components/layouts/Layout";
import Todos from "@/components/todos/Todos";
import { useState } from "react";

export default function Tareas() {

    const [addEvent, setEvent] = useState(false);
    const verModal = () => setEvent(true);
    const cerrarModal = () => setEvent(false);


    return (
        <Layout>
            <Container style={{ marginTop: 80 }}>
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
            <ModalAddEvent ver={addEvent} cerrar={cerrarModal} />
        </Layout>
    )
}