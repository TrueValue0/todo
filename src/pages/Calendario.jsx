import React, { useEffect, useState } from 'react'
import Layout from '@/components/layouts/Layout'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import esLocale from '@fullcalendar/core/locales/es'
import interactionPlugin from '@fullcalendar/interaction'
import bootstrap5Plugin from '@fullcalendar/bootstrap5'
import ModalAnyadirEvento from '@/components/modal/ModalAnyadirEvento'
import ModalEditarEvento from '@/components/modal/ModalEditarEvento'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useTareaDoc } from '@/hooks/useTareaDoc'
import LogoAlargado from '@/assets/logoAlargado.jsx'
import './calendario.css'
import { useUsers } from '@/hooks/useUser'
import { Paper } from '@mui/material'
import Form from 'react-bootstrap/Form'
import { useAuth } from '@/context/AuthProvider'
import { useEventos } from '@/context/EventoProvider'
import { getAllEvents } from '@/services/data'
import Leyenda from '@/components/Leyenda'


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

    const { eventos, setEventos, idCustom, setIdCustom } = useEventos();
    const { users } = useUsers();
    const { user } = useAuth();
    const { datos, actualizarDoc, deleteEvent } = useTareaDoc({ uid: idCustom });
    //const [allCalendars, setAllCalendars] = useState(false);
    const [fechaActual, setFechaActual] = useState('');


    /*     const cargarDatos = async () => {
            let fusion = await getAllEvents();
            fusion = fusion.map(value => value.tareas.map(evnt => ({ ...evnt, extendedProps: { ...evnt.extendedProps, usuario: value.usuario, uid: value.uid } }))).flatMap(value => value);
            if (allCalendars) {
                setEventos(prev => fusion)
            }
            else setEventos(datos)
        }
    
        useEffect(() => {
            cargarDatos();
        }, [allCalendars]) */

    useEffect(() => {
        setEventos(datos)
    }, [datos]);



    console.log(eventos);

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
            isAdmin: user.rol === 'admin',
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
            }
        }
        /* setIdCustom(clickInfo.event.extendedProps.uid) */ //TODO: arreglar la fusion de los calendarios
        setEvento(nuevoEvento)
        setModalEdit(true)
    }

    const actualizar = () => {
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
                    }
                }
            }
            return event;
        })
        setEventos(events);
        actualizarDoc(events);
    }

    const handleSelect = event => setIdCustom(event.target.value);

    const ocultarFindes = () => tablet ? [0, 6] : [];

    const currentComercial = users.find(user => user.id === idCustom);

    return (
        <Layout>
            <div className='d-flex justify-content-center align-items-center w-100' style={{ marginTop: 80 }}>
                <div className='w-100 p-1 px-md-5'>
                    <LogoAlargado className='m-auto d-block' width='400px' />
                    <div className='d-flex gap-5 align-items-center'>
                        {user.rol === 'admin' && <>
                            <Paper className='d-inline-block p-3 my-3'>
                                <Form.Select onChange={handleSelect} value={currentComercial ? currentComercial.id : user.id}>
                                    <option value=''>Selecciona un agente</option>
                                    {users.map(user => {
                                        if (user.nombre !== 'PRUEBA') return (<option key={user.id} value={user.id}>{user.nombre}</option>)
                                    })
                                    }
                                </Form.Select>
                            </Paper>
                            {/*  <Form.Check
                                onChange={e => setAllCalendars(e.target.checked)}
                                checked={allCalendars}
                                type="switch"
                                label="Combinar calendarios"
                            /> */}
                        </>
                        }
                        <Leyenda />
                    </div>
                    <FullCalendar
                        events={eventos}
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
                        editable
                        selectable
                        selectMirror
                        dayMaxEvents={false}
                        select={(informacion) => {
                            setFechaActual(informacion.startStr);
                            setModal(true);
                        }} //Funcion al crear un envento.
                        eventContent={renderEventContent} // custom render function
                        eventClick={handleEventClick} // Funcion que se ejecuta al editar los eventos
                        //eventsSet={handleEvents} // called after events are initialized/added/changed/removed
                        locale={esLocale} // Traduccion a español
                    />
                </div>
                <ModalEditarEvento
                    reset={() => setEvento(eventInital)}
                    ver={modalEdit}
                    evento={evento}
                    removeTodo={deleteEvent}
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

