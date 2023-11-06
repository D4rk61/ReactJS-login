import axios from "axios";
import authHeader from "./auth-header.jsx";
import * as config from "./ip-config.jsx";
import {API_URL_DATA} from "./ip-config.jsx";
//const API_URL = "http://localhost:3000/api/v1/documentos-tributarios";      // servicios a acceder luego del login


const getPublicContent = () => {
    return axios.get(API_URL_DATA);
};

const getPDF = (codigoGeneracion) => {
    return axios.get(API_URL_DATA + `/pdf/${codigoGeneracion}`, { headers: authHeader() });
};

const getJSON = (codigoGeneracion) => {
    return axios.get(API_URL_DATA + `/json/${codigoGeneracion}`, { headers: authHeader() });
};

const getEmail = (codigoGeneracion) => {
    return axios.get(API_URL_DATA + `/email/${codigoGeneracion}`, { headers: authHeader() });
};

// metodos post
/*
const postDocumentosTributariosAnular = () => {

}
const postDocumentosTributariosCertificar = () => {
}
*/

const UserService = {
    getPublicContent,
    getPDF,
    getJSON,
    getEmail,
};

export default UserService;