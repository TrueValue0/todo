import Todo from '@/components/todos/Todo'
import { ListGroup } from 'react-bootstrap'
import { useTareaDoc } from '@/hooks/useTareaDoc'
import { useEffect } from 'react';
import { useEventos } from '@/context/EventoProvider'
export default function Todos() {
    const { datos, deleteEvent, completeEvent, updateEvent } = useTareaDoc();
    const { eventos, setEventos } = useEventos();

    useEffect(() => {
        // Actualiza el estado local cuando cambian los datos
        setEventos(datos);
    }, [datos]);


    return (
        <>
            {datos &&
                <ListGroup className='rounded-0'>
                    {eventos.map((evento, indice) => (
                        <Todo
                            key={indice}
                            evento={evento}
                            actualizar={updateEvent}
                            removeTodo={deleteEvent}
                            completeTodo={completeEvent}
                        />
                    ))}
                </ListGroup>
            }
        </>
    )
}