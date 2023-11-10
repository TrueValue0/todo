import { BiHomeAlt, BiSolidHome, BiCalendar, BiBell, BiTask, BiSolidBarChartAlt2, BiUser } from 'react-icons/bi';
import { useAuth } from '@/context/AuthProvider';


export function useMenu() {

    const { user } = useAuth();

    let navLista = [
        {
            path: '/',
            Icon: BiHomeAlt,
            label: 'Calendario',
        },
        {
            path: '/tareas',
            Icon: BiTask,
            label: 'Tareas'
        }
    ]

    let navBottom = [
        {
            path: '/tareas',
            Icon: BiTask,
            label: 'Tareas'
        },
        {
            path: '/',
            Icon: BiSolidHome,
            label: 'Calendario',
        },
        {
            path: '/user',
            Icon: BiUser,
            label: 'Usuario',
        },
    ]

    if (user.rol === 'admin') {
        let informes = {
            path: '/informes',
            Icon: BiSolidBarChartAlt2,
            label: 'Informes',
        }
        navLista = [...navLista, informes]
        navBottom = [...navBottom, informes]
    }
    return { navLista, navBottom };
}



