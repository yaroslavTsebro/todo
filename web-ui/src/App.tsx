import { RouterProvider, useLocation, useNavigate } from 'react-router-dom';
import router from './router';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store, { RootState } from './storage';
import { useEffect } from 'react';
import { clearUser, setAccessToken } from './storage/slices/user';
import { getTokens } from './utils/tokenStorage';


const App: React.FC = () => {
  const route = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = useSelector((state: RootState) => state.user.accessToken);

  useEffect(() => {
    const { accessToken: storedAccessToken } = getTokens();

    if (storedAccessToken) {

      dispatch(setAccessToken(storedAccessToken));
    } else if (!accessToken && route.pathname !== '/signin' && route.pathname !== '/signup') {

      dispatch(clearUser());
      navigate('/signin');
    }
  }, [accessToken, route.pathname, dispatch, navigate]);

  return (
    <Provider store={store}>
      < RouterProvider router={router} />
    </Provider>
  );
};

export default App;

