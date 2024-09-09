# User-API-type-ORM-mySQL-docker-compose
Este repositorio contiene un backend implementado en Node.js con TypeScript. El objetivo principal es proporcionar un punto de partida para proyectos Node.js basados en TypeScript, con configuraciones comunes y algunas dependencias útiles.

## Requisitos

- Node.js (v14.x o superior)
- yarn (v1.22.x o superior)
- MySQL (o cualquier otra base de datos compatible)
- Prettier

## Instalación

Asegúrate de tener Node.js y yarn instalados en tu sistema.

1. Clona el repositorio:

   ```bash
   git clone https://github.com/cesesteban/User-API-type-ORM-mySQL-docker-compose.git

2. Navega al directorio del proyecto:

    ```bash
    cd NodeTS-Scaffolding-BE
    ```

3. Instala las dependencias:

    ```bash
    yarn install
    ```

4. Configura las variables de entorno:

    ```bash
    Crea un archivo .env en la raíz del proyecto basado en el archivo .env.example proporcionado.
    ```

## Scripts

* `yarn start`: Inicia la aplicación en modo producción.
* `yarn run build`: Compila el código TypeScript y genera la carpeta build.
* `yarn run dev`: Inicia la aplicación en modo de desarrollo con reinicio automático usando `nodemon`.

## Endpoints

Consulta la [documentación de la API]() para obtener detalles sobre los endpoints disponibles y cómo interactuar con ellos.

## Estructura del Proyecto

* `src/`: Contiene el código fuente TypeScript.
* `build/`: Carpeta generada después de la compilación.
* `db/`: Scripts personalizados para carga de tablas y registros.

## Docker

* `docker build -t User-API .`: Crea imagen contenedor 
* `docker run -p 8080:8080 --name User-API User-API`: Inicia contenedor
* `docker push your-user/User-API`: Subir contenedor

## Tecnologías Principales
    
    Express: Framework web para Node.js.
    TypeScript: Lenguaje de programación tipado.
    TypeORM: Framework de consulta SQL.
    MySQL: Base de datos relacional.
    JWT: JSON Web Tokens para la autenticación.
    Cors, Helmet: Middleware de seguridad para Express.
    Dotenv: Carga de variables de entorno desde un archivo.
    

## Contribuciones
¡Las contribuciones son bienvenidas! Si encuentras algún problema o tienes mejoras sugeridas, no dudes en abrir un issue o enviar un pull request.

## Licencia
Este proyecto está bajo la licencia MIT.
