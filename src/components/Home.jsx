import {DataField, DataFieldReadOnly, Roles } from "./ShowDataFields.jsx";
import React, { useState } from "react";
import AuthService from "../services/auth.service";
import "../App.css";
import authHeader from "../services/auth-header.jsx";

const currentUser = AuthService.getCurrentUser();
//const jwt = currentUser.accessToken;

const Home = () => {
    const [isEditing, setIsEditing] = useState(false);
    /*
    const [editedData, setEditedData] = useState({
        ...currentUser.data,
        direccionComplemento: currentUser.data.direccion.complemento,
        direccionDepartamento: currentUser.data.direccion.departamento,
        direccionMunicipio: currentUser.data.direccion.municipio,
    });*/

    const [editedData, setEditedData] = useState({
        ...currentUser.data,
        direccionComplemento: currentUser.data.direccion && currentUser.data.direccion.complemento,
        direccionDepartamento: currentUser.data.direccion && currentUser.data.direccion.departamento,
        direccionMunicipio: currentUser.data.direccion && currentUser.data.direccion.municipio,
    });
    const [alert, setAlert] = useState({ type: "", message: "" });

    const handleEditClick = () => {
        setIsEditing(true);
    };

    /*
    const handleConfirmClick = () => {
    AuthService.updateUser(editedData)
        .then(response => {
            console.log(response.data);
            setIsEditing(false);
            console.log(editedData);

        })
        .catch(error => {
            console.log(editedData);
            console.error('Hubo un error!', error);
        });
    }; */
    /* Version 2 - fallida
    const handleConfirmClick = () => {
    // Crea un nuevo objeto que contiene solo los campos que el usuario ha editado
    const updateData = Object.keys(editedData)
        .filter(key => editedData[key] !== currentUser.data[key])
        .reduce((obj, key) => {
            obj[key] = editedData[key];
            return obj;
        }, {});

    // Envía el objeto de actualización a la API
    AuthService.updateUser(updateData)
        .then(response => {
            console.log(response.data);
            setIsEditing(false);
        })
        .catch(error => {
            console.log(updateData);
            console.error('Hubo un error!', error);
        });
    }; */

    const handleConfirmClick = () => {
        // Crea un nuevo objeto que contiene solo los campos que el usuario ha editado
        const updateData = Object.keys(editedData)
            .filter(key => editedData[key] !== currentUser.data[key])
            .reduce((obj, key) => {
                obj[key] = editedData[key];
                return obj;
            }, {});

        // Extrae los argumentos individuales del objeto de actualización
        const ambiente = updateData.ambiente;
        const correoEmpresa = updateData.correoEmpresa;
        const telefono = updateData.telefono;
        const descripcionActividad = updateData.descripcionActividad;
        const giroComercial = updateData.giroComercial;

        AuthService.updateCompanyInfo(ambiente, correoEmpresa, telefono, descripcionActividad, giroComercial)
            .then(response => {
                console.log(response.data);
                setIsEditing(false);
                setAlert({ type: "success", message: "Información actualizada con éxito." });
            })
            .catch(error => {
                console.log(updateData);
                console.error('Hubo un error al actualizar la información de la empresa:', error);

                let errorMessage = "Error al actualizar la información de la empresa. Por favor, inténtalo de nuevo más tarde.";

                if (error.response) {
                    const status = error.response.status;

                    if (status === 400) {
                        errorMessage = "Verifica los campos obligatorios y sus formatos.";
                    } else if (status === 401) {
                        errorMessage = "No tienes permisos para realizar esta acción.";
                    } else if (status === 500) {
                        errorMessage = "Error interno del servidor. Por favor, inténtalo de nuevo más tarde.";
                    }
                } else if (error.message === "Network Error") {
                    errorMessage = "Error de red. Por favor, verifica tu conexión e inténtalo de nuevo.";
                }

                setAlert({ type: "danger", message: errorMessage });
            });
    };


    const handleChange = (field, value) => {
        setEditedData((prevData) => ({ ...prevData, [field]: value }));
    };

    return (
        <div className="container mt-2">
            <header className="jumbotron">
                <h2 className="text-center text-dark">Datos de su empresa</h2>
            </header>
            <div className="row">
                <div className="col">
                    <div className="mb-3 mt-4">
                        <table className="table">
                            <tbody>
                            <DataField
                                label="No. Ambiente"
                                field="ambiente"
                                isEditing={isEditing}
                                value={editedData.ambiente}
                                handleChange={handleChange}
                            />
                            <DataFieldReadOnly
                                label="Empresa"
                                value={editedData.nombreEmpresa}
                            />
                            <DataField
                                label="Correo de la empresa"
                                field="correoEmpresa"
                                isEditing={isEditing}
                                value={editedData.correoEmpresa}
                                handleChange={handleChange}
                            />
                            <Roles roles={currentUser.data.roles} isEditing={isEditing} />

                            <DataFieldReadOnly
                                label="NIT"
                                value={editedData.nit}
                            />

                            <DataField
                                label="Teléfono"
                                field="telefono"
                                isEditing={isEditing}
                                value={editedData.telefono}
                                handleChange={handleChange}
                            />
                            <DataField
                                label="Descripción de la actividad"
                                field="descripcionActividad"
                                isEditing={isEditing}
                                value={editedData.descripcionActividad}
                                handleChange={handleChange}
                            />
                            <DataField
                                label="Giro Comercial"
                                field="giroComercial"
                                isEditing={isEditing}
                                value={editedData.giroComercial}
                                handleChange={handleChange}
                            />
                            <DataFieldReadOnly
                                label="Dirección (Complemento)"
                                value={editedData.direccionComplemento}
                            />
                            <DataFieldReadOnly
                                label="Departamento"
                                value={editedData.direccionDepartamento}
                            />
                            <DataFieldReadOnly
                                label="Municipio"
                                value={editedData.direccionMunicipio}
                            />
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="mt-3">
                {alert.type && alert.message && (
                    <div className={`alert alert-${alert.type}`} role="alert">
                        {alert.message}
                    </div>
                )}
                <button
                    className="btn btn-outline-dark"
                    type="button"
                    onClick={isEditing ? handleConfirmClick : handleEditClick}
                >
                    {isEditing ? "Confirmar" : "Editar"}
                </button>
            </div>
        </div>
    );
};

export default Home;
