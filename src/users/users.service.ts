import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {} // Inyecta el servicio de Prisma a través del constructor.

  // Método para crear un nuevo usuario.
  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data: {
        ...data, // Desestructura y pasa los datos del usuario.
      },
    });
  }

  // Método para buscar un usuario por su email.
  async findOneByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email }, // Filtra el usuario por el email proporcionado.
    });
  }

  // Método para buscar un usuario por su ID.
  async findOneById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id }, // Filtra el usuario por el ID proporcionado.
    });
  }

  // Método para obtener todos los usuarios, con un filtro opcional por nombre de usuario.
  async getAllUsers(username?: string): Promise<User[]> {
    const where: any = {};
    if (username) {
      where.username = username; // Agrega el filtro por nombre de usuario si se proporciona.
    }
    return this.prisma.user.findMany({ where });
  }
}
