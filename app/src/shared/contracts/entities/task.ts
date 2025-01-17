import { ITaskList } from './task-list';

export enum TaskStatus {
  NOT_DONE = 'NOT_DONE',
  DONE = 'DONE',
}

export interface ITask {
  id: number;
  title: string;
  description?: string;
  taskList: ITaskList;
  status: TaskStatus;
  createdAt: Date;
  updatedAt?: Date;
}
