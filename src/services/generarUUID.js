import { v4 as uuidv4, } from 'uuid';
export function generateUUID() {
    const uuid = uuidv4();
    const partes = uuid.split('-');

    // Formatear la salida
    const salida = `${partes[0]}-${partes[1]}-${partes[2]}-${partes[3]}-${partes[4]}`;

    return salida;
}
export function fechaConHora(objetoFecha) {
    const { fecha, horas } = objetoFecha;
    const zonaHoraria = new Date().toTimeString().split(' ')[1].replace('GMT', '');

    return `${fecha}T${horas}:00${zonaHoraria}`;

}

export function formatearFecha(fecha) {
    fecha = fecha.slice(0, 10);
    let partes = fecha.split("-");
    let fechaFormateada = partes[2] + "/" + partes[1] + "/" + partes[0];
    return fechaFormateada;
}

const letraRandom = (cadena) => cadena[Math.floor(Math.random() * cadena.length)];

export function generarPassword(options) {
    const { longitud, numeros, especiales } = options;
    let password = '';
    const caracteres = {
        minusculas: 'abcdefghijklmnopqrstuvwxyz',
        mayusculas: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        numeros: '0123456789',
        especiales: '!@#$%&()_+{}[]<>?'
    };

    let tiposDisponibles = ['minusculas', 'mayusculas'];

    if (numeros) tiposDisponibles.push('numeros');
    if (especiales) tiposDisponibles.push('especiales');

    for (let i = 0; i < longitud; i++) {
        const tipoAleatorio = letraRandom(tiposDisponibles);
        const conjuntoCaracteres = caracteres[tipoAleatorio];
        password += letraRandom(conjuntoCaracteres);
    }

    return password;
}





export function cambiarTipoEvento(objeto) {
    return {
        usuario: objeto.usuario,
        tareas: objeto.tareas.map(evento => {
            return {
                id: evento.id ?? uuidv4(),
                title: evento.title, // Cambiar el nombre de 'title' a 'asunto'
                start: evento.start,
                end: evento.end = evento.start ? evento.start : '',
                allDay: evento.allDay,
                extendedProps: {
                    objetivo: evento.extendedProps.description ?? '', // Cambiar el nombre de 'description' a 'objetivo'
                    completed: evento.extendedProps.completed,
                    visita: evento.extendedProps.visita ?? 'Comercial', // Cambiar el nombre de 'tipo' a 'empresas'
                    empresa: evento.extendedProps.empresa ?? '',
                    conclusiones: evento.extendedProps.conclusiones ?? '', // Agregar un campo 'conclusiones'
                    planificacion: evento.extendedProps.planificacion ?? [],
                    isAdmin: false,
                }
            }
        })
    }

}