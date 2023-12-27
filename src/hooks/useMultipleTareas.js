import { tareas } from "@/config/firebaseapp";
import { useEventos } from "@/context/EventoProvider";
import { useAlertContext } from "@/context/AlertProvider";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export function useMultipleTareas() {

    const { ids } = useEventos();
    const { confirmacion, error } = useAlertContext()

    const addEventsMultiple = (evento) => {
        ids.map(async (value) => {
            try {
                const event = { ...evento, extendedProps: { ...evento.extendedProps, idDoc: value } };
                const documentRef = doc(tareas, value);
                const documento = await getDoc(documentRef);
                if (documento.exists()) {
                    const eventos = documento.data().tareas;
                    const usuario = documento.data().usuario;
                    const nuevosEventos = [...eventos, event];
                    await updateDoc(documentRef, {
                        tareas: nuevosEventos
                    })
                    confirmacion(`Evento añadido a ${usuario}`);
                } else {
                    error("Error al añadir el evento");
                }
            } catch (e) {
                error("Error al añadir el evento");
            }
        })

    }
    return { addEventsMultiple };

}