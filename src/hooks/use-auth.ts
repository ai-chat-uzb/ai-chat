import { useNavigate } from 'react-router-dom';
import { Types } from 'modules/create-account';
import { useDispatch, useSelector } from 'react-redux';
import {
  avatarUrlChange,
  changeToken,
  firstUsernameChange,
  getIsAccessToken,
  getIsAuthenticated,
  getIsFirstUsernameHandler,
  getIsLogined,
  getIsRefreshToken,
  getIsSettingsModal,
  getUser,
  isAuthenticatedChange,
  isReset,
  loginUser,
  settingsModalChange,
  usernameChange
} from 'store/slice';

const useAuth = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const isLogined = useSelector(getIsLogined);
  const isAuthenticated = useSelector(getIsAuthenticated);
  const isSettingsModal = useSelector(getIsSettingsModal);
  const isFirstUsernameModal = useSelector(getIsFirstUsernameHandler);
  const isAccessToken = useSelector(getIsAccessToken);
  const isRefreshToken = useSelector(getIsRefreshToken);
  const navigate = useNavigate();
  const reset = () => {
    dispatch(isReset());
    navigate('/');
  };

  const login = (user: Types.IForm.IUser) => {
    dispatch(
      loginUser({
        user
      })
    );
  };

  const token = (access: string, refresh?: string) => {
    dispatch(changeToken({ accessToken: access, refreshToken: refresh }));
  };

  const authenticated = () => {
    dispatch(isAuthenticatedChange());
  };

  const avatarUrlHandler = (avatarUrl: string) => {
    dispatch(avatarUrlChange({ avatarUrl }));
  };
  const settingsModalHandler = () => {
    dispatch(settingsModalChange());
  };
  const firstUsernameHandler = () => {
    dispatch(firstUsernameChange());
  };

  const usernameHandler = (username: string) => {
    dispatch(usernameChange({ username }));
  };

  return {
    user,
    isLogined,
    isAuthenticated,
    reset,
    token,
    authenticated,
    login,
    avatarUrlHandler,
    settingsModalChange,
    settingsModalHandler,
    isSettingsModal,
    firstUsernameHandler,
    isFirstUsernameModal,
    usernameHandler,
    isAccessToken,
    isRefreshToken
  };
};

export default useAuth;
