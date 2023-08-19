import axios from 'api/axios';

import useAuth from './use-auth';

const useRefreshToken = () => {
  const { token, isRefreshToken } = useAuth();
  const refresh = async () => {
    const response = await axios.post(
      '/token/refresh/',
      {
        refresh: isRefreshToken
      },
      {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      }
    );

    token(response?.data.access);
    return response.data.access;
  };

  return refresh;
};

export default useRefreshToken;
