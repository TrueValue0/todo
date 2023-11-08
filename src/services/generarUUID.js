export function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}
export function fechaConHora(objetoFecha) {
    const { fecha, horas } = objetoFecha;
    const zonaHoraria = new Date().toTimeString().split(' ')[1].replace('GMT', '');

    return `${fecha}T${horas}:00${zonaHoraria}`;

}

export function formatearFecha(fecha) {
    var partes = fecha.split("-");
    var fechaFormateada = partes[2] + "/" + partes[1] + "/" + partes[0];
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
