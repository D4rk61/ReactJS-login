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

## Deploy a AWS, Dockerizando la aplicación

Puede utilizar Docker para empacar y desplegar su aplicación de manera sencilla. Siga estos pasos para crear una imagen de Docker y ejecutar su aplicación:

1. En el directorio raíz del proyecto, ejecute el siguiente comando para construir la imagen de Docker:

    ```bash
    docker build -t consiti-felsv-consiti-fe .
    ```

2. Una vez que la imagen de Docker se haya creado con éxito, ejecute el siguiente comando para iniciar un contenedor:

    ```bash
    docker run -p 80:80 consiti-felsv-consiti-fe:latest
    ```

   Esto le permitirá acceder a su aplicación en http://localhost:80

3. Si necesita personalizar la configuración del contenedor, puede agregar más parámetros al comando `docker run` según sus necesidades.


## Tareas Pendientes

Aquí se enumeran algunas de las tareas pendientes en el proyecto:

- Investigar el motivo por el que la ruta `/auth/update` arroja un error 403.
- Confirmar si el buscador de documentos envía correctamente el JSON.
- Verificar peticiones PATCH al backend

## ¿Necesita Ayuda?

Si tiene alguna pregunta o necesita asistencia, no dude en enviar un correo electrónico a: [reynosojose2005@gmail.com](reynosojose2005@gmail.com)
