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
import ProtectedAdmin from '@/pages/ProtectedAdmin'
//import Usuarios from '@/pages/Usuarios'
import Informes from '@/pages/Informes'
import NoAuthorized from '@/pages/NoAuthorized';
import ResetPassword from '@/pages/ResetPassword';
import { EventosProvider } from '@/context/EventoProvider'
import Cambios from '@/pages/Cambios';
import Usuarios from '@/pages/Usuarios';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (<ProtectedRouteAuth><Calendario /></ProtectedRouteAuth>),
      errorElement: <Error />
    },
    /* {
      path: '/calendario',
      element: ()
    }, */
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
      element: (<ProtectedAdmin><Usuarios /></ProtectedAdmin>)
    },
    {
      path: '/informes',
      element: (<ProtectedAdmin><Informes /></ProtectedAdmin>),
    },
    {
      path: '/noAuthorized',
      element: <NoAuthorized />
    },
    {
      path: '/resetPassword',
      element: <ResetPassword />
    },
    {
      path: '/cambios',
      element: <Cambios />
    }
  ])

  return (
    <>
      <AuthProvider>
        <EventosProvider>
          <RouterProvider router={router} />
        </EventosProvider>
      </AuthProvider>
    </>
  )
}

export default App
