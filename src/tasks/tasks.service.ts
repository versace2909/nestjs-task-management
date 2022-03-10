import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto, UpdateTaskDto } from './createTaskDto';
import { Task } from './entities/task.entity';
import { TasksRepository } from './entities/tasks.repository';
import { GetTaskFilterDto } from './get-task-filter.dto';
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository) private taskRepository: TasksRepository,
  ) {}

  async getTaskById(id: string): Promise<Task> {
    const found = await this.taskRepository.findOne({ id: id });
    if (!found)
      throw new NotFoundException(`The task with ${id} was not found.`);

    return found;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  async deleteTask(id: string) {
    const deleteResult = await this.taskRepository.delete(id);
    if (!deleteResult.affected) {
      throw new NotFoundException(`There is no task with Id = ${id}`);
    }
  }

  async updateTask(updateTask: UpdateTaskDto) {
    const task = await this.getTaskById(updateTask.id);
    task.status = updateTask.taskStatus;
    task.title = updateTask.title;
    task.description = updateTask.description;

    await this.taskRepository.save(task);
    return task;
  }

  async getAllTasks(taskFilter: GetTaskFilterDto): Promise<Task[]> {
    const tasks = await this.taskRepository.getTasks(taskFilter);
    return tasks;
  }

  // getTaskById(id: string): Task {
  //   const found = this.tasks.find((x) => x.id === id);
  //   if (!found) {
  //     throw new NotFoundException(`Task with ${id} was not found.`);
  //   }
  //   return found;
  // }
  // createTask(title: string, description: string): Task {
  //   const task: Task = {
  //     id: uuid(),
  //     title: title,
  //     description: description,
  //     status: TaskStatus.OPEN,
  //   };
  //   this.tasks.push(task);
  //   return task;
  // }
  // deleteTask(id: string): void {
  //   const found = this.getTaskById(id);
  //   this.tasks.filter((x) => x.id !== found.id);
  // }
  // updateTask(updateTask: UpdateTaskDto) {
  //   const updatedTask = this.tasks.find((x) => x.id === updateTask.id);
  //   if (updatedTask) {
  //     updatedTask.description = updateTask.description;
  //     updatedTask.title = updateTask.title;
  //     updatedTask.status = updateTask.taskStatus;
  //     return updateTask;
  //   } else {
  //     return 'There is no task with id' + updateTask.id;
  //   }
  // }
}
