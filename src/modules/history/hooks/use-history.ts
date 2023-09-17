import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useMessageContext from 'context/hooks/use-message-context';
import { axiosPrivate } from 'service/axios';

import useQueryParams from 'hooks/use-query-params/use-query-params';

import { Mappers, Types } from '..';

const useHistory = () => {
  const [query] = useQueryParams();
  const { messageHistory, setMessageHistory } = useMessageContext();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery<Types.IEntity.GeneralHistory, string, Types.IEntity.GeneralHistory>(
    ['history', `${query?.roomId}`],
    async () => {
      const { data } = await axiosPrivate.get(`contact/${query?.setId}/`);

      return Mappers.generalHistory(data);
    },
    {
      enabled: !!(query.setId && query.roomId)
    }
  );

  useEffect(() => {
    if (data?.items) {
      setMessageHistory([...data?.items!, ...messageHistory]);
    }
  }, [isLoading]);

  return useMutation<Types.IEntity.GeneralHistory, string, Types.IEntity.PaginationKey>(
    async ({ id }) => {
      const { data } = await axiosPrivate.get(`contact/${id}/`);

      return Mappers.generalHistory(data);
    },
    {
      onSuccess: (data, variables) => {
        queryClient.setQueryData(['history', variables.id], data);
        if (data?.items) {
          setMessageHistory([...data?.items!, ...messageHistory]);
        }
      },
      onError: error => {
        // @ts-ignore
        toast.error(error.message);
      }
    }
  );
};

export default useHistory;
