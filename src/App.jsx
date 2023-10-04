import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Home from '@/pages/Home'
import Error from '@/pages/Error'
import AuthProvider from '@/context/AuthProvider'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Calendario from '@/pages/Calendario'
import Tareas from '@/pages/Tareas'
import Login from '@/pages/Login'
import User from '@/pages/User'
import ProtectedRouteAuth from '@/pages/ProtectedRouteAuth'
import Usuarios from '@/pages/Usuarios'
import Informes from '@/pages/Informes'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (<ProtectedRouteAuth><Home /></ProtectedRouteAuth>),
      errorElement: <Error />
    },
    {
      path: '/calendario',
      element: <Calendario />
    },
    {
      path: '/tareas',
      element: <Tareas />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/user',
      element: <User />
    },
    {
      path: '/usuarios',
      element: <Usuarios />
    },
    {
      path: '/informes',
      element: <Informes />,
    }
  ])

  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  )
}

export default App
