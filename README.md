Gestión de Tareas - Backend

Este es el backend del proyecto Gestión de Tareas, una aplicación diseñada para permitir a los usuarios registrarse, iniciar sesión y gestionar sus tareas (crear, actualizar y eliminar). Este backend está construido con NestJS y utiliza Prisma como ORM para interactuar con una base de datos MySQL.

Características

Autenticación de usuarios con JWT.

CRUD de tareas.

Documentación de API con Swagger.

Encriptación de contraseñas usando bcrypt.

Validación de datos y transformación.

Tecnologías Utilizadas

Base de Datos: MySQL (utilizando Prisma ORM).

Autenticación: Passport.js y JWT.

Documentación de API: Swagger.

Lenguaje: TypeScript.

Requisitos Previos

Node.js (v14 o superior).

MySQL instalado y en ejecución.

Prisma CLI instalado globalmente (opcional, pero recomendado):

npm install -g prisma

Configuración e Instalación

Clonar el repositorio:

git clone <https://github.com/Santiago1992-A/Backend.git>
cd gestion-tareas-backend

Instalar dependencias:

npm install

Configurar variables de entorno:
Crea un archivo .env en la raíz del proyecto con el siguiente contenido:

DATABASE_URL="mysql://root:admin@localhost:3306/task"

Configurar la base de datos:
Ejecuta el siguiente comando para aplicar las migraciones de Prisma:

npx prisma migrate dev

Iniciar el servidor:

En modo desarrollo:

npm run start:dev

En modo producción:

npm run start:prod

Acceder a la documentación de la API:
Una vez el servidor esté en ejecución, accede a http://localhost:3000/swagger para ver la documentación de la API.

Scripts Disponibles

npm run start: Inicia la aplicación en modo producción.

npm run start:dev: Inicia la aplicación en modo desarrollo.

npm run build: Compila la aplicación.

npm run test: Ejecuta las pruebas.

npm run lint: Analiza el código para encontrar problemas.

Contribución

Si deseas contribuir a este proyecto, sigue estos pasos:

Realiza un fork del repositorio.

Crea una rama para tu feature o corrección:

git checkout -b nombre-de-la-rama

Realiza tus cambios y realiza un commit:

git commit -m "Descripción del cambio"

Sube tus cambios al repositorio remoto:

git push origin nombre-de-la-rama
