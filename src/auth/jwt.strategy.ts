import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // Configura cómo se extraerá el token JWT de la solicitud.
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extrae el token JWT del encabezado de autorización como un Bearer token.
      ignoreExpiration: false, // No ignores la expiración del token, rechaza los tokens expirados.
      secretOrKey: 'secretKey', // Asegúrate de usar la misma clave secreta que en JwtModule para verificar la firma del token.
    });
  }

  // Método para validar el payload del token JWT.
  async validate(payload: any) {
    // Retorna un objeto con los datos del usuario que se incluirán en el contexto de la solicitud.
    return { userId: payload.userId, email: payload.email };
  }
}
