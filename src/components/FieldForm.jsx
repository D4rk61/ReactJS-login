import Input from "react-validation/build/input.js";
import React from "react";
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
    return (
        <div className="form-group">
            <label htmlFor={name}>{name}</label>
            <Input
                my-3 w-75
                type="password"
                className="form-control"
                name={name}
                value={value}
                onChange={onChange}
                validations={validations}
            />
        </div>
    );
};