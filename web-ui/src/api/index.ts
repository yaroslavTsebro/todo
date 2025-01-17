import { AuthApi, Configuration, TasksApi, UsersApi } from '../openapi';
import { ProjectsApi } from '../openapi/apis/ProjectsApi';

const getAccessToken = async () => localStorage.getItem('persist._accessToken')!;

const configuration = new Configuration({
  accessToken: getAccessToken,
  basePath: import.meta.env.VITE_API_BASE_URL
});

export const taskApi = new TasksApi(configuration);
export const userApi = new UsersApi(configuration);
export const taskListApi = new ProjectsApi(configuration);
export const authApi = new AuthApi(configuration);