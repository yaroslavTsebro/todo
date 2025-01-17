import { RouteObject, createBrowserRouter } from 'react-router-dom';
import SignInPage from '../pages/SignInPage';

export const routes: RouteObject[] = [
  {
    path: '/signin',
    Component: SignInPage,
  },
  {
    path: '/signup',
    Component: SignInPage,
  },
];

const router = createBrowserRouter(routes);

export default router;
