import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useAuth } from 'hooks';
// import { isAuthenticated } from 'store/slice';

const useAuthToken = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const { search } = useLocation();
  const paramToken = search.slice(13, search.length);

  // if (paramToken === user?.accessToken) {
  //   dispatch(isAuthenticated());
  // }
};

export default useAuthToken;
