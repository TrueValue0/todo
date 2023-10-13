import Layout from '@/components/layouts/Layout'
import PDFDocument from '@/components/PDFDocument'
import { Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Row, Col, Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
//  Filtrado de los informes con las horas, agentes, fechas, descripcion, nombre de empresa (BD).
export default function Informes() {
    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'firstName',
            headerName: 'First name',
            editable: true,
        },
        {
            field: 'lastName',
            headerName: 'Last name',
            editable: true,
        },
        {
            field: 'age',
            headerName: 'Age',
            type: 'number',
            editable: true,
        },
        {
            field: 'fullName',
            headerName: 'Full name',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            valueGetter: (params) =>
                `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        },
    ];

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
                </Container>
                <Container className='mt-4'>
                    <DataGrid
                        columns={columns}
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