import { getDownloadURL } from "firebase/storage";
import { FaRegFilePdf } from "react-icons/fa6";
import { BsFiletypeTxt, BsThreeDots } from "react-icons/bs";
import { FaRegFileWord, FaRegTrashAlt } from "react-icons/fa";
import { FiFile, FiDownload } from "react-icons/fi";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ListGroup from 'react-bootstrap/ListGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import { forwardRef, useState } from "react";


function IconsDocumets({ tipo, ...props }) {
    return (
        <>
            {tipo === 'pdf' && <FaRegFilePdf {...props} color="red" />}
            {tipo === 'txt' && <BsFiletypeTxt {...props} color="#949494" />}
            {tipo === 'word' && <FaRegFileWord {...props} color="#239AFF" />}
            {tipo === 'desconocido' && <FiFile />}
        </>
    )
}

const CustomToggle = forwardRef(({ children, onClick }, ref) => {
    return (
        <a
            href=""
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
        >
            {children}
        </a>
    )
});

export default function ListarDocumentos({ documentos, eliminar }) {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => setIsHovered(true);

    const handleMouseLeave = () => setIsHovered(false);

    const descargar = async (documento) => {
        try {
            const url = await getDownloadURL(documento.ref);

            // Crear un elemento <a> invisible
            const link = document.createElement('a');
            link.href = url;
            link.target = '_blank'; // Abrir en una nueva pestaña/tab
            link.download = documento.name; // Nombre del archivo al descargar

            // Simular un clic en el enlace para iniciar la descarga
            document.body.appendChild(link);
            link.click();

            // Eliminar el elemento <a> después de la descarga
            document.body.removeChild(link);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            {/*  { url, name: fichero.name, type: tipoArchivo, ref: fichero, metadata } */}
            <div className={`${documentos.length > 0 ? 'p-2 gap-2' : 'p-0'} d-flex flex-column `}>
                {documentos.length > 0 && documentos.map((documento, index) => (
                    <ListGroup key={documento.url} horizontal>
                        <ListGroup.Item className="d-flex align-items-center">{documento.name}</ListGroup.Item>
                        <ListGroup.Item className="d-flex align-items-center"> <IconsDocumets size={20} tipo={documento.type} /></ListGroup.Item>
                        <ListGroup.Item className="border-start-0">
                            <Dropdown as={ButtonGroup}>
                                <Dropdown.Toggle as={CustomToggle}>
                                    <BsThreeDots
                                        className={`${isHovered ? 'shadow-lg' : ''}`}
                                        onMouseEnter={handleMouseEnter}
                                        onMouseLeave={handleMouseLeave}
                                        size={25}
                                    /></Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item
                                        className="text-center"
                                        eventKey="1"
                                        onClick={() => descargar(documento)}
                                    >Descargar <FiDownload style={{ marginLeft: 6, marginRight: 6 }} /></Dropdown.Item>
                                    <Dropdown.Item
                                        onClick={() => eliminar(index)}
                                        className="text-center"
                                        eventKey="2"
                                    >Eliminar
                                        <FaRegTrashAlt style={{ marginLeft: 6, marginRight: 6 }} /></Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </ListGroup.Item>
                    </ListGroup>
                ))}
            </div>
        </>
    );
}
