import axios from "axios";
import authHeader from "./auth-header.jsx";

const API_URL = "http://localhost:3000/api/v1/auth/";

const register = (
    ambiente,
    contrasena,
    correoEmpresa,
    nit,
    nombreEmpresa,
    nombreUsuario,
    roles

) => {
    return axios.post(API_URL + "register", {    // si da un error a futuro quitar el "/"
        ambiente,
        contrasena,
        correoEmpresa,
        nit,
        nombreEmpresa,
        nombreUsuario,
        roles
    });
};

const login = (
    nombreUsuario,
    contrasena,
    nit
) => {
    return axios.post(API_URL + "login", {    // si da un error a futuro quitar el "/"
        nombreUsuario,
        contrasena,
        nit
    })
    .then((response) => {
        if(response.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
    });
};

const logout = () => {
    localStorage.removeItem("user");
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};


// metodo actualizar una empresa
// error que da - 403 => deshautorizado, esta mejo
const updateUser = (updateData) => {
    return axios.patch(API_URL + "update", updateData, { headers: authHeader() });
};

/*  Version fallida - 400
const updateUser = (updateData) => {
    headers: {
        authHeader()
    }

    return axios.patch(API_URL + "update", {
        updateData
    })

}
*/
/* Version fallida - 400
const updateUser = (updateData) => {
    return axios.patch(API_URL + "update", {
        updateData
    }, {
        headers: authHeader()
    });
}
*/


const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
    updateUser
};

export default AuthService;
