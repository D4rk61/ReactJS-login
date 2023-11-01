import React, {useState} from "react";
import UserService from "../services/user.service.jsx";
import AuthService from "../services/auth.service.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import {ApiButtons} from "./ApiButtons.jsx";
const Profile = () => {
    const currentUser = AuthService.getCurrentUser();
    const [documentoTributario, setDocumentoTributario] = useState("");
    let [isDocumentValid, setIsDocumentValid] = useState(false);
    let [documentInfo, setDocumentInfo] = useState(null);
    let [busquedaRealizada, setBusquedaRealizada] = useState(null);
    const obtenerValor = () => {
        const codigoGeneracion = documentoTributario;
        const codigoGeneracionRegex = /^[A-Z0-9]{8}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{12}$/;

        if (codigoGeneracionRegex.test(codigoGeneracion)) {
            console.log(codigoGeneracion);
            setIsDocumentValid(true);
            setBusquedaRealizada(true);
            return codigoGeneracion;

        } else if (codigoGeneracion === "") {
            alert("Por favor ingrese un documento tributario.");
            setIsDocumentValid(false);
            setBusquedaRealizada(false);
            return null;

        } else {
            alert(`El documento: "${codigoGeneracion}" tiene un formato equivocado.`);
            setIsDocumentValid(false);
            setBusquedaRealizada(false);
            return null;
        }
    }
    const descargarPDF = () => {
        const codigoGeneracion = obtenerValor();
        UserService.getPDF(codigoGeneracion)
            .then((response) => {
                console.log("Descargando PDF:", response.data);
            })
            .catch((error) => {
                if (error.response) {
                    console.error("Error al descargar PDF. Código de estado:", error.response.status);
                } else if (error.request) {
                    console.error("No se pudo conectar al servidor.");
                } else {
                    console.error("Error inesperado:", error.message);
                }
            });
    }

    const descargarJSON = () => {
        const codigoGeneracion = obtenerValor();
        UserService.getJSON(codigoGeneracion)
            .then((response) => {
                console.log("Descargando JSON:", response.data);
                setDocumentInfo(response.data);
            })
            .catch((error) => {
                if (error.response) {
                    console.error("Error al descargar JSON. Código de estado:", error.response.status);
                } else if (error.request) {
                    console.error("No se pudo conectar al servidor.");
                } else {
                    console.error("Error inesperado:", error.message);
                }
            });
    }

    const enviarEmail = () => {
        const codigoGeneracion = obtenerValor();
        UserService.getEmail(codigoGeneracion)
            .then((response) => {
                console.log("Enviando correo electrónico:", response.data);
            })
            .catch((error) => {
                if (error.response) {
                    console.error("Error al enviar correo electrónico. Código de estado:", error.response.status);
                } else if (error.request) {
                    console.error("No se pudo conectar al servidor.");
                } else {
                    console.error("Error inesperado:", error.message);
                }
            });
    }

    return (
        <div className="container">
            <header className="jumbotron">
                <h2 className="text-center text-dark">Busqueda Documentos Tributarios</h2>
            </header>
            <div className="row">
                <div className="col">
                    <div className="mb-3 mt-4">
                        <p className="mb-2">
                            <strong>Empresa:</strong> {currentUser.data.nombreEmpresa}
                        </p>
                        <p className="mb-2">
                            <strong>Correo de la empresa:</strong> {currentUser.data.correoEmpresa}
                        </p>
                    </div>
                </div>
                <div className="col">
                    <h5 className="text-dark mt-4">
                        <strong>Busqueda y descarga de Documentos Tributarios:</strong>
                    </h5>
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Código de Generación"
                            value={documentoTributario} // Asigna el valor del input al estado
                            onChange={(e) => setDocumentoTributario(e.target.value)}
                        />
                        <div>
                            <div className="input-group-append">
                                <button className="btn btn-dark" type="submit" onClick={obtenerValor}>
                                    Buscar
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="btn-group mt-2">
                        <ApiButtons type="btn btn-success" text="Descargar PDF" handleClick={descargarPDF}/>
                        <ApiButtons type="btn btn-info" text="Descargar JSON" handleClick={descargarJSON}/>
                        <ApiButtons type="btn btn-primary" text="Enviar Email" handleClick={enviarEmail}/>
                    </div>
                    {isDocumentValid && documentInfo && busquedaRealizada ? (
                        <div className="mt-5">
                            <h4>Información del documento tributario:</h4>
                        </div>

                    ) : (
                        busquedaRealizada && <div className="mt-5"><h2>No se ha encontrado información del documento tributario.</h2></div>
                    )}
                </div>
            </div>
        </div>
    );
};
export default Profile;
