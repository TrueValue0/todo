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
      element: (<ProtectedRouteAuth><Calendario /></ProtectedRouteAuth>)
    },
    {
      path: '/tareas',
      element: (<ProtectedRouteAuth><Tareas /></ProtectedRouteAuth>)
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/user',
      element: (<ProtectedRouteAuth><User /></ProtectedRouteAuth>)
    },
    {
      path: '/usuarios',
      element: (<ProtectedRouteAuth><Usuarios /></ProtectedRouteAuth>)
    },
    {
      path: '/informes',
      element: (<ProtectedRouteAuth><Informes /></ProtectedRouteAuth>),
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
