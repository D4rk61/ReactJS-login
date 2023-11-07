import React, {useRef, useState} from "react";
import {FieldForm, FieldPassword} from "./FieldForm.jsx";
import CheckButton from "react-validation/build/button.js";
import {useNavigate} from "react-router-dom";
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
    const [activateAccount, setActivateAccount ]  = useState("");
    const [deactivateAccount, setDeactivateAccount ] = useState("");

    const required = (value) => {
        if (!value) {
            return (
                <div className="alert alert-danger" role="alert">
                    This field is required!
                </div>
            );
        }
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
    }

    const handleLogin = (e) => {
        setMessage("");
        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {

        }
    }

    const obtenerValor = () => {
        console.log("Valor: " + activateAccount)
    }

    return (
    <div>
        <div className="container mt-2">
            <header className="jumbotron">
                <h2 className="text-center text-dark">Panel Administrativo</h2>
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
                                        validations={[required]}
                                    />

                                    <FieldPassword
                                        name="Nueva Contraseña"
                                        field="password"
                                        value={contrasena}
                                        onChange={onChangeContrasena}
                                        validations={[required]}
                                    />

                                    <FieldPassword
                                        name="Confirmar Contraseña"
                                        field="confirmarContrasena"
                                        value={confirmarContrasena}
                                        onChange={onChangeConfirmarContrasena}
                                        validations={[required]}
                                    />

                                    <div className="form-group mt-2">
                                        <button className="btn btn-dark btn-block" disabled={loading} >
                                            {loading && (
                                                <span className="spinner-border spinner-border-sm"></span>
                                            )}
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
                                        value={activateAccount} // Asigna el valor del input al estado
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
                                        value={deactivateAccount} // Asigna el valor del input al estado
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
    </div> );
}
export default Admin;