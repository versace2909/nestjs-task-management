import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateTaskDto, UpdateTaskDto } from './createTaskDto';
import { Task } from './entities/task.entity';
import { GetTaskFilterDto } from './get-task-filter.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getAllTasks(@Query() taskFilter?: GetTaskFilterDto) {
    return this.taskService.getAllTasks(taskFilter);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(createTaskDto);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string) {
    return this.taskService.deleteTask(id);
  }

  @Put()
  updateTask(@Body() task: UpdateTaskDto): Promise<Task> {
    return this.taskService.updateTask(task);
  }
}
