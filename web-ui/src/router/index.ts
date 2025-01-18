import { RouteObject, createBrowserRouter } from 'react-router-dom';
import SignInPage from '../pages/SignInPage';
import Layout from '../components/layouts/Main';
import MainPage from '../pages/MainPage';
import IndexPage from '../pages/IndexPage';
import SignUpPage from '../pages/SignUpPage';
import TaskListPage from '../pages/TaskListPage';

export const routes: RouteObject[] = [
  {
    path: '/signin',
    Component: SignInPage,
  },
  {
    path: '/signup',
    Component: SignUpPage,
  },
  {
    path: '/',
    Component: Layout,
    children: [
      {
        index: true,
        Component: IndexPage
      },
      {
        path: 'dashboard',
        Component: MainPage,
      },
      {
        path: 'project/:taskListId',
        Component: TaskListPage,
      },
    ]
  }
];

const router = createBrowserRouter(routes);

export default router;
