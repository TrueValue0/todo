import Todo from '@/components/todos/Todo'
import { ListGroup } from 'react-bootstrap'
import { useTareaDoc } from '@/hooks/useTareaDoc'
import { useEffect } from 'react';
import { useEventos } from '@/context/EventoProvider'
export default function Todos({ uid }) {
    const { datos, updateDoc } = useTareaDoc({ uid });
    const { eventos, setEventos } = useEventos();

    useEffect(() => {
        // Actualiza el estado local cuando cambian los datos
        setEventos(datos);
    }, [datos]);

    const updateBoth = (id, evento) => {
        let events = eventos.map(event => {
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
                    }
                }
            }
            return event;
        })
        setEventos(events);
        updateDoc(events);
    }

    const deleteBoth = (id) => {
        const events = eventos.filter(event => event.id !== id);
        setEventos(events);
        updateDoc(events);
    }

    const completeBoth = (id, completado) => {
        let events = datos.map(event => {
            if (event.id === id)
                return { ...event, extendedProps: { ...event.extendedProps, completed: completado } }
            return event;
        })
        setEventos(events);
        updateDoc(events);
    }

    return (
        <>
            {datos &&
                <ListGroup className='rounded-0'>
                    {eventos.map((evento) => (
                        <Todo
                            key={evento.id}
                            evento={evento}
                            actualizar={updateBoth}
                            removeTodo={deleteBoth}
                            completeTodo={completeBoth}
                        />
                    ))}
                </ListGroup>
            }
        </>
    )
}