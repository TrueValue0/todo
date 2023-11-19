import Todo from '@/components/todos/Todo'
import { ListGroup } from 'react-bootstrap'
import { useTareaDoc } from '@/hooks/useTareaDoc';

export default function Todos({ lista, uid }) {

    const { datos, deleteEvent, completeEvent, updateEvent } = useTareaDoc({ uid: uid });

    return (
        <>
            {datos &&
                <ListGroup className='rounded-0'>
                    {lista.map((evento) => (
                        <Todo
                            key={evento.id}
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