
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from 'src/shared/dto/task/create';
import { UpdateTaskDto } from 'src/shared/dto/task/update';
import { GetTasksDto } from 'src/shared/dto/task/get';
import { TaskRepository } from '../system/db/repositories/task.repository';
import { PaginationQueryDto } from 'src/shared/dto/pagination';
import { TaskListRepository } from '../system/db/repositories/task-list.repository';
import { Task } from 'src/shared/dto/entities/task';


@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepo: TaskRepository,
    private readonly taskListRepo: TaskListRepository,
  ) { }

  async create(taskListId: string, createTaskDto: CreateTaskDto) {
    const project = await this.taskListRepo.findById(taskListId);

    if (!project) { throw new NotFoundException('Project not found'); }

    const task = await this.taskRepo.create({ ...createTaskDto, taskList: { id: taskListId } } as Task);

    return task;
  }

  async update(taskId: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.taskRepo.findById(taskId);
    if (!task) { throw new NotFoundException('Task not found'); }

    return this.taskRepo.update(taskId, updateTaskDto);
  }

  async delete(taskId: number) {
    return this.taskRepo.delete(taskId);
  }

  async getById(taskId: number, taskListId: string) {
    const task = await this.taskRepo.findByTaskIdAndTaskListId(taskId, taskListId);

    if (!task) { throw new NotFoundException('Task not found') }

    return task
  }

  async getAll(taskListId: string, getTasksDto: GetTasksDto) {
    const { page = 1, limit = 10, sort, status } = getTasksDto;

    const filters: any = {};
    if (status) { filters.status = status }

    let sortOptions: any = { taskListId: taskListId };

    if (sort && Array.isArray(sort)) {
      sort.forEach((s) => {
        sortOptions[s.field] = s.order === 'asc' ? 1 : -1;
      });
    } else {
      sortOptions = { createdAt: -1 };
    }

    return this.taskRepo.findAllByTaskListId(filters, sortOptions, { page, limit } as PaginationQueryDto);
  }
}
