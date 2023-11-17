import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { FieldForm, FieldPassword } from "./FieldForm.jsx";
import AuthService from "../services/auth.service";
import {AuthImg} from "./AuthImg.jsx";

const required = (value) => value ? undefined : 'Campo requerido!';
const vusername = (value) => (value.length >= 3 && value.length <= 20) ? undefined : 'El nombre de usuario debe tener entre 4 a 20 caracteres';
const vpassword = (value) => (value.length >= 5 && value.length <= 40) ? undefined : 'La contraseña debe contener mas de 5 caracteres.';
const Register = () => {
    const form = useRef();
    const checkBtn = useRef();
    let confirmation = false;

    const [ambiente, setAmbiente] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [correoEmpresa, setCorreoEmpresa] = useState("");
    const [nit, setNit] = useState("");
    const [nombreEmpresa, setNombreEmpresa] = useState("");
    const [nombreUsuario, setNombreUsuario] = useState("");
    const [roles, setRoles] = useState("");
    let [successful, setSuccessful] = useState(false);
    let [message, setMessage] = useState("");

    const onChangeAmbiente = (e) => {
        const ambiente = e.target.value;
        setAmbiente(ambiente);
    }
    const onChangeContrasena = (e) => {
        const contrasena = e.target.value;
        setContrasena(contrasena);
    }
    const onChangeCorreoEmpresa = (e) => {
        const correoEmpresa = e.target.value;
        setCorreoEmpresa(correoEmpresa);
    }
    const onChangeNit = (e) => {
        const nit = e.target.value;
        setNit(nit);
    }
    const onChangeNombreEmpresa = (e) => {
        const nombreEmpresa = e.target.value;
        setNombreEmpresa(nombreEmpresa);
    }
    const onChangeNombreUsuario = (e) => {
        const nombreUsuario = e.target.value;
        setNombreUsuario(nombreUsuario);
    }
    const onChangeRoles = (e) => {
        const roles = e.target.value;
        setRoles(roles);
    }

    
    const handleRegister = (e) => {
        e.preventDefault();

        setMessage("");
        setSuccessful(false);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            AuthService.register(

                ambiente,
                contrasena,
                correoEmpresa,
                nit,
                nombreEmpresa,
                nombreUsuario,
                ["user"]
            ).then(
                (response) => {
                    setMessage(response.data.message);
                    confirmation = true;
                    setSuccessful(true);
                },
                (error) => {

                    confirmation = false;
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    if (resMessage.includes("duplicate key error")) {
                        if (resMessage.includes("nit")) {
                            setMessage("NIT incorrecto y/o ya existente");
                        } else if (resMessage.includes("nombreUsuario")) {
                            setMessage("Nombre de usuario ya existente");
                        }
                    } else if (resMessage.includes("ValidationError")) {
                        setMessage("Verifica los campos obligatorios y sus formatos.");
                    } else if (resMessage.includes("E11000 duplicate key")) {
                        setMessage("Ya existe un usuario con este NIT o Nombre de Usuario.");
                    } else if (resMessage.includes("Unauthorized")) {
                        setMessage("No tienes permisos para realizar esta acción.");
                    } else if (resMessage.includes("Network Error")) {
                        setMessage("Error de red o conexion a la base de datos, contactate con tu proveedor.");
                    } else {
                        setMessage("Error al registrar usuario. Por favor, inténtalo de nuevo más tarde.");
                    }

                    setSuccessful(false);
                }
            );
        }
    };

    return (
        <div className="col-md-12">
            <div className="card card-container">

                <Form onSubmit={handleRegister} ref={form}>
                    <AuthImg/>
                    {!successful ? (
                        <div>
                            <FieldForm
                                name="Ambiente"
                                value={ambiente}
                                onChange={(e) => setAmbiente(e.target.value)}
                                validations={[required]}
                            />
                            <FieldForm
                                name="Nombre de la Empresa"
                                value={nombreEmpresa}
                                onChange={(e) => setNombreEmpresa(e.target.value)}
                                validations={[required]}
                            />
                            <FieldForm
                                name="Correo Empresa"
                                value={correoEmpresa}
                                onChange={(e) => setCorreoEmpresa(e.target.value)}
                                validations={[required]}
                            />
                            
                            <FieldForm
                                name="NIT"
                                value={nit}
                                onChange={(e) => setNit(e.target.value)}
                                validations={[required]}
                            />

                            <FieldForm
                                name="Nombre de Usuario"
                                value={nombreUsuario}
                                onChange={(e) => setNombreUsuario(e.target.value)}
                                validations={[required, vusername]}
                            />
                           

                            <FieldPassword
                                name="Contraseña"
                                value={contrasena}
                                onChange={(e) => setContrasena(e.target.value)}
                                validations={[required, vpassword]}
                            />

                            <div className="form-group mt-2">
                                <button className="btn btn-primary btn-block">Sign Up</button>
                            </div>
                        </div>
                    ) : (

                        <div className="form-group mt-2 text-center">
                            <div className="alert alert-success" role="alert">
                                Usuario creado exitosamente! Puedes iniciar sesión
                            </div>
                        </div>
                    )}
                
                    {message && (
                        <div className="form-group mt-2">
                            <div
                                className={ successful || confirmation ? "alert alert-success" : "alert alert-danger" }
                                role="alert"
                            >
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

export default Register;
