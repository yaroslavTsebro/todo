import { Inject } from '@nestjs/common';
import { Dao } from './abstract.dao';
import { DbClient } from '../db-client.service';
import { Task } from 'src/shared/dto/entities/task';

export class TaskDao extends Dao<Task> {
  constructor(@Inject(DbClient) dataSource: DbClient) {
    super(Task, dataSource);
  }
}
