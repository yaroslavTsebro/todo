import { IAuthProvider } from './auth-provider';
import { IUserTaskList } from './user-task-list';

export interface IUser {
  id: number;
  email: string;
  name?: string;
  authProvider: IAuthProvider;
  userTaskLists: IUserTaskList[]
}