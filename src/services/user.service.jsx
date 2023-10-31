import axios from "axios";
import authHeader from "./auth-header.jsx";

const API_URL = "http://localhost:3000/api/v1/documentos-tributarios";      // servicios a acceder luego del login

const getPublicContent = () => {
    return axios.get(API_URL);
};

const getPDF = () => {
    return axios.get(API_URL + "/pdf/", { headers: authHeader() });
};

const getJSON = () => {
    return axios.get(API_URL + "/json/", { headers: authHeader() });
};

const getEmail = () => {
    return axios.get(API_URL + "/email/", { headers: authHeader() });
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