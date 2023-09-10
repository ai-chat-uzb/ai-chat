import { useQuery } from '@tanstack/react-query';
import { axiosPrivate } from 'service/axios';

import { historyList } from '../mappers';
import { Types } from '..';

const useHistory = () =>
  useQuery<Types.IQuery.Response, any, Types.IQuery.Response>(['history', 'list'], async () => {
    const { data } = await axiosPrivate.get('/history');

    return historyList(data);
  });

export default useHistory;
