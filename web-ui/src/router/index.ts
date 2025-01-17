import App from '../App';

export const routes: RouteObject[] = [
  {
    path: '/',
    Component: App,
    children: [
      {
        path: '/',
        Component: StartPage,
      },
      {
        path: '/signin',
        Component: SignIn,
      },
      {
        path: '/signup',
        Component: SignUp,
      },
      {
        path: '/projects',
        Component: Projects,
      },
      {
        path: '/design',
        Component: Design,
      },
      {
        path: '/data',
        Component: Data,
      },
      {
        path: '/actions',
        Component: Actions,
      },
      {
        path: '/settings',
        Component: Settings,
      },
      {
        path: '/preview',
        Component: Preview,
      },
    ]
  },
];

const router = createBrowserRouter(routes);

export default router;
