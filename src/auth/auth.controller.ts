import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth') // Define un controlador para las rutas que comienzan con 'auth'.
export class AuthController {
  constructor(private authService: AuthService) {} // Inyecta el servicio de autenticación a través del constructor.

  @Post('login') // Define una ruta POST para 'auth/login'.
  async login(@Body() loginUserDto: any) {
    // Define un método de login que acepta datos en el cuerpo de la solicitud.
    return this.authService.login(loginUserDto); // Llama al método login del servicio de autenticación con los datos proporcionados.
  }

  @Post('register') // Define una ruta POST para 'auth/register'.
  async register(@Body() registerUserDto: any) {
    // Define un método de registro que acepta datos en el cuerpo de la solicitud.
    return this.authService.register(registerUserDto); // Llama al método register del servicio de autenticación con los datos proporcionados.
  }

  @Post('logout') // Define una ruta POST para 'auth/logout'.
  async logout() {
    // Define un método de cierre de sesión.
    return this.authService.logout(); // Llama al método logout del servicio de autenticación.
  }
}
