import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';
import { ApiOperation, ApiTags, ApiParam, ApiQuery } from '@nestjs/swagger';

// Agrega etiquetas a Swagger para el grupo de rutas de usuarios.
@ApiTags('users')
@Controller('users') // Define un controlador para las rutas que comienzan con 'users'.
export class UsersController {
  constructor(private readonly usersService: UsersService) {} // Inyecta el servicio de usuarios a través del constructor.

  @Post('register') // Define una ruta POST para 'users/register'.
  // Agrega una descripción y un resumen a la operación de la API para Swagger.
  @ApiOperation({
    summary: 'Registrar un nuevo usuario', // Breve descripción del endpoint
    description:
      'Crea un nuevo usuario proporcionando los datos necesarios en el cuerpo de la solicitud.', // Descripción detallada del endpoint
  })
  async register(@Body() createUserDto: Prisma.UserCreateInput) {
    // Llama al método create del servicio de usuarios, pasando los datos del usuario a crear.
    try {
      return await this.usersService.create(createUserDto);
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      throw new Error('No se pudo registrar el usuario.');
    }
  }

  @Get() // Define una ruta GET para 'users/'.
  // Agrega una descripción y un resumen a la operación de la API para Swagger.
  @ApiOperation({
    summary: 'Obtener todos los usuarios', // Breve descripción del endpoint
    description: 'Recupera una lista de todos los usuarios registrados.', // Descripción detallada del endpoint
  })
  @ApiQuery({
    name: 'username', // Nombre del parámetro
    type: 'string', // Tipo del parámetro
    description: 'Filtrar usuarios por nombre de usuario', // Descripción del parámetro
    required: false, // Indica que este parámetro es opcional
  })
  async getAllUsers(@Query('username') username?: string) {
    // Llama al método getAllUsers del servicio de usuarios, pasando el parámetro de consulta opcional 'username'.
    return this.usersService.getAllUsers(username);
  }

  @Get(':id') // Define una ruta GET para 'users/:id'.
  // Agrega una descripción y un resumen a la operación de la API para Swagger.
  @ApiOperation({
    summary: 'Obtener detalles de un usuario', // Breve descripción del endpoint
    description:
      'Recupera la información de un usuario específico usando su ID.', // Descripción detallada del endpoint
  })
  @ApiParam({
    name: 'id', // Nombre del parámetro
    type: 'string', // Tipo del parámetro
    description: 'ID del usuario a recuperar', // Descripción del parámetro
    required: true, // Indica que este parámetro es requerido
  })
  async findOne(@Param('id') id: string) {
    // Llama al método findOneById del servicio de usuarios, pasando el id del usuario.
    return this.usersService.findOneById(Number(id));
  }
}
