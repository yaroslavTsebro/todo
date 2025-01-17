import { Inject } from '@nestjs/common';
import { Dao } from './abstract.dao';
import { DbClient } from '../db-client.service';
import { TaskList } from 'src/shared/dto/entities/task-list';

export class TaskListDao extends Dao<TaskList> {
  constructor(@Inject(DbClient) dataSource: DbClient) {
    super(TaskList, dataSource);
  }
}
