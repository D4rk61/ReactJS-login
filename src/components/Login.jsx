import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import {FieldForm, FieldPassword} from "./FieldForm.jsx";
import AuthService from "../services/auth.service.jsx";
import {AuthImg} from "./AuthImg.jsx";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const vusername = (value) => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                The username must be between 3 and 20 characters.
            </div>
        );
    }
};

const vpassword = (value) => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 6 and 40 characters.
            </div>
        );
    }
};

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
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setLoading(false);
                    setMessage(resMessage);
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
                    <FieldForm
                        name="NIT"
                        value={nit}
                        onChange={onChangeNit}
                        validations={[required]}
                    />

                    <div className="form-group">
                        <button className="btn btn-primary btn-block" disabled={loading} >
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
