import { Paper } from "@mui/material";
import Color from "@/components/Color";

export default function Leyenda(props) {
    return (
        <Paper elevation={2} {...props} className="p-2">
            <h6 className="text-center"><strong>Tipos Visitas</strong></h6>
            <ul className="m-0 d-flex justify-content-between align-items-center gap-4 p-0" style={{ listStyle: 'none' }}>
                <li className="d-flex align-items-center gap-2"> Comercial <Color color='#008f39' /></li>
                <li className="d-flex align-items-center gap-2">Bodega <Color color='#3788d8' /></li>
                <li className="d-flex align-items-center gap-2">Cata <Color color='#cb3234' /></li>
            </ul>
        </Paper>
    )
}