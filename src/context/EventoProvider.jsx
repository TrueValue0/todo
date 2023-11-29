import React, { createContext, useContext, useEffect, useState } from 'react';

const EventosContext = createContext();

export function useEventos() {
    return useContext(EventosContext);
}

export function EventosProvider({ children }) {
    const [eventos, setEventos] = useState([]);
    const [idCustom, setIdCustom] = useState('');
    const [ids, setIds] = useState([]);
    const [pendientes, setPendientes] = useState([]);
    const [finalizadas, setFinalizadas] = useState([]);

    function dividirEventosPorCompletado() {
        const eventosFinalizados = eventos.filter(evento => evento.extendedProps.completed);
        const eventosPendientes = eventos.filter(evento => !evento.extendedProps.completed);
        setPendientes(eventosPendientes);
        setFinalizadas(eventosFinalizados);
    }

    const agregarEvento = (evento) => {
        setEventos((prevEventos) => [...prevEventos, evento]);
    };

    useEffect(dividirEventosPorCompletado, [eventos]);

    // Puedes agregar más funciones según tus necesidades

    return (
        <EventosContext.Provider value={{
            eventos,
            setEventos,
            agregarEvento,
            idCustom,
            setIdCustom,
            pendientes,
            finalizadas,
            ids,
            setIds
        }}>
            {children}
        </EventosContext.Provider>
    );
}
