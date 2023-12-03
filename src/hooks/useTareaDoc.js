import { useEffect, useState } from "react";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { tareas } from "@/config/firebaseapp";
import { useAuth } from "@/context/AuthProvider";
import { useEventos } from "@/context/EventoProvider";
import { useAlertContext } from "@/context/AlertProvider";

export function useTareaDoc({ uid = '' } = {}) {
    const { user } = useAuth();
    const id = uid === '' ? user.id : uid;
    const [datos, setDatos] = useState([]);
    const { eventos, setEventos } = useEventos();
    const { confirmacion, error, informativo } = useAlertContext();

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
                });
                setDatos(events);
            } else {
                error('Error al cargar los datos')
            }
        } catch (e) {
            error('Error al cargar los datos')
        }
    }

    const actualizarAdmin = async (idDoc, evento, id) => {
        try {
            const documentoSF = doc(tareas, idDoc);
            const documento = await getDoc(documentoSF);
            if (documento.exists()) {
                let docFinal = documento.data().tareas;
                const events = docFinal.map(value => {
                    let color = '#008f39';
                    if (value.extendedProps.visita === 'Comercial') color = '#008f39'
                    else if (value.extendedProps.visita === 'Cata') color = '#cb3234'
                    else if (value.extendedProps.visita === 'Bodega') color = '#0000ff'
                    return { ...value, backgroundColor: color }
                });

                const adminEvents = events.map(event => {
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
                                idDoc: evento.extendedProps.idDoc,
                            }
                        }
                    }
                    return event;
                })
                await updateDoc(documentoSF, {
                    tareas: adminEvents,
                })
                confirmacion('Evento actualizado');
            } else {
                error('Error al actualizar el evento')
            }
        } catch (e) {
            error('Error al actualizar el evento');
        }
    }

    const eliminarAdmin = async (idDoc, id) => {
        try {
            const documentoSF = doc(tareas, idDoc);
            const documento = await getDoc(documentoSF);
            if (documento.exists()) {
                let docFinal = documento.data().tareas;
                const events = docFinal.map(value => {
                    let color = '#008f39';
                    if (value.extendedProps.visita === 'Comercial') color = '#008f39'
                    else if (value.extendedProps.visita === 'Bodega') color = '#0000ff'
                    else if (value.extendedProps.visita === 'Cata') color = '#cb3234'
                    return { ...value, backgroundColor: color }
                });
                const adminEvents = events.filter(event => event.id !== id);

                await updateDoc(documentoSF, {
                    tareas: adminEvents,
                })
                confirmacion('Evento eliminado');
            } else {
                error('Error al eliminar el evento')
            }
        } catch (e) {
            error('Error al eliminar el evento');
        }
    }

    const completedAdmin = async ({ idDoc, id, completado }) => {
        try {
            const documentoSF = doc(tareas, idDoc);
            const documento = await getDoc(documentoSF);
            if (documento.exists()) {
                let docFinal = documento.data().tareas;
                const events = docFinal.map(value => {
                    let color = '#008f39';
                    if (value.extendedProps.visita === 'Comercial') color = '#008f39'
                    else if (value.extendedProps.visita === 'Bodega') color = '#0000ff'
                    else if (value.extendedProps.visita === 'Cata') color = '#cb3234'
                    return { ...value, backgroundColor: color }
                });
                const adminEvents = events.map(event => {
                    if (event.id === id)
                        return { ...event, extendedProps: { ...event.extendedProps, completed: completado } }
                    return event;
                })

                await updateDoc(documentoSF, {
                    tareas: adminEvents,
                })
                informativo('Evento completado')
            } else {
                error('Error al completar el evento');
            }
        } catch (e) {
            error('Error al completar el evento');
        }
    }

    const actualizarDoc = async (eventos) => {
        try {
            const documentoSF = doc(tareas, id);
            await updateDoc(documentoSF, {
                tareas: eventos,
            })
        } catch (e) {
            error('Error al actualizar las tareas');
        }
    }

    const deleteEvent = (id) => {
        const events = eventos.filter(event => event.id !== id);
        setEventos(events);
        actualizarDoc(events);
        confirmacion('Evento eliminado')
    }

    const completeEvent = (id, completado) => {
        const events = eventos.map(event => {
            if (event.id === id)
                return { ...event, extendedProps: { ...event.extendedProps, completed: completado } }
            return event;
        })
        setEventos(events);
        actualizarDoc(events)
        informativo('Evento completado')
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
                        idDoc: evento.extendedProps.idDoc,
                    }
                }
            }
            return event;
        })
        setEventos(events);
        actualizarDoc(events)
        confirmacion('Evento actualizado')
    }

    const addEvent = (evento) => {
        const nuevosEventos = [...datos, evento];
        setEventos(nuevosEventos);
        actualizarDoc(nuevosEventos);
        confirmacion('Evento añadido')
    }

    useEffect(() => {
        setEventos(datos)
    }, [datos])

    console.log(datos);

    useEffect(() => {
        cargarDoc();
    }, [uid]);

    return { datos, deleteEvent, completeEvent, updateEvent, addEvent, actualizarDoc, cargarDoc, actualizarAdmin, eliminarAdmin, completedAdmin };
}