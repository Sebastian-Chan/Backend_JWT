# API REST de Tareas con Autenticación JWT

## Descripción del Proyecto

Esta aplicación es una API RESTful desarrollada con Node.js, Express y MongoDB (Mongoose) diseñada para gestionar listas de tareas con control de acceso por usuario. 

El sistema implementa autenticación mediante tokens JWT (JSON Web Tokens) y almacenamiento seguro de contraseñas utilizando bcrypt. Cada usuario registrado puede crear, consultar, actualizar y eliminar sus propias tareas de manera aislada, impidiendo que terceros visualicen o alteren información que no les pertenezca. Adicionalmente, cuenta con un middleware centralizado para el manejo de excepciones y validaciones de datos.

## Instalación

1. Clonar el repositorio o descargar el código fuente:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd backend
   ```

2. Instalar las dependencias del proyecto:
   ```bash
   npm install
   ```

3. Crear un archivo llamado `.env` en la raíz del proyecto y definir las siguientes variables de entorno:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGO_DB=mongodb+srv://<usuario>:<password>@cluster.mongodb.net/<nombre_bd>?retryWrites=true&w=majority
   JWT_SECRET=tu_palabra_secreta_jwt
   ```

## Ejecución

Para iniciar el servidor en modo normal:
```bash
npm start
```

En caso de contar con `nodemon` configurado para desarrollo:
```bash
npm run dev
```

Una vez ejecutado, el servidor se iniciará en el puerto configurado (por defecto `5000`) y establecerá la conexión con la base de datos MongoDB.

## Lista de Endpoints

La URL base para las peticiones locales es `http://localhost:5000`.

### Usuarios (`/api/users`)

| Método | Endpoint | Acceso | Descripción |
| :--- | :--- | :--- | :--- |
| POST | `/api/users/register` | Público | Registra un usuario nuevo en el sistema. |
| POST | `/api/users/login` | Público | Autentica las credenciales y devuelve un token JWT. |
| GET | `/api/users/data` | Privado | Obtiene la información del usuario autenticado. |

#### Detalles y Ejemplos de Petición

* **POST /api/users/register**
  * Body (JSON):
    ```json
    {
      "name": "Juan Pérez",
      "email": "juan@example.com",
      "password": "password123"
    }
    ```

* **POST /api/users/login**
  * Body (JSON):
    ```json
    {
      "email": "juan@example.com",
      "password": "password123"
    }
    ```
  * Respuesta exitosa (200):
    ```json
    {
      "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
      "name": "Juan Pérez",
      "email": "juan@example.com",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```

* **GET /api/users/data**
  * Headers requeridos:
    ```http
    Authorization: Bearer <TOKEN_JWT>
    ```

---

### Tareas (`/api/tareas`)

Todos los endpoints de tareas son privados y requieren enviar el token JWT en las cabeceras HTTP (`Authorization: Bearer <TOKEN_JWT>`).

| Método | Endpoint | Acceso | Descripción |
| :--- | :--- | :--- | :--- |
| GET | `/api/tareas` | Privado | Obtiene todas las tareas asociadas al usuario autenticado. |
| POST | `/api/tareas` | Privado | Crea una nueva tarea asociada al usuario en sesión. |
| PUT | `/api/tareas/:id` | Privado | Actualiza la descripción de una tarea existente (solo si pertenece al usuario). |
| DELETE | `/api/tareas/:id` | Privado | Elimina una tarea existente (solo si pertenece al usuario). |

#### Detalles y Ejemplos de Petición

* **GET /api/tareas**
  * Headers: `Authorization: Bearer <TOKEN_JWT>`
  * Respuesta exitosa (200): Lista con los objetos de las tareas del usuario.

* **POST /api/tareas**
  * Headers: `Authorization: Bearer <TOKEN_JWT>`
  * Body (JSON):
    ```json
    {
      "descripcion": "Completar la documentación de la API"
    }
    ```

* **PUT /api/tareas/:id**
  * Headers: `Authorization: Bearer <TOKEN_JWT>`
  * Parámetro URL: `:id` (ID de MongoDB de la tarea)
  * Body (JSON):
    ```json
    {
      "descripcion": "Completar la documentación de la API y realizar pruebas"
    }
    ```

* **DELETE /api/tareas/:id**
  * Headers: `Authorization: Bearer <TOKEN_JWT>`
  * Parámetro URL: `:id` (ID de MongoDB de la tarea)
  * Respuesta exitosa (200):
    ```json
    {
      "id": ":id"
    }
    ```

## Autor:
Sebastian A. Chan Hernández.


Ingeniería de Software - Anáhuac Mayab
