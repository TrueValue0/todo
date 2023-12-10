import { FaRegFilePdf } from "react-icons/fa6";
import { BsFiletypeTxt } from "react-icons/bs";
import { FaRegFileWord } from "react-icons/fa";

export default function DocumentComponent({ documento }) {

    function clasificarArchivo(contentType) {

        const tiposDeArchivo = {
            pdf: ['application/pdf'],
            txt: ['text/plain'],
            word: ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
            // Agrega más tipos de archivo según sea necesario
        };

        for (const tipo in tiposDeArchivo) {
            if (tiposDeArchivo[tipo].includes(contentType)) {
                return tipo;
            }
        }
        return 'Desconocido'; // Si no se encuentra coincidencia
    }

    return (
        <div className="d-flex flex-column justify-content-center align-items-center">
            {clasificarArchivo(documento.type) === 'pdf' && <FaRegFilePdf color="#8b0000" size={75} />}
            {clasificarArchivo(documento.type) === 'txt' && <BsFiletypeTxt color="#9b9b9b" size={75} />}
            {clasificarArchivo(documento.type) === 'word' && <FaRegFileWord color="#92c5fc" size={75} />}
            <p className="text-center text-truncate m-0" style={{ fontSize: 12 }}>{documento.name}</p>
        </div>
    )
}