import React from "react";

export const DataField = ({ label, field, isEditing, value, handleChange }) => {
    return (
        <tr>
            <td>
                <strong>{label}:</strong>
            </td>
            <td>
                {isEditing ? (
                    <input
                        type="text"
                        className="form-control"
                        value={value || "--"}
                        onChange={(e) => handleChange(field, e.target.value)}
                    />
                ) : (
                    value || "--"
                )}
            </td>
        </tr>
    );
};

export const Roles = ({ roles, isEditing }) => {
    return (
        <tr>
            <td>
                <strong>Rol(es):</strong>
            </td>
            <td>
                <ul className={`no-list-style${isEditing ? ' editing' : ''}`}>
                    {roles && roles.map((role, index) => (
                        <li key={index}>{role}</li>
                    ))}
                </ul>
            </td>
        </tr>
    );
};

export const DataFieldReadOnly = ({ label, value }) => {
    return (
        <tr>
            <td>
                <strong>{label}:</strong>
            </td>
            <td>{value || "--"}</td>
        </tr>
    );
};

