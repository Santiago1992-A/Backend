import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
  NotFoundException,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './create-task.dto';
import { UpdateTaskDto } from './update-task.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiOperation, ApiTags, ApiParam, ApiQuery } from '@nestjs/swagger';

// Agrega etiquetas a Swagger para el grupo de rutas de tareas.
@ApiTags('tasks')
@Controller('tasks') // Define un controlador para las rutas que comienzan con 'tasks'.
@UseGuards(JwtAuthGuard) // Protege todas las rutas en este controlador con el guard JWT.
export class TaskController {
  constructor(private readonly taskService: TaskService) {} // Inyecta el servicio de tareas a través del constructor.

  @Get() // Define una ruta GET para 'tasks/'.
  // Agrega una descripción y un resumen a la operación de la API para Swagger.
  @ApiOperation({
    summary: 'Obtener todas las tareas', // Breve descripción del endpoint
    description:
      'Recupera una lista de todas las tareas del usuario autenticado.', // Descripción detallada del endpoint
  })
  @ApiQuery({
    name: 'status', // Nombre del parámetro
    type: 'string', // Tipo del parámetro
    description: 'Filtrar tareas por estado', // Descripción del parámetro
    required: false, // Indica que este parámetro es opcional
  })
  async getAllTasks(@Request() req, @Query('status') status?: string) {
    // Llama al método getAllTasks del servicio de tareas, pasando el userId del usuario autenticado y el parámetro de consulta opcional 'status'.
    return this.taskService.getAllTasks(req.user.userId, status);
  }

  @Post() // Define una ruta POST para 'tasks/'.
  // Agrega una descripción y un resumen a la operación de la API para Swagger.
  @ApiOperation({
    summary: 'Crear una nueva tarea', // Breve descripción del endpoint
    description:
      'Crea una nueva tarea proporcionando los datos necesarios en el cuerpo de la solicitud.', // Descripción detallada del endpoint
  })
  async createTask(@Request() req, @Body() data: CreateTaskDto) {
    console.log(req.user);
    // Llama al método createTask del servicio de tareas, pasando el userId del usuario autenticado y los datos de la nueva tarea.
    return this.taskService.createTask(req.user.userId, data);
  }

  @Get(':id') // Define una ruta GET para 'tasks/:id'.
  // Agrega una descripción y un resumen a la operación de la API para Swagger.
  @ApiOperation({
    summary: 'Obtener detalles de una tarea', // Breve descripción del endpoint
    description:
      'Recupera la información de una tarea específica usando su ID.', // Descripción detallada del endpoint
  })
  @ApiParam({
    name: 'id', // Nombre del parámetro
    type: 'string', // Tipo del parámetro
    description: 'ID de la tarea a recuperar', // Descripción del parámetro
    required: true, // Indica que este parámetro es requerido
  })
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
  // Agrega una descripción y un resumen a la operación de la API para Swagger.
  @ApiOperation({
    summary: 'Eliminar una tarea', // Breve descripción del endpoint
    description: 'Elimina una tarea específica usando su ID.', // Descripción detallada del endpoint
  })
  @ApiParam({
    name: 'id', // Nombre del parámetro
    type: 'string', // Tipo del parámetro
    description: 'ID de la tarea a eliminar', // Descripción del parámetro
    required: true, // Indica que este parámetro es requerido
  })
  async deleteTask(@Request() req, @Param('id') id: string) {
    try {
      // Llama al método deleteTask del servicio de tareas, pasando el userId del usuario autenticado y el id de la tarea.
      return await this.taskService.deleteTask(req.user.userId, Number(id));
    } catch (error) {
      throw new NotFoundException('Tarea no existe'); // Lanza una excepción si la tarea no es encontrada.
    }
  }

  @Put(':id') // Define una ruta PUT para 'tasks/:id'.
  // Agrega una descripción y un resumen a la operación de la API para Swagger.
  @ApiOperation({
    summary: 'Actualizar una tarea', // Breve descripción del endpoint
    description:
      'Actualiza una tarea existente proporcionando los datos necesarios en el cuerpo de la solicitud.', // Descripción detallada del endpoint
  })
  @ApiParam({
    name: 'id', // Nombre del parámetro
    type: 'string', // Tipo del parámetro
    description: 'ID de la tarea a actualizar', // Descripción del parámetro
    required: true, // Indica que este parámetro es requerido
  })
  async updateTask(
    @Request() req,
    @Param('id') id: string,
    @Body() data: UpdateTaskDto,
  ) {
    // Llama al método updateTask del servicio de tareas, pasando el userId del usuario autenticado, el id de la tarea y los datos actualizados.
    return this.taskService.updateTask(req.user.userId, Number(id), data);
  }
}
