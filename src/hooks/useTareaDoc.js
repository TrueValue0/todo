import { useEffect, useState } from "react";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { tareas } from "@/config/firebaseapp";
import { useAuth } from "@/context/AuthProvider";

export function useTareaDoc({ uid = '' } = {}) {
    const { user } = useAuth();
    const id = uid === '' ? user.id : uid;
    const [datos, setDatos] = useState([]);

    const cargarDoc = async () => {
        try {
            const documentoSF = doc(tareas, id);
            const documento = await getDoc(documentoSF);
            if (documento.exists()) {
                const docFinal = documento.data().tareas;
                setDatos(docFinal);
            } else {
                console.log("El documento no existe en Firestore");
            }
        } catch (e) {
            console.log(e);
        }
    }

    const updateDoc = async (eventos) => {
        try {
            console.log(eventos);
            const documentoSF = doc(tareas, id);
            await setDoc(documentoSF, {
                tareas: eventos,
                usuario: user.nombre,
            })
            cargarDoc();
        } catch (e) {
            console.log(e);
        }
    }

    const deleteEvent = (id) => {
        const events = datos.filter(event => event.id !== id);
        updateDoc(events);
    }

    const completeEvent = (id, completed) => {
        let events = datos.map(event => {
            if (event.id === id)
                return { ...event, extendedProps: { ...event.extendedProps, completed } }
            return event;
        })
        updateDoc(events)
    }

    const updateEvent = (id, evento) => {
        let events = datos.map(event => {
            if (event.id === id) {
                return {
                    id: evento.id,
                    title: evento.title,
                    start: evento.start,
                    end: evento.end,
                    allDay: evento.allDay,
                    extendedProps: {
                        completed: evento.extendedProps.completed ?? false,
                        description: evento.extendedProps.description,
                        tipo: evento.extendedProps.tipo,
                    }
                }
            }
            return event;
        })
        console.log(events);
        updateDoc(events)
    }

    const addEvent = (evento) => {
        const nuevosEventos = [...datos, evento];
        updateDoc(nuevosEventos);
    }

    useEffect(() => {
        cargarDoc();
    }, [uid]);

    return { datos, deleteEvent, completeEvent, updateEvent, addEvent, updateDoc };
}