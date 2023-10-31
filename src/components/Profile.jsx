import React from "react";
import AuthService from "../services/auth.service";
import 'bootstrap/dist/css/bootstrap.min.css';

const Profile = () => {
    const currentUser = AuthService.getCurrentUser();

    return (
        <div className="container">
            <header className="jumbotron">
                <h3 className="text-center text-primary">Datos de su empresa</h3>
            </header>
            <div className="row">
                <div className="col">
                    <div className="mb-3">
                        <p className="mb-2">
                            <strong>Empresa:</strong> {currentUser.data.nombreEmpresa}
                        </p>
                        <p className="mb-2">
                            <strong>Correo de la empresa:</strong> {currentUser.data.correoEmpresa}
                        </p>
                    </div>
                </div>
                <div className="col">
                    <h5 className="text-primary">
                        <strong>Busqueda y descarga de Documentos Tributarios:</strong>
                    </h5>
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Código de Generación"
                        />
                        <div className="input-group-append">
                            <button className="btn btn-primary" type="button">
                                Buscar
                            </button>
                        </div>
                    </div>
                    <div className="btn-group mt-3">
                        <button className="btn btn-success" type="button">
                            Descargar PDF
                        </button>
                        <button className="btn btn-info" type="button">
                            Descargar JSON
                        </button>
                        <button className="btn btn-primary" type="button">
                            Enviar Email
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
