# Gestión de Tareas - Backend

Este es el **backend** del proyecto **Gestión de Tareas**, una aplicación diseñada para permitir a los usuarios registrarse, iniciar sesión y gestionar sus tareas (crear, actualizar y eliminar). Este backend está construido con **NestJS** y utiliza **Prisma** como ORM para interactuar con una base de datos **MySQL**.

## Características

- **Autenticación de usuarios** con JWT.
- **CRUD de tareas** (Crear, Leer, Actualizar, Eliminar).
- **Documentación de API** con Swagger.
- **Encriptación de contraseñas** usando bcrypt.
- **Validación de datos** y transformación.

## Tecnologías Utilizadas

- **Base de Datos**: MySQL (utilizando Prisma ORM).
- **Autenticación**: Passport.js y JWT.
- **Documentación de API**: Swagger.
- **Lenguaje**: TypeScript.

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalados los siguientes programas:

- **Node.js** (v14 o superior).
- **MySQL** instalado y en ejecución.
- **Prisma CLI** instalado globalmente (opcional, pero recomendado):

  ```bash
  npm install -g prisma
  ```

## Configuración e Instalación

# 1. Clonar el repositorio

Clona el repositorio del proyecto:

git clone https://github.com/Santiago1992-A/Backend.git
cd gestion-tareas-backend

# 2. Instalar dependencias

Ejecuta el siguiente comando para instalar las dependencias del proyecto:

npm install

# 3. Configurar variables de entorno

Crea un archivo .env en la raíz del proyecto con el siguiente contenido:

DATABASE_URL="mysql://root:admin@localhost:3306/task"

# 4. Configurar la base de datos

Ejecuta el siguiente comando para aplicar las migraciones de Prisma y configurar la base de datos:

npx prisma migrate dev

# 5. Iniciar el servidor

Puedes ejecutar el servidor en dos modos diferentes:

-**Modo desarrollo**:
npm run start:dev

-**Modo producción:**
npm run start:prod

# 6. Acceder a la documentación de la API

Una vez que el servidor esté en ejecución, accede a la documentación de la API en:
http://localhost:3000/swagger

## Scripts Disponibles

npm run start: Inicia la aplicación en modo producción.
npm run start:dev: Inicia la aplicación en modo desarrollo.
npm run build: Compila la aplicación.
npm run test: Ejecuta las pruebas.
npm run lint: Analiza el código para encontrar problemas.
