import { useState } from 'react';

export default function Filtros({ eventos }) {

    const [filtro, setFiltro] = useState('');

    // Filtra los eventos según el criterio seleccionado
    const eventosFiltrados = eventos.filter(evento =>
        evento.extendedProps && evento.extendedProps.objetivo &&
        evento.extendedProps.objetivo.toLowerCase().includes(filtro.toLowerCase())
    );

    return (
        <div>
            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="filtroDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {filtro ? `Filtrar por: ${filtro}` : 'Seleccionar filtro'}
                </button>
                <div className="dropdown-menu" aria-labelledby="filtroDropdown">
                    <button className="dropdown-item" onClick={() => setFiltro('')}>Mostrar todos</button>
                    <div className="dropdown-divider"></div>
                    {eventos.map(evento => (
                        evento.extendedProps && evento.extendedProps.objetivo &&
                        <button key={evento.id} className="dropdown-item" onClick={() => setFiltro(evento.extendedProps.objetivo)}>
                            {evento.extendedProps.objetivo}
                        </button>
                    ))}
                </div>
            </div>

            <ul className="list-group mt-3">
                {eventosFiltrados.map(evento => (
                    <li key={evento.id} className="list-group-item">
                        <strong>{evento.title}</strong>
                        {evento.extendedProps && evento.extendedProps.objetivo &&
                            <p>Objetivo: {evento.extendedProps.objetivo}</p>
                        }
                        {/* Agrega más detalles del evento según sea necesario */}
                    </li>
                ))}
            </ul>
        </div>
    );
};