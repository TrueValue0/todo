import Todo from '@/components/todos/Todo'
import { ListGroup } from 'react-bootstrap'
import { useTareaDoc } from '@/hooks/useTareaDoc';
import { useAuth } from '@/context/AuthProvider';
import { useEventos } from '@/context/EventoProvider';

export default function Todos({ lista, uid, calendarActivos, cargarDatos }) {

    const { datos, deleteEvent, completeEvent, updateEvent, actualizarAdmin, completedAdmin, eliminarAdmin } = useTareaDoc({ uid: uid });
    const { idCustom } = useEventos();
    const { user } = useAuth();

    const eliminarTarea = async (id, evento) => {
        if (user.id === idCustom && user.rol === 'admin' && calendarActivos) {
            await eliminarAdmin(evento.extendedProps.idDoc, id)
            await cargarDatos();
        } else {
            deleteEvent(id)
        }
    }

    const actualizar = async (id, evento) => {
        if (user.id === idCustom && user.rol === 'admin' && calendarActivos) {
            await actualizarAdmin(evento.extendedProps.idDoc, evento, id);
            await cargarDatos();
        } else {
            updateEvent(id, evento);
        }
    }

    const complete = async (id, completado, idDoc) => {
        if (user.id === idCustom && user.rol === 'admin' && calendarActivos) {
            await completedAdmin({ idDoc, id, completado })
            await cargarDatos();
        } else {
            await completeEvent(id, completado);
        }
    }


    return (
        <>
            {datos &&
                <ListGroup className='rounded-0'>
                    {lista.map((evento) => {
                        return (
                            <Todo
                                key={evento.id}
                                evento={evento}
                                actualizar={actualizar}
                                removeTodo={eliminarTarea}
                                completeTodo={complete}
                            />
                        )
                    })}
                </ListGroup>
            }
        </>
    )
}