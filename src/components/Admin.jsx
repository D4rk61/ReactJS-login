import React, { useRef, useState, useEffect } from "react";
import { FieldForm, FieldPassword } from "./FieldForm.jsx";
import CheckButton from "react-validation/build/button.js";
import Form from "react-validation/build/form";
import UserService from "../services/user.service.jsx";

const Admin = () => {
    const form = useRef();
    const checkBtn = useRef();
    const [nit, setNit] = useState();
    const [contrasena, setContrasena] = useState();
    const [confirmarContrasena, setConfirmarContrasena] = useState();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [activateAccount, setActivateAccount] = useState("");
    const [deactivateAccount, setDeactivateAccount] = useState("");
    const [alert, setAlert] = useState({ type: "", message: "" });

    const required = (value) => {
        if (!value) {
            setAlert({ type: "danger", message: "Este campo es obligatorio." });
            return false;
        }
        return true;
    };

    const onChangeContrasena = (e) => {
        const contrasena = e.target.value;
        setContrasena(contrasena);
    };

    const onChangeNit = (e) => {
        const nit = e.target.value;
        setNit(nit);
    };

    const onChangeConfirmarContrasena = (e) => {
        const confirmarContrasena = e.target.value;
        setConfirmarContrasena(confirmarContrasena);
    };



    const handleLogin = (e) => {
        e.preventDefault();
        setMessage("");
        setAlert({ type: "", message: "" });
        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            if (contrasena !== confirmarContrasena) {
                setAlert({ type: "danger", message: "Las contraseñas no coinciden." });
            } else {
                setLoading(true);

                setTimeout(() => {
                    setLoading(false);
                    setAlert({ type: "success", message: "Contraseña actualizada con éxito." });
                }, 2000);
            }
        }
    };

    const obtenerValor = () => {
        console.log("Valor: " + activateAccount);
    };

    return (
        <div>
            <div className="container mt-2">
                <header className="jumbotron">
                    <h2 className="text-center text-dark">Panel Administrativo</h2>
                    <div className="mt-5">
                        {alert.type && alert.message && (
                            <div className={`alert alert-${alert.type}`} role="alert">
                                {alert.message}
                            </div>
                        )}
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="mb-3 mt-4">
                                <h5>Actualizacion de Contraseña de una empresa</h5>
                                <Form onSubmit={handleLogin} ref={form}>
                                    <FieldForm
                                        name="NIT"
                                        field="nit"
                                        value={nit}
                                        onChange={onChangeNit}
                                    />

                                    <FieldPassword
                                        name="Nueva Contraseña"
                                        field="password"
                                        value={contrasena}
                                        onChange={onChangeContrasena}

                                    />

                                    <FieldPassword
                                        name="Confirmar Contraseña"
                                        field="confirmarContrasena"
                                        value={confirmarContrasena}
                                        onChange={onChangeConfirmarContrasena}
                                    />

                                    <div className="form-group mt-2">
                                        <button className="btn btn-dark btn-block" disabled={loading}>
                                            {loading && <span className="spinner-border spinner-border-sm"></span>}
                                            <span>Actualizar</span>
                                        </button>
                                    </div>

                                    {message && (
                                        <div className="form-group">
                                            <div className="alert alert-danger" role="alert">
                                                {message}
                                            </div>
                                        </div>
                                    )}
                                    <CheckButton style={{ display: "none" }} ref={checkBtn} />
                                </Form>
                            </div>
                        </div>

                        <div className="col">
                            <div className="mb-3 mt-4">
                                <h5>Activacion de una empresa</h5>

                                <div className="input-group mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="NIT para activación"
                                        value={activateAccount}
                                        onChange={(e) => setActivateAccount(e.target.value)}
                                    />
                                    <div>
                                        <div className="input-group-append">
                                            <button className="btn btn-dark" type="submit" onClick={obtenerValor}>
                                                Activar
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <h5 className="mt-4">Desactivacion de una empresa</h5>

                                <div className="input-group mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="NIT para desactivacion"
                                        value={deactivateAccount}
                                        onChange={(e) => setDeactivateAccount(e.target.value)}
                                    />
                                    <div>
                                        <div className="input-group-append">
                                            <button className="btn btn-dark" type="submit" onClick={obtenerValor}>
                                                Desactivar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        </div>
    );
};

export default Admin;
