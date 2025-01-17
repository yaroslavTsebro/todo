import { ITaskList } from './task-list';
import { IUser } from './user';

export enum UserTaskListRole {
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
  VIEWER = 'VIEWER',
  WORKER = 'WORKER',
}

export interface IUserTaskList {
  id: number;
  user: IUser;
  taskList: ITaskList;
  role: UserTaskListRole;
  createdAt: Date;
  updatedAt?: Date;
}
