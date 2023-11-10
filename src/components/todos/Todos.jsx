import Todo from '@/components/todos/Todo'
import { ListGroup } from 'react-bootstrap'
import { useTareaDoc } from '@/hooks/useTareaDoc'
import { useEffect } from 'react';

export default function Todos() {
    const { datos, deleteEvent, completeEvent, updateEvent } = useTareaDoc();

    console.log(datos);

    useEffect(() => {
    }, [datos])

    return (
        <>
            {datos &&
                <ListGroup className='rounded-0'>
                    {datos.map((evento, indice) => (
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