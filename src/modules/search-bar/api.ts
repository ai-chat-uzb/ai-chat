import { AxiosPromise } from 'axios';

import useAxiosPrivate from 'hooks/use-axios-private';

import * as Types from './type';

export const useSearchCall = ({ keyword }: Types.IApi.ISearchRequest): AxiosPromise<Types.IApi.ISearchResponse> => {
  const axiosPrivate = useAxiosPrivate();

  return axiosPrivate.get(`/search_user/`, {
    params: {
      keyword
    }
  });
};
