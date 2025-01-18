import { AuthApi, Configuration, TaskListApi, TasksApi, UsersApi } from '../openapi';
import { getTokens } from '../utils/tokenStorage';

const token = getTokens()?.accessToken;

const configuration = new Configuration({
  headers: { authorization: token ?  `Bearer ${token}` : '' },
  basePath: import.meta.env.VITE_APP_BASE_URL,
});

export const taskApi = new TasksApi(configuration);
export const userApi = new UsersApi(configuration);
export const taskListApi = new TaskListApi(configuration);
export const authApi = new AuthApi(configuration);

userApi.userControllerGetProfile()