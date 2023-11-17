import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import './index.css'
import { ErrorBoundary } from 'react-error-boundary';

export const ErrorFallback = ({ error, resetErrorBoundary }) => {
    let errorMessage = "Algo salio mal :(";

    if (error.message.includes("timeout")) {
        errorMessage = "The request timed out. Please check your internet connection and try again.";
    } else if (error.message.includes("404")) {
        errorMessage = "The requested resource was not found. Please check the URL and try again.";
    } // Puedes agregar más casos según tus necesidades

    return (
        <div role="alert">
            <p>{errorMessage}</p>
            <h6>Descripcion:</h6>
            <div>
                <p>
                    {error.message}
                </p>
            </div>
            {error.stack && (
                <div>
                    <h4>Detalles tecnicos:</h4>
                    <pre style={{ whiteSpace: 'pre-wrap' }}>{error.stack}</pre>
                </div>
            )}
            <button onClick={resetErrorBoundary} className="btn btn-danger">
                Try Again
            </button>
        </div>
    );
};


ReactDOM.createRoot(document.getElementById('root')).render(
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.reload()}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ErrorBoundary>
);
serviceWorker.unregister();
