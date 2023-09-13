import { useQuery } from '@tanstack/react-query';
import { axiosPrivate } from 'service/axios';

import { Mappers, Types } from '..';

const useUserList = () =>
  useQuery<Types.IQuery.Response, any, Types.IQuery.Response>(['users', 'list'], async () => {
    const { data } = await axiosPrivate.get('/history');

    return Mappers.userList(data);
  });

export default useUserList;
