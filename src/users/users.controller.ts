import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';

@Controller('users') // Define un controlador para las rutas que comienzan con 'users'.
export class UsersController {
  constructor(private readonly usersService: UsersService) {} // Inyecta el servicio de usuarios a través del constructor.

  @Post('register') // Define una ruta POST para 'users/register'.
  async register(@Body() createUserDto: Prisma.UserCreateInput) {
    // Llama al método create del servicio de usuarios, pasando los datos del usuario a crear.
    return this.usersService.create(createUserDto);
  }

  @Get(':id') // Define una ruta GET para 'users/:id'.
  async findOne(@Param('id') id: string) {
    // Llama al método findOneById del servicio de usuarios, pasando el id del usuario.
    return this.usersService.findOneById(Number(id));
  }
}
