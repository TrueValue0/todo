import Layout from '@/components/layouts/Layout'
import PDFDocument from '@/components/PDFDocument'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function Informes() {
    return (
        <Layout>
            <Form className='d-flex justify-content-center'>
                <Form.Group style={{ marginTop: 80 }} className="mb-3 d-flex gap-2" >
                    <Form.Control type="email" placeholder="Buscar ..." />
                    <Form.Control type="month" placeholder="Enter email" />
                    <Form.Select aria-label="Default select example">
                        <option>Agentes (todos)</option>
                        <option value="1">Pedro</option>
                        <option value="2">Carmen</option>
                        <option value="3">Pepe</option>
                    </Form.Select>
                    <Button>Buscar</Button>
                </Form.Group>
            </Form>
            {/* <PDFDocument /> */}
        </Layout>
    )
}