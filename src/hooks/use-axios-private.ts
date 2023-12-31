import { useEffect } from 'react';
import { axiosPrivate } from 'service/axios';

import useAuth from './use-auth';
import useRefreshToken from './use-refresh-token';

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { isAccessToken } = useAuth();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      config => {
        if (!config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${isAccessToken}`;
        }
        return config;
      },
      error => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      response => response,
      async error => {
        const prevRequest = error?.config;

        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();

          prevRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [isAccessToken, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
