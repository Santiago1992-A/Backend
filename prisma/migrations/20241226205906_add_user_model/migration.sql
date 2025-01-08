/*
  Warnings:
  - Added the required column `userId` to the `Task` table without a default value. This is not possible if the table is not empty.
*/

-- AlterTable: Añadir columna userId opcionalmente
ALTER TABLE `Task` ADD COLUMN `userId` INTEGER;

-- Actualizar tareas existentes para asignarles un usuario específico
-- Asumamos que el ID del usuario creado es 1 (puedes verificar el ID generado en la tabla `User`)
UPDATE `Task` SET `userId` = 1 WHERE `userId` IS NULL;

-- Hacer que la columna sea obligatoria
ALTER TABLE `Task` MODIFY `userId` INTEGER NOT NULL;

-- Crear tabla de usuarios
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Añadir clave foránea
ALTER TABLE `Task` ADD CONSTRAINT `Task_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
