<p align="center">
  <img src="https://user-images.githubusercontent.com/25181517/183897015-94a058a6-b86e-4e42-a37f-bf92061753e5.png" alt="ReactLogo" width="200" />
</p>

# Documentos Tributarios

Bienvenido al repositorio del software de búsqueda y descarga de documentos tributarios. Este proyecto utiliza ReactJS en el frontend y se conecta a un backend NestJS. Además, se encuentra desplegado en un servidor AWS.

## Pasos y Manual de Uso

Siga estos pasos para configurar y ejecutar el proyecto:

1. En el directorio raíz del proyecto, ejecute el siguiente comando para instalar las dependencias:

    ```bash
    npm install
    ```

2. Luego, ejecute el siguiente comando para iniciar la aplicación en modo de desarrollo:

    ```bash
    npm run dev
    ```

3. Configuración de AWS

   Para configurar la conexión con el servidor AWS, siga estos pasos:

   - Abra el archivo `src/services/ip-config.jsx`.

   - En el archivo, encontrará el siguiente contenido:

    ```javascript
    export let IP = "localhost"
    export let PORT = "3000"
    export const API_URL_BASE = `http://${IP}:${PORT}/api/v1`
    export const API_URL_AUTH = `${API_URL_BASE}/auth`
    export const API_URL_DATA = `${API_URL_BASE}/documentos-tributarios`
    ```

   - Cambie la variable **"IP"** a la dirección IP de su servidor AWS. Asegúrese de que la dirección sea la correcta y esté en funcionamiento.

## Tareas Pendientes

Aquí se enumeran algunas de las tareas pendientes en el proyecto:

- Investigar el motivo por el que la ruta `/auth/update` arroja un error 403.
- Confirmar si el buscador de documentos envía correctamente el JSON.
- Dockerizar el sistema junto con un servidor Nginx para facilitar su despliegue y administración.

## ¿Necesita Ayuda?

Si tiene alguna pregunta o necesita asistencia, no dude en enviar un correo electrónico a: [reynosojose2005@gmail.com](reynosojose2005@gmail.com)
