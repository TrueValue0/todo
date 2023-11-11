import React, { createContext, useContext, useState } from 'react';

const EventosContext = createContext();

export function useEventos() {
    return useContext(EventosContext);
}

export function EventosProvider({ children }) {
    const [eventos, setEventos] = useState([]);

    const agregarEvento = (evento) => {
        setEventos((prevEventos) => [...prevEventos, evento]);
    };

    // Puedes agregar más funciones según tus necesidades

    return (
        <EventosContext.Provider value={{ eventos, setEventos, agregarEvento }}>
            {children}
        </EventosContext.Provider>
    );
}
