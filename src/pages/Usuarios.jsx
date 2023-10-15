import Layout from "@/components/layouts/Layout";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { DataGrid } from '@mui/x-data-grid';
import { ButtonGroup } from "react-bootstrap";
import { BiEdit, BiTrash, BiPlus } from "react-icons/bi";
/* import { useUsers } from "@/hooks/useUsers"; */

export default function Usuarios() {

    const rows = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
        { id: 2, lastName: 'jfkdlas', firstName: 'Cersei', age: 42 },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
        { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 }
    ];

    const esText = {
        columnMenuSortAsc: 'Ordenar Ascendente',
        columnMenuSortDesc: 'Ordenar Descendente',
        columnMenuFilter: 'Filtro',
        columnMenuHideColumn: 'Ocultar Columna',
        columnMenuManageColumns: 'Administrar Columnas',
        filterOperatorContains: 'Contiene',
        filterOperatorEquals: 'Igual A',
        filterOperatorStartsWith: 'Empieza con',
        filterOperatorEndsWith: 'Termina con',
        filterOperatorIsEmpty: 'Esta vacio',
        filterOperatorIsNotEmpty: 'No esta vacio',
        filterOperatorIsAnyOf: 'Es cualquiera de',
        columnsPanelHideAllButton: 'Ocultarlos',
        columnsPanelShowAllButton: 'Mostralos',
        checkboxSelectionHeaderName: 'Casillas de seleccion',
        toolbarColumnsLabel: 'Buscar Columna',
        columnMenuUnsort: 'Deshacer',
    }

    const handleCellClick = (param, event) => {
        param.field === "action" && event.stopPropagation();
    };

    return (
        <Layout>
            <Container className="d-flex flex-wrap flex-column align-content-center" style={{ marginTop: 70 }}>
                <Button style={{ width: '170px' }} className="my-2 align-self-end">Añadir Usuario <BiPlus rotate={45} className="fs-5" /> </Button>
                <DataGrid
                    localeText={esText}
                    rows={rows}
                    columns={[
                        {
                            field: 'id',
                            headerName: 'ID',
                            width: 90
                        },
                        {
                            field: 'firstName',
                            headerName: 'First name',
                            width: 150,
                            editable: true,
                        },
                        {
                            field: 'lastName',
                            headerName: 'Apellidos',
                            width: 150,
                            editable: true,
                        },
                        {
                            field: 'age',
                            headerName: 'Age',
                            type: 'number',
                            width: 110,
                            editable: true,
                        },
                        {
                            field: 'action',
                            headerName: 'Acciones',
                            sortable: false,
                            width: 260,
                            renderCell: (params) => {
                                const onClick = (e) => {
                                    const currentRow = params.row;
                                    console.log(currentRow);
                                };

                                const edit = () => {
                                    console.log("Edit");
                                }

                                return (
                                    <ButtonGroup direction="row" spacing={2}>
                                        <Button size="small" onClick={edit}>
                                            Editar
                                            <BiEdit className="mx-1 fs-5" />
                                        </Button>
                                        <Button variant="danger" size="small" onClick={onClick}>
                                            Eliminar
                                            <BiTrash className="mx-1 fs-5" />
                                        </Button>
                                    </ButtonGroup>
                                );
                            }
                        },
                    ]}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10, 20]}
                    checkboxSelection
                    onCellClick={handleCellClick}
                />
            </Container >
        </Layout >
    )
}