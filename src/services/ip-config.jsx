export let IP = "localhost"
export let PORT = "3000"
export const API_URL_BASE = `http://${IP}:${PORT}/api/v1`
export const API_URL_AUTH = `${API_URL_BASE}/auth`
export const API_URL_DATA = `${API_URL_BASE}/documentos-tributarios`


/*
    ip => numero de ip del servidor, esta es dinamica, esta en constante cambio
    port => puerto del servidor nestJS, es el 3000
    API_URL_BASE => url base de la api
    API_URL_AUTH => url de autenticacion, login, registrarse
    API_URL_DATA => url posterior al login del usuario
*/
