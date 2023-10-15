import Todo from '@/components/todos/Todo'
import { ListGroup } from 'react-bootstrap'
import { useTareaDoc } from '@/hooks/useTareaDoc'
import { useAuth } from '@/context/AuthProvider'

export default function Todos() {

    const { user } = useAuth();
    const { datos, deleteEvent, completeEvent, updateEvent } = useTareaDoc();

    return (
        <>
            {user ?
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
                </ListGroup> :
                <p>Loading....</p>
            }
        </>
    )
}