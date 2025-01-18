import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { RootState } from '../storage';
import { setAccessToken, clearUser } from '../storage/slices/user';
import { getTokens } from '../utils/tokenStorage';

const IndexPage: React.FC = () => {
  const route = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = useSelector((state: RootState) => state.user.accessToken);

  useEffect(() => {
    const { accessToken: storedAccessToken } = getTokens();

    if (storedAccessToken) {
      console.log(storedAccessToken)
      dispatch(setAccessToken(storedAccessToken));
    } else if (!accessToken && route.pathname !== '/signin' && route.pathname !== '/signup') {

      dispatch(clearUser());
      navigate('/signin');
    }
  }, [accessToken, route.pathname, dispatch, navigate]);

  return (<></>);
};


export default IndexPage;