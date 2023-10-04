import { useEffect, useState } from "react";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { tareas } from "@/config/firebaseapp";
import { useAuth } from "@/context/AuthProvider";

export function useTareaDoc({ idParam } = {}) {
    const { credentials: { user, loading } } = useAuth();
    const id = idParam ?? user ? user.uid : null;
    const [datos, setDatos] = useState([]);

    const cargarDoc = async () => {
        if (user) {
            const id = user.uid;
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
    }

    const updateDoc = async (eventos) => {
        try {
            const documentoSF = doc(tareas, id);
            await setDoc(documentoSF, {
                tareas: eventos
            })
            setDatos(eventos);
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
            if (event.id === id) {
                return { ...event, extendedProps: { ...event.extendedProps, completed } }
            }
            return event;
        })
        updateDoc(events)
    }

    const updateEvent = (id, evento) => {
        let events = datos.map(event => {
            if (event.id === id) {
                return {
                    id: evento.id,
                    title: evento.titulo,
                    start: evento.start,
                    extendedProps: {
                        completed: evento.completed,
                        description: evento.descripcion
                    }
                }
            }
            return event;
        })
        updateDoc(events)
    }

    const addEvent = (evento) => {
        const nuevosEventos = [...datos, evento];
        updateDoc(nuevosEventos);
    }

    useEffect(() => {
        /* if (!loading)  */cargarDoc();
    }, [loading, datos])

    return { datos, deleteEvent, completeEvent, updateEvent, addEvent };
}