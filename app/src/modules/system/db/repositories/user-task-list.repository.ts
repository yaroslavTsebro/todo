import { Injectable } from '@nestjs/common';
import { UserTaskListDao } from '../dao/user-task-list.dao';
import { UserTaskList } from 'src/shared/dto/entities/user-task-list';
import { PaginationQueryDto } from 'src/shared/dto/pagination';
import { UserTaskListPaginationResult } from 'src/shared/dto/pagination/task-list';
import { FindManyOptions } from 'typeorm';

@Injectable()
export class UserTaskListRepository {
  constructor(private readonly dao: UserTaskListDao) { }

  async delete(id: number): Promise<UserTaskList> {
    const taskToDelete = await this.findById(id);

    if (taskToDelete) { await this.dao.delete({ id }); }

    return taskToDelete
  }

  async findByUserAndTaskList(userId: number, taskListId: string): Promise<UserTaskList | null> {
    return this.dao.findOne({ where: { user: { id: userId }, taskList: { id: taskListId } } });
  }

  async findAllByProjectId(taskListId: string, pagination: PaginationQueryDto): Promise<UserTaskListPaginationResult | null> {
    const { page, limit } = pagination;
    const skip = (page - 1) * limit;

    const findOptions = {
      where: { taskList: {id: taskListId} },
      skip: skip,
      take: limit,
      relations: { user: true }
    } satisfies FindManyOptions<UserTaskList>;

    const [data, total] = await this.dao.findAndCount(findOptions);

    return {
      data: data || [],
      total,
      page,
      limit,
    };
  }
  async findAllByUserId(userId: number, pagination: PaginationQueryDto): Promise<UserTaskListPaginationResult | null> {
    const { page, limit } = pagination;
    const skip = (page - 1) * limit;

    const findOptions = {
      where: { user: { id: userId } },
      skip: skip,
      take: limit,
      relations: { taskList: true }
    } satisfies FindManyOptions<UserTaskList>;

    const [data, total] = await this.dao.findAndCount(findOptions);

    return {
      data: data || [],
      total,
      page,
      limit,
    };
  }

  async findById(id: number): Promise<UserTaskList | null> {
    return this.dao.findOne({ where: { id } });
  }

  async create(task: UserTaskList): Promise<UserTaskList> {
    const userEnt = this.dao.create(task);
    return this.dao.save(userEnt);
  }
}