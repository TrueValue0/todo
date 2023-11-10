import { useEffect, useState } from "react";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { tareas } from "@/config/firebaseapp";
import { useAuth } from "@/context/AuthProvider";

export function useTareaDoc() {
    const { user } = useAuth();
    const id = user.id;
    const [datos, setDatos] = useState([]);

    const cargarDoc = async () => {
        //if (user) {
        try {
            const documentoSF = doc(tareas, id);
            const documento = await getDoc(documentoSF);
            if (documento.exists()) {
                const docFinal = documento.data().tareas;
                console.log(documento.data());
                setDatos(docFinal);
            } else {
                console.log("El documento no existe en Firestore");
            }
        } catch (e) {
            console.log(e);
        }
        // }
    }

    const updateDoc = async (eventos) => {
        try {
            const documentoSF = doc(tareas, id);
            setDatos(eventos);
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
                    title: evento.titulo,
                    start: evento.start,
                    extendedProps: {
                        completed: evento.completed,
                        description: evento.descripcion,
                        tipo: evento.tipo,
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
        cargarDoc();
    }, []);

    return { datos, deleteEvent, completeEvent, updateEvent, addEvent };
}