import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";
export default function ErrorPage() {
    const error = useRouteError();
    return (
        <div className="d-flex flex-column vh-100 justify-content-center align-items-center">
            <h1 className="fw-bold">Error</h1>
            <p style={{ fontSize: 20 }}>Pagina no existente</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
            <Link to='/' >Volver a la pagina principal</Link>
        </div>
    );
}