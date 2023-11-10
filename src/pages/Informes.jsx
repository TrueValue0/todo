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
import SelectorMultiple from '@/components/SelectorMultiple';
import { TAKS_TYPES } from '@/config/constantes';
import LogoAlargado from '@/assets/logoAlargado.jsx'
//  Filtrado de los informes con las horas, agentes, fechas, descripcion, nombre de empresa (BD).
export default function Informes() {

    const [dataGridOpts, setDataGridOpts] = useState({
        loading: true,
    })
    const [informes, setInformes] = useState([]);
    const [agentes, setAgentes] = useState([]);
    const [informesTabla, setInformesTabla] = useState([]);

    const [filtros, setFiltros] = useState({
        query: '',
        fecha: '',
        comerciales: [],
        tipos: [],
    })

    //const columns = 

    const mapearInformes = (datos) => {
        const informesMapeados = datos.filter(usuario => usuario.tareas.length > 0) // Filtra los usuarios con tareas no vacías
            .flatMap((usuario) => {
                return usuario.tareas.map((tarea, indice) => {
                    return {
                        id: indice,
                        nombre: usuario.usuario ?? '',
                        tarea: tarea.title ?? '',
                        descripcion: tarea.extendedProps.description ?? '',
                        tipo: tarea.extendedProps.tipo ?? '',
                        fecha: tarea.start ?? ''
                    }
                })
            });

        setInformesTabla(informesMapeados);
    }

    const cargarTareas = async () => {
        const querySnapshot = await getDocs(tareas);

        let tareasData = [];
        let idCustom = 1;
        querySnapshot.forEach((doc) => {
            tareasData.push({ id: idCustom, ...doc.data(), uid: doc.id });
            idCustom += 1
        });

        setInformes(tareasData);
        setAgentes(tareasData.map(value => value.usuario))
        mapearInformes(tareasData);
    };

    const handleBuscar = event => setFiltros(prev => ({ ...prev, query: event.target.value }));

    const handleFecha = event => setFiltros(prev => ({ ...prev, query: event.target.value }));

    const setComerciales = event => setFiltros(prev => ({ ...prev, comerciales: event.target.value }));

    const setTipos = event => setFiltros(prev => ({ ...prev, tipos: event.target.value }));


    const filtrar = () => {
        if (
            !filtros.query &&
            !filtros.fecha &&
            filtros.comerciales.length === 0 &&
            filtros.tipos.length === 0
        ) return;

        setInformesTabla(informesTabla.filter(informe => {

            const cumpleFiltroQuery = !filtros.query ||
                informe.tarea.includes(filtros.query) ||
                informe.descripcion.includes(filtros.query) ||
                informe.nombre.includes(filtros.query);

            const cumpleFiltroFecha = !filtros.fecha || informe.fecha.startsWith(filtros.fecha);
            const cumpleFiltroComerciales = filtros.comerciales.length === 0 || filtros.comerciales.includes(informe.nombre);
            const cumpleFiltroTipos = filtros.tipos.length === 0 || filtros.tipos.includes(informe.tipo);

            return cumpleFiltroQuery && cumpleFiltroFecha && cumpleFiltroComerciales && cumpleFiltroTipos;
        }))
    };


    useEffect(filtrar, [filtros])

    useEffect(() => {
        cargarTareas();
        setDataGridOpts(prev => ({ ...prev, loading: false }));
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
                                <SelectorMultiple label='Comerciales' names={agentes} agent={filtros.comerciales} setAgent={setComerciales} />
                            </Col>
                            <Col>
                                <SelectorMultiple label='Tipos' names={TAKS_TYPES} agent={filtros.tipos} setAgent={setTipos} />
                            </Col>
                            <Col>
                                <Button onClick={filtrar}>Buscar</Button>
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
                                //type: 'date',
                                minWidth: 90
                            },
                        ]}
                        rows={informesTabla}
                        disableRowSelectionOnClick
                        loading={dataGridOpts.loading}
                        autoHeight
                    />
                </Container>
            </Form>
            {/* <PDFDocument /> */}
        </Layout >
    )
}