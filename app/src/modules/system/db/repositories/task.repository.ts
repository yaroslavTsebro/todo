import { Injectable } from '@nestjs/common';
import { TaskDao } from '../dao/task.dao';
import { Task } from 'src/shared/dto/entities/task';
import { UpdateTaskDto } from 'src/shared/dto/task/update';
import { PaginationQueryDto, PagedData } from 'src/shared/dto/pagination';

@Injectable()
export class TaskRepository {
  constructor(private readonly dao: TaskDao) { }

  async delete(id: number): Promise<Task> {
    const taskToDelete = await this.findById(id);

    if (taskToDelete) { await this.dao.delete({ id }); }

    return taskToDelete
  }

  async findById(id: number): Promise<Task | null> {
    return this.dao.findOne({ where: { id } });
  }

  async findAllByTaskListId(filters: Partial<Task>, sortOptions: object, pagination: PaginationQueryDto): Promise<PagedData<Task> | null> {
    const { page, limit } = pagination;
    const skip = (page - 1) * limit;

    const [data, total] = await this.dao.findAndCount({
      where: filters,
      order: sortOptions,
      skip,
      take: limit,
    });

    return {
      data,
      total,
      page,
      limit,
    } as PagedData<Task>;
  }

  async findByTaskIdAndTaskListId(id: number, taskListId: string): Promise<Task | null> {
    return this.dao.findOne({ where: { id, taskList: { id: taskListId } } });
  }

  async create(task: Task): Promise<Task> {
    const userEnt = this.dao.create(task);
    return this.dao.save(userEnt);
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const taskToUpdate = await this.findById(id);

    if (taskToUpdate) { await this.dao.update({ id }, { ...updateTaskDto }); }

    return taskToUpdate;
  }
}