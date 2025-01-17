import { Inject } from '@nestjs/common';
import { Dao } from './abstract.dao';
import { DbClient } from '../db-client.service';
import { UserTaskList } from 'src/shared/dto/entities/user-task-list';

export class UserTaskListDao extends Dao<UserTaskList> {
  constructor(@Inject(DbClient) dataSource: DbClient) {
    super(UserTaskList, dataSource);
  }
}
