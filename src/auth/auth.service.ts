import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // Método para validar al usuario con su email y contraseña.
  async validateUser(email: string, pass: string): Promise<any> {
    // Busca al usuario por su email usando el servicio de usuarios.
    const user = await this.usersService.findOneByEmail(email);

    console.log('Usuario encontrado:', user);
    console.log('Contraseña proporcionada:', pass);

    if (user) {
      // Compara la contraseña proporcionada con la contraseña hasheada almacenada.
      const isPasswordValid = await bcrypt.compare(pass, user.password);
      console.log('Contraseña válida:', isPasswordValid);

      if (isPasswordValid) {
        return user; // Retorna el usuario si la contraseña es válida.
      }
    }
    return null; // Retorna null si el usuario no existe o la contraseña no es válida.
  }

  // Método para manejar el inicio de sesión.
  async login(authCredentials: any) {
    // Valida al usuario con las credenciales proporcionadas.
    const user = await this.validateUser(
      authCredentials.email,
      authCredentials.password,
    );

    console.log('Usuario después de la validación:', user);

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas'); // Lanza una excepción si las credenciales son inválidas.
    }

    // Define el payload para el token JWT.
    const payload = {
      userId: user.id,
      email: user.email,
    };

    // Retorna el token de acceso firmado con el payload.
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  // Método para manejar el registro de nuevos usuarios.
  async register(userDto: any) {
    console.log('Datos recibidos en el backend:', userDto);
    // Hashea la contraseña antes de almacenar el usuario.
    userDto.password = await this.hashPassword(userDto.password);
    console.log('Datos del usuario después del hash:', userDto);

    // Crea un nuevo usuario usando el servicio de usuarios.
    return this.usersService.create({
      ...userDto,
    });
  }

  // Método privado para hashear la contraseña.
  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10); // Genera una sal con un factor de costo de 10.
    const hashedPassword = await bcrypt.hash(password, salt); // Hashea la contraseña usando la sal generada.
    console.log('Contraseña hasheada:', hashedPassword);
    return hashedPassword; // Retorna la contraseña hasheada.
  }

  // Método para manejar el cierre de sesión.
  async logout() {
    return { message: 'Cerrada la sesión' };
  }
}
