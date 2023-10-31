import React from "react";
import AuthService from "../services/auth.service";

const Home = () => {
    const currentUser = AuthService.getCurrentUser();

    return (
        <div className="container mt-5">
            <div className="jumbotron">
                <h3 className="text-center">Datos de su empresa</h3>
            </div>
            <div className="row">
                <div className="col">
                    <div className="mb-3">
                        <p>
                            <strong>Token:</strong>{" "}
                            {currentUser.accessToken.substring(0, 20)} ...
                            {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
                        </p>
                        <p>
                            <strong>Ambiente:</strong> {currentUser.data.ambiente}
                        </p>
                        <p>
                            <strong>Empresa:</strong> {currentUser.data.nombreEmpresa}
                        </p>
                        <p>
                            <strong>Correo de la empresa:</strong> {currentUser.data.correoEmpresa}
                        </p>
                    </div>
                </div>

            </div>
            <div className="mt-3">
                <p>
                    <strong>Roles:</strong>
                    <ul>
                        {currentUser.data.roles &&
                            currentUser.data.roles.map((role, index) => (
                                <li key={index}>{role}</li>
                            ))}
                    </ul>
                </p>
                <p>
                    <strong>NIT:</strong> {currentUser.data.nit}
                </p>
                <p>
                    <strong>Teléfono:</strong> {currentUser.data.telefono}
                </p>
                <p>
                    <strong>Descripción de la actividad:</strong>{" "}
                    {currentUser.data.descripcionActividad}
                </p>
                <p>
                    <strong>Giro Comercial:</strong> {currentUser.data.giroComercial}
                </p>
                <p>
                    <strong>Dirección:</strong>{" "}
                    {currentUser.data.direccion.complemento},{" "}
                    {currentUser.data.direccion.departamento},{" "}
                    {currentUser.data.direccion.municipio}
                </p>
            </div>
        </div>
    );
};

export default Home;
