import { createContext, useContext, useState } from 'react';

const AlertContext = createContext();

export function useAlertContext() {
    return useContext(AlertContext);
}

export function AlertProvider({ children }) {

    const ALERT_TYPE = {
        PRIMARIO: 'primary',
        SECUNDARIO: 'secondary',
        CONFIRMACION: 'success',
        ERROR: 'danger',
        ALERTA: 'warning',
        INFO: 'info',
        CLARO: 'light',
        OSCURO: 'dark',
    }

    const initialAlert = {
        show: false,
        message: '',
        variant: ALERT_TYPE.PRIMARIO,
    }

    const [alert, setAlert] = useState(initialAlert)

    const ocultar = () => setTimeout(() => setAlert(initialAlert), 2000)

    const confirmacion = (message) => {
        setAlert({
            show: true,
            message,
            variant: ALERT_TYPE.CONFIRMACION
        })
        ocultar();
    }

    const error = (message) => {
        setAlert({
            show: true,
            message,
            variant: ALERT_TYPE.ERROR
        })
        ocultar();
    }

    const alerta = (message) => {
        setAlert({
            show: true,
            message,
            variant: ALERT_TYPE.ALERTA
        })
        ocultar();
    }

    const informativo = (message) => {
        setAlert({
            show: true,
            message,
            variant: ALERT_TYPE.INFO
        })
        ocultar();
    }

    return (
        <AlertContext.Provider value={{ alert, confirmacion, error, alerta, informativo }} >
            {children}
        </AlertContext.Provider>
    )
}
