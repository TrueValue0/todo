import { cambiarTipoEvento } from '@/services/generarUUID'
import { tareas } from '@/config/firebaseapp'
import { doc, getDocs, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import SubirDocumentos from '@/components/SubirDocumentos';

export default function Cambios() {

    const [eventos, setEventos] = useState([])


    const cargar = async () => {
        const querySnapshot = await getDocs(tareas);

        let tareasData = [];
        let idCustom = 1;
        querySnapshot.forEach((doc) => {
            tareasData.push({ id: doc.id, documento: cambiarTipoEvento({ ...doc.data() }) });
            idCustom += 1
        });

        //setEventos(tareasData);
    }

    const handleCambiar = async () => {

        const resultado = eventos.map(async evento => {
            try {
                await setDoc(doc(tareas, evento.id), { ...evento.documento });
                console.log('Ha salido todo bien');
            } catch (e) {
                console.log(e);
            }
        })
    }
    console.log(eventos);

    useEffect(() => {
        cargar();
    }, [])

    return (
        <>
            <h1>CAMBIOS</h1>
            {/* <button onClick={handleCambiar}>Cambiar</button> */}
            <SubirDocumentos />
        </>
    )
}