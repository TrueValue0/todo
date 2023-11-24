import { useEffect, useState } from "react";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { tareas } from "@/config/firebaseapp";
import { useAuth } from "@/context/AuthProvider";
import { useEventos } from "@/context/EventoProvider";

export function useTareaDoc({ uid = '' } = {}) {
    const { user } = useAuth();
    const id = uid === '' ? user.id : uid;
    const [datos, setDatos] = useState([]);
    const { eventos, setEventos } = useEventos();

    useEffect(() => {
        setEventos(datos)
    }, [datos])

    const cargarDoc = async () => {
        try {
            const documentoSF = doc(tareas, id);
            const documento = await getDoc(documentoSF);
            if (documento.exists()) {
                let docFinal = documento.data().tareas;
                const events = docFinal.map(value => {
                    let color = '#008f39';
                    if (value.extendedProps.visita === 'Comercial') color = '#008f39'
                    else if (value.extendedProps.visita === 'Bodega') color = '#0000ff'
                    else if (value.extendedProps.visita === 'Cata') color = '#cb3234'
                    return { ...value, backgroundColor: color }
                })
                setDatos(events)
            } else {
                console.log("El documento no existe en Firestore");
            }
        } catch (e) {
            console.log(e);
        }
    }

    const actualizarDoc = async (eventos) => {
        try {
            const documentoSF = doc(tareas, id);
            await updateDoc(documentoSF, {
                tareas: eventos,
            })
        } catch (e) {
            console.log(e);
        }
    }

    const deleteEvent = (id) => {
        console.log('pero q pasa');
        const events = eventos.filter(event => event.id !== id);
        console.log(events);
        setEventos(events);
        actualizarDoc(events);
    }

    const completeEvent = (id, completado) => {
        const events = eventos.map(event => {
            if (event.id === id)
                return { ...event, extendedProps: { ...event.extendedProps, completed: completado } }
            return event;
        })
        setEventos(events);
        actualizarDoc(events)
    }

    const updateEvent = (id, evento) => {
        const events = eventos.map(event => {
            if (event.id === id) {
                return {
                    id: evento.id,
                    title: evento.title,
                    start: evento.start,
                    end: evento.end,
                    allDay: evento.allDay,
                    extendedProps: {
                        completed: evento.extendedProps.completed,
                        objetivo: evento.extendedProps.objetivo,
                        visita: evento.extendedProps.visita,
                        conclusiones: evento.extendedProps.conclusiones,
                        empresa: evento.extendedProps.empresa,
                        planificacion: evento.extendedProps.planificacion,
                        isAdmin: evento.extendedProps.isAdmin,
                    }
                }
            }
            return event;
        })
        setEventos(events);
        actualizarDoc(events)
    }

    const addEvent = (evento) => {
        const nuevosEventos = [...datos, evento];
        setEventos(nuevosEventos);
        actualizarDoc(nuevosEventos);
    }

    useEffect(() => {
        cargarDoc();
    }, [uid]);

    return { datos, deleteEvent, completeEvent, updateEvent, addEvent, actualizarDoc, cargarDoc };
}