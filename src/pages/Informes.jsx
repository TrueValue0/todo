import { useEffect, useState } from 'react';
import Layout from '@/components/layouts/Layout'
import PDFDocument from '@/components/PDFDocument'
import { Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Row, Col, Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { tareas } from '@/config/firebaseapp'
import { getDocs } from 'firebase/firestore';
//  Filtrado de los informes con las horas, agentes, fechas, descripcion, nombre de empresa (BD).
export default function Informes() {

    const [informes, setInformes] = useState([]);

    //const columns = 

    const cargarTareas = async () => {
        const querySnapshot = await getDocs(tareas);

        let tareasData = [];
        let idCustom = 1;
        querySnapshot.forEach((doc) => {
            tareasData.push({ id: idCustom, ...doc.data(), uid: doc.id });
            idCustom += 1
        });

        setInformes(tareasData);
    };

    const rows = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
        { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    ];
    console.log(informes);
    useEffect(() => {
        cargarTareas();
    }, [])

    return (
        <Layout>
            <Form style={{ marginTop: 80 }}>
                <Container>
                    <Paper elevation={3} className='p-4' >
                        <Row className='mt-2'>
                            <Col>
                                <Form.Control type="email" placeholder="Buscar ..." />
                            </Col>
                        </Row>
                        <Row className='mt-2 justify-content-center'>
                            <Col xs={6} sm={5}>
                                <Form.Control type="month" placeholder="Enter email" />
                            </Col>
                            <Col xs={6} sm={5}>
                                <Form.Select aria-label="Default select example">
                                    <option>Agentes (todos)</option>
                                    <option value="1">Pedro</option>
                                    <option value="2">Carmen</option>
                                    <option value="3">Pepe</option>
                                </Form.Select>
                            </Col>
                            <Col className='d-flex justify-content-center' xs={2}>
                                <Button>Buscar</Button>
                            </Col>
                        </Row>
                    </Paper>
                    <DataGrid
                        className='w-100 mt-4'
                        columns={[
                            {
                                field: 'id',
                                headerName: 'ID',
                                minWidth: 90,
                                sortable: false,
                                filterable: false,
                            },
                            {
                                field: 'nombre',
                                headerName: 'Nombre',
                                minWidth: 120
                            },
                            {
                                field: 'tarea',
                                headerName: 'Tarea',
                                minWidth: 100
                            },
                            {
                                field: 'descripcion',
                                headerName: 'Descripcion',
                                width: 180
                            },
                            {
                                field: 'tipo',
                                headerName: 'Tipo',
                                minWidth: 90
                            },
                            {
                                field: 'fecha',
                                headerName: 'Fecha',
                                type: 'date',
                                minWidth: 90
                            },
                        ]}
                        rows={rows}
                        disableRowSelectionOnClick
                        autoHeight
                    />
                </Container>
            </Form>
            {/* <PDFDocument /> */}
        </Layout >
    )
}