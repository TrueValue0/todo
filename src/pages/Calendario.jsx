import React, { useEffect, useState } from 'react'
import Layout from '@/components/layouts/Layout'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import esLocale from '@fullcalendar/core/locales/es'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import bootstrap5Plugin from '@fullcalendar/bootstrap5'
import ModalAnyadirEvento from '@/components/modal/ModalAnyadirEvento'
import ModalEditarEvento from '@/components/modal/ModalEditarEvento'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useTareaDoc } from '@/hooks/useTareaDoc'
import LogoAlargado from '@/assets/logoAlargado.jsx'
import { useUsers } from '@/hooks/useUser'
import { Paper } from '@mui/material'
import Form from 'react-bootstrap/Form'
import { useAuth } from '@/context/AuthProvider'
import { useEventos } from '@/context/EventoProvider'
import { getAllEvents } from '@/services/data'
import Leyenda from '@/components/Leyenda'
import './calendario.css'


function renderEventContent(eventInfo) {
    return (
        <>
            <i>{eventInfo.event.title} - {eventInfo.event.extendedProps.empresa}</i>
        </>
    )
}

function renderEventAdmin(eventInfo) {
    return (<i>{eventInfo.event.extendedProps.usuario} - {eventInfo.event.title} - {eventInfo.event.extendedProps.empresa}</i>)
}


export default function Calendario() {

    const { eventos, setEventos, idCustom, setIdCustom, allCalendars, setAllCalendars } = useEventos();
    const { users } = useUsers();
    const { user } = useAuth();
    const { actualizarDoc, deleteEvent, actualizarAdmin, eliminarAdmin, cargarDoc } = useTareaDoc({ uid: idCustom });
    const [allEvents, setAllEvents] = useState([]);
    const [fechaActual, setFechaActual] = useState('');

    const cargarDatos = async () => {
        let fusion = await getAllEvents();
        fusion = fusion.map(value => value.tareas.map(evnt => ({
            ...evnt,
            extendedProps: { ...evnt.extendedProps, usuario: value.usuario, idDoc: value.uid },
            backgroundColor: (evnt.extendedProps.visita === 'Comercial') ? '#008f39' : (evnt.extendedProps.visita === 'Bodega') ? '#3788d8d9' : (evnt.extendedProps.visita === 'Cata') ? '#cb3234' : '#008f39',
        }))).flatMap(value => value);
        if (allCalendars) {
            setAllEvents(fusion);
        }
    }

    useEffect(() => {
        cargarDatos();
    }, [allCalendars])

    const tablet = useMediaQuery('1024');

    const eventInital = {
        id: '',
        title: '',
        startStr: '',
        end: '',
        allDay: true,
        extendedProps: {
            objetivo: '',
            completed: false,
            empresa: '',
            conclusiones: '',
            planificacion: [],
            visita: '',
            isAdmin: Boolean(user.rol === 'admin'),
            idDoc: '',
        }
    }

    const [evento, setEvento] = useState(eventInital);
    const [modalEdit, setModalEdit] = useState(false);
    const [modal, setModal] = useState(false);

    const handleEventClick = (clickInfo) => {
        let nuevoEvento = {
            id: clickInfo.event.id,
            title: clickInfo.event.title,
            start: clickInfo.event.startStr,
            end: clickInfo.event.end ?? clickInfo.event.startStr,
            allDay: clickInfo.event.allDay,
            extendedProps: {
                objetivo: clickInfo.event.extendedProps.objetivo,
                completed: clickInfo.event.extendedProps.completed,
                empresa: clickInfo.event.extendedProps.empresa,
                conclusiones: clickInfo.event.extendedProps.conclusiones,
                planificacion: clickInfo.event.extendedProps.planificacion,
                visita: clickInfo.event.extendedProps.visita,
                isAdmin: clickInfo.event.extendedProps.isAdmin,
                idDoc: clickInfo.event.extendedProps.idDoc,
            }
        }
        //clickInfo.event.extendedProps.uid  <-- Aqui esta el id del documento.
        setEvento(nuevoEvento);
        setModalEdit(true);
    }

    const eliminarTarea = async (id) => {
        if (user.id === idCustom && user.rol === 'admin') {
            await eliminarAdmin(evento.extendedProps.idDoc, id)
            await cargarDatos();
        } else {
            deleteEvent(id)
        }
    }

    const actualizar = async () => {
        if (user.id === idCustom && user.rol === 'admin') {
            await actualizarAdmin(evento.extendedProps.idDoc, evento, evento.id);
            await cargarDatos();
        } else {
            let events = eventos.map(event => {
                if (event.id === evento.id) {
                    return {
                        id: evento.id,
                        title: evento.title,
                        start: evento.start,
                        end: evento.end,
                        allDay: evento.allDay,
                        extendedProps: {
                            objetivo: evento.extendedProps.objetivo,
                            completed: evento.extendedProps.completed,
                            empresa: evento.extendedProps.empresa,
                            conclusiones: evento.extendedProps.conclusiones,
                            planificacion: evento.extendedProps.planificacion,
                            visita: evento.extendedProps.visita,
                            isAdmin: evento.extendedProps.isAdmin,
                            idDoc: evento.extendedProps.idDoc,
                        }
                    }
                }
                return event;
            })
            setEventos(events);
            actualizarDoc(events);
        }
    }

    const handleSelect = event => {
        setAllCalendars(false);
        setIdCustom(event.target.value)
        if (user.id === event.target.value && user.rol === 'admin') {
            setAllCalendars(true);
        }
    }

    const ocultarFindes = () => tablet ? [0, 6] : [];

    const currentComercial = users.find(user => user.id === idCustom);


    const handleEvents = async () => {
        await cargarDoc();
        await cargarDatos();
    }

    return (
        <Layout>
            <div className='d-flex justify-content-center align-items-center w-100' style={{ marginTop: 80 }}>
                <div className='w-100 p-1 px-md-5'>
                    <LogoAlargado className='m-auto d-block' width='400px' />
                    <div className='d-flex gap-5 align-items-center'>
                        {user.rol === 'admin' && <>
                            <Paper className='d-inline-block p-3 my-3'>
                                <Form.Select onChange={handleSelect}
                                    value={idCustom}
                                >
                                    {users.map(user => {
                                        if (user.nombre !== 'PRUEBA') return (<option key={user.id} value={user.id}>{user.nombre}</option>)
                                    })}
                                </Form.Select>
                            </Paper>
                            <Form.Check
                                disabled={idCustom !== user.id}
                                onChange={e => setAllCalendars(e.target.checked)}
                                checked={allCalendars}
                                type="switch"
                                label="Combinar calendarios"
                            />
                        </>
                        }
                        <Leyenda />
                    </div>
                    <FullCalendar
                        events={allCalendars ? allEvents : eventos}
                        selectLongPressDelay={1}
                        themeSystem='bootstrap5'
                        expandRows
                        height='550px'
                        aspectRatio={0.8}
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, bootstrap5Plugin]}
                        headerToolbar={{
                            left: 'prev,next',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek,timeGridDay'
                        }}
                        slotDuration='00:15:00' //Intervalos de cada 15min
                        initialView={'dayGridMonth'}
                        slotMinTime='08:00:00' // Hora de inicio
                        slotMaxTime='20:00:00' // Hora de fin
                        hiddenDays={ocultarFindes()} // Oculta domingo (0) y sábado (6)
                        selectable
                        selectMirror
                        dayMaxEvents={false}
                        select={(informacion) => {
                            /*  if (informacion.view.type === 'dayGridMonth') informacion.view.calendar.changeView('timeGridDay', informacion.startStr); */
                            setFechaActual(informacion.startStr);
                            setModal(true);
                        }} //Funcion al crear un envento.
                        /* views={{
                            day: {
                                select: (daySelect) => {
                                    setFechaActual(daySelect.start.toISOString().split('T')[0]);
                                    setModal(true);
                                },
                            }
                        }} */
                        eventContent={allCalendars ? renderEventAdmin : renderEventContent} // custom render function
                        eventClick={handleEventClick} // Funcion que se ejecuta al editar los eventos
                        eventsSet={handleEvents} // called after events are initialized/added/changed/removed
                        locale={esLocale} // Traduccion a español
                    />
                </div>
                <ModalEditarEvento
                    reset={() => setEvento(eventInital)}
                    ver={modalEdit}
                    evento={evento}
                    removeTodo={eliminarTarea}
                    cerrar={() => setModalEdit(false)}
                    seter={setEvento} guardar={actualizar}
                />
                <ModalAnyadirEvento
                    ver={modal}
                    cerrar={() => setModal(false)}
                    fechaActual={fechaActual}
                    setFecha={setFechaActual}
                />
            </div>
        </Layout >
    )




}

