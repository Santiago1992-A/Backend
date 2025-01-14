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
    const user = await this.usersService.findOneByEmail(email);
    if (user) {
      const isPasswordValid = await bcrypt.compare(pass, user.password);
      if (isPasswordValid) {
        return user;
      }
    }
    return null;
  }

  // Método para manejar el inicio de sesión.
  async login(authCredentials: any) {
    const user = await this.validateUser(
      authCredentials.email,
      authCredentials.password,
    );

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = {
      userId: user.id,
      email: user.email,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  // Método para manejar el registro de nuevos usuarios, con un parámetro opcional de código de referencia.
  async register(userDto: any, referralCode?: string) {
    console.log('Datos recibidos en el backend:', userDto);
    userDto.password = await this.hashPassword(userDto.password);
    console.log('Datos del usuario después del hash:', userDto);

    // Puedes manejar el código de referencia aquí, si es necesario.
    if (referralCode) {
      console.log('Código de referencia:', referralCode);
      // Implementa lógica adicional para el código de referencia si es necesario.
    }

    return this.usersService.create({
      ...userDto,
    });
  }

  // Método privado para hashear la contraseña.
  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  // Método para manejar el cierre de sesión.
  async logout() {
    return { message: 'Cerrada la sesión' };
  }
}
