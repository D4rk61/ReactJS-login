import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import {FieldForm, FieldPassword} from "./FieldForm.jsx";
import AuthService from "../services/auth.service.jsx";
import {AuthImg} from "./AuthImg.jsx";
import { ErrorBoundary } from "react-error-boundary";
import {ErrorFallback} from "../main.jsx";

const required = (value) => value ? undefined : 'Campo requerido!';
const vusername = (value) => (value.length >= 3 && value.length <= 20) ? undefined : 'El nombre de usuario debe tener entre 4 a 20 caracteres';
const vpassword = (value) => (value.length >= 5 && value.length <= 40) ? undefined : 'La contraseña debe contener mas de 5 caracteres.';
const Login = () => {
    let navigate = useNavigate();

    const form = useRef();
    const checkBtn = useRef();

    const [nombreUsuario, setNombreUsuario] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [nit, setNit] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const onChangeNombreUsuario = (e) => {
        const nombreUsuario = e.target.value;
        setNombreUsuario(nombreUsuario);
    };

    const onChangeContrasena = (e) => {
        const contrasena = e.target.value;
        setContrasena(contrasena);
    };

    const onChangeNit = (e) => {
        const nit = e.target.value;
        setNit(nit);
    };

    const handleLogin = (e) => {
        e.preventDefault();

        setMessage("");
        setLoading(true);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            AuthService.login(nombreUsuario, contrasena, nit).then(
                () => {
                    navigate("/profile");
                    window.location.reload();
                },
                (error) => {
                    setLoading(false);

                    if (error.response) {
                        // Si la respuesta del servidor tiene un código de error
                        const status = error.response.status;

                        if (status === 401) {
                            setMessage("Nombre de usuario, contraseña o NIT incorrectos.");
                        } else if (status === 500) {
                            setMessage("Error interno del servidor. Por favor, inténtalo de nuevo más tarde.");
                        } else {
                            setMessage(`Error ${status}. Por favor, inténtalo de nuevo más tarde.`);
                        }
                    } else {
                        setMessage("Error de red o conexion a la base de datos, contactate con tu proveedor.");
                    }
                }
            );
        } else {
            setLoading(false);
        }
    };


    return (
        <div className="col-md-12">
            <div className="card card-container">
                <Form onSubmit={handleLogin} ref={form}>
                    <AuthImg/>

                    <FieldForm
                        name="NIT"
                        value={nit}
                        onChange={onChangeNit}
                        validations={[required]}
                    />

                    <FieldForm
                        name="Nombre de Usuario"
                        value={nombreUsuario}
                        onChange={onChangeNombreUsuario}
                        validations={[required, vusername]}
                    />
                    <FieldPassword
                        name="Contraseña"
                        value={contrasena}
                        onChange={onChangeContrasena}
                        validations={[required, vpassword]}
                    />

                    <div className="form-group mt-2">
                        <button className="btn btn-danger btn-block" disabled={loading} >
                            {loading && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}
                            <span>Login</span>
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

    );
};

export default Login;
