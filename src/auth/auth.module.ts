import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  // Define las importaciones, controladores y proveedores de este módulo.
  imports: [
    UsersModule, // Importa el módulo de usuarios para usar sus servicios.
    PassportModule, // Importa el módulo de Passport para la autenticación.
    JwtModule.register({
      // Configura el módulo de JWT con las opciones necesarias.
      secret: 'secretKey', // Define la clave secreta para firmar los tokens.
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [AuthController], // Declara el controlador de autenticación para manejar las rutas de este módulo.
  providers: [AuthService, JwtStrategy], // Declara los proveedores de servicios que se usarán en este módulo: AuthService y JwtStrategy.
})
export class AuthModule {}
