import { useQuery } from '@tanstack/react-query';
import { toast } from 'ai-ui-kit/lib/components';

import useAxiosPrivate from 'hooks/use-axios-private';

import { Mappers, Types } from '..';

const useSearch = ({ keyword = '' }: Types.IQuery.IQueryRequest): Types.IQuery.IUseQueryResponse => {
  const axiosPrivate = useAxiosPrivate();
  const initialData = { users: {} } as Types.IQuery.IQueryResponse;

  const { data = initialData, isLoading } = useQuery<Types.IQuery.IQueryResponse, any, Types.IQuery.IQueryResponse>(
    [`search/${keyword}`, 'lits'],
    async () => {
      const { data } = await axiosPrivate.get(`/search_user/`, {
        params: {
          keyword
        }
      });

      return Mappers.SearchList(data);
    },
    {
      onError: (err: any) => {
        toast.error({ content: err.message });
      }
    }
  );

  return { ...data, isLoading };
};

export default useSearch;
