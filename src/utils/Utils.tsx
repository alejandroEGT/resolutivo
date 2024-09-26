export const formatearFecha = (fechaISO) => {
    const fecha = new Date(fechaISO);

    // Obtener el día, mes y año
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Los meses empiezan en 0
    const año = fecha.getFullYear();

    // Obtener las horas y minutos
    let horas = fecha.getHours();
    const minutos = fecha.getMinutes().toString().padStart(2, '0');
    
    // Determinar AM o PM
    const ampm = horas >= 12 ? 'PM' : 'AM';
    horas = horas % 12 || 12; // Convertir formato 24h a 12h, si es 0 que sea 12
    
    // Formatear las horas y minutos
    const horaFormateada = horas.toString().padStart(2, '0') + ':' + minutos;

    return `${dia}/${mes}/${año} ${horaFormateada} ${ampm}`;
}

export const formatearFecha2 = (fechaISO) => {
    const fecha = new Date(fechaISO);

    // Obtener el día, mes y año
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Los meses empiezan en 0
    const año = fecha.getFullYear();

    // Obtener las horas y minutos
    let horas = fecha.getHours();
    const minutos = fecha.getMinutes().toString().padStart(2, '0');
    
    // Determinar AM o PM
    const ampm = horas >= 12 ? 'PM' : 'AM';
    horas = horas % 12 || 12; // Convertir formato 24h a 12h, si es 0 que sea 12
    
    // Formatear las horas y minutos
    const horaFormateada = horas.toString().padStart(2, '0') + ':' + minutos;

    return `${dia}/${mes}/${año} ${horaFormateada} ${ampm}`;
}

export const generarCadenaAleatoria = (longitudLetras = 10, longitudNumeros = 10) => {
    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const numeros = '0123456789';
    
    function generarParteAleatoria(caracteres, longitud) {
        let resultado = '';
        const caracteresLength = caracteres.length;
        for (let i = 0; i < longitud; i++) {
            const indiceAleatorio = Math.floor(Math.random() * caracteresLength);
            resultado += caracteres.charAt(indiceAleatorio);
        }
        return resultado;
    }
    
    const parteLetras = generarParteAleatoria(letras, longitudLetras);
    const parteNumeros = generarParteAleatoria(numeros, longitudNumeros);
    
    // Combina las dos partes en un solo string
    return parteLetras + parteNumeros;
}

export const estadoIncidencia = (estado) => {
    switch(estado) {
        case 'NUEVA': 
            return '#007BFF'; // Azul
        case 'ABIERTA': 
            return '#4CAF50'; // Verde
        case 'EN_INVESTIGACION': 
            return '#FFC107'; // Amarillo
        case 'EN_PROGRESO': 
            return '#17A2B8'; // Cyan
        case 'PENDIENTE': 
            return '#6C757D'; // Gris
        case 'RESUELTA': 
            return '#2196F3'; // Azul claro
        case 'EN_REVISION': 
            return '#FD7E14'; // Naranja
        case 'ESCALADA': 
            return '#F44336'; // Rojo
        case 'CERRADA': 
            return '#343A40'; // Negro
        case 'REABIERTA': 
            return '#FF6F61'; // Rosa
        default: 
            return '#000000'; // Negro por defecto
    }
};

export const colorPorGradoUrgencia = (gradoUrgencia) => {
    switch (gradoUrgencia.toLowerCase()) {
      case 'alta':
        return '#FF0000';  // Rojo para urgencia alta
      case 'media':
        return '#FFA500';  // Naranja para urgencia media
      case 'baja':
        return '#32CD32';  // Verde para urgencia baja
      default:
        return '#808080';  // Gris para valores indefinidos
    }
};
