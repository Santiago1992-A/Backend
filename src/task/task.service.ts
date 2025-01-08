import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Task } from '@prisma/client';
import { CreateTaskDto } from './create-task.dto';
import { UpdateTaskDto } from './update-task.dto';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {} // Inyecta el servicio de Prisma a través del constructor.

  // Método para obtener todas las tareas de un usuario específico.
  async getAllTasks(userId: number): Promise<Task[]> {
    return this.prisma.task.findMany({
      where: { userId }, // Filtra las tareas por el userId proporcionado.
    });
  }

  // Método para obtener una tarea específica por su ID y el ID del usuario.
  async getTasksById(userId: number, id: number): Promise<Task | null> {
    return this.prisma.task.findFirst({
      where: { id, userId }, // Filtra la tarea por el id y el userId proporcionados.
    });
  }

  // Método para crear una nueva tarea para un usuario específico.
  async createTask(userId: number, data: CreateTaskDto): Promise<Task> {
    return this.prisma.task.create({
      data: {
        title: data.title, // Título de la tarea.
        description: data.description, // Descripción de la tarea.
        dueDate: new Date(data.dueDate), // Fecha de vencimiento de la tarea.
        status: data.status, // Estado de la tarea.
        userId: userId, // ID del usuario propietario de la tarea.
      },
    });
  }

  // Método para actualizar una tarea específica por su ID y el ID del usuario.
  async updateTask(
    userId: number,
    id: number,
    data: UpdateTaskDto,
  ): Promise<Task | null> {
    const updatedTasks = await this.prisma.task.updateMany({
      where: { id, userId }, // Filtra la tarea por el id y el userId proporcionados.
      data, // Datos actualizados de la tarea.
    });

    if (updatedTasks.count > 0) {
      return this.getTasksById(userId, id); // Retorna la tarea actualizada si la actualización fue exitosa.
    } else {
      return null; // Retorna null si la tarea no fue encontrada.
    }
  }

  // Método para eliminar una tarea específica por su ID y el ID del usuario.
  async deleteTask(userId: number, id: number): Promise<Task | null> {
    const deletedTasks = await this.prisma.task.deleteMany({
      where: { id, userId }, // Filtra la tarea por el id y el userId proporcionados.
    });

    if (deletedTasks.count > 0) {
      // Retorna un objeto representando la tarea eliminada.
      return {
        id,
        title: '',
        description: '',
        dueDate: new Date(),
        status: '',
        userId,
      };
    } else {
      return null; // Retorna null si la tarea no fue encontrada.
    }
  }
}
