import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [UsersService, PrismaService], // Declara los proveedores de servicios que se usarán en este módulo: UsersService y PrismaService.
  controllers: [UsersController], // Declara el controlador de usuarios para manejar las rutas de este módulo.
  exports: [UsersService], // Exporta el servicio de usuarios para que pueda ser utilizado en otros módulos.
})
export class UsersModule {} // Exporta el módulo de usuarios para ser usado en la aplicación.
