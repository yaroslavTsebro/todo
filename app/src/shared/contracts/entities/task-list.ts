import { ITask } from './task';
import { IUserTaskList } from './user-task-list';

export interface ITaskList {
  id: number;
  name: string;
  description?: string;
  tasks: ITask[];
  userTaskLists: IUserTaskList[];
  createdAt: Date;
  updatedAt?: Date;
}