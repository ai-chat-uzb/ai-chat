import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getIsAuthenticated, getIsLogined, getUser, isReset } from 'store/slice';

const useAuth = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const isLogined = useSelector(getIsLogined);
  const isAuthenticated = useSelector(getIsAuthenticated);
  const navigate = useNavigate();
  const reset = () => {
    dispatch(isReset);
    navigate('/');
  };

  return { user, isLogined, isAuthenticated, reset };
};

export default useAuth;
