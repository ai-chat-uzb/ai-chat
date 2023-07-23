import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeToken,
  getIsAuthenticated,
  getIsLogined,
  getUser,
  isAuthenticatedChange,
  isReset,
  loginUser
} from 'store/slice';

const useAuth = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const isLogined = useSelector(getIsLogined);
  const isAuthenticated = useSelector(getIsAuthenticated);
  const navigate = useNavigate();
  const reset = () => {
    dispatch(isReset());
    navigate('/');
  };

  const login = (firstName: string, email: 'string') => {
    dispatch(
      loginUser({
        user: {
          firstName,
          email
        }
      })
    );
  };

  const token = (token: string) => {
    dispatch(changeToken({ accessToken: token }));
  };

  const authenticated = () => {
    dispatch(isAuthenticatedChange());
  };

  return { user, isLogined, isAuthenticated, reset, token, authenticated, login };
};

export default useAuth;
