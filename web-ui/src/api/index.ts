import { AuthApi, Configuration, TaskListApi, TasksApi, UsersApi } from '../openapi';
import { getTokens } from '../utils/tokenStorage';

const configuration = new Configuration({
  basePath: import.meta.env.VITE_APP_BASE_URL,
  middleware: [
    {
      pre: async (context) => {
        const token = getTokens()?.accessToken || '';
        console.dir(token);
        if (token) {
          context.init.headers = {
            ...context.init.headers,
            Authorization: `Bearer ${token}`,
          };
        }
        return context;
      },
    },
  ],
});

export const taskApi = new TasksApi(configuration);
export const userApi = new UsersApi(configuration);
export const taskListApi = new TaskListApi(configuration);
export const authApi = new AuthApi(configuration);