import React from "react";
import AuthService from "../services/auth.service.jsx";

export const ApiButtons = ({type, text, handleClick}) => {
    return (
        <>
            <button className={type} type="button" onClick={handleClick}>
                { text }
            </button>
        </>
    );
};

