import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'ai-ui-kit/lib/components';
import useMessageContext from 'context/hooks/use-message-context';
import { axiosPrivate } from 'service/axios';

import useQueryParams from 'hooks/use-query-params/use-query-params';

import { Mappers, Types } from '..';

const useUserList = () => {
  const queryClient = useQueryClient();
  const [query] = useQueryParams();
  const { messageHistory, setMessageHistory } = useMessageContext();

  const data = useQuery<Types.IQuery.Response, any, Types.IQuery.Response>(['users', 'list'], async () => {
    const { data } = await axiosPrivate.get('/history');

    return Mappers.userList(data);
  });

  const { mutate } = useMutation(
    async () => {
      const { data } = await axiosPrivate.get('/history');

      return Mappers.userList(data);
    },
    {
      onSuccess: data => {
        queryClient.setQueryData(['users', 'list'], data);
      },
      onError: (error: any) => {
        toast.error({ content: error.message });
      }
    }
  );

  useEffect(() => {
    const isThere = data?.data?.filter(item => item.contact.id === +query?.setId);

    if (!((isThere || [])?.length !== 0)) {
      mutate();
    }
  }, [messageHistory]);

  return data;
};

export default useUserList;
