import { useEffect, useState } from "react";

//Components
//import Layout from "@/components/layouts/Layout";
import { ButtonGroup, Container, Button } from "react-bootstrap";
import EditUsuario from "@/components/usuarios/EditUsuario";
import { BiEdit, BiTrash, BiPlus } from "react-icons/bi";
import AddUser from "@/components/usuarios/AddUser";
import { DataGrid } from '@mui/x-data-grid/DataGrid';

//Utils
import { getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db, usuarios } from "@/config/firebaseapp";
import { esText } from '@/config/constantes'
import { useAuth } from "@/context/AuthProvider";

export default function Usuarios() {

    const { user } = useAuth();
    const [add, setAdd] = useState(false);
    const [edit, setEdit] = useState({
        ver: false,
        nombre: '',
        apellidos: '',
        email: '',
        rol: '',
        uid: '',
        avatar: '',
    })
    const [usuariosTable, setUsuariosTable] = useState([]);

    const handleCellClick = (param, event) => param.field === "action" && event.stopPropagation();

    const cargarUsuarios = async () => {
        const querySnapshot = await getDocs(usuarios);

        let usuariosData = [];
        let idCustom = 1;
        querySnapshot.forEach((doc) => {
            usuariosData.push({ id: idCustom, ...doc.data(), uid: doc.id });
            idCustom += 1
        });
        usuariosData = usuariosData.filter(value => value.uid !== user.id);
        setUsuariosTable(usuariosData);
    };

    useEffect(() => {
        cargarUsuarios();
    }, [add, edit]);

    return (
        <>
            {/*  <Layout> */}
            <Container className="d-flex flex-wrap flex-column align-content-center" style={{ marginTop: 80 }}>
                {add ?
                    <AddUser volver={() => setAdd(false)} />
                    :
                    <>
                        <Button
                            style={{ width: '170px' }}
                            className="my-2 align-self-end"
                            onClick={() => setAdd(true)}
                        >Añadir Usuario <BiPlus rotate={45} className="fs-5" /> </Button>
                        <DataGrid
                            localeText={esText}
                            rows={usuariosTable}
                            columns={[
                                {
                                    field: 'id',
                                    headerName: 'ID',
                                    width: 80
                                },
                                {
                                    field: 'nombre',
                                    headerName: 'Nombre',
                                    width: 150,
                                    editable: true,
                                },
                                {
                                    field: 'apellidos',
                                    headerName: 'Apellidos',
                                    width: 190,
                                    editable: true,
                                },
                                {
                                    field: 'rol',
                                    headerName: 'Rol',
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
                                        const onClick = async (e) => {
                                            const currentRow = params.row;
                                            await deleteDoc(doc(db, 'usuarios', currentRow.uid));
                                            await deleteDoc(doc(db, 'tareas', currentRow.uid));
                                        };

                                        const edit = () => {
                                            const currentRow = params.row;
                                            setEdit({ ...currentRow, ver: true })
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
                    </>}
                <EditUsuario
                    content={edit}
                    handleClose={() => setEdit(prev => ({ ...prev, ver: false }))}
                    seter={setEdit}
                />
            </Container >

            {/* </Layout > */}
        </>
    )
}