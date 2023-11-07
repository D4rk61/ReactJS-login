import AuthService from "./services/auth.service";

import Register from "./components/Registrer.jsx";
import Login from "./components/Login.jsx";
import Home from "./components/Home.jsx";
import Profile from "./components/Profile.jsx";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import './App.css'
import './index.css'
import Admin from "./components/Admin.jsx";
import { library } from '@fortawesome/fontawesome-svg-core';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

library.add(far);
const App = () => {
    const [currentUser, setCurrentUser] = useState(undefined);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user && user.data.roles && user.data.roles.includes("admin")) {
            console.log("is admin", isAdmin);
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
            console.log("is not admin", isAdmin);
        }
    }, [currentUser]);


    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
        }
    }, []);

    const logOut = () => {
        AuthService.logout();
    };

    return (
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <div className="custom-margin-left">
                    <div className="navbar-brand ml-2">
                        Documentos Tributarios
                    </div>
                </div>
                <div>
                    {currentUser ? (
                        <div className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link to={"/home"} className="nav-link">
                                    Info. Empresa
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/profile"} className="nav-link">
                                    Documentos
                                </Link>
                            </li>
                            {isAdmin && (
                                <li className="nav-item">
                                    <a href="/admin" className="nav-link">
                                        Admin
                                    </a>
                                </li>
                            )}
                        </div>
                        ) : null}
                </div>
                {currentUser ? (
                    <div className="navbar-nav ml-auto">
                        <li className="nav-item">

                            <Link to={"/profile"} className="nav-link">
                                {currentUser.username}
                            </Link>
                        </li>
                        <li className="nav-item">
                            <a href="/login" className="nav-link" onClick={logOut}>
                                Cerrar Sesión
                            </a>
                        </li>
                    </div>
                ) : (
                    <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to={"/login"} className="nav-link">
                                Iniciar Sesión
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to={"/register"} className="nav-link">
                                Registrarse
                            </Link>
                        </li>
                    </div>
                )}
            </nav>

            <div className="container mt-3">
                <Routes>
                    <Route path="/" element={<Login/>} />
                    <Route path="/home" element={<Home/>} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/register" element={<Register/>} />
                    <Route path="/profile" element={<Profile/>} />
                    <Route path="/admin" element={<Admin/>} />
                </Routes>
            </div>
        </div>
    );
};

export default App;
