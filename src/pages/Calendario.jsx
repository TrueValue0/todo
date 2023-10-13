import React, { useState } from 'react'
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
import './calendario.css'


function renderEventContent(eventInfo) {
    return (
        <>
            <b>{eventInfo.timeText}</b>
            <i>{eventInfo.event.title}</i>
        </>
    )
}


export default function Calendario() {

    const { datos, deleteEvent, completeEvent, updateEvent, addEvent } = useTareaDoc();

    const [state, setState] = useState({
        currentEvents: []
    });
    const eventInital = {
        ver: false,
        titulo: "",
        fecha: "",
        descripcion: "",
    }
    const eventInitalCalendar = {
        ver: false,
        titulo: "",
        fecha: "",
        descripcion: "",
        info: null
    }
    const [evento, setEvento] = useState(eventInital)
    const cerrarEvento = () => setEvento(eventInital);
    const [newEvent, setNewEvent] = useState(eventInitalCalendar);
    const cerrarNewEvento = () => setNewEvent(eventInitalCalendar);


    const handleDateSelect = () => {
        let calendarApi = newEvent.info.view.calendar;

        calendarApi.unselect() // clear date selection

        if (newEvent.info && newEvent.titulo !== "") {
            let evento = {
                id: crypto.randomUUID(),
                title: newEvent.titulo,
                start: newEvent.fecha,
                end: newEvent.info.endStr,
                allDay: newEvent.info.allDay,
                extendedProps: {
                    description: newEvent.descripcion
                }
            }
            calendarApi.addEvent(evento)
            addEvent(evento);
            setNewEvent(eventInitalCalendar)
        } else {
            setNewEvent(eventInitalCalendar)
        }
    }

    const handleEventClick = (clickInfo) => {
        let nuevoEvento = {
            titulo: clickInfo.event.title,
            descripcion: clickInfo.event.extendedProps.description,
            fecha: clickInfo.event.startStr,
            ver: true
        }
        const calendario = clickInfo.view.calendar;
        setEvento(nuevoEvento)
    }

    const handleEvents = (events) => {
        setState(prev => ({ ...prev, currentEvents: events }))
    }

    console.log('aiua', datos);

    return (
        <Layout>
            <div className='d-flex justify-content-center align-items-center w-100' style={{ marginTop: 70 }}>
                <div className='w-100 p-1 p-md-5'>
                    <FullCalendar
                        events={datos}
                        selectLongPressDelay={1}
                        themeSystem='bootstrap5'
                        expandRows
                        height='450px'
                        aspectRatio={0.8}
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, bootstrap5Plugin]}
                        headerToolbar={{
                            left: 'prev,next',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek,timeGridDay'
                        }}
                        slotDuration='00:15:00' //Intervalos de cada 15min
                        initialView={'timeGridWeek'}
                        slotMinTime='08:00:00' // Hora de inicio
                        slotMaxTime='20:00:00' // Hora de fin
                        hiddenDays={[0, 6]} // Oculta domingo (0) y sábado (6)
                        editable
                        selectable
                        selectMirror
                        dayMaxEvents={true}
                        select={(selectInfo) => setNewEvent(prev => ({ ...prev, ver: true, info: selectInfo, fecha: selectInfo.startStr }))} //Funcion al crear un envento.
                        eventContent={renderEventContent} // custom render function
                        eventClick={handleEventClick} // Funcion que se ejecuta al editar los eventos
                        //eventsSet={handleEvents} // called after events are initialized/added/changed/removed
                        locale={esLocale} // Traduccion a español
                    />
                </div>
                {evento.ver && <ModalEditarEvento evento={evento} cerrar={cerrarEvento} />}
                {newEvent.ver && <ModalAnyadirEvento evento={newEvent} cerrar={cerrarNewEvento} seter={setNewEvent} guardar={handleDateSelect} />}
            </div>
        </Layout>
    )




}

