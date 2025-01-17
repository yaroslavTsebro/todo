import { Injectable } from '@nestjs/common';
import { UserTaskListDao } from '../dao/user-task-list.dao';
import { UserTaskList } from 'src/shared/dto/entities/user-task-list';
import { PaginationQueryDto, PaginationResult } from 'src/shared/dto/pagination';

@Injectable()
export class UserTaskListRepository {
  constructor(private readonly dao: UserTaskListDao) { }

  async delete(id: number): Promise<UserTaskList> {
    const taskToDelete = await this.findById(id);

    if (taskToDelete) { await this.dao.delete({ id }); }

    return taskToDelete
  }

  async findByUserAndTaskList(userId: number, taskListId: number): Promise<UserTaskList | null> {
    return this.dao.findOne({ where: { user: { id: userId }, taskList: { id: taskListId } } });
  }

  async findAllByUserId(userId: number, pagination: PaginationQueryDto): Promise<PaginationResult<UserTaskList> | null> {
    const { page, limit } = pagination;
    const skip = (page - 1) * limit;

    const findOptions = {
      where: { user: { id: userId } },
      skip: skip,
      take: limit,
    };

    const [data, total] = await this.dao.findAndCount(findOptions);

    if (total === 0) {
      return null;
    }

    return {
      data,
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