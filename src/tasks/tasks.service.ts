import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { UpdateTaskDto } from './createTaskDto';
@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks() {
    return this.tasks;
  }

  getTaskById(id: string) {
    return this.tasks.find((x) => x.id === id);
  }

  createTask(title: string, description: string): Task {
    const task: Task = {
      id: uuid(),
      title: title,
      description: description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  deleteTask(id: string) {
    const index = this.tasks.findIndex((x) => x.id === id);
    this.tasks.splice(index, 1);
  }

  updateTask(updateTask: UpdateTaskDto) {
    const updatedTask = this.tasks.find((x) => x.id === updateTask.id);
    if (updatedTask) {
      updatedTask.description = updateTask.description;
      updatedTask.title = updateTask.title;
      return updateTask;
    } else {
      return 'There is no task with id' + updateTask.id;
    }
  }
}
