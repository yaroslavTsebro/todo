import { Injectable } from '@nestjs/common';
import { PaginationQueryDto, PaginationResult } from 'src/shared/dto/pagination';
import { TaskListDao } from '../dao/task-list.dao';
import { TaskList } from 'src/shared/dto/entities/task-list';
import { UpdateProjectDto } from 'src/shared/dto/task-list/update';
import { In } from 'typeorm';

@Injectable()
export class TaskListRepository {
  constructor(private readonly dao: TaskListDao) { }

  async delete(id: number): Promise<TaskList> {
    const taskToDelete = await this.findById(id);

    if (taskToDelete) { await this.dao.delete({ id }); }

    return taskToDelete
  }

  async findById(id: number): Promise<TaskList | null> {
    return this.dao.findOne({ where: { id } });
  }

  async findByIds(ids: number[]): Promise<TaskList[] | null> {
    if (!ids || ids.length === 0) {
      return null;
    }

    const taskLists = await this.dao.find({
      where: {
        id: In(ids),
      },
    });

    return taskLists.length > 0 ? taskLists : null;
  }

  async findAllByTaskListId(filters: Partial<TaskList>, sortOptions: object, pagination: PaginationQueryDto): Promise<PaginationResult<TaskList> | null> {
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
    } as PaginationResult<TaskList>;
  }

  async create(task: TaskList): Promise<TaskList> {
    const userEnt = this.dao.create(task);
    return this.dao.save(userEnt);
  }

  async update(id: number, dto: UpdateProjectDto): Promise<TaskList> {
    const taskToUpdate = await this.findById(id);

    if (taskToUpdate) { await this.dao.update({ id }, { ...dto }); }

    return taskToUpdate;
  }
}