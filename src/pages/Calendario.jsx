"use client"
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
                start: newEvent.info.startStr,
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
        console.log(clickInfo.event);
        let nuevoEvento = {
            titulo: clickInfo.event.title,
            descripcion: clickInfo.event.extendedProps.description,
            fecha: clickInfo.event.startStr,
            ver: true
        }
        const calendario = clickInfo.view.calendar;
        setEvento(calendario)
    }

    const handleEvents = (events) => {
        setState(prev => ({ ...prev, currentEvents: events }))
    }

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
                            right: 'dayGridMonth,timeGridDay'
                        }}
                        initialView={'timeGridDay'}
                        editable
                        selectable
                        selectMirror
                        weekends
                        dayMaxEvents={true}
                        select={(selectInfo) => setNewEvent(prev => ({ ...prev, ver: true, info: selectInfo }))}
                        eventContent={renderEventContent} // custom render function
                        eventClick={handleEventClick}
                        eventsSet={handleEvents} // called after events are initialized/added/changed/removed
                        locale={esLocale} // Traduccion a español
                    />
                </div>
                <ModalEditarEvento evento={evento} cerrar={cerrarEvento} />
                <ModalAnyadirEvento evento={newEvent} cerrar={cerrarNewEvento} seter={setNewEvent} guardar={handleDateSelect} />
            </div>
        </Layout>
    )




}

