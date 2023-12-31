import Input from "react-validation/build/input.js";
import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye } from "@fortawesome/free-regular-svg-icons";
/*
    Componente reutilizable:
    Este se podra usar para agregar mas campos dentro
    de diferentes logins e inicios de session
*/
export const FieldForm = ({ name, value, onChange, validations }) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{name}</label>
            <Input
                type="text"
                className="form-control"
                name={name}
                value={value}
                onChange={onChange}
                validations={validations}
            />
        </div>
    );
};

export const FieldPassword = ({ name, value, onChange, validations }) => {
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    return (
        <div className="form-group">
            <label htmlFor={name}>{name}</label>
            <div className="input-group">
                <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    name={name}
                    value={value}
                    onChange={onChange}
                    validations={validations}
                />
                <div className="input-group-append">
                    <button
                        className="btn btn-outline-dark"
                        type="button"
                        onClick={togglePasswordVisibility}
                    >
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </button>
                </div>
            </div>
        </div>
    );
};