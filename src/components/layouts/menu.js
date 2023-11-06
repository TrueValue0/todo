import { BiHomeAlt, BiSolidHome, BiCalendar, BiBell, BiTask, BiSolidBarChartAlt2, BiUser } from 'react-icons/bi';
import { HiUserGroup } from "react-icons/hi2";
export const navLista = [
    {
        path: '/',
        Icon: BiHomeAlt,
        label: 'Principal',
    },
    {
        path: '/calendario',
        Icon: BiCalendar,
        label: 'Calendario',
    },
    {
        path: '/informes',
        Icon: BiSolidBarChartAlt2,
        label: 'Informes',
    },
    {
        path: '/tareas',
        Icon: BiTask,
        label: 'Tareas'
    },
    /*     {
            path: '/usuarios',
            Icon: HiUserGroup,
            label: 'Usuarios',
        } */
]

export const navBottom = [
    {
        path: '/calendario',
        Icon: BiCalendar,
        label: 'Calendario',
    },
    {
        path: '/tareas',
        Icon: BiTask,
        label: 'Tareas'
    },
    {
        path: '/',
        Icon: BiSolidHome,
        label: 'Principal',
    },
    {
        path: '/informes',
        Icon: BiSolidBarChartAlt2,
        label: 'Informes',
    },
    {
        path: '/user',
        Icon: BiUser,
        label: 'Usuario',
    },

]