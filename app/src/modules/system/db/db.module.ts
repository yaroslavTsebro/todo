import { Global, Module } from '@nestjs/common';
import { DbClient } from './db-client.service';
import { ConfigModule } from '@nestjs/config';
import { AuthProviderDao } from './dao/auth-provider.dao';
import { UserDao } from './dao/user.dao';
import { TaskListDao } from './dao/task-list.dao';
import { TaskDao } from './dao/task.dao';
import { UserTaskListDao } from './dao/user-task-list.dao';

const daos = [
  AuthProviderDao,
  UserDao,
  TaskListDao,
  TaskDao,
  UserTaskListDao,
];


@Global()
@Module({
  imports: [ConfigModule], 
  exports: [...daos],
  providers: [DbClient, ...daos]
})
export class DbModule {}
