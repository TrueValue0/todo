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

    const initalFilters = {
        tarea: '',
        fecha: '',
        comerciales: [],
        tipos: [],
    }

    const [dataGridOpts, setDataGridOpts] = useState({
        loading: true,
    })
    const [informes, setInformes] = useState([]);
    const [agentes, setAgentes] = useState([]);
    const [informesTabla, setInformesTabla] = useState([]);

    const [filtros, setFiltros] = useState(initalFilters)

    //const columns = 

    const mapearInformes = (datos) => {
        let idCustom = 0;
        const informesMapeados = datos.filter(usuario => usuario.tareas.length > 0) // Filtra los usuarios con tareas no vacías
            .flatMap((usuario) => {
                return usuario.tareas.map((tarea) => {
                    idCustom = idCustom + 1;
                    return {
                        id: idCustom,
                        nombre: usuario.usuario ?? '',
                        tarea: tarea.title ?? '',
                        descripcion: tarea.extendedProps.description ?? 'Sin descripción',
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

        tareasData.sort((a, b) => a.usuario.localeCompare(b.usuario));
        tareasData = tareasData.map(value => (value.start) ? { ...value, start: value.start.slice(0, 10) } : { ...value });
        setAgentes(tareasData.map(value => value.usuario))
        mapearInformes(tareasData);
    };

    const handleBuscar = event => setFiltros(prev => ({ ...prev, query: event.target.value }));

    const handleFecha = event => setFiltros(prev => ({ ...prev, query: event.target.value }));

    const setComerciales = event => setFiltros(prev => ({ ...prev, comerciales: event.target.value }));

    const setTipos = event => setFiltros(prev => ({ ...prev, tipos: event.target.value }));


    const filtrar = () => {
        if (filtros === initalFilters) {
            // Si no hay criterios de filtro, mostrar todos los informes
            setInformes(informesTabla);
        } else {
            // Aplicar los filtros si hay criterios de filtro
            const informesFiltrados = informesTabla.filter((informe) => {
                const nombreMatch = informe.nombre.toLowerCase().includes(filtros.tarea.toLowerCase());
                const fechaMatch = filtros.fecha ? informe.fecha.includes(filtros.fecha) : true;
                const comercialesMatch = filtros.comerciales.length === 0 || filtros.comerciales.includes(informe.nombre);
                const tiposMatch = filtros.tipos.length === 0 || filtros.tipos.includes(informe.tipo);

                return nombreMatch && fechaMatch && comercialesMatch && tiposMatch;
            });

            setInformes(informesFiltrados);
        }
    };




    useEffect(filtrar, [filtros, informes])

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
                                minWidth: 120
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
                        rows={informes}
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