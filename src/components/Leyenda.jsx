import { Paper } from "@mui/material";

export default function Leyenda(props) {
    return (
        <Paper elevation={2} {...props} className="p-2">
            <h6><strong>Leyenda</strong></h6>
            <ul className="m-0">
                <li>Visita a Comercial (Verde)</li>
                <li>Visita a Bodega (Azul)</li>
                <li>Visita a Cata (Rojo)</li>
            </ul>
        </Paper>
    )
}