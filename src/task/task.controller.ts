import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
  NotFoundException,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './create-task.dto';
import { UpdateTaskDto } from './update-task.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('tasks') // Define un controlador para las rutas que comienzan con 'tasks'.
@UseGuards(JwtAuthGuard) // Protege todas las rutas en este controlador con el guard JWT.
export class TaskController {
  constructor(private readonly taskService: TaskService) {} // Inyecta el servicio de tareas a través del constructor.

  @Get() // Define una ruta GET para 'tasks/'.
  async getAllTasks(@Request() req) {
    // Llama al método getAllTasks del servicio de tareas, pasando el userId del usuario autenticado.
    return this.taskService.getAllTasks(req.user.userId);
  }

  @Post() // Define una ruta POST para 'tasks/'.
  async createTask(@Request() req, @Body() data: CreateTaskDto) {
    console.log(req.user);
    // Llama al método createTask del servicio de tareas, pasando el userId del usuario autenticado y los datos de la nueva tarea.
    return this.taskService.createTask(req.user.userId, data);
  }

  @Get(':id') // Define una ruta GET para 'tasks/:id'.
  async getTasksById(@Request() req, @Param('id') id: string) {
    // Llama al método getTasksById del servicio de tareas, pasando el userId del usuario autenticado y el id de la tarea.
    const taskFound = await this.taskService.getTasksById(
      req.user.userId,
      Number(id),
    );
    if (!taskFound) throw new NotFoundException('Tarea no existe'); // Lanza una excepción si la tarea no es encontrada.
    return taskFound;
  }

  @Delete(':id') // Define una ruta DELETE para 'tasks/:id'.
  async deleteTask(@Request() req, @Param('id') id: string) {
    try {
      // Llama al método deleteTask del servicio de tareas, pasando el userId del usuario autenticado y el id de la tarea.
      return await this.taskService.deleteTask(req.user.userId, Number(id));
    } catch (error) {
      throw new NotFoundException('Tarea no existe'); // Lanza una excepción si la tarea no es encontrada.
    }
  }

  @Put(':id') // Define una ruta PUT para 'tasks/:id'.
  async updateTask(
    @Request() req,
    @Param('id') id: string,
    @Body() data: UpdateTaskDto,
  ) {
    // Llama al método updateTask del servicio de tareas, pasando el userId del usuario autenticado, el id de la tarea y los datos actualizados.
    return this.taskService.updateTask(req.user.userId, Number(id), data);
  }
}
