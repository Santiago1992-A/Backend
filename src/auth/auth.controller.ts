import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags, ApiBody } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth') // Define un controlador para las rutas que comienzan con 'auth'.
export class AuthController {
  constructor(private authService: AuthService) {} // Inyecta el servicio de autenticación a través del constructor.

  @Post('login') // Define una ruta POST para 'auth/login'.
  // Agrega una descripción y un resumen a la operación de la API para Swagger.
  @ApiOperation({
    summary: 'Iniciar sesión', // Breve descripción del endpoint
    description:
      'Permite a un usuario autenticarse en la plataforma proporcionando sus credenciales.', // Descripción detallada del endpoint
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'usuario@example.com' },
        password: { type: 'string', example: 'password123' },
      },
      required: ['email', 'password'],
    },
  })
  async login(@Body() loginUserDto: any) {
    // Usa 'any' para el tipo de dato
    // Define un método de login que acepta datos en el cuerpo de la solicitud.
    return this.authService.login(loginUserDto); // Llama al método login del servicio de autenticación con los datos proporcionados.
  }

  @Post('register') // Define una ruta POST para 'auth/register'.
  // Agrega una descripción y un resumen a la operación de la API para Swagger.
  @ApiOperation({
    summary: 'Registrar un nuevo usuario', // Breve descripción del endpoint
    description:
      'Crea una nueva cuenta de usuario proporcionando los datos necesarios en el cuerpo de la solicitud.', // Descripción detallada del endpoint
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'usuario@example.com' },
        password: { type: 'string', example: 'password123' },
        username: { type: 'string', example: 'usuario123' },
      },
      required: ['email', 'password', 'username'],
    },
  })
  async register(@Body() registerUserDto: any) {
    // Usa 'any' para el tipo de dato
    // Define un método de registro que acepta datos en el cuerpo de la solicitud.
    return this.authService.register(registerUserDto); // Llama al método register del servicio de autenticación con los datos proporcionados.
  }

  @Post('logout') // Define una ruta POST para 'auth/logout'.
  // Agrega una descripción y un resumen a la operación de la API para Swagger.
  @ApiOperation({
    summary: 'Cerrar sesión', // Breve descripción del endpoint
    description: 'Permite a un usuario cerrar su sesión en la plataforma.', // Descripción detallada del endpoint
  })
  async logout() {
    // Define un método de cierre de sesión.
    return this.authService.logout(); // Llama al método logout del servicio de autenticación.
  }
}
