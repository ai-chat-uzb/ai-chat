import axios from 'service/axios';

import useAuth from './use-auth';

const useRefreshToken = () => {
  const { token, isRefreshToken, reset } = useAuth();

  const refresh = async () => {
    try {
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
    } catch (err) {
      // @ts-ignore
      console.log(err!.message);
      reset();
    }
    return [];
  };

  return refresh;
};

export default useRefreshToken;
