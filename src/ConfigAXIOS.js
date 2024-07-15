import axios from "axios";

// INSTANCIA DE AXIOS
const iAx = axios.create({
    baseURL: 'https://localhost:2000/api',
    headers: {
        'Content-Type': 'application/json',
    }
});

// INTERCEPTOR PARA SOLICITUDES
iAx.interceptors.request.use(
    config => {
        // Modificar la cabecera del mensaje y/o modificar la solicitud
        config.headers['Autorización'] = 'Esta es una autorización-123';
        return config;
    },
    error => {
        // Manejo de errores de solicitud
        return Promise.reject(error);
    }
);

// INTERCEPTOR PARA RESPUESTA
iAx.interceptors.response.use(
    response => {
        // Posibilidad de modificar la respuesta antes de pasarla al manejador correspondiente
        return response;
    },
    error => {
        // Manejo de errores de respuesta
        if (error.response && error.response.status === 401) {
            // Redirigir a la página de inicio
            window.location.href = '/app';
        }
        return Promise.reject(error);
    }
);

export default iAx;

