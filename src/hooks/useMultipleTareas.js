import { tareas } from "@/config/firebaseapp";
import { useEventos } from "@/context/EventoProvider";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export function useMultipleTareas() {

    const { ids } = useEventos();

    const addEventsMultiple = (evento) => {
        ids.map(async (value) => {
            try {
                const documentRef = doc(tareas, value);
                const documento = await getDoc(documentRef);
                if (documento.exists()) {
                    const eventos = documento.data().tareas;
                    const usuario = documento.data().usuario;
                    const nuevosEventos = [...eventos, evento];
                    await updateDoc(documentRef, {
                        tareas: nuevosEventos
                    })
                    console.log(`Evento añadido a ${usuario}`);
                } else {
                    console.log("El documento no existe en Firestore");
                }
            } catch (e) {
                console.log(e);
            }
        })

    }
    return { addEventsMultiple };

}