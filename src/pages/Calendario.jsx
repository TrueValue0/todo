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


function renderEventContent(eventInfo) {
    return (
        <>
            <b>{eventInfo.timeText}</b>
            <i>{eventInfo.event.title}</i>
        </>
    )
}


export default function Calendario() {

    const [idCalendar, setIdCalendar] = useState('');
    const { users } = useUsers();
    const { user } = useAuth();
    const { datos, updateEvent } = useTareaDoc({ uid: idCalendar });
    const [fechaActual, setFechaActual] = useState('');

    const { eventos, setEventos } = useEventos();

    useEffect(() => {
        // Actualiza el estado local cuando cambian los datos
        setEventos(datos);
    }, [datos]);

    const tablet = useMediaQuery('1024');

    const eventInital = {
        id: '',
        title: '',
        start: '',
        end: '',
        allDay: false,
        descripcion: '',
        extendedProps: {
            completed: false,
            description: '',
            tipo: '',
        }
    }

    const [evento, setEvento] = useState(eventInital);
    const [modalEdit, setModalEdit] = useState(false);
    const [modal, setModal] = useState(false);

    const handleEventClick = (clickInfo) => {

        let nuevoEvento = {
            id: clickInfo.event.id,
            title: clickInfo.event.title,
            startStr: clickInfo.event.startStr,
            endStr: clickInfo.event.endStr,
            allDay: clickInfo.event.allDay,
            extendedProps: {
                completed: clickInfo.event.extendedProps.completed,
                description: clickInfo.event.extendedProps.description,
                tipo: clickInfo.event.extendedProps.tipo,
            }
        }
        setEvento(nuevoEvento)
        setModalEdit(true)
    }

    const actualizar = () => {
        updateEvent(evento.id, evento);
    }

    const handleSelect = event => setIdCalendar(event.target.value);

    const ocultarFindes = () => tablet ? [0, 6] : [];

    return (
        <Layout>
            <div className='d-flex justify-content-center align-items-center w-100' style={{ marginTop: 80 }}>
                <div className='w-100 p-1 px-md-5'>
                    <LogoAlargado className='m-auto d-block' width='400px' />
                    {user.rol === 'admin' && <Paper className='d-inline-block p-3 my-3'>
                        <Form.Select onChange={handleSelect}>
                            <option value=''>Selecciona un agente</option>
                            {
                                users.map(user => (
                                    <option key={user.id} value={user.id}>{user.nombre}</option>
                                ))
                            }
                        </Form.Select>
                    </Paper>}
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
                        dayMaxEvents={true}
                        select={(informacion) => {
                            setFechaActual(informacion.startStr);
                            setModal(true)
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
                    cerrar={() => setModalEdit(false)}
                    seter={setEvento} guardar={actualizar}
                />
                <ModalAnyadirEvento ver={modal} cerrar={() => setModal(false)} uid={idCalendar} fechaActual={fechaActual} setFecha={setFechaActual} />
            </div>
        </Layout >
    )




}

