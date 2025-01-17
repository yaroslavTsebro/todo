import { Global, Module } from '@nestjs/common';
import { DbModule } from '../db.module';
import { UserRepository } from './user.repository';
import { AuthProviderRepository } from './auth-provider.repository';
import { TaskRepository } from './task.repository';
import { TaskListRepository } from './task-list.repository';
import { UserTaskListRepository } from './user-task-list.repository';

const repositories = [
  UserRepository,
  AuthProviderRepository,
  TaskRepository,
  TaskListRepository,
  UserTaskListRepository,
];

@Global()
@Module({
  imports: [DbModule],
  providers: [...repositories],
  exports: [...repositories],
})
export class RepositoriesModule { }
