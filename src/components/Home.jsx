import {DataField, DataFieldReadOnly, Roles } from "./ShowDataFields.jsx";
import React, { useState } from "react";
import AuthService from "../services/auth.service";
import "../App.css";

const Home = () => {
    const currentUser = AuthService.getCurrentUser();
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState({
        ...currentUser.data,
        direccionComplemento: currentUser.data.direccion.complemento,
        direccionDepartamento: currentUser.data.direccion.departamento,
        direccionMunicipio: currentUser.data.direccion.municipio,
    });

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleConfirmClick = () => {
        // Aquí puedes realizar la lógica para guardar los cambios
        setIsEditing(false);
        // También puedes hacer una solicitud a la API para actualizar los datos
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
                            <DataField
                                label="Empresa"
                                field="nombreEmpresa"
                                isEditing={isEditing}
                                value={editedData.nombreEmpresa}
                                handleChange={handleChange}
                            />
                            <DataField
                                label="Correo de la empresa"
                                field="correoEmpresa"
                                isEditing={isEditing}
                                value={editedData.correoEmpresa}
                                handleChange={handleChange}
                            />
                            <Roles roles={currentUser.data.roles} isEditing={isEditing} />
                            <DataField
                                label="NIT"
                                field="nit"
                                isEditing={isEditing}
                                value={editedData.nit}
                                handleChange={handleChange}
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
